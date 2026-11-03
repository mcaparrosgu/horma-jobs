#!/usr/bin/env python3
"""Verifica un CV adaptado contra el CV maestro. Código determinista, sin LLM.

Uso:
    python -I verificar.py <carpeta-candidatura> [--maestro RUTA] [--perfil RUTA]

La carpeta es datos/candidaturas/<usuaria>/<oferta>/ y debe tener cv.md y traza.json.
Por defecto el maestro y el perfil se buscan en datos/usuarias/<usuaria>/.

Comprueba:
  1. Fechas: todo año o mes/año de cv.md existe en el maestro.
  2. Cifras: todo número de cv.md (porcentajes, importes, cantidades) existe en el maestro.
  3. Encabezados «### Cargo · Empresa · inicio–fin» y «### Titulación · Centro · fin»:
     coinciden palabra por palabra con perfil.json (cargos, empresas, titulaciones, fechas).
  4. Traza: cada fragmento de origen existe de verdad en el maestro, y cada línea de cv.md
     (salvo títulos «#» y «##») tiene una frase en traza.json.
Con --carta verifica carta.md y traza-carta.json (fechas, cifras y traza; sin encabezados).
Limitación conocida: comprueba que el fragmento citado existe en el maestro, no que sostenga la
frase («participé» citado, «lideré» escrito): eso lo cubre el juez con LLM.
Salida: JSON en stdout. Código de salida 0 si todo va bien, 1 si hay errores.
Solo biblioteca estándar.
"""
import argparse
import json
import re
import sys
import unicodedata
from pathlib import Path


def norm(texto: str) -> str:
    """Minúsculas, sin tildes, guiones unificados y espacios colapsados."""
    t = unicodedata.normalize("NFKD", texto)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.replace("–", "-").replace("—", "-").replace("−", "-")
    t = t.replace("“", '"').replace("”", '"').replace("’", "'")
    return re.sub(r"\s+", " ", t).strip().lower()


FECHA_RE = re.compile(r"\b(?:\d{1,2}/)?(?:19|20)\d{2}\b")
NUM_RE = re.compile(r"\d+(?:[.,]\d+)*\s?%?")


def fechas(texto: str) -> set:
    return {norm(m) for m in FECHA_RE.findall(texto)}


def numeros(texto: str) -> set:
    sin_fechas = FECHA_RE.sub(" ", texto)
    sin_marcas = re.sub(r"(?m)^\s*(?:[-*+]|\d+[.)])\s+", "", sin_fechas)
    return {re.sub(r"\s+", "", m) for m in NUM_RE.findall(sin_marcas)}


def lineas_con_contenido(cv: str):
    for linea in cv.splitlines():
        s = linea.strip()
        if not s or s.startswith("# ") or s.startswith("## "):
            continue
        if s.startswith("### "):
            continue  # los encabezados se verifican contra perfil.json
        yield re.sub(r"^(?:[-*+]|\d+[.)])\s+", "", s)


def partir_encabezado(linea: str):
    cuerpo = linea.lstrip("#").strip()
    partes = [p.strip() for p in re.split(r"\s·\s", cuerpo)]
    return partes


def verificar(carpeta: Path, maestro_ruta: Path, perfil_ruta: Path, carta: bool = False) -> list:
    errores = []
    cv_ruta = carpeta / ("carta.md" if carta else "cv.md")
    traza_ruta = carpeta / ("traza-carta.json" if carta else "traza.json")
    for r in (cv_ruta, traza_ruta, maestro_ruta, perfil_ruta):
        if not r.exists():
            errores.append({"tipo": "falta_archivo", "detalle": str(r)})
    if errores:
        return errores

    cv = cv_ruta.read_text(encoding="utf-8")
    maestro = maestro_ruta.read_text(encoding="utf-8")
    maestro_n = norm(maestro)
    try:
        traza = json.loads(traza_ruta.read_text(encoding="utf-8"))
        perfil = json.loads(perfil_ruta.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [{"tipo": "json_invalido", "detalle": str(e)}]

    # 1. Fechas
    f_maestro = fechas(maestro)
    for f in sorted(fechas(cv) - f_maestro):
        errores.append({"tipo": "fecha_no_esta_en_maestro", "detalle": f})

    # 2. Cifras
    n_maestro = numeros(maestro)
    for n in sorted(numeros(cv) - n_maestro):
        errores.append({"tipo": "cifra_no_esta_en_maestro", "detalle": n})

    # 3. Encabezados contra perfil.json
    validos = set()
    for e in perfil.get("experiencias", []):
        validos.add((norm(e["cargo"]), norm(e["empresa"]), norm(f'{e["inicio"]}-{e["fin"]}')))
    for f in perfil.get("formacion", []):
        validos.add((norm(f["titulo"]), norm(f["centro"]), norm(f["fin"])))
    for linea in ([] if carta else cv.splitlines()):  # la carta no tiene encabezados de experiencia
        if not linea.startswith("### "):
            continue
        p = partir_encabezado(linea)
        if len(p) != 3 or (norm(p[0]), norm(p[1]), norm(p[2])) not in validos:
            errores.append({"tipo": "encabezado_no_coincide_con_perfil", "detalle": linea.strip()})

    # 4. Traza
    entradas = traza if isinstance(traza, list) else traza.get("traza", [])
    frases = []
    for i, t in enumerate(entradas):
        frase = t.get("frase", "")
        frag = t.get("origen", {}).get("fragmento", "")
        frases.append(norm(frase))
        if not frag or norm(frag) not in maestro_n:
            errores.append({"tipo": "origen_inexistente", "detalle": f"traza[{i}]: {frag[:80]!r}"})
        if norm(frase) not in norm(cv):
            errores.append({"tipo": "frase_de_traza_no_esta_en_cv", "detalle": f"traza[{i}]: {frase[:80]!r}"})
    for linea in lineas_con_contenido(cv):
        ln = norm(linea)
        if not any(f and (f in ln or ln in f) for f in frases):
            errores.append({"tipo": "frase_sin_traza", "detalle": linea[:100]})
    return errores


def main() -> int:
    # En Windows la consola usa cp1252: se fuerza UTF-8 para tildes y eñes.
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("carpeta", type=Path)
    ap.add_argument("--maestro", type=Path)
    ap.add_argument("--perfil", type=Path)
    ap.add_argument("--carta", action="store_true", help="verifica carta.md y traza-carta.json (sin encabezados)")
    a = ap.parse_args()
    carpeta = a.carpeta.resolve()
    usuaria = carpeta.parent.name
    base = carpeta.parent.parent.parent / "usuarias" / usuaria
    maestro = a.maestro or base / "cv-maestro.md"
    perfil = a.perfil or base / "perfil.json"
    errores = verificar(carpeta, maestro, perfil, a.carta)
    print(json.dumps({"ok": not errores, "errores": errores}, ensure_ascii=False, indent=2))
    return 0 if not errores else 1


if __name__ == "__main__":
    sys.exit(main())
