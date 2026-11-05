# Índice de documentación de Horma jobs

Una sola fuente de verdad para cada cosa. Si algo cambia, se cambia donde dice «fuente».

## Dónde está cada cosa

| Qué | Fuente |
|---|---|
| Cómo se trabaja aquí, pipeline, cómo correr cada flujo, líneas rojas | `CLAUDE.md` |
| **Estado y próximos pasos** (pendiente de Mar, plan, abiertas) | `docs/tareas-pendientes.md` |
| **Decisiones de producto** y su porqué | `docs/propuesta-horma.md` (apartado 4) |
| Versión vigente de construcción (profesor, 3-nov) | `docs/flujo-agentico-claude-code.md` |
| Arquitectura prevista, seguridad, multiagente | `docs/analisis-tecnico.md` |
| **Pruebas** (evals, agentes con LLM real, fallos, pendiente) | `docs/informe-pruebas.md` |
| Preguntas para el profesor | `docs/preguntas-profesor.md` |
| Cuaderno de decisiones y fallos (solo se añade) | `docs/bitacora.md` |
| Guía de pruebas a mano (Mar) | `docs/guia-pruebas-manuales.md` |
| Ideas aún sin decidir (candidaturas honestas) | `docs/ideas/honestidad.md` |
| Investigación de fuentes de ofertas, costes y Jobs/n8n/Apify | `docs/investigacion-fuentes-y-costes.md` |
| Términos técnicos | `docs/glosario.md` |
| PRD v1 | Apartado 23 del documento «Horma jobs» del Cuaderno; copia en `docs/prd-horma-v1.html` |
| Ajuste de `settings.json` que pega Mar | `docs/ajustes-pendientes-settings.md` |
| Histórico (borrador del 29-oct y los 19 hilos del profesor) | `docs/archivo/` |
| Comparativa con ai-job-search | `docs/comparativa-ai-job-search/` (solo en este PC, ignorada por git) |
| Datos de terceros (contactos) | `docs/privado/` (ignorada por git; los agentes no la leen) |
| Repositorio | https://github.com/mcaparrosgu/horma-jobs (privado, rama `main`) |

## Artefactos de Horma

Son siete y ninguno más. **Antes de publicar sobre uno, se lee** (`Artifact read`); se regenera siempre desde su fuente. Si cambia o se borra uno, se actualiza `ARTEFACTOS_HORMA` en `workbook.html` y se republica el Cuaderno personal.

| Artefacto | Para qué | Quién | Fuente |
|---|---|---|---|
| [Cuaderno personal](https://claude.ai/artifact/4BuaSjpRvJYBtEVvW3RevH) | Documentos «Horma jobs» y «Horma v3» | Mar | `Workbook\web\workbook.html` |
| [Horma jobs (página del profesor)](https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd) | Con sus comentarios; privada: Mar la comparte desde *Share* | Profesor | `Workbook\web\horma-apuntes.html`, generada por `web\proyectos\construir-horma-aparte.py` |
| [Horma por dentro](https://claude.ai/artifact/QBkk83ZVbjHC97kNq1y9xH) | Guía privada con chat de dudas (`sample` y `db`: repetirlas si se cambian) | Mar | `docs/horma-por-dentro.html` |
| [Construcción de Horma](https://claude.ai/artifact/BiiqfZdu3C3F2M32Myggeb) | Pasos para construir Horma completa (troncos y ramas) | Mar | `docs/indice-construccion-horma.html` |
| [Horma por fases](https://claude.ai/artifact/SSztJsDarsow9YaRju6aAR) | Las 4 fases del profesor, con sus comentarios | Profesor | `docs/construccion-por-fases-horma.html` |
| [Pruebas de Horma a mano](https://claude.ai/artifact/AeDdEVZyd7y4xi4mHe7nYY) | Lista paso a paso con casillas, notas e informe de fallos (usa `db`; privada) | Mar | `docs/pruebas-horma.html` (contenido: `docs/guia-pruebas-manuales.md`) |
| [Archivo 29-oct](https://claude.ai/artifact/Rz3LtzSVM8yeGkMYks9SQs) | Temporal, con los 19 hilos; no se toca | Nadie | `docs/archivo/horma-jobs-borrador-29oct.html` |

Diagramas: `Workbook\web\proyectos\horma\*.json` y `horma-v3\` (skill `archify`).
