#!/usr/bin/env python3
"""Corre las partes deterministas de los evals de la fase 1 (código, sin LLM).

Uso:
    python -I evals/correr_evals.py [cv|ats|filtro|esquemas|todo]

- cv:       sobre evals/cv/base/ aplica las mutaciones de evals/cv/mutaciones.json y exige que
            verificar.py rechace el 100 % de los casos sembrados y acepte el caso «ok».
- ats:      medir_ats.py sobre evals/cv/ats/ contra su esperado.
- filtro:   buscar.py sobre evals/recomendacion/filtro/ contra su esperado.
- esquemas: los JSON de .claude/skills/esquemas-horma/schemas/ son JSON válido.
Lo cualitativo (juez con LLM, extractores, matcher) lo corre el comando /evaluar.
Escribe una corrida fechada en evals/resultados/ y devuelve 1 si algo falla.
"""
import datetime
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
SK = RAIZ / ".claude" / "skills"
PY = [sys.executable, "-I"]


def correr(script: Path, *args):
    return subprocess.run(PY + [str(script), *map(str, args)], capture_output=True, text=True, encoding="utf-8")


def eval_cv():
    base = RAIZ / "evals" / "cv" / "base"
    casos = json.loads((RAIZ / "evals" / "cv" / "mutaciones.json").read_text(encoding="utf-8"))["casos"]
    verificar = SK / "verificar-trazabilidad" / "scripts" / "verificar.py"
    res = []
    for c in casos:
        with tempfile.TemporaryDirectory() as tmp:
            d = Path(tmp) / "datos" / "candidaturas" / "marta-ejemplo" / "of-1"
            d.mkdir(parents=True)
            cv = (base / "cv.md").read_text(encoding="utf-8")
            traza = (base / "traza.json").read_text(encoding="utf-8")
            for a, b in c["cv"]:
                assert a in cv, f"mutación sin efecto en cv: {a!r}"
                cv = cv.replace(a, b)
            for a, b in c["traza"]:
                assert a in traza, f"mutación sin efecto en traza: {a!r}"
                traza = traza.replace(a, b)
            (d / "cv.md").write_text(cv, encoding="utf-8")
            (d / "traza.json").write_text(traza, encoding="utf-8")
            r = correr(verificar, d, "--maestro", base / "cv-maestro.md", "--perfil", base / "perfil.json")
            salida = json.loads(r.stdout)
            tipos = {e["tipo"] for e in salida["errores"]}
            ok = salida["ok"] if c["esperado"] is None else (not salida["ok"] and c["esperado"] in tipos)
            res.append({"caso": c["nombre"], "ok": ok, "esperado": c["esperado"], "obtenido": sorted(tipos)})
    return res


def eval_ats():
    d = RAIZ / "evals" / "cv" / "ats"
    with tempfile.TemporaryDirectory() as tmp:
        salida = Path(tmp) / "ats.json"
        correr(SK / "medir-ats" / "scripts" / "medir_ats.py", "--cv", RAIZ / "evals/cv/base/cv.md",
               "--oferta", d / "oferta.json", "--perfil", RAIZ / "evals/cv/base/perfil.json", "--salida", salida)
        got = json.loads(salida.read_text(encoding="utf-8"))
    exp = json.loads((d / "esperado.json").read_text(encoding="utf-8"))
    ok = (got["cobertura"] == exp["cobertura"] and got["faltantes_con_origen"] == exp["faltantes_con_origen"]
          and got["faltantes_sin_origen"] == exp["faltantes_sin_origen"] and len(got["no_medidos"]) == exp["no_medidos"])
    res = [{"caso": "ats", "ok": ok, "obtenido": {k: got[k] for k in ("cobertura", "faltantes_sin_origen")}}]
    # Caso real: CV adaptado por el redactor para Ana; el inglés B2 está en su CV, cobertura completa.
    ana = RAIZ / "datos" / "fixtures" / "perfiles" / "ana-datos"
    cand = ana / "candidaturas" / "of-prueba-1"
    if cand.exists():
        with tempfile.TemporaryDirectory() as tmp:
            salida = Path(tmp) / "ats.json"
            correr(SK / "medir-ats" / "scripts" / "medir_ats.py", "--cv", cand / "cv.md",
                   "--oferta", RAIZ / "datos/fixtures/ofertas/of-prueba-1.json", "--perfil", ana / "perfil.json", "--salida", salida)
            real = json.loads(salida.read_text(encoding="utf-8"))
        res.append({"caso": "ats real (Ana, of-prueba-1)", "ok": real["cobertura"] == 1.0 and not real["faltantes_sin_origen"],
                    "obtenido": {k: real[k] for k in ("cobertura", "faltantes_sin_origen")}})
    return res


def eval_filtro():
    d = RAIZ / "evals" / "recomendacion" / "filtro"
    r = correr(SK / "buscar-ofertas" / "scripts" / "buscar.py", "--preferencias", d / "preferencias.json",
               "--perfil", RAIZ / "evals/cv/base/perfil.json", "--ofertas", d / "ofertas")
    got = json.loads(r.stdout)
    exp = json.loads((d / "esperado.json").read_text(encoding="utf-8"))
    ok = ([g["id"] for g in got] == exp["orden"]
          and sorted(g["id"] for g in got if g["sin_sueldo"]) == sorted(exp["sin_sueldo"]))
    return [{"caso": "filtro", "ok": ok, "obtenido": [(g["id"], g["puntos_taxonomia"]) for g in got]}]


def eval_fixtures():
    """Las salidas reales de los agentes (fixtures de perfiles) validan contra su esquema."""
    res = []
    validar = SK / "esquemas-horma" / "scripts" / "validar.py"
    for esquema, nombre in (("perfil", "perfil.json"), ("preferencias", "preferencias.json")):
        for f in sorted((RAIZ / "datos" / "fixtures" / "perfiles").glob(f"*/{nombre}")):
            r = correr(validar, esquema, f)
            ok = json.loads(r.stdout)["ok"]
            res.append({"caso": f"{f.parent.name}/{nombre}", "ok": ok, "obtenido": None if ok else json.loads(r.stdout)["errores"]})
    for f in sorted((RAIZ / "datos" / "fixtures" / "ofertas").glob("*.json")):
        r = correr(validar, "oferta", f)
        ok = json.loads(r.stdout)["ok"]
        res.append({"caso": f"ofertas/{f.name}", "ok": ok, "obtenido": None if ok else json.loads(r.stdout)["errores"]})
    # CV generados por agentes: el verificador de código los acepta.
    ana = RAIZ / "datos" / "fixtures" / "perfiles" / "ana-datos"
    verificar = SK / "verificar-trazabilidad" / "scripts" / "verificar.py"
    for carpeta in sorted(list((ana / "cv-base").glob("*")) + list((ana / "candidaturas").glob("*"))):
        r = correr(verificar, carpeta, "--maestro", ana / "cv.md", "--perfil", ana / "perfil.json")
        res.append({"caso": f"verificar {carpeta.relative_to(ana)}", "ok": json.loads(r.stdout)["ok"]})
    # Limitación documentada: el verificador NO caza un cargo inflado; eso es del juez (LLM).
    r = correr(verificar, RAIZ / "evals" / "cv" / "juez", "--maestro", ana / "cv.md", "--perfil", ana / "perfil.json")
    res.append({"caso": "verificar evals/cv/juez (pasa; el juez LLM debe cazar el inflado)", "ok": json.loads(r.stdout)["ok"]})
    return res


def eval_esquemas():
    res = []
    for f in sorted((SK / "esquemas-horma" / "schemas").glob("*.json")):
        try:
            json.loads(f.read_text(encoding="utf-8"))
            res.append({"caso": f.name, "ok": True})
        except json.JSONDecodeError as e:
            res.append({"caso": f.name, "ok": False, "obtenido": str(e)})
    return res


SETS = {"cv": eval_cv, "ats": eval_ats, "filtro": eval_filtro, "esquemas": eval_esquemas, "fixtures": eval_fixtures}


def main() -> int:
    # En Windows la consola usa cp1252: se fuerza UTF-8 para tildes y eñes.
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    pedido = sys.argv[1] if len(sys.argv) > 1 else "todo"
    nombres = list(SETS) if pedido == "todo" else [pedido]
    todo, fallos = {}, 0
    for n in nombres:
        todo[n] = SETS[n]()
        for x in todo[n]:
            fallos += 0 if x["ok"] else 1
            print(("OK   " if x["ok"] else "FALLA"), n, x["caso"], "" if x["ok"] else x)
    salida = RAIZ / "evals" / "resultados" / f"{datetime.date.today().isoformat()}-codigo.json"
    salida.write_text(json.dumps(todo, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n{sum(len(v) for v in todo.values()) - fallos} correctos, {fallos} fallos → {salida.relative_to(RAIZ)}")
    return 1 if fallos else 0


if __name__ == "__main__":
    sys.exit(main())
