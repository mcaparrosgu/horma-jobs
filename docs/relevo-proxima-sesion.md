# Relevo para la próxima sesión (escrito el 31-oct-2026; actualizado el 1-nov-2026)

Primero `docs/siguiente-sesion.md` (pendiente de Mar y plan de la siguiente sesión). Léelo entero antes de tocar nada. Después, `docs/tareas-pendientes.md` (sección 0) y `docs/revision_profesor_30oct.md`.

## Estado de la fase 0 (3-nov, noche): versión del profesor, pista A construida y probada en parte

- **Qué se construye:** «Horma: flujo agéntico en Claude Code» del profesor (copia en `docs/flujo-agentico-claude-code.md`). Dos pistas unidas por **ocho** esquemas JSON: A = agentes, skills y comandos en `.claude/` (hecha); B = web FastAPI + PostgreSQL en `web/` (**pendiente**, orden en `web/README.md`). Sus indicaciones para la fase 0: construir, generar perfiles de prueba, probar agentes y skills desde la consola, «probar y probar».
- **Hecho:** 13 agentes, 11 comandos, 8 skills (7 del profesor + `convertir-cv`), 8 esquemas (el 8.º, `clasificacion-respuesta`, lo añadimos), 7 scripts de Python (solo biblioteca estándar) y evals. `python -I evals/correr_evals.py`: **33 de 33** en verde. 3 CV y 2 ofertas inventados en `datos/fixtures/`.
- **Probado con LLM real (un caso cada uno):** 12 de 13 agentes. Sin probar: `auditor-fuentes` (necesita leer webs reales). Detalle, aciertos y fallos: `docs/bitacora.md`, 3-nov noche 2 y 3.
- **No hecho:** pista B; `endpoints.json` vacío a propósito (sin fuentes calificadas); `pypdf` sin instalar (no se leen PDF); especificaciones por flujo (`specs/`); umbral de cobertura ATS (se fija con corridas reales).
- **Pendiente de Mar:** (1) pegar el bloque de `docs/ajustes-pendientes-settings.md` en `.claude/settings.json` (hook de verificación, permisos y bloqueo de lectura de `.env` y `docs/privado/`); el sistema me denegó escribirlo, con razón: es configuración de Claude Code. (2) Decidir si las preferencias deducidas del CV (puesto = último cargo, ciudad = residencia) quedan vacías hasta que la usuaria confirme (recomendado). (3) Si se añade un campo de horario a `preferencias`.
- **Preguntas para el profesor:** tope de 4 CV base frente a «sin topes»; cartas base (no aparecen en su versión); `medir-ats` frente a «subagente ATS».
- **Cambia respecto a lo anterior:** hasta 4 CV base (no 5), la carta sale del CV base (no hay cartas base) y el CV estético lo sube la usuaria.

## Cambios del 3-nov (comentarios a «Horma por fases»)

- **Comentarios del profesor en «Horma por fases»** (9 hilos, aplicados; artefacto en v4): sin RAG; la regla de los huecos avisa dónde se rellenó cada hueco; **Fase 2** = portal de empresas; **Fase 3** = aplicaciones automáticas + privacidad + entrevista + origen visible, diseños y PDF y editor; Fase 4 sin cambios.
- **Consecuencia:** la Fase 1 acaba con CV y carta en pantalla y envío hecho por la usuaria (sin PDF, origen visible ni portal). El juez sigue comprobando el origen de cada frase desde la Fase 1 (línea roja). `medir_ats` cuenta sobre el texto y relee el PDF en la Fase 3.
- **«Aprobar y enviar» resuelto** sin preguntarle, con su propio PRD (US-004 «Fase 2 o 3»): pregunta 27 de `preguntas-profesor.md`. Queda por preguntarle solo qué cubre la Fase 4.
- **Pendiente:** reformular la pregunta 4 (usa «RAG»); buscar «RAG» en PRD, `analisis-tecnico.md` y Cuaderno; pasar el aviso de huecos al PRD (US-002); los 9 hilos siguen abiertos.

## Cambios del 2-nov

- **«Horma por fases»** (sexto artefacto): construcción en las 4 fases del profesor, con comentarios y enlazada desde su página. Fase 4 es propuesta nuestra. Pendiente: compartirlo con él (email en `docs/privado/contactos.md`, ignorado por git).
- **Multiagente:** LangGraph solo dentro de Horma; para construir, subagentes de Claude Code sin framework y piloto con la ingesta. Roles nuevos por definir; nada empieza sin el ok del profesor. Ver la bitácora del 2-nov.
- **Pregunta 14** de `docs/preguntas-profesor.md` ampliada (matiz honesto, prueba comparativa, alternativas sin verificar).
- **Skills apagadas** tras `/doctor`: `paso-11` a `paso-18`, `paso-20`, `auditoria-diseno`, `design-taste-frontend`. Si una skill `paso-NN` no aparece, es por eso.
- Sin commitear: `docs/preguntas-profesor.md`, `docs/bitacora.md`, `docs/tareas-pendientes.md` y este archivo.

## Cambios del 1-nov (tarde)

- **LangGraph** solo en CV y cartas y en envío (Mar), pendiente del profesor. Ver `docs/analisis-tecnico.md` (apartado 9) y la pregunta 14 de `docs/preguntas-profesor.md`.
- **Documento «Horma v3»** en el Cuaderno (Proyectos), con 3 diagramas en `Workbook\web\proyectos\horma-v3\`. Sustituye a `redactora` y `envio`, ahora en `horma\archivo\`.
- **Repositorios:** `mcaparrosgu/horma-jobs` (privado, `main`) y `mcaparrosgu/workbook` (commit `b2097c8`).
- **Rz3… (resuelto el 1-nov):** al publicar la página del profesor se pisó por error la versión 19 de Rz3… (borrador del 29-oct con aviso, marcas del PRD y los 19 hilos). Se restauró el mismo día, idéntica a `docs/archivo/horma-jobs-borrador-29oct.html`. La página del profesor (`horma-apuntes`, con los apartados de «Horma v3») vive ahora en su propio artefacto: https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd (privado: Mar debe compartirlo con él desde *Share*). Los 19 hilos siguen en Rz3… (comprobado tras publicar).
- **Artefactos ordenados (1-nov):** el PRD y la comparativa se borraron como artefactos; sus copias locales son las de la tabla de abajo.

## Qué artefacto es cada cosa

Horma tiene estos seis y ninguno más (el quinto, el índice de construcción, se añadió el 1-nov; el sexto, «Horma por fases», el 2-nov, ambos a petición de Mar):

| Artefacto | Para qué | Quién lo usa | Fuente |
|---|---|---|---|
| Cuaderno personal: https://claude.ai/artifact/4BuaSjpRvJYBtEVvW3RevH | Documentos «Horma jobs» y «Horma v3» | Mar | `Workbook\web\workbook.html` |
| Horma jobs: https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd | Página del profesor, con comentarios | Profesor | `Workbook\web\horma-apuntes.html`, generada por `web\proyectos\construir-horma-aparte.py` |
| Horma por dentro: https://claude.ai/artifact/QBkk83ZVbjHC97kNq1y9xH | Guía privada para estudiar, con chat de dudas (`sample` y `db`: repetirlas si se cambian) | Mar | `docs/horma-por-dentro.html` |
| Construcción de Horma: https://claude.ai/artifact/BiiqfZdu3C3F2M32Myggeb | Pasos ordenados para construir Horma completa (troncos y ramas, sin mover nada de fase) | Mar | `docs/indice-construccion-horma.html` |
| Horma por fases: https://claude.ai/artifact/SSztJsDarsow9YaRju6aAR | Construcción en las 4 fases del profesor, con comentarios; enlazado desde su página (botón bajo el PRD). Privado: compartirlo con él como comentarista | Profesor | `docs/construccion-por-fases-horma.html` |
| Horma jobs · archivo 29-oct: https://claude.ai/artifact/Rz3LtzSVM8yeGkMYks9SQs | Temporal, con los 19 hilos: se borra cuando el profesor haya visto la nueva | Nadie | `docs/archivo/horma-jobs-borrador-29oct.html` |

**Regla:** antes de publicar sobre uno, léelo. Se regenera siempre desde su fuente.

**Índice en el Cuaderno (1-nov):** esta lista también está en Proyectos y al inicio de «Horma jobs» y «Horma v3» (`ARTEFACTOS_HORMA` en `workbook.html`). Si cambia o se borra un artefacto, se actualiza allí y se republica la edición personal.

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

1. CV base por sector: hasta 5 CV base y 2 cartas base; subagente ATS ajusta a la oferta. *(Sustituido el 3-nov por la versión del profesor: hasta 4 CV base, sin cartas base, `medir-ats` en código.)*
2. Regla de los huecos: nunca se tocan fechas, cargos, empresas ni titulaciones; lo poco relevante se condensa; propone Horma, aprueba la usuaria.
3. LinkedIn e Indeed: Horma prepara, envía siempre la persona.
4. Envío automático = tronco.
5. Estructura de construcción: la del profesor (no los 20 pasos).
6. Sin n8n: ingesta con script propio y dashboard.
7. PDF por defecto.
8. Fases: no se unifican por ahora (PRD Fase 1-4 y sección 20 Fases 0-5 conviven).
9. Sin presión de fechas; si hay que recortar, ramas pequeñas, nunca troncos.

## Tareas A y B: hechas (1-nov)

El PRD v1 está en el apartado 23 (comprobado por código, igual que `docs/prd-horma-v1.html`). Los otros 22 apartados y los diagramas ya no llevan n8n, salvo como «sin n8n» o «en clase, con n8n». Los flujos con agentes viven en detalle en «Horma v3», y desde el 1-nov los demás diagramas también usan redactor y juez, relleno, supervisor y ejecutor.

**Falta:** que Mar abra las páginas. El navegador de pruebas se cuelga con el Cuaderno, así que no se ha visto renderizado.

## Preguntas para el profesor

1. ¿Qué cubre la Fase 4?
2. ¿«Aprobar y enviar» entra en la Fase 1 o en la 2 o 3? (el alcance de Fase 1 menciona envío y US-004 dice «Fase 2 o 3»).
3. ¿Ok formal para empezar la construcción?
4. El tope de 5 CV base: ¿por qué? Propuesta: limitar CV generados al mes, no CV base. Choca con «sin topes».
5. **«Subagente ATS» (pendiente de cerrar, Mar, 1-nov):** el PRD v1 lo sigue nombrando así y la arquitectura usa `medir_ats` (código) más el redactor. No se toca el PRD hasta tener su respuesta. Pregunta 14 bis de `preguntas-profesor.md`.

## Avisos a no olvidar

- Exportar y borrar datos (RGPD) tiene que estar antes de usuarias reales, aunque el profesor lo ponga en Fase 3.
- «Que invente un poco» (profesor) **no se aplica**: línea roja. Está resuelto como «propone, marca, aprueba».
- El resumen de Gemini mezcla el proyecto de Alberto con el de Mar.
- Sin actualizar a propósito: `docs/decisiones-pendientes.md` (histórico) y skills `paso-NN` (quedan como consulta). `docs/preguntas-profesor.md` sí está al día (1-nov).
