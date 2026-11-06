---
description: Genera CV y carta para una oferta, con verificador y juez (máximo 2 vueltas) (Flujo D)
argument-hint: <usuaria> <oferta-id>
---

Usuaria: $1 · Oferta: $2
**Antes de nada:** comprueba que cada identificador recibido (usuaria, oferta, fuente) cumple `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$`; el de la **usuaria** además va **en minúsculas** (`^[a-z0-9_-][a-z0-9_.-]{0,79}$`, como en la base de datos y en su carpeta de Windows); si no, para y dilo. Pon siempre las rutas entre comillas.


1. Lee `datos/ofertas/procesadas/$2.json` y `datos/usuarias/$1/perfil.json`. Si la carpeta `datos/candidaturas/$1/$2/` ya existe, para: una candidatura no se crea dos veces. Elige el CV base en `datos/usuarias/$1/cv-base/<sector>/cv.md` por `taxonomia.sector`, o el más cercano.
2. Lanza el subagente `redactor-cv` con el CV base, el maestro, el perfil y la oferta. Escribe `cv.md`, `traza.json` y `huecos.json` en `datos/candidaturas/$1/$2/`. (Al escribir `cv.md`, el hook ejecuta el verificador.)
3. Ejecuta `python -I .claude/skills/verificar-trazabilidad/scripts/verificar.py datos/candidaturas/$1/$2`. Si falla, vuelve al paso 2 con los errores.
4. Lanza `juez-cv`. Si el veredicto es `corregir`, vuelve al paso 2 con la lista. Máximo 2 vueltas en total; si no aprueba, escribe `estado.json` = `pendiente_de_ti` con los problemas y termina.
5. Ejecuta `python -I .claude/skills/medir-ats/scripts/medir_ats.py --cv … --oferta … --perfil … --salida datos/candidaturas/$1/$2/ats.json`. Si hay `faltantes_con_origen`, una vuelta más del redactor solo para incorporarlas. `faltantes_sin_origen` quedan en `huecos.json`.
6. Lanza `redactor-carta` y después `juez-carta` (una vuelta). Guarda `carta.md` y `traza-carta.json`, y ejecuta `python -I .claude/skills/verificar-trazabilidad/scripts/verificar.py datos/candidaturas/$1/$2 --carta`: si falla, una vuelta más del redactor con los errores. Si la carta pregunta algo (`preguntas_pendientes`), se lo preguntas a la usuaria.
7. Escribe `estado.json` = `borrador` (con `historial`) y muestra un resumen: cobertura ATS, huecos pendientes con su aviso de relleno y problemas corregidos. No envíes nada.
