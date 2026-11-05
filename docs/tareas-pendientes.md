# Estado y tareas pendientes de Horma jobs

Actualizado el 2026-11-05 (pista B en marcha: pasos 1 y 2 hechos). Única fuente de estado y próximos pasos (mapa de documentos: `docs/indice.md`). Orden = prioridad.

## Estado en tres líneas
- **Fase 0, versión del profesor** (`docs/flujo-agentico-claude-code.md`): **pista A hecha** (agentes, skills, comandos, esquemas, scripts y evals en `.claude/` y `evals/`); **pista B** (web **Next.js** + PostgreSQL en `web/`; FastAPI se quitó el 4-nov) **en marcha: pasos 1 a 4 hechos el 5-nov, sigue el paso 5** (ver «Pista B: por dónde seguir»).
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
- **Paso 3:** importador (`web/scripts/importar-datos.ts`, se lanza con `npm run importar`). Lee las ofertas y los perfiles de ejemplo de `datos/fixtures/`, rechaza lo que no cumple los esquemas y guarda el resto en la base de datos sin duplicar si se repite. No pisa un perfil o unas preferencias que ya existan, salvo que se use `--forzar`. Deja un apunte con solo números en la tabla `eventos`. Rosa se salta porque aún no tiene perfil. `npm test` = 17 pruebas en verde. La historia completa, en prosa, está en `docs/bitacora.md`.

- **Paso 4 (5-nov):** web de ingesta en `web/src/app/`: `/ofertas` (filtros y auditoría visible), `/fuentes` (tabla y formulario de alta o edición) y `/corridas` (resumen por corrida). Validación de fuentes en `web/src/lib/fuentes.ts`; consultas en `consultas.ts`. `npm test` = 27 pruebas en verde; `tsc`, `lint` y `build` sin errores; formulario probado a mano en el navegador. Revisado por `revisor-seguridad` y arreglados sus puntos 1-8 (servidor solo en 127.0.0.1; `clave_env` solo `FUENTE_*`; sin claves en cabeceras, parámetros, mapeo ni ruta de la URL; URLs internas y puertos raros rechazados). Las ofertas de prueba tienen la taxonomía vacía: sector y familia no tienen qué filtrar hasta clasificar ofertas. **Sin login: las acciones de `/fuentes` escriben sin autenticación, así que no se expone la web fuera de este ordenador.**

**Siguiente: paso 5 — web de candidatos**, que arranca importando el origen de cada dato (decisión (k), ver abajo). Después: 6 dashboard del flujo agéntico · 7 observabilidad en cada componente y página `/salud` · 8 `revisor-seguridad` y `auditor-lineas-rojas` antes del commit. Cada paso termina con comprobaciones a mano. Fuera de esta entrega: login, cola y worker, puerta al LLM, PWA, tablero.

**Pendiente de seguridad de la pista B** (de las revisiones de `revisor-seguridad` y `auditor-lineas-rojas`). Las letras sirven para encontrar cada punto en la bitácora. Están ordenados por cuándo hay que atenderlos.

*Paso 4 — hechos (a), (d), (h) e (i):* toda escritura de fuentes pasa por `validarFuente`; las claves no caben en cabeceras, parámetros, mapeo ni URL; ningún texto externo se pinta como HTML; los mensajes de error no repiten claves. **Regla que sigue vigente para el paso 5:** nada se guarda sin `validar()` y los apuntes de `eventos` solo con `registrarEvento`.
- **(b) SSRF — queda para cuando exista la descarga.** Hoy se rechazan al guardar `localhost`, IP privadas, puertos distintos de 443 y hosts sin punto. Al descargar hay que repetir la comprobación sobre la IP ya resuelta por DNS (un dominio público puede apuntar a una IP interna), con `redirect: "manual"`, límite de tamaño y de tiempo, y pasar una revisión específica.
- **Antes de abrir la web a otra persona:** login (y comprobar la sesión dentro de cada acción, no solo en un middleware); cabeceras de seguridad (CSP, `frame-ancestors 'none'`); rol `horma_app` (ver abajo). La detección de claves en las fuentes es una ayuda, no una garantía: la defensa real es que la clave solo vive en una variable `FUENTE_*`.
- Quien escriba `corridas_ingesta.errores` debe guardar códigos o frases fijas, no mensajes de red (la página los corta a 200 caracteres).

*En el paso 5 (web de candidatos):*
- **(k) DECIDIDO (5-nov, Mar): sí se importa de dónde sale cada dato.** Cada dato del perfil dice «de aquí lo saqué» (su `origen`), apuntando a un fragmento del `cv.md`. Hoy ese texto y los archivos `traza.json` no se importan; el primer trabajo del paso 5 es ampliar el importador (y, si hace falta, una migración `003`) para guardarlos, y que la web enseñe el origen junto a cada dato. *Por qué:* sin origen visible no hay honestidad comprobable (línea roja del producto).
- **Comprobar que las empresas no ven nada de los candidatos**, como exige la línea roja del AI Act. Hoy es una intención; en el paso 5 habrá rutas reales que comprobar.

*Antes de tener usuarias reales:*
- **(c) Un usuario de base de datos con menos poder.** Ahora la web y los scripts se conectan como `horma`, que puede hacerlo todo, incluido borrar. Hay que crear un rol `horma_app` que solo pueda leer y escribir en las tablas que necesita, y dejar `horma` solo para migrar. Es el «mínimo privilegio»: que un fallo no pueda hacer más daño del imprescindible.
- **(e), (g) y (l) Login e identificadores.** Cuando haya inicio de sesión, el identificador de cada usuaria debería ser un código aleatorio (UUID) y no un nombre, y cada consulta debe filtrarse por la usuaria que ha iniciado sesión. Además se activará la seguridad por filas (RLS): la propia base de datos impide que una usuaria lea las filas de otra. Hoy la consola del importador imprime el nombre de cada carpeta; como son ids inventados no hay problema, y con ids aleatorios dejará de ser un riesgo.
- **Exportar y borrar los datos de cada usuaria**, que es una obligación del RGPD.

*Detalles menores, sin urgencia:*
- **(f)** Fijar la versión exacta de la base (`postgres:16.x`), para que una actualización no cambie el comportamiento sin avisar. Obliga a recrear el contenedor.
- **(j)** `migrar.mjs` todavía imprime el mensaje completo de error de la base. Hoy solo ejecuta nuestras migraciones, sin datos de personas; si alguna migración llega a tocar datos, habrá que usar `errorSeguro`. Además, si la base está apagada, el error sale sin dejar apunte en `eventos`.
- En Docker habrá que montar la carpeta de esquemas o usar la variable `HORMA_ESQUEMAS_DIR`.
- Decidir si se guardan en git los resultados de `evals/resultados/*.json`.

**Mensaje para abrir la sesión de la pista B:** «Lee `docs/tareas-pendientes.md` (sección Pista B) y las dos últimas entradas de `docs/bitacora.md`. Comprueba que `horma-db` está arrancada y empieza por el paso 4. Plan primero, sin tocar nada hasta mi ok».

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
