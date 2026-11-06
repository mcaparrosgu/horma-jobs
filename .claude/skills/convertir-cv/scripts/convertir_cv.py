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
        # se añade solo durante este import (y solo si existe) y se quita justo después, para
        # que ningún otro import del script pueda cargar código desde esa carpeta.
        import site
        usuario = site.getusersitepackages()
        if Path(usuario).is_dir():
            sys.path.append(usuario)
        try:
            from pypdf import PdfReader
        except ImportError:
            print("Falta `pypdf` para leer PDF (instalar: pip install pypdf).", file=sys.stderr)
            sys.exit(3)
        finally:
            if usuario in sys.path:
                sys.path.remove(usuario)
    # Un PDF es entrada no fiable: tope de tamaño y de páginas (un CV real cabe de sobra).
    if ruta.stat().st_size > 10_000_000:
        print("El PDF pesa más de 10 MB: no parece un CV. No se lee.", file=sys.stderr)
        sys.exit(3)
    try:
        paginas = PdfReader(str(ruta)).pages
        if len(paginas) > 30:
            print("El PDF tiene más de 30 páginas: se leen solo las 30 primeras.", file=sys.stderr)
        return "\n".join((paginas[i].extract_text() or "") for i in range(min(len(paginas), 30)))
    except Exception:  # cifrado, dañado o que pide una librería que aquí no se carga: mensaje fijo, sin traceback
        print("No se pudo leer el PDF (¿está cifrado o dañado?). Pega el texto del CV a mano.", file=sys.stderr)
        sys.exit(3)


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
