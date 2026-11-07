# Índice de documentación de Horma jobs

Una sola fuente de verdad para cada cosa. Si algo cambia, se cambia donde dice «fuente».

## Documentos vivos (`docs/`)

| Qué | Fuente |
|---|---|
| Cómo se trabaja aquí, pipeline, cómo correr cada flujo, líneas rojas | `CLAUDE.md` |
| **Estado y próximos pasos** | `docs/tareas-pendientes.md` |
| **Decisiones de producto** y su porqué | `docs/propuesta-horma.md` (apartado 4) |
| **Versión vigente de construcción** (profesor, manda sobre lo demás) | `docs/flujo-agentico-claude-code.md` |
| Arquitectura, seguridad, multiagente | `docs/analisis-tecnico.md` |
| Pruebas (evals, agentes con LLM real, fallos, resumen para el profesor) | `docs/informe-pruebas.md` |
| Preguntas y consultas para el profesor (incluye fuentes de ofertas) | `docs/preguntas-profesor.md` |
| Cuaderno de decisiones y fallos (solo se añade) | `docs/bitacora.md` |
| **Banco de ideas** (fuentes, calidad, producto; nada decidido) | `docs/ideas-banco.md` |
| Términos técnicos | `docs/glosario.md` |
| Ajuste de `settings.json` que pega Mar | `docs/ajustes-pendientes-settings.md` |
| **Construcción autónoma** (prompt de 10 h, bloques, puertas de calidad) | `docs/construccion-autonoma.md` |

## Fuentes de los artefactos (`docs/artefactos/`)

Se regeneran desde aquí. **Antes de publicar sobre uno, se lee** (`Artifact read`). Si cambia o se borra uno, se actualiza `GRUPOS_HORMA` en `Workbook\web\workbook.html` (pestaña Proyectos) y se republica el Cuaderno personal.

| Artefacto | Para qué | Quién | Fuente |
|---|---|---|---|
| [Horma jobs (página del profesor)](https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd) | Documento «Horma jobs» + fases, consulta de fuentes y preguntas; con sus comentarios | Profesor | `Workbook\web\proyectos\construir-horma-aparte.py` |
| [Horma: flujo agéntico en Claude Code](https://claude.ai/artifact/UEWjpE1r4f6L9mZQVpQKvq) | Versión vigente, escrita por el profesor (solo lectura) | Profesor | `docs/flujo-agentico-claude-code.md` |
| [Horma por fases](https://claude.ai/artifact/SSztJsDarsow9YaRju6aAR) | Las 4 fases del profesor, con sus comentarios | Profesor | `docs/artefactos/construccion-por-fases-horma.html` |
| [Horma por dentro](https://claude.ai/artifact/QBkk83ZVbjHC97kNq1y9xH) | Guía privada con chat de dudas (`sample` y `db`: repetirlas si se cambian) | Mar | `docs/artefactos/horma-por-dentro.html` |
| [Construcción de Horma](https://claude.ai/artifact/BiiqfZdu3C3F2M32Myggeb) | Pasos para construir Horma (troncos y ramas) | Mar | `docs/artefactos/indice-construccion-horma.html` |
| [Pruebas de Horma a mano](https://claude.ai/artifact/AeDdEVZyd7y4xi4mHe7nYY) | Lista con casillas, notas e informe de fallos (usa `db`; privada) | Mar | `docs/artefactos/pruebas-horma.html` (contenido: `guia-pruebas-manuales.md`) |
| [Fuentes de empleo de Horma](https://claude.ai/artifact/UZwu3kcqdCWEzxRUNnA79X) | Portales y APIs en tres tramos | Mar | `docs/artefactos/fuentes-de-empleo.html` |

Diagramas: `Workbook\web\proyectos\horma\*.json` (skill `archify`).

## Archivo (`docs/archivo/`) — no vigente, solo consulta

PRD v1 (`prd-horma-v1.html`), investigación de fuentes y costes, ideas de honestidad (`honestidad.md`), consulta y resumen de pruebas ya fusionados, borrador del 29-oct, comentarios del 30-oct y el original del profesor (`original-profesor/`). El artefacto «Archivo 29-oct» sigue publicado, es temporal y no se toca.

## Fuera de `docs/`

- Comparativa con ai-job-search: `docs/comparativa-ai-job-search/` (solo en este PC, ignorada por git).
- Datos de terceros: `docs/privado/` (ignorada por git; los agentes no la leen). Ahí están `investigacion-fuentes-espana-2026-11-06.md`, `medicion-fuentes-espana-2026-11-07.md` y `borradores-fuentes-2026-11-07.md` (correos y solicitudes sin enviar).
- Prompt para otros LLM sobre ofertas de terceros: `docs/prompt-agente-fuentes-terceros.md`.
- Construcción autónoma III (plan y prompt, 4 h): `docs/construccion-autonoma-3.md` (la II, `construccion-autonoma-2.md`, está aplazada); `settings.json` de la noche: `docs/autonomo/settings-autonomo.json`; formatos de los feeds medidos: `docs/fuentes-formatos-2026-11-07.md`.
- Repositorio: https://github.com/mcaparrosgu/horma-jobs (privado, rama `main`).
