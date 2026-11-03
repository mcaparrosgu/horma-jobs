---
description: Convierte uno o varios CV en perfil, CV maestro, preferencias y CV base (Flujo B)
argument-hint: <usuaria> <archivos…>
---

Usuaria: $1 · Archivos: el resto de $ARGUMENTS
**Antes de nada:** comprueba que cada identificador recibido (usuaria, oferta, fuente) cumple `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$`; si no, para y dilo. Pon siempre las rutas entre comillas.


1. Para cada archivo, ejecuta `python -I .claude/skills/convertir-cv/scripts/convertir_cv.py <archivo> datos/usuarias/$1/fuentes/`. Si falta `pypdf`, para y dilo (no instales nada).
2. Lanza `extractor-perfil` con todos los textos y sus nombres de archivo. Escribe `cv-maestro.md`, `perfil.json` y `preferencias.json` en `datos/usuarias/$1/`. Valida cada archivo con `python -I .claude/skills/esquemas-horma/scripts/validar.py <esquema> <archivo>`; si no valida, vuelve a lanzar el agente con la lista de errores (una vez).
3. Lanza `clasificador-postulante` sobre `perfil.json` y guarda el resultado.
4. Muestra a la usuaria las `preguntas_pendientes` y espera sus respuestas antes de seguir; con cada respuesta, actualiza el maestro y el perfil.
5. Lanza `generador-cv-base` (una sola vez, hasta 4 CV). Para cada uno escribe `cv-base/<sector>/cv.md` y `cv-base/<sector>/traza.json` y ejecuta `python -I .claude/skills/verificar-trazabilidad/scripts/verificar.py datos/usuarias/$1/cv-base/<sector> --maestro datos/usuarias/$1/cv-maestro.md --perfil datos/usuarias/$1/perfil.json`. Si falla, regenera con la lista de errores; dos intentos como máximo.
6. Muestra los `cambios_propuestos` de cada CV base: la usuaria aprueba o rechaza.
7. Recuerda que el CV estético lo sube ella (`cv-estetico.pdf`) y Horma no lo toca.
