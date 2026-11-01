# Relevo para la próxima sesión (escrito el 31-oct-2026; actualizado el 1-nov-2026)

Léelo entero antes de tocar nada. Después, `docs/tareas-pendientes.md` (sección 0) y `docs/revision_profesor_30oct.md`.

## Cambios del 1-nov (tarde)

- **LangGraph** solo en CV y cartas y en envío (Mar), pendiente del profesor. Ver `docs/analisis-tecnico.md` (apartado 9) y la pregunta 14 de `docs/preguntas-profesor.md`.
- **Documento «Horma v3»** en el Cuaderno (Proyectos), con 3 diagramas en `Workbook\web\proyectos\horma-v3\`. Sustituye a `redactora` y `envio`, ahora en `horma\archivo\`.
- **Repositorios:** `mcaparrosgu/horma-jobs` (privado, `main`) y `mcaparrosgu/workbook` (commit `b2097c8`).
- **Rz3… (resuelto el 1-nov):** al publicar la página del profesor se pisó por error la versión 19 de Rz3… (borrador del 29-oct con aviso, marcas del PRD y los 19 hilos). Se restauró el mismo día, idéntica a `docs/archivo/horma-jobs-borrador-29oct.html`. La página del profesor (`horma-apuntes`, con los apartados de «Horma v3») vive ahora en su propio artefacto: https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd (privado: Mar debe compartirlo con él desde *Share*). No se ha comprobado si los 19 hilos siguen anclados.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| PRD v1 (vigente) | `docs/prd-horma-v1.html` · artefacto provisional https://claude.ai/artifact/SC6HJfJZAWy1BkwQQoYiYR |
| Borrador del 29-oct (archivado) | `docs/archivo/horma-jobs-borrador-29oct.html` · artefacto https://claude.ai/artifact/Rz3LtzSVM8yeGkMYks9SQs (lleva aviso de «no vigente») |
| Los 19 hilos del profesor | `docs/archivo/comentarios-profesor-30oct.md` |
| Registro de decisiones | `docs/revision_profesor_30oct.md` |
| Cuaderno personal | https://claude.ai/artifact/4BuaSjpRvJYBtEVvW3RevH |
| Fuente del WB | `C:\AI Engineering\Workbook\web\workbook.html` (reglas en `Workbook\CLAUDE.md`) |
| Página del profesor | `Workbook\web\horma-apuntes.html`, generada por `web\proyectos\construir-horma-aparte.py` · artefacto https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd |
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

## Tarea A: meter el PRD v1 en el WB (apartado 23 del documento «Horma jobs»)

Objetivo de Mar: todo en el mismo sitio, **no** en un artefacto aparte.

1. **Antes de nada, comparar.** El artefacto Rz3… se editó directamente (PRD con marcas, secciones 14 y 21, aviso de archivo) y `workbook.html` **no** tiene esos cambios. Léelo con `Artifact read` y decide qué se rescata.
2. **Guardar antes de regenerar:** los hilos ya están en `docs/archivo/comentarios-profesor-30oct.md`. Regenerar puede dejar sin ancla los 19 hilos de Rz3…; avisa a Mar.
3. En `workbook.html`, sustituir el contenido del apartado 23 (`#s23`) desde `<h3>1. Contexto` hasta el cierre de la sección por el cuerpo de `docs/prd-horma-v1.html`. Cambiar la ficha «Estado» a «v1 · incorpora la revisión del profesor». Sin leyenda azul/naranja (recomendado: sin marcas; confirmar con Mar).
4. El archivo usa CRLF; `comprobar-estructura.js` necesita una copia LF.
5. Regenerar `horma-apuntes.html` con `construir-horma-aparte.py`.
6. Publicar el Cuaderno personal y la página aparte con `capabilities {"comments":{"composer_only":true}}` y `files` `proyectos/horma/*.html`.
7. Commit **local**, sin push, añadiendo archivos por nombre (nunca `git add .`).
8. Borrar el artefacto provisional SC6… **solo con confirmación de Mar**.
9. Ninguna página publicada se ha visto con los ojos: comprobarlo.

## Tarea B: corregir los otros 22 apartados del WB

| Apartado | Qué corregir |
|---|---|
| 1 | Referencias a Jobs |
| 3 | Servicios y CV base |
| 4 | n8n |
| 5 | n8n (×4) y LinkedIn |
| 6, 7, 8, 9 | n8n y Jobs |
| 10 | LinkedIn |
| 12 | LinkedIn e ingesta |
| 14 y 21 | CV base (ya corregidos solo en Rz3…) |
| 15 | LinkedIn y «24 nov» |
| 16 | n8n |
| 17 | Jobs |
| 19 | n8n |
| 20 | Plan por fases / MVP / «24 nov» → estructura del profesor |

Diagramas que nombran n8n y hay que rehacer con `archify`: `arquitectura.architecture.json`, `ingesta.dataflow.json`, `tecnico.architecture.json`.

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
