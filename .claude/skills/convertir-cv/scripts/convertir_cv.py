#!/usr/bin/env python3
"""Convierte un CV (PDF, DOCX, Markdown o texto) a texto plano para /perfilar.

Uso:
    python -I convertir_cv.py <archivo> <carpeta-salida>

- .md y .txt: se copian.
- .docx: se lee con zipfile (biblioteca estándar), párrafo a párrafo.
- .pdf: necesita la librería `pypdf`. Si no está instalada, el script se detiene y lo dice:
  instalar una dependencia nueva es decisión de Mar (coste cero, mantenimiento bajo).
El archivo resultante se llama igual que el original con extensión .txt.
"""
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def docx_a_texto(ruta: Path) -> str:
    with zipfile.ZipFile(ruta) as z:
        if z.getinfo("word/document.xml").file_size > 20_000_000:
            raise ValueError("document.xml supera 20 MB: se rechaza el archivo")
        raiz = ElementTree.fromstring(z.read("word/document.xml"))
    parrafos = []
    for p in raiz.iter(W + "p"):
        parrafos.append("".join(t.text or "" for t in p.iter(W + "t")))
    return "\n".join(parrafos)


def pdf_a_texto(ruta: Path) -> str:
    try:
        from pypdf import PdfReader
    except ImportError:
        # `python -I` ignora la carpeta de paquetes de usuario donde `pip install pypdf` la deja:
        # se añade solo para este import, no para el resto del script.
        import site
        sys.path.append(site.getusersitepackages())
        try:
            from pypdf import PdfReader
        except ImportError:
            print("Falta `pypdf` para leer PDF (instalar: pip install pypdf).", file=sys.stderr)
            sys.exit(3)
    return "\n".join((pg.extract_text() or "") for pg in PdfReader(str(ruta)).pages)


def main() -> int:
    # En Windows la consola usa cp1252: se fuerza UTF-8 para tildes y eñes.
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    origen, destino = Path(sys.argv[1]), Path(sys.argv[2])
    ext = origen.suffix.lower()
    if ext in (".md", ".txt"):
        texto = origen.read_text(encoding="utf-8")
    elif ext == ".docx":
        texto = docx_a_texto(origen)
    elif ext == ".pdf":
        texto = pdf_a_texto(origen)
    else:
        print(f"Formato no admitido: {ext}", file=sys.stderr)
        return 2
    texto = re.sub(r"\n{3,}", "\n\n", texto).strip() + "\n"
    destino.mkdir(parents=True, exist_ok=True)
    salida = destino / (origen.stem + ".txt")
    salida.write_text(texto, encoding="utf-8")
    print(str(salida))
    return 0


if __name__ == "__main__":
    sys.exit(main())
