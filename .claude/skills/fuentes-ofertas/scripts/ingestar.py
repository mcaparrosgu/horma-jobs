#!/usr/bin/env python3
"""Trae ofertas de una fuente del registro endpoints.json y las deja en datos/ofertas/raw/.

Uso:
    python -I ingestar.py <fuente> [--limite N] [--endpoints RUTA] [--salida DIR] [--dry-run]

- Solo trabaja con fuentes que estén en endpoints.json y con activa = true.
- La clave de acceso se lee de la variable de entorno que indica `clave_env`; nunca se
  imprime ni se escribe en disco.
- Cada oferta se guarda como <fuente>-<id>.md con la fuente, la URL y la fecha de descarga
  arriba. El texto de la oferta es NO FIABLE: se guarda tal cual, como dato.
- Con --dry-run no hace ninguna llamada de red: muestra qué haría.
Solo biblioteca estándar.
"""
import argparse
import datetime
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

AQUI = Path(__file__).resolve().parent
ENDPOINTS = AQUI.parent / "endpoints.json"
MAX_BYTES = 5_000_000
PROHIBIDAS = {"linkedin.com", "indeed.com"}  # por regla del producto, no por calificación


class SoloMismoHostHttps(urllib.request.HTTPRedirectHandler):
    """Solo sigue redirecciones https al mismo host (evita SSRF y la fuga de la clave)."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        a, b = urllib.parse.urlparse(req.full_url), urllib.parse.urlparse(newurl)
        if b.scheme != "https" or b.hostname != a.hostname:
            raise urllib.error.URLError(f"redirección rechazada hacia {b.scheme}://{b.hostname}")
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def ruta(obj, camino: str):
    """Lee a.b.0.c dentro de dicts y listas; devuelve None si no existe."""
    for parte in camino.split(".") if camino else []:
        if isinstance(obj, list) and parte.isdigit() and int(parte) < len(obj):
            obj = obj[int(parte)]
        elif isinstance(obj, dict) and parte in obj:
            obj = obj[parte]
        else:
            return None
    return obj


def limpio(x) -> str:
    s = re.sub(r"[^A-Za-z0-9_.-]", "_", str(x)).lstrip(".")[:80]
    return s or "sin_id"


def main() -> int:
    # En Windows la consola usa cp1252: se fuerza UTF-8 para tildes y eñes.
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("fuente")
    ap.add_argument("--limite", type=int, default=50)
    ap.add_argument("--endpoints", type=Path, default=ENDPOINTS)
    ap.add_argument("--salida", type=Path, default=Path("datos/ofertas/raw"))
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    registro = json.loads(a.endpoints.read_text(encoding="utf-8"))
    fuente = next((f for f in registro["fuentes"] if f["nombre"] == a.fuente), None)
    if fuente is None:
        print(f"Fuente «{a.fuente}» no está en endpoints.json. Califícala antes con /calificar-fuentes.", file=sys.stderr)
        return 2
    if not fuente["activa"]:
        print(f"Fuente «{a.fuente}» está desactivada (activa = false).", file=sys.stderr)
        return 2
    host = (urllib.parse.urlparse(fuente["url"]).hostname or "").lower()
    if any(host == d or host.endswith("." + d) for d in PROHIBIDAS) or "indeed." in host:
        print("LinkedIn e Indeed no son fuente de ofertas (regla del producto).", file=sys.stderr)
        return 2
    if not fuente["url"].startswith("https://"):
        print("Solo se admiten URL https.", file=sys.stderr)
        return 2

    params, cabeceras = dict(fuente["parametros"]), dict(fuente["cabeceras"])
    cabeceras.setdefault("User-Agent", "Horma/0.1 (+ingesta de ofertas)")
    if fuente.get("clave_env"):
        clave = os.environ.get(fuente["clave_env"])
        if not clave:
            print(f"Falta la variable de entorno {fuente['clave_env']}.", file=sys.stderr)
            return 2
        if fuente.get("clave_en") == "parametro":
            params[fuente["clave_nombre"]] = clave
        else:
            cabeceras[fuente.get("clave_nombre") or "Authorization"] = clave
    url = fuente["url"] + ("?" + urllib.parse.urlencode(params) if params else "")

    if a.dry_run:
        print(f"[dry-run] GET {fuente['url']} (parámetros: {sorted(params)}), límite {a.limite}, salida {a.salida}")
        return 0

    req = urllib.request.Request(url, headers=cabeceras, method="GET")
    with urllib.request.build_opener(SoloMismoHostHttps).open(req, timeout=20) as r:
        crudo = r.read(MAX_BYTES + 1)
    if len(crudo) > MAX_BYTES:
        print("La respuesta supera 5 MB: se descarta.", file=sys.stderr)
        return 2
    datos = json.loads(crudo.decode("utf-8"))
    m = fuente["mapeo_campos"]
    lista = ruta(datos, m["lista"])
    if not isinstance(lista, list):
        print("La ruta `lista` del mapeo no apunta a un array.", file=sys.stderr)
        return 2
    a.salida.mkdir(parents=True, exist_ok=True)
    hoy = datetime.date.today().isoformat()
    guardadas = 0
    for item in lista[: a.limite]:
        if not isinstance(item, dict):
            continue
        id_ = ruta(item, m["id"])
        if id_ is None:
            continue
        titulo, empresa = ruta(item, m["titulo"]), ruta(item, m["empresa"])
        enlace, desc = ruta(item, m["url"]), ruta(item, m["descripcion"])
        fecha = ruta(item, m["fecha"]) if "fecha" in m else None
        # Cabecera con json.dumps: una línea por campo; el texto de la oferta no puede falsearla.
        cab = {"fuente": fuente["nombre"], "url": enlace, "fecha_descarga": hoy, "fecha_publicacion": fecha}
        cabecera = "".join(f"{k}: {json.dumps(v, ensure_ascii=False)}\n" for k, v in cab.items())
        cuerpo = f"---\n{cabecera}---\n\n# {titulo}\n\nEmpresa: {empresa}\n\n{desc}\n"
        (a.salida / f"{limpio(fuente['nombre'])}-{limpio(id_)}.md").write_text(cuerpo, encoding="utf-8")
        guardadas += 1
    print(json.dumps({"fuente": fuente["nombre"], "guardadas": guardadas, "fecha": hoy}))
    return 0


if __name__ == "__main__":
    sys.exit(main())
