# Relevo para la próxima sesión (escrito el 31-oct-2026; actualizado el 1-nov-2026)

Léelo entero antes de tocar nada. Después, `docs/tareas-pendientes.md` (sección 0) y `docs/revision_profesor_30oct.md`.

## Cambios del 1-nov (tarde)

- **LangGraph** solo en CV y cartas y en envío (Mar), pendiente del profesor. Ver `docs/analisis-tecnico.md` (apartado 9) y la pregunta 14 de `docs/preguntas-profesor.md`.
- **Documento «Horma v3»** en el Cuaderno (Proyectos), con 3 diagramas en `Workbook\web\proyectos\horma-v3\`. Sustituye a `redactora` y `envio`, ahora en `horma\archivo\`.
- **Repositorios:** `mcaparrosgu/horma-jobs` (privado, `main`) y `mcaparrosgu/workbook` (commit `b2097c8`).
- **Rz3… (resuelto el 1-nov):** al publicar la página del profesor se pisó por error la versión 19 de Rz3… (borrador del 29-oct con aviso, marcas del PRD y los 19 hilos). Se restauró el mismo día, idéntica a `docs/archivo/horma-jobs-borrador-29oct.html`. La página del profesor (`horma-apuntes`, con los apartados de «Horma v3») vive ahora en su propio artefacto: https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd (privado: Mar debe compartirlo con él desde *Share*). Los 19 hilos siguen en Rz3… (comprobado tras publicar).
- **Artefactos ordenados (1-nov):** el PRD y la comparativa se borraron como artefactos; sus copias locales son las de la tabla de abajo.

## Qué artefacto es cada cosa

Horma tiene estos cuatro y ninguno más:

| Artefacto | Para qué | Quién lo usa | Fuente |
|---|---|---|---|
| Cuaderno personal: https://claude.ai/artifact/4BuaSjpRvJYBtEVvW3RevH | Documentos «Horma jobs» y «Horma v3» | Mar | `Workbook\web\workbook.html` |
| Horma jobs: https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd | Página del profesor, con comentarios | Profesor | `Workbook\web\horma-apuntes.html`, generada por `web\proyectos\construir-horma-aparte.py` |
| Horma por dentro: https://claude.ai/artifact/QBkk83ZVbjHC97kNq1y9xH | Guía privada para estudiar | Mar | `docs/horma-por-dentro.html` |
| Horma jobs · archivo 29-oct: https://claude.ai/artifact/Rz3LtzSVM8yeGkMYks9SQs | Temporal, con los 19 hilos: se borra cuando el profesor haya visto la nueva | Nadie | `docs/archivo/horma-jobs-borrador-29oct.html` |

**Regla:** antes de publicar sobre uno, léelo. Se regenera siempre desde su fuente.

## Dónde está lo demás

| Qué | Dónde |
|---|---|
| PRD v1 | Apartado 23 del documento «Horma jobs»; copia en `docs/prd-horma-v1.html` |
| Comparativa con ai-job-search | Solo en este PC: `docs/comparativa-ai-job-search/` (no se sube a GitHub) |
| Los 19 hilos del profesor | `docs/archivo/comentarios-profesor-30oct.md` |
| Registro de decisiones | `docs/revision_profesor_30oct.md` |
| Diagramas | `Workbook\web\proyectos\horma\*.json` → `*.html` y `horma-v3\` (skill `archify`) |
| Repositorio del proyecto | https://github.com/mcaparrosgu/horma-jobs (privado) |

## Decisiones de Mar ya cerradas (30/31-oct)

1. CV base por sector: hasta 5 CV base y 2 cartas base; subagente ATS ajusta a la oferta.
2. Regla de los huecos: nunca se tocan fechas, cargos, empresas ni titulaciones; lo poco relevante se condensa; propone Horma, aprueba la usuaria.
3. LinkedIn e Indeed: Horma prepara, envía siempre la persona.
4. Envío automático = tronco.
5. Estructura de construcción: la del profesor (no los 20 pasos).
6. Sin n8n: ingesta con script propio y dashboard.
7. PDF por defecto.
8. Fases: no se unifican por ahora (PRD Fase 1-4 y sección 20 Fases 0-5 conviven).
9. Sin presión de fechas; si hay que recortar, ramas pequeñas, nunca troncos.

## Tareas A y B: hechas (1-nov)

El PRD v1 está en el apartado 23 (comprobado por código, igual que `docs/prd-horma-v1.html`). Los otros 22 apartados y los diagramas ya no llevan n8n, salvo como «sin n8n» o «en clase, con n8n». Los flujos con agentes viven solo en «Horma v3».

**Falta:** que Mar abra las páginas. El navegador de pruebas se cuelga con el Cuaderno, así que no se ha visto renderizado.

## Preguntas para el profesor

1. ¿Qué cubre la Fase 4?
2. ¿«Aprobar y enviar» entra en la Fase 1 o en la 2 o 3? (el alcance de Fase 1 menciona envío y US-004 dice «Fase 2 o 3»).
3. ¿Ok formal para empezar la construcción?
4. El tope de 5 CV base: ¿por qué? Propuesta: limitar CV generados al mes, no CV base. Choca con «sin topes».

## Avisos a no olvidar

- Exportar y borrar datos (RGPD) tiene que estar antes de usuarias reales, aunque el profesor lo ponga en Fase 3.
- «Que invente un poco» (profesor) **no se aplica**: línea roja. Está resuelto como «propone, marca, aprueba».
- El resumen de Gemini mezcla el proyecto de Alberto con el de Mar.
- Sin hacer: `docs/decisiones-pendientes.md` y `docs/preguntas-profesor.md` (históricos), skills `paso-NN` (quedan como consulta).
