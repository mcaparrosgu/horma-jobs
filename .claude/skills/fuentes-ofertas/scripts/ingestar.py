#!/usr/bin/env python3
"""Trae ofertas de una fuente del registro endpoints.json y las deja en datos/ofertas/raw/.

Uso:
    python -I ingestar.py <fuente> [--limite N] [--endpoints RUTA] [--salida DIR] [--dry-run]

- Solo trabaja con fuentes que estén en endpoints.json y con activa = true.
- La clave de acceso se lee de la variable de entorno que indica `clave_env` (siempre
  `FUENTE_*`); nunca se imprime ni se escribe en disco.
- Cada oferta se guarda como <fuente>-<id>-<hash>.md con la fuente, la URL y la fecha de
  descarga arriba. El texto de la oferta es NO FIABLE: se guarda tal cual, como dato.
- Con --dry-run no hace ninguna llamada de red: muestra qué haría.
- Seguridad de la descarga (SSRF): solo https al puerto 443, sin usuario en la URL y con
  nombre de dominio con punto; el nombre se resuelve y TODAS sus IP deben ser públicas, y
  la conexión va a la IP comprobada (un DNS que cambie de respuesta no sirve de truco). Las
  redirecciones solo pueden ir al mismo host y puerto. Sin proxies. Límite de 5 MB y de
  30 s de lectura. Los errores salen como código fijo, nunca como mensaje de red.
- `--salida` debe estar dentro de `datos/ofertas/` del repositorio. `--endpoints` con un archivo
  de fuera del repositorio solo se acepta con --dry-run.
- Cualquier fallo inesperado sale como `ERROR_INTERNO` más el nombre del tipo de error, sin
  traceback (un traceback podría llevar la clave).
Solo biblioteca estándar.
"""
import argparse
import datetime
import hashlib
import http.client
import ipaddress
import json
import os
import re
import socket
import ssl
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

AQUI = Path(__file__).resolve().parent
ENDPOINTS = AQUI.parent / "endpoints.json"
RAIZ = AQUI.parents[3]  # scripts → fuentes-ofertas → skills → .claude → repo
SALIDA_PERMITIDA = RAIZ / "datos" / "ofertas"
MAX_BYTES = 5_000_000
MAX_SEGUNDOS = 30  # reloj total de la descarga; cada lectura suelta tiene además su propio tope de 20 s
PROHIBIDAS = {"linkedin.com", "indeed.com"}  # por regla del producto, no por calificación
CLAVE_ENV = re.compile(r"FUENTE_[A-Z0-9_]+")
RECHAZADAS = [ipaddress.ip_network("64:ff9b::/96"), ipaddress.ip_network("::/96")]  # NAT64 y compatibles
CLAVE_VALOR = re.compile(r"[!-~]+")  # ASCII visible: sin espacios, saltos de línea ni control
FECHA = re.compile(r"\d{4}-\d{2}-\d{2}([T ][0-9:.+\-Z]{0,20})?")
EMAIL = re.compile(r"[\w.+-]+@[\w-]+(?:\.[\w-]+)+")
TELEFONO = re.compile(r"(?<![\w.])\+?\d[\d ().\-/]{5,}\d(?![\w])")  # 7 o más cifras con separadores
FECHA_SUELTA = re.compile(r"\d{4}-\d{2}-\d{2}|\d{1,2}[./-]\d{1,2}[./-]\d{4}")
NOMBRE_CABECERA = re.compile(r"[A-Za-z0-9_-]{1,64}")  # sirve para cabecera y parámetro; sin espacios ni saltos de línea


class ErrorFuente(Exception):
    """Fallo de descarga con un código fijo (sin texto de red, que podría llevar datos)."""

    def __init__(self, codigo: str):
        super().__init__(codigo)
        self.codigo = codigo


def es_publica(ip: str) -> bool:
    """True solo para direcciones de internet públicas (no locales, privadas, enlace local, etc.)."""
    try:
        dir_ = ipaddress.ip_address(ip)
    except ValueError:
        return False
    if isinstance(dir_, ipaddress.IPv6Address) and dir_.ipv4_mapped:
        dir_ = dir_.ipv4_mapped
    if dir_.is_multicast or any(dir_.version == n.version and dir_ in n for n in RECHAZADAS):
        return False
    return dir_.is_global


def validar_url(url: str) -> str:
    """Comprobaciones sin red. Devuelve el host; lanza ErrorFuente('URL_NO_VALIDA') si algo falla."""
    try:
        p = urllib.parse.urlparse(url)
        puerto = p.port
    except ValueError:
        raise ErrorFuente("URL_NO_VALIDA")
    host = (p.hostname or "").lower().rstrip(".")  # «linkedin.com.» es el mismo sitio que «linkedin.com»
    if (p.scheme != "https" or "@" in p.netloc or puerto not in (None, 443)
            or "." not in host or ".." in host or host.startswith(".")):
        raise ErrorFuente("URL_NO_VALIDA")
    return host


class ConexionSegura(http.client.HTTPSConnection):
    """Resuelve el nombre, exige IP públicas y se conecta a la IP ya comprobada."""

    def connect(self):
        try:
            infos = socket.getaddrinfo(self.host, self.port or 443, type=socket.SOCK_STREAM)
        except (OSError, UnicodeError):  # UnicodeError: nombres con etiquetas vacías o larguísimas
            raise ErrorFuente("RED")
        ips = [i[4][0] for i in infos]
        if not ips or not all(es_publica(ip) for ip in ips):
            raise ErrorFuente("DESTINO_NO_PUBLICO")
        for ip in dict.fromkeys(ips):
            try:
                sock = socket.create_connection((ip, self.port or 443), self.timeout)
            except OSError:
                continue
            self.sock = self._context.wrap_socket(sock, server_hostname=self.host)
            return
        raise ErrorFuente("RED")


class ManejadorSeguro(urllib.request.HTTPSHandler):
    def https_open(self, req):
        return self.do_open(ConexionSegura, req, context=ssl.create_default_context())


class SoloMismoHostYPuerto(urllib.request.HTTPRedirectHandler):
    """Solo sigue redirecciones https al mismo host y puerto (evita SSRF y la fuga de la clave)."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        try:
            actual = validar_url(req.full_url)
            nuevo_host = validar_url(newurl)
            a, b = urllib.parse.urlparse(req.full_url), urllib.parse.urlparse(newurl)
        except ErrorFuente:
            raise ErrorFuente("REDIRECCION_RECHAZADA")
        if nuevo_host != actual or (b.port or 443) != (a.port or 443):
            raise ErrorFuente("REDIRECCION_RECHAZADA")
        return super().redirect_request(req, fp, code, msg, headers, newurl)


def abrir(req, plazo: float) -> bytes:
    """Descarga con tope de tamaño y de tiempo total (se mira entre recepciones, de modo que el
    máximo real es MAX_SEGUNDOS más una espera de socket de 20 s). Sin proxies: conexión directa."""
    opener = urllib.request.build_opener(
        urllib.request.ProxyHandler({}), ManejadorSeguro, SoloMismoHostYPuerto)
    try:
        with opener.open(req, timeout=20) as r:
            trozos, total = [], 0
            while True:
                if time.monotonic() > plazo:
                    raise ErrorFuente("TIEMPO")
                t = r.read1(65536)  # vuelve tras UNA recepción: así el reloj se mira entre trozos
                if not t:
                    return b"".join(trozos)
                total += len(t)
                if total > MAX_BYTES:
                    raise ErrorFuente("TAMANO")
                trozos.append(t)
    except ErrorFuente:
        raise
    except TimeoutError:
        raise ErrorFuente("TIEMPO")
    except Exception:  # URLError, HTTPError, TLS, ValueError de cabeceras (su texto podría llevar la clave)...
        raise ErrorFuente("RED")


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


def sin_contacto(texto) -> str:
    """Quita emails y teléfonos del texto de la oferta: son datos de terceros y no se guardan."""
    t = EMAIL.sub("[contacto omitido]", str(texto or ""))
    def quitar(m):
        # 7 o más cifras y no es una fecha (2026-11-06, 06.11.2026)
        es_tel = sum(c.isdigit() for c in m.group()) >= 7 and not FECHA_SUELTA.fullmatch(m.group())
        return "[contacto omitido]" if es_tel else m.group()
    return TELEFONO.sub(quitar, t)


def nombre_archivo(fuente: str, id_) -> str:
    """El hash evita que dos ids distintos («a/b» y «a_b») acaben en el mismo archivo."""
    h = hashlib.sha256(str(id_).encode("utf-8")).hexdigest()[:8]
    return f"{limpio(fuente)}-{limpio(id_)[:60]}-{h}.md"


def fallo(fuente: str, codigo: str) -> int:
    print(json.dumps({"fuente": fuente, "error": codigo}), file=sys.stderr)
    return 2


def main() -> int:
    # En Windows la consola usa cp1252: se fuerza UTF-8 para tildes y eñes.
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("fuente")
    ap.add_argument("--limite", type=int, default=50)
    ap.add_argument("--endpoints", type=Path, default=ENDPOINTS)
    ap.add_argument("--salida", type=Path, default=SALIDA_PERMITIDA / "raw")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    salida = a.salida.resolve()
    if not salida.is_relative_to(SALIDA_PERMITIDA.resolve()):
        print("`--salida` debe estar dentro de datos/ofertas/ del repositorio.", file=sys.stderr)
        return 2
    if not a.dry_run and not a.endpoints.resolve().is_relative_to(RAIZ.resolve()):
        print("`--endpoints` fuera del repositorio solo se acepta con --dry-run.", file=sys.stderr)
        return 2
    registro = json.loads(a.endpoints.read_text(encoding="utf-8"))
    fuente = next((f for f in registro["fuentes"] if f["nombre"] == a.fuente), None)
    if fuente is None:
        print(f"Fuente «{a.fuente}» no está en endpoints.json. Califícala antes con /calificar-fuentes.", file=sys.stderr)
        return 2
    if not fuente["activa"]:
        print(f"Fuente «{a.fuente}» está desactivada (activa = false).", file=sys.stderr)
        return 2
    try:
        host = validar_url(fuente["url"])
    except ErrorFuente as e:
        return fallo(a.fuente, e.codigo)
    if any(host == d or host.endswith("." + d) for d in PROHIBIDAS) or "indeed." in host:
        print("LinkedIn e Indeed no son fuente de ofertas (regla del producto).", file=sys.stderr)
        return 2

    params, cabeceras = dict(fuente["parametros"]), dict(fuente["cabeceras"])
    cabeceras.setdefault("User-Agent", "Horma/0.1 (+ingesta de ofertas)")
    if fuente.get("clave_env"):
        if not CLAVE_ENV.fullmatch(fuente["clave_env"]):
            print("`clave_env` debe llamarse FUENTE_ seguido de mayúsculas, números o _.", file=sys.stderr)
            return 2
        por_parametro = fuente.get("clave_en") == "parametro"
        nombre = fuente.get("clave_nombre") or (None if por_parametro else "Authorization")
        if not nombre or not NOMBRE_CABECERA.fullmatch(nombre):
            print("`clave_nombre` falta o no es válido (letras, números, guion y guion bajo; obligatorio si la clave va por parámetro).", file=sys.stderr)
            return 2
        clave = (os.environ.get(fuente["clave_env"]) or "").strip()
        if not clave:
            print(f"Falta la variable de entorno {fuente['clave_env']}.", file=sys.stderr)
            return 2
        if not CLAVE_VALOR.fullmatch(clave):
            print(f"El valor de {fuente['clave_env']} tiene caracteres no válidos (espacios o saltos de línea dentro).", file=sys.stderr)
            return 2
        (params if por_parametro else cabeceras)[nombre] = clave
    url = fuente["url"] + ("?" + urllib.parse.urlencode(params) if params else "")

    if a.dry_run:
        print(f"[dry-run] GET {fuente['url']} (parámetros: {sorted(params)}), límite {a.limite}, salida {a.salida}")
        return 0

    req = urllib.request.Request(url, headers=cabeceras, method="GET")
    try:
        crudo = abrir(req, time.monotonic() + MAX_SEGUNDOS)
        try:
            datos = json.loads(crudo.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError, RecursionError):
            raise ErrorFuente("FORMATO")
    except ErrorFuente as e:
        return fallo(a.fuente, e.codigo)
    m = fuente["mapeo_campos"]
    lista = ruta(datos, m["lista"])
    if not isinstance(lista, list):
        return fallo(a.fuente, "FORMATO")
    salida.mkdir(parents=True, exist_ok=True)
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
        # Lo que el origen cuenta de sí mismo no es de fiar: solo https y fechas con forma de fecha.
        enlace = enlace if isinstance(enlace, str) and enlace.startswith("https://") else None
        fecha = fecha if isinstance(fecha, str) and FECHA.fullmatch(fecha) else None
        # Cabecera con json.dumps: una línea por campo; el texto de la oferta no puede falsearla.
        cab = {"fuente": fuente["nombre"], "url": enlace, "fecha_descarga": hoy, "fecha_publicacion": fecha}
        cabecera = "".join(f"{k}: {json.dumps(v, ensure_ascii=False)}\n" for k, v in cab.items())
        titulo, empresa, desc = sin_contacto(titulo), sin_contacto(empresa), sin_contacto(desc)
        cuerpo = f"---\n{cabecera}---\n\n# {titulo}\n\nEmpresa: {empresa}\n\n{desc}\n"
        (salida / nombre_archivo(fuente["nombre"], id_)).write_text(cuerpo, encoding="utf-8")
        guardadas += 1
    print(json.dumps({"fuente": fuente["nombre"], "guardadas": guardadas, "fecha": hoy}))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except SystemExit:
        raise
    except Exception as e:  # solo el nombre del tipo: ni mensaje ni traceback
        print(json.dumps({"error": "ERROR_INTERNO", "tipo": type(e).__name__}), file=sys.stderr)
        sys.exit(2)
