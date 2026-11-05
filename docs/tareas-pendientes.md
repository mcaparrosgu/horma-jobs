# Estado y tareas pendientes de Horma jobs

Actualizado el 2026-11-05 (pista B en marcha: pasos 1 y 2 hechos). Única fuente de estado y próximos pasos (mapa de documentos: `docs/indice.md`). Orden = prioridad.

## Estado en tres líneas
- **Fase 0, versión del profesor** (`docs/flujo-agentico-claude-code.md`): **pista A hecha** (agentes, skills, comandos, esquemas, scripts y evals en `.claude/` y `evals/`); **pista B** (web **Next.js** + PostgreSQL en `web/`; FastAPI se quitó el 4-nov) **en marcha: pasos 1 y 2 hechos el 5-nov, sigue el paso 3** (ver «Pista B: por dónde seguir»).
- **Instrucciones nuevas del profesor (4-nov):** (1) **dashboard** para ver el flujo agéntico (pipelines o workflows); (2) **observabilidad** en cada componente; (3) construir **primero** la web de **ingesta de ofertas** y la de **candidatos** (se escribe «candidatos», no «postulantes»); (4) web con **Next.js**, sin FastAPI; (5) probar y pasar los tests **a mano**. Dudas que quedan: preguntas 29 y 30 de `docs/preguntas-profesor.md`.
- **Pruebas:** resultados, fallos y límites en `docs/informe-pruebas.md`.
- **Repositorio:** `mcaparrosgu/horma-jobs`, rama `main`, al día con `git log` (último push: 2026-11-05, pista B pasos 1 y 2). El repo `workbook` (Cuaderno y página del profesor) va aparte.

## Reglas permanentes (Mar)
- En la sección Proyectos del Cuaderno nunca se hacen ejercicios ni examen.
- La Copiloto es la agente predeterminada.
- Cerrar frentes antes de abrir otros.
- Sin presión de fechas: si hay que recortar, ramas pequeñas, nunca troncos.

## 1. Pendiente de Mar (no lo decide la Copiloto)
- **`settings.json`:** pegar el bloque de `docs/ajustes-pendientes-settings.md` (hook del verificador, permisos y bloqueo de lectura de `.env` y `docs/privado/`). Riesgo: el permiso sobre `.claude/skills/*` es amplio, aunque los scripts son del repositorio.
- **Preferencias deducidas del CV** (puesto = último cargo, ciudad = residencia): ¿vacías hasta que la usuaria confirme? Recomendado: sí.
- **Campo de horario** («solo mañanas») en `preferencias`, y si el redactor vuelve a preguntar por el horario híbrido de la oferta. Recomendado: sí.
- **Versionar o no** `evals/resultados/*.json` (hoy sin seguir).
- **`pypdf`:** sin ella `/perfilar` no lee PDF. Librería libre, gratuita, mantenimiento bajo. Recomendado instalar.
- **Calificar fuentes:** ok para que `/calificar-fuentes` lea condiciones de uso y `robots.txt` de EURES, Adzuna, Arbeitnow, The Hub e InfoJobs. Las claves de API van en `.env`, que no se lee.
- **Artefactos:** compartir con el profesor su página y «Horma por fases» desde *Share* (su email, solo en `docs/privado/contactos.md`); abrir el Cuaderno (nunca se ha visto renderizado); decidir si el Cuaderno deja de ser «cualquiera con el enlace»; borrar `Rz3…` cuando el profesor haya visto la página nueva (irreversible; al borrarlo, quitarlo de `ARTEFACTOS_HORMA`); limpiar los artefactos ajenos a Horma (con la lista delante).
- **Entorno:** `/mcp disable` de `n8n-mcp`, `semantic-scholar` y `google-sheets` en este proyecto; reactivar si hacen falta las skills apagadas (`paso-11` a `paso-18`, `paso-20`, `auditoria-diseno`, `design-taste-frontend`).
- **Pista B:** instalado el 5-nov con ok de Mar: PostgreSQL en Docker (`horma-db`), Next.js, `pg` y `ajv`. Lo que falte se pregunta uno a uno (coste y mantenimiento). Decisión tomada con Mar (4-nov): Next.js solo para la web; los scripts, agentes y evals de la pista A se quedan en Python.

## 2. Para el profesor (guion completo: `docs/preguntas-profesor.md`)
1. Tope de 4 CV base frente a «sin topes»: ¿por qué 4? Propuesta: limitar CV generados al mes.
2. Cartas base: en su versión no existen (la carta sale del CV base). ¿Confirmado?
3. «Subagente ATS» del PRD frente a `medir-ats` (código): ¿le vale? (14 bis). El PRD no se cambia hasta su respuesta.
4. Qué cubre la Fase 4; ok de LangGraph (14); reformular la pregunta 4 (usa «RAG» y él dijo «No vamos a hacer RAG»).
5. Enseñarle lo hecho (informe de pruebas y bitácora del 3 y 4-nov).

## Pista B: por dónde seguir (plan de la primera entrega: ingesta y candidatos)
**Hecho (5-nov)** — detalle y aprendizajes en `docs/bitacora.md`:
- Terreno: base de datos propia `horma-db` (PostgreSQL 16, Docker, puerto 5433 solo local; `web/docker-compose.yml`, contraseña en `web/.env`, ignorado por git) y Next.js 16 en `web/`.
- **Paso 1:** 7 tablas en `web/db/migraciones/001_inicial.sql` (+ `002`: URLs solo http/https), aplicadas con `npm run migrar` (desde `web/`; arrancar antes la base con `docker compose up -d`).
- **Paso 2:** validador `web/src/lib/esquemas.ts` (ajv sobre los esquemas de `esquemas-horma`); `npm test` = 9 pruebas en verde.
- **Paso 3:** importador `web/scripts/importar-datos.ts` (`npm run importar`, por defecto lee `datos/fixtures/`; `--dir` para otra carpeta). Valida con `validar()`, carga con `ON CONFLICT` (repetible) y escribe un evento por corrida con `registrarEvento` (`web/src/lib/importar.ts`, lista cerrada de claves numéricas). Rechaza lo que no valida y sale con código 1. Rosa (`rosa-enfermeria`) se omite: aún no tiene `perfil.json`. Tras la revisión de seguridad: perfiles y preferencias existentes no se pisan salvo con `--forzar`; errores sin el valor; rechaza enlaces simbólicos y archivos de más de 1 MB; contraseña mínima de 16 caracteres. `npm test` = 17 en verde.

**Siguiente: paso 4 — web de ingesta de ofertas** (lista con filtros y auditoría visible, tabla de fuentes editable, resumen por corrida). Aviso: las ofertas de prueba tienen la taxonomía vacía, así que sector/familia/stack no tendrán qué filtrar hasta clasificar ofertas.

**Después del 4:** 5 web de candidatos (perfil y preferencias editables; las empresas no ven nada) · 6 dashboard del flujo agéntico · 7 observabilidad en cada componente y página `/salud` · 8 `revisor-seguridad` y `auditor-lineas-rojas` antes del commit. Cada paso termina con comprobaciones a mano. Fuera de esta entrega: login, cola y worker, puerta al LLM, PWA, tablero.

**Pendiente de la pista B (informe de `revisor-seguridad`, 5-nov):** (k) para el paso 5: decidir si se importan las `traza.json` de `cv-base/` y `candidaturas/` y el texto de `cv.md` al que apunta cada `origen` (sin ellos la web no puede mostrar de dónde sale cada dato); comprobar que las empresas no ven nada de los candidatos · (l) la consola imprime el id de usuaria (nombre de carpeta): hoy es ficticio, se resuelve con ids opacos (g) · (j) bajos de la 2.ª revisión: `migrar.mjs` imprime `e.message` (usar `errorSeguro` si una migración toca datos) y `db.connect()` queda fuera del `try` (base apagada = error sin evento) · (g) ids de usuaria opacos (UUID), sin nombres reales en carpetas, al llegar el login · (h) en la web, nunca `dangerouslySetInnerHTML` con texto de ofertas o CVs · (i) al validar `endpoints.json`, revisar que los mensajes de ajv no repitan claves del dato · (a) **hecho en el importador (paso 3)**: escritura con `validar()` y `eventos.detalle` por `registrarEvento`; falta aplicarlo a las escrituras de la web (pasos 4-5) · (b) filtrar IPs internas (SSRF) en el código de ingesta · (c) rol `horma_app` sin superusuario para la web (`horma` solo migra), antes de usuarias reales · (d) validar `fuentes.cabeceras`/`parametros` con `endpoints.json` para que no guarden claves · (e) con el login: `usuarias.id` como uuid, consultas filtradas por la usuaria de la sesión y RLS · (f) fijar la versión menor de `postgres:16`. Además: roles de mínimo privilegio y seguridad por filas (antes de usuarias reales); en Docker, montar los esquemas o usar `HORMA_ESQUEMAS_DIR`; decidir si se versionan `evals/resultados/*.json`.

**Mensaje para abrir la sesión de la pista B:** «Lee `docs/tareas-pendientes.md` (sección Pista B) y las dos últimas entradas de `docs/bitacora.md`. Comprueba que `horma-db` está arrancada y empieza por el paso 3. Plan primero, sin tocar nada hasta mi ok».

## 3. Plan de la Copiloto (sesión de la pista A)
1. Si el profesor responde a 29 y 30, adaptar la pista B al orden: ingesta de ofertas y de candidatos con dashboard y observabilidad, luego el resto de la web. Los artefactos ya reflejan Next.js y este orden (sección 5).
2. Ampliar casos de prueba de los 12 agentes probados: ofertas raras o sin salario, perfiles sin experiencia o con huecos largos, más errores sembrados para el juez.
3. Recortar las preguntas pendientes de `extractor-perfil` (máximo 5, solo las que cambian el resultado).
4. Aplicar las decisiones de Mar de la sección 1 en prompts y esquemas; crear el esquema de la salida de `juez-carta`.
5. Flujo D completo sobre Ana y la oferta 1, con un error sembrado, midiendo las vueltas.
6. Con el ok de Mar, `/calificar-fuentes` y llenar `endpoints.json`.
7. Antes de la pista B y de cada commit: `revisor-seguridad` y `auditor-lineas-rojas` sobre lo nuevo (y sobre `analisis-tecnico.md`, apartado 9).
8. Specs por flujo en `specs/` y umbral de cobertura ATS (con corridas reales).

**Mensaje para abrir sesión:** «Lee `docs/tareas-pendientes.md` y las últimas tres entradas de `docs/bitacora.md`. Empieza por el punto 1 del plan y no toques nada sin avisarme».

## 4. Abiertas, por prioridad
**Media**
- **Comprobar «sin RAG»:** buscar «RAG» en el PRD, `analisis-tecnico.md` y el Cuaderno y decidir caso a caso.
- **Aviso de huecos:** pasar a US-002 del PRD y a `analisis-tecnico.md` lo que el profesor pidió (Horma avisa de dónde rellenó cada hueco).
- **Multiagente para construir Horma:** en pequeño y sin framework; falta definir roles y el ok del profesor. LangGraph solo dentro de Horma; si dice que no, Python plano sin cambiar agentes ni flujos. Cada agente, una función independiente del framework.
- **Por confirmar (Mar):** ingesta como proceso aparte; agente de relleno LLM frente a adaptadores por ATS (lo decide el eval de ablación).
- **Investigaciones:** seguimiento por correo (Gmail frente a reenvío); coste del servidor; condiciones de InfoJobs y EURES, SmartRecruiters, Ashby, Workable y la sentencia C-30/14.
- **Pregunta sobre fuentes al profesor:** ¿Apify para portales que prohíben el scraping o base en APIs y ATS públicos? Datos en `docs/investigacion-fuentes-y-costes.md`. Recomendación: híbrido.
- **Rúbrica y fecha exacta de entrega** (20 o 24 de noviembre) en Neoland; si el repositorio es público en la entrega.
- **Obligación RGPD:** exportar y borrar datos, antes de tener usuarias reales.

**Baja (ramas)**
- Minijuegos (miden una habilidad del puesto, nunca rasgos; el resultado no llega a ninguna empresa); voz del entrenador; tiendas de apps; **servidor MCP «Horma»** (recomendado: solo lectura, 3-4 herramientas, ninguna que envíe).
- **Evidencias del perfil humano:** perfeccionar la función (no reescribir; ocultar; pedir corrección). Mar la considera importante.
- **Ideas de honestidad** (`docs/ideas/honestidad.md`, ideas 11-18; auditadas, ninguna en rojo): por decidir con el profesor cuáles entran; por decidir (Mar) confesionario solo por texto, peso y salud (art. 9) en la idea 13, y si historial y registro de correcciones son un solo sistema; verificar licencia y API de ESCO.
- **Condiciones del auditor (29-oct)** en `propuesta-horma.md`, apartado 4: carta «cómo trabajo», entrenador, asistente de edición, modo autónomo y lema.
- **Topes:** sin tope de ofertas ni candidaturas; los demás se perfilan más adelante. Diseñar el supervisor del modo autónomo; elegir transcripción en la UE.
- **Seguridad previa al código:** los 20 puntos de `analisis-tecnico.md`, apartado 8, pasan a ADR; los de mejor relación coste/beneficio: roles de BD con RLS forzada, máquina de estados del envío y reglas duras del supervisor en código.
- **Diagramas en pantalla completa:** abrir una página del artefacto en pestaña nueva da error (`claude.ai/code/frame/…`). Decidir: quitar el botón u otra forma.
- **PRD:** mantenerlo al día y cerrar los «por fijar» con mediciones.
- **Ideas de Michael Page** (seguimiento hasta la incorporación, proceso visible en pasos, transparencia de datos como mensaje, modo «escucho ofertas»): ideas, no decisiones.
- Pulido final: revisar con Mar cómo queda todo junto.

## 5. Artefactos pendientes de actualizar
Actualizados el 4-nov con Next.js, «candidatos» y el orden de la web (ingesta y candidatos primero): Cuaderno personal, «Horma por fases», «Construcción de Horma», «Horma por dentro» y la página del profesor. Tabla y reglas en `docs/indice.md`.

**Pendiente:** el PRD (`docs/prd-horma-v1.html`, RES-01) aún dice «backend 100 % Python (FastAPI)». No se toca hasta que el profesor responda a las preguntas 29 y 30, porque el PRD es su documento de partida.
