# Estado y tareas pendientes de Horma jobs

Actualizado el 2026-11-06 (bloques 1 a 8 de la pista B hechos; ver «Retomar: empieza aquí»). Única fuente de estado y próximos pasos (mapa de documentos: `docs/indice.md`). Orden = prioridad.

## Estado en tres líneas
- **Fase 0, versión del profesor** (`docs/flujo-agentico-claude-code.md`): **pista A hecha** (agentes, skills, comandos, esquemas, scripts y evals en `.claude/` y `evals/`); **pista B** (web **Next.js** + PostgreSQL en `web/`; FastAPI se quitó el 4-nov) **en marcha: pasos 1 a 5 hechos el 5-nov, sigue el paso 6** (ver «Pista B: por dónde seguir»).
- **Instrucciones nuevas del profesor (4-nov):** (1) **dashboard** para ver el flujo agéntico (pipelines o workflows); (2) **observabilidad** en cada componente; (3) construir **primero** la web de **ingesta de ofertas** y la de **candidatos** (se escribe «candidatos», no «postulantes»); (4) web con **Next.js**, sin FastAPI; (5) probar y pasar los tests **a mano**. **Nuevas (5-nov):** (6) el **pipeline de ingesta toma las ofertas de las APIs**, como hacía antes (en Jobs con n8n; en Horma, script propio); (7) seguir construyendo la web **como un dashboard**; (8) **validar que los datos se guardan en la base de datos**. Dudas que quedan: preguntas 29, 30 y 31 de `docs/preguntas-profesor.md`.
- **Pruebas:** resultados, fallos y límites en `docs/informe-pruebas.md`.
- **Repositorio:** `mcaparrosgu/horma-jobs`, rama `main`, al día con `git log` (último push: 2026-11-06, pista B bloque 1: seguridad de la descarga). El repo `workbook` (Cuaderno y página del profesor) va aparte.

## Retomar: empieza aquí (estado al cierre del 6-nov)

**Decisión de Mar (6-nov): primero se termina la pista B del profesor al completo; después, la construcción optimizada** (el prompt está al final de este documento). Modo de trabajo acordado: la Copiloto trabaja **sola dentro de cada bloque y se para al acabarlo** para recibir el ok de Mar; Mar pasa las pruebas a mano **al final**, con `docs/artefactos/guia-pruebas-manuales.md` (la Copiloto la deja al día con lo nuevo). **Commits por archivo y, con orden de Mar, push; la bitácora se actualiza a cada bloque.**

**La pista B tiene 8 bloques (≈ 9 a 13 h de trabajo efectivo restantes):**

| # | Bloque | Estado |
|---|---|---|
| 1 | Seguridad de la descarga (M1, M2, B1, B2 a B5) | **Hecho** (6-nov; 36 tests nuevos, 36 evals en verde, `revisor-seguridad` aplicado) |
| 2 | Activar JobTech, primera ingesta real de ~20 anuncios, `/ingestar-ofertas` con los tres agentes e importador a la base | **Hecho** (6-nov; 20 ofertas reales en `horma-db`, 40 tests de ingesta, `auditor-lineas-rojas` aplicado) |
| 3 | `npm run verificar` (lo descargado = lo guardado) e ingesta repetible sin duplicar | **Hecho** (6-nov; 8 tests web y 3 de ingesta nuevos, 46 y 48; 36 evals en verde) |
| 4 | Campo «licencia de origen» con su migración y enlace visible a la original | **Hecho** (6-nov; esquema 0.4, migración `007`, 4 tests de ingesta y 4 de la web nuevos, `auditor-lineas-rojas` aplicado) |
| 5 | Adaptador del BOE (solo sección `2B`, sin listas de aprobados, con atribución) | **Hecho** (6-nov; 69 tests de ingesta, 3 convocatorias reales procesadas; revisores aplicados) |
| 6 | Dashboard (portada con pipelines, ingesta y datos guardados; muestra y pide, no ejecuta) | **Hecho** (6-nov; migración `008`, importador que registra cada ejecución, 60 tests web, 36 evals en verde, ambos revisores aplicados) |
| 7 | Observabilidad en cada pieza y página `/salud` (más pendientes (a), (c), (d) y (e) del bloque 6) | **Hecho** (6-nov; 73 tests web, 36 evals en verde, ambos revisores aplicados) |
| 8 | `revisor-seguridad` y `auditor-lineas-rojas` sobre toda la pista B, arreglos, guía de pruebas e informe | **Hecho** (6-nov; 77 tests web, 36 evals, `build` arreglado; **push pendiente de orden de Mar**) |

**Construcción optimizada (empezó el 6-nov, orden de Mar).** Plan en 5 bloques; cada uno se para al acabar. **Bloque 1, perfil real: HECHO** (CV real de Mar en `datos/usuarias/mar/`, ignorada por git; perfil, preferencias, CV maestro y 2 CV base verificados; importador lee `usuarias/`; conversor lee HTML; verificador acepta rango en formación; 38 evals, 85 tests web). Detalle y pendientes en la bitácora. **Siguiente:** (2) `/recomendar` sobre las ofertas reales y página `/recomendaciones`; (3) candidatura (D) y aprobar/enviar (E); (4) login e ids opacos; (5) portal de empresas y seguimiento. **Nivel por área: HECHO** (esquema 0.6, ver bitácora y sus pendientes (a) a (d)). **Bloque 2, recomendaciones: HECHO** (23 ofertas puntuadas, tabla `matches`, página `/recomendaciones/[id]`; «sin nota» y esquema 0.7 hechos; **fuentes solo de España** por ahora (Suecia apagada, no borrada); pendiente: login en el bloque 4). **Bloque 3, candidatura: HECHO (6-nov)**: `/candidatura` con la oferta de nota 72 (CV y carta verificados, juez de la carta corrigió una atribución en la vuelta 1; estado `borrador`), migración `013`, importador (rechaza `aprobada` sin firma de la usuaria; no degrada candidaturas aprobadas), exportación RGPD y página de solo lectura `/candidaturas/[id]`; 102 tests web, 41 evals, `build` bien, ambos revisores aplicados. **Pendiente de Mar:** (a) probar `/aprobar` con su respuesta (no se ha ejecutado: nada aprobado); (b) responder las `preguntas_pendientes` de la carta (motivación, ¿sueco?, ¿Cursor/Codex?, ¿APIs abiertas?, ¿skills, React?, años programando) y decidir el **idioma** (la oferta es sueca y pide sueco e inglés; la carta va en castellano); (c) `/aprobar` y `/marcar-enviada` no tienen versión web hasta el login (bloque 4). **Defensa de «ningún agente aprueba»: de proceso, no criptográfica** (el importador solo mira `por: usuaria`; los subagentes solo tienen `Read`); la definitiva es aprobar en la web con sesión. **Siguiente: bloque 4 (login e ids opacos), cuando Mar dé el ok.**

**Resultado del bloque 8 (6-nov).** Hecho: rol `horma_web` (migración `009`, contraseña `HORMA_WEB_PASSWORD` en `web/.env`), `proxy.ts` anti DNS-rebinding, cabeceras anti-marco, licencia comprobada al importar, LinkedIn/Indeed rechazados en `/fuentes`, topes en `ingestar.py`, avisos fuera del matcher, reglas de `pais`/`nivel`, `raw/` borrada (verificada), `build` arreglado. **Abiertos, por prioridad:** (1) ~~exportar y borrar datos~~ **HECHO** (revisado; `CHECK (id = lower(id))` hecho en la migración `010`; patrón de `perfil.json`, `match.json` y comandos endurecido en el esquema 0.5) (`npm run exportar` / `borrar`; botones web con el login; incoherencia de rutas: los comandos usan `datos/usuarias/<id>` y el importador lee `perfiles/<id>`); (2) **login**, ids opacos y `/candidatos` solo administración; (3) B6: nota sobre categorías especiales en preferencias; (4) `maxLength` en `oferta.json`, 6to4/Teredo en `RECHAZADAS`, aviso sobre «parece credencial»; (5) tras cada tanda verificada, borrar su `raw/` (los nombres de reclutadores no se filtran); (6) `pruebas-horma.html` sin bloques 6 a 8; (7) 12 convocatorias del BOE por decidir; (8) **push** a `main` con orden de Mar; (9) **siguiente fase: la construcción optimizada** (prompt al final de este documento) cuando Mar dé el ok. Nueva regla: `npm run build` forma parte del cierre de cada bloque web.

**Resultado de los bloques 4 y 5 (6-nov).** (4) `oferta.origen {licencia, atribucion}` (esquema 0.4) lo fija el script según la fuente (`endpoints.json`: `licencia` y `atribucion`); `ingestar.py` no ingesta sin licencia; el extractor la copia; `npm run verificar` falla si la procesada no coincide con la cabecera de su raw; migración `007`; `/ofertas` enseña origen, licencia, atribución y enlace. (5) Adaptador `boe-sumario` dentro de `ingestar.py` (`python -I` no importa archivos vecinos): `url` con `{fecha}`, `--fecha`, domingo sin fecha = sábado, solo sección `2B`, solo resoluciones que convocan (`es_convocatoria`: descarta listas, correcciones, modificaciones, desiertas y ofertas globales; ante la duda descarta), nada del texto completo (robots.txt), `NO_ENCONTRADO` para 404. Primera descarga real: 21 elementos en la `2B` de 6-nov → **15 convocatorias, 6 descartadas**; solo **3 procesadas con agentes** (ministerio, ayuntamiento, universidad) para no gastar ~45 llamadas sin orden de Mar; el resto se obtiene con `/ingestar-ofertas "BOE Empleo público (sección II.B)" --fecha 2026-11-06` (la API del BOE: una consulta al día por cortesía; hoy se hicieron dos: una de inspección y una real; el segundo volcado de archivos se regeneró desde la respuesta guardada, sin red). **Pendiente / decisiones para Mar:** (a) ¿procesar las 12 restantes y las de otros días?; (b) la taxonomía no tiene «administración pública»: dos de las tres quedan sin sector (se amplía a mano, como dice la skill); (c) `pais: ES` y `sector: educacion` de las 3 los puse yo a partir de la fuente y del título («cuerpos docentes universitarios»); (d) la tabla `fuentes` de la web no tiene `licencia`, `atribucion` ni `adaptador` (decidir en el bloque 6).

**Resultado del bloque 7 (6-nov).** `/salud` (solo lectura, sin librerías): semáforo por pieza con su palabra (bien, atención, falla, sin datos): base de datos y migraciones, componentes (tabla `eventos`, 7 días), ingesta por fuente, calidad de ofertas (sin sector, familia o licencia; las `of-prueba-*` no cuentan), última verificación y último eval de `evals/resultados`. Cada consulta falla por separado. `npm run verificar` anota un evento `verificador` (solo números; no si se usa `--dir`). Ejecución sin cierre de más de 6 h = «abandonada». El importador oculta el id de la usuaria en consola. Decidido: `endpoints.json` manda sobre `activa` (lo lee `ingestar.py`; la tabla es reflejo). **Abiertos:** (i) `/salud` y el resto de rutas sin login: imprescindible antes de salir de localhost; (ii) `verificar.ts` imprime ids de oferta (si algún día llevan nombres, enmascararlos); (iii) sin coste ni tokens por agente (corren en Claude Code; pregunta 18 del profesor); (iv) `"type": "module"` en `package.json` sigue sin hacerse (avisa de «Module type» al correr tests; cambio con efectos); (v) `SQL_PANEL_TOTALES` cuenta usuarias (agregado, permitido; quitarlo si Mar prefiere cero cuentas de personas).

**Pendientes que deja el bloque 6 (6-nov).** (a), (c), (d) y (e) resueltos en el bloque 7; quedan (b), (f) y (g). (a) El importador imprime en consola `perfiles/<id de usuaria>` y rutas con ese id: con usuarias reales hay que sustituirlo por un contador (hacerlo antes de tener usuarias reales). (b) `ejecuciones_ingesta.errores` guarda el nombre del archivo (hoy un id de oferta); si algún día lleva datos personales, guardar un número de orden. (c) Comprobar que Ajv no vuelca valores en `r.errores` (`esquemas.ts`) o añadir un test. (d) `endpoints.json` manda sobre la web: `npm run importar` vuelve a poner `activa`, `url`, etc. de las fuentes registradas; documentarlo o quitar `activa` del `DO UPDATE` si debe mandar la web. (e) Una ejecución cuyo proceso muere de golpe queda «sin terminar» (honesto, pero no se limpia sola). (f) El panel no enseña la `atribucion` de cada fuente (opcional). (g) La web sigue sin inicio de sesión: imprescindible antes de salir de localhost.

**Bloque 3, hecho el 6-nov (plan original y lo que se decidió):**
1. **`npm run verificar`** (`web/scripts/verificar.ts`, solo lectura): para cada `datos/ofertas/procesadas/*.json`, comprobar que existe su fila en `horma-db` y que coinciden `titulo`, `empresa`, `url`, `fecha`, `taxonomia`, `requisitos` y `avisos`; comprobar que cada `raw/*.md` tiene su procesada; avisar de filas en la base sin archivo (las 2 de prueba `of-prueba-*` son esperadas). Resumen por pantalla y código de salida 1 si algo no cuadra. Sin datos personales en la salida.
2. **Ingesta repetible sin duplicar**: el importador ya lo es (dos pasadas = 22 filas) y `ingestar.py` reescribe los mismos nombres de archivo (llevan hash). Falta evitar **gastar agentes dos veces**: en `/ingestar-ofertas` saltar los `raw/` cuyo id ya está en `procesadas/`. Ojo: `corridas_ingesta` (tabla ya creada) y `ofertas.corrida_id` hoy no se rellenan; decidir si el bloque 3 registra cada corrida (útil para el dashboard del bloque 6).
3. **Tests**: fixtures inventadas (no la base real) para `verificar`; reutilizar `web/src/lib/` para la parte pura.
4. Al cerrar: bitácora, `auditor-lineas-rojas` si se toca algo de ofertas visibles, commit por archivo y push solo con orden de Mar.

**Resultado del bloque 3.** (1) `npm run verificar` (`web/scripts/verificar.ts` + `web/src/lib/verificar.ts`): solo lectura; cruza `raw/` → `procesadas/` → tabla `ofertas`; FALLO (sale con 1) si hay procesadas inválidas, base distinta del archivo, procesada sin fila o raw sin procesar; AVISO si hay filas sin archivo (las `of-prueba-*` se cuentan aparte); la salida lleva ids y nombres de campo, nunca valores. Con los datos reales: 20 coinciden. (2) `ingestar.py` imprime ahora `pendientes` (raw sin procesada) y `/ingestar-ofertas` solo gasta agentes en esas. (3) **Decidido: NO registrar aún cada ejecución en `ejecuciones_ingesta`/`ofertas.ejecucion_id`.** Esa tabla exige una fila en `fuentes` (hoy vacía) y nadie la lee hasta el dashboard; se hace en el bloque 6, donde se ve qué muestra. Hasta entonces el resumen vive en `datos/ofertas/ejecuciones/<fecha>.json`. Pendiente menor: `node` avisa de «Module type» al correr los scripts (inocuo; añadir `"type": "module"` a `web/package.json` es un cambio con efectos, lo valoramos en el bloque 7).

**Cómo ingestar (receta que funcionó el 6-nov):** `python -I .claude/skills/fuentes-ofertas/scripts/ingestar.py "JobTech Suecia (Platsbanken)" --limite 20` → por cada `raw/`: `extractor-oferta` (se le pasa la ruta; los subagentes solo leen), `auditor-oferta`, `clasificador-oferta` → escribir `procesadas/<id>.json` y validar con `python -I .claude/skills/esquemas-horma/scripts/validar.py oferta <archivo>` → `cd web && npm run importar -- --ofertas ../datos/ofertas/procesadas`. Los agentes se equivocan a veces (deducen país o modalidad, pierden campos): **hay que revisar cada resultado contra el texto original antes de guardar**. JobTech tarda ~2 s en 20 anuncios; sin problema de lectura lenta.

**Decisiones de Mar del 6-nov (resueltas en el bloque 2 bis):**
1. **Campo aparte `avisos`** en el esquema `oferta` (opcional; `ciudadania`, `habilitacion_seguridad`, `residencia_o_permiso`, `otro`). Hecho: esquema 0.3, migración `006`, importador, `extractor-oferta` y `matcher` (lo ignora), regla en `lineas-rojas` y 3 tests. Las 4 ofertas afectadas (Saab ×2, Ida Infront, Epical) ya los llevan. **Pendiente para el dashboard/web:** mostrarlos a la usuaria como aviso informativo; nunca en la nota ni hacia empresas.
2. **Clave atada a su fuente**: cada clave `FUENTE_*` solo viaja al servidor que tiene asignado en la tabla `HOST_DE_CLAVE` de `ingestar.py` (en el código, no en `endpoints.json`). Hecho, con 5 tests; la tabla está vacía porque JobTech no usa clave: **al activar una fuente con clave, hay que añadir su fila**. Primera versión (atada solo al nombre) descartada por `revisor-seguridad`: cambiar la `url` la esquivaba.

**Otras notas del bloque 2:** (i) 4 de 20 ofertas sin `familia` (la taxonomía no tiene robótica ni sistemas embebidos): ampliar la lista a mano cuando haya más ofertas; (ii) ninguna empresa se pudo validar (las ofertas no traen dominio propio); (iii) 2 ofertas de Knightec de junio quedan como posible fantasma por antigüedad (hipótesis, mostrarla como aviso, no esconder la oferta); (iv) la oferta de HCL trae notas internas de un reclutador pegadas por error, guardadas en `instrucciones_embebidas` y no seguidas; (v) los nombres de las personas de contacto siguen en `datos/ofertas/raw/` (git la ignora): **tarea: borrar `raw/` cuando cada tanda esté verificada**; el filtro automático no puede quitar nombres; (vi) un eval que vigile las deducciones de `pais`/`remoto`/`nivel` de los extractores es buen candidato.

**Mensaje para abrir la sesión:** «Lee `docs/tareas-pendientes.md` (sección “Retomar: empieza aquí”) y la última entrada de `docs/bitacora.md`. Comprueba que `horma-db` está arrancada y que `python -I evals/correr_evals.py` y `npm test` en `web/` pasan. Plan breve del siguiente paso (construcción optimizada, tras el ok de Mar) y adelante».

**Estado anterior (5-nov).** El día 1 del plan está hecho: `pypdf` instalado, campo `horario` en esquema, base de datos, web y agentes (migración `005`; 35 tests de la web y 35 evals en verde), preferencias deducidas vacías, y 12 fuentes calificadas con `/calificar-fuentes` (registro en `datos/fuentes/calificacion.json`, ignorado por git; resumen en `docs/bitacora.md`). Dos son **aptas con condiciones**: **BOE** (empleo público, España) y **JobTech** (Suecia, CC0). Las otras diez salieron no aptas (Arbeitnow, EURES, Adzuna, The Hub, InfoJobs, Personio, Careerjet, Jooble, Greenhouse, Lever). `endpoints.json` tiene JobTech con `activa: false`; el BOE necesita un adaptador porque su respuesta va anidada. Último push: `0675eb5`; los cambios de este cierre (documentación) pueden estar sin subir: mira `git status`.

**Decisión de Mar (5-nov, noche): demostración con pocas fuentes, pero limpias; después se amplía.** Mañana se **construye** con las fuentes aptas (JobTech y BOE) y las ofertas que publiquen empresas, y la búsqueda de más fuentes corre en paralelo, sin bloquear la construcción. Mar no está satisfecha con el volumen todavía: la ampliación es el segundo paso, no se descarta. Todo lo que ya sabemos y las ideas están en `docs/preguntas-profesor.md (apartado «Consulta sobre fuentes de ofertas»)` y `docs/artefactos/fuentes-de-empleo.html`. Para la ampliación (después de la demostración), lo que **no** se ha probado, de más rápido a más lento:
1. **Careerjet:** crear la cuenta de publicador (Mar, con sus datos) y leer dentro los términos de caché, atribución y enlace. Es el programa pensado para mostrar sus ofertas.
2. **Leer a mano** el aviso legal del BOE (una página) para dar la fuente por verificada.
3. **Más datos abiertos del sector público:** datos abiertos del SEPE y de las comunidades autónomas (Aragón publica un CSV de empleo público), Työmarkkinatori de Finlandia (su documentación oficial no se pudo leer), Jobnet de Dinamarca, France Travail, Bundesagentur. Habría que calificar cada uno.
4. **Empresas con ATS, empresa por empresa:** el agente descubridor de empresas con Greenhouse, Lever, Personio, Workable, Ashby o Recruitee (sin API para quien las lea de forma masiva, pero las páginas de empleo de cada empresa son suyas). Personio: releer su ayuda cuando se libere el límite.
5. **Empresas que publican en Horma** (`/publicar-oferta`), **ofertas que trae la usuaria** (enlace o alertas reenviadas) y **datos estructurados `JobPosting`** (hay conjuntos abiertos, Web Data Commons; falta ver su licencia y la de Common Crawl).
6. **Acuerdos:** formularios o correos a Adzuna, Arbeitnow, EURES (helpdesk), InfoJobs y a `opendata@arbetsformedlingen.se` (límites de JobTech). Mar prefiere no depender de correos por el tiempo.
7. **Países sin investigar:** Italia, Polonia, Portugal, Países Bajos (solo datos agregados).
8. **Profesor:** pregunta 32 en `docs/preguntas-profesor.md` con el detalle y seis preguntas; sirve para decidir si basta una demostración con las fuentes aptas más las publicadas por empresas.

**Seguridad: arreglos antes de activar ninguna fuente** (revisión del día 1; ninguna alta). **M1, M2, B1 y B2 a B5 ya están hechos (6-nov);** quedan M3 y B6. Lista original, para consulta:
- **M1:** `ingestar.py` no comprueba a qué IP se conecta (SSRF): resolver el nombre y rechazar IP no públicas, puertos distintos de 443, usuario en la URL y nombres sin punto (≈25 líneas, 1 test).
- **M2:** limitar `clave_env` a `FUENTE_[A-Z0-9_]+` y exigir `clave_nombre` si la clave va por parámetro (3 líneas).
- **B1:** quitar de `sys.path` la carpeta de usuario tras importar `pypdf` y no añadirla si no existe (2 líneas; corregir el comentario).
- **B2 a B5:** comparar el puerto en las redirecciones, reloj total de lectura, hash corto en el nombre de archivo y captura de errores de red, y limitar `--salida`.
- **M3:** las preferencias se editan sin login: mantener la web solo en local hasta construir el login.
- **B6:** nota bajo el formulario («no escribas salud, religión, afiliación…»); listas cerradas más adelante.

**Mañana: tareas de construir (en este orden; Mar da la orden al empezar):**
1. ~~**Seguridad de la descarga:** M1, M2, B1, B2 a B5~~ **HECHO (6-nov)**: 36 tests nuevos sin red, 36 evals en verde y revisada por `revisor-seguridad` (detalle en la bitácora). **Abierto, decide Mar:** atar cada clave `FUENTE_*` a su fuente (hoy cualquier variable `FUENTE_*` sirve para cualquier fuente).
2. **Activar JobTech** y primera ingesta real de unos 20 anuncios (`ingestar.py`), sin guardar campos de contacto.
3. **`/ingestar-ofertas`** con los agentes (`extractor-oferta`, `auditor-oferta`, `clasificador-oferta`) y el **importador** a la base de datos.
4. **`npm run verificar`:** que lo descargado coincide con lo guardado; ingesta repetible sin duplicar.
5. **Campo «licencia de origen»** en cada oferta (empresa, socio, abierto, usuaria), con su migración y la web enseñando siempre el enlace a la original.
6. **BOE:** adaptador para su respuesta anidada; solo convocatorias de la sección `2B`, descartando listas de aprobados (nombres de personas); atribución «Fuente de los datos: Agencia Estatal Boletín Oficial del Estado» con enlace y fecha.
7. **Después:** dashboard y observabilidad (días 4 y 5 del plan), y la ampliación de fuentes (lista de arriba).
Mar pasa las pruebas a mano con `docs/artefactos/guia-pruebas-manuales.md` **al final de la pista B** (decisión del 6-nov; antes se probaba tras cada bloque).

**Ya no hace falta:** que Mar cree claves de Adzuna e InfoJobs (ninguna salió apta).

## Reglas permanentes (Mar)
- En la sección Proyectos del Cuaderno nunca se hacen ejercicios ni examen.
- La Copiloto es la agente predeterminada.
- Cerrar frentes antes de abrir otros.
- **La bitácora (`docs/bitacora.md`) se actualiza a cada paso**, en prosa y con párrafo «En llano»; va en el mismo commit que el trabajo, con este documento al día.
- Sin presión de fechas: si hay que recortar, ramas pequeñas, nunca troncos.

## 0. Plan de 6 días (Mar, 5-nov; reordenado con las instrucciones nuevas del profesor)
**Meta:** el flujo agéntico funcionando de punta a punta en 6 días como máximo, y probado a mano con `docs/artefactos/guia-pruebas-manuales.md`. Si algo no cabe, se recorta por ramas (casos de prueba extra), nunca por troncos.

**Cómo encajan las tres instrucciones nuevas (decisiones técnicas de la Copiloto):**
- **Pipeline de ingesta desde APIs.** La primera mitad ya existe (`fuentes-ofertas/scripts/ingestar.py` descarga, los agentes procesan, el importador guarda), pero `endpoints.json` está vacío: faltan fuentes calificadas. Es el **primer trabajo**. Sigue sin n8n (decisión del profesor del 30-oct); se pregunta si «como antes» cambia eso (pregunta 31). Cadena: **descargar (script) → procesar (agentes, en Claude Code) → validar (esquemas) → guardar (importador) → registrar la ejecución**.
- **Web como dashboard.** La portada pasa a ser un dashboard: estado de cada pipeline (A a E), ingesta (ejecuciones, ofertas por fuente, errores) y datos guardados. El dashboard **muestra y pide; no ejecuta**: «Lanzar ingesta» deja una petición y un proceso aparte la recoge (así la web, sin login, no lanza programas). Esa tabla de peticiones es un cambio de base de datos: se avisa antes de crearla.
- **Validar que los datos se guardan.** Un comando `npm run verificar` compara lo que hay en `datos/` con lo que hay en las tablas (conteos, ofertas sin validar, huérfanos) y la misma comprobación aparece en el dashboard. Se pasa tras cada ingesta.

| Día | Qué | Hecho cuando |
|---|---|---|
| 1 | Decisiones aplicadas (`pypdf`, campo `horario`, preferencias vacías, evals en git) y **`/calificar-fuentes` de las 5 fuentes**; `endpoints.json` con las aptas | Evals y tests en verde; al menos 2 fuentes aptas |
| 2 | **Ingesta real:** `ingestar.py` con una fuente apta → `/ingestar-ofertas` → importador → base de datos | Ofertas reales (públicas) procesadas y guardadas |
| 3 | `npm run verificar`; ingesta repetible sin duplicar; errores de red con códigos fijos en la ejecución; **revisión de seguridad específica de la descarga** (el punto SSRF (b) pasa a ser obligatorio) | `verificar` sin discrepancias tras dos ejecuciones |
| 4 | **Paso 6: dashboard** (portada con pipelines, ingesta y datos guardados) | Se ve cada pipeline con su último estado y las cifras cuadran con la base |
| 5 | **Paso 7:** observabilidad en cada pieza y `/salud`; flujos C, D y E de la pista A sobre Ana (con error sembrado) | Un fallo provocado deja su apunte; candidatura en 2 vueltas como máximo |
| 6 | **Paso 8:** los dos revisores; Mar pasa la guía a mano; informe de pruebas y documentación | Sin fallos graves; commit y push |

**Riesgos:** (1) sin colchón, y las instrucciones nuevas añaden trabajo real (descarga, calificación de fuentes, `verificar`); si falta tiempo, los flujos C-E de la pista A pasan a casos mínimos, no el dashboard ni la ingesta; (2) `auditor-fuentes` nunca se ha probado con webs reales y puede ocupar el día 1 entero; (3) algunas APIs exigen clave (Adzuna, InfoJobs): sin clave en `.env` esa fuente no corre, y yo no leo `.env`; (4) la descarga abre la puerta a direcciones internas: sin revisión específica no se da por buena.

**Plan detallado del día 1** (lista de fuentes: `docs/artefactos/fuentes-de-empleo.html`; espera la orden de Mar):
1. **Preparar (1 h):** `pypdf`; campo `horario` en el esquema compartido de `preferencias` (se avisa antes: toca pista A, web, migración y tests); preferencias deducidas vacías; `evals/resultados/*.json` a git. Tests y evals en verde.
2. **Mar crea las claves** de Adzuna e InfoJobs (y, si quiere ampliar, Jooble y Careerjet) y las pone en `.env`. La Copiloto no lo lee.
3. **`/calificar-fuentes` (2 a 3 h):** Arbeitnow, EURES, Adzuna, The Hub e InfoJobs (autorizadas) y, si Mar lo aprueba, un ATS abierto (Personio o Greenhouse) con 3 a 5 empresas europeas como prueba. Cada una: condiciones de uso, robots.txt, qué permiten y si sirven a un metabuscador.
4. **`endpoints.json`:** solo las aptas, con su clave leída de `.env` por nombre. Las demás quedan anotadas con el motivo.
5. **Cierre:** tests, evals, `revisor-seguridad` sobre los cambios, bitácora, commit por archivo. Criterio: al menos 2 fuentes aptas.
**No entra el día 1:** descargar ofertas (día 2), scraping y Apify (aparcados).

**Resultado del día 1 (5-nov):** pasos 1, 3 y 4 hechos. Primera ronda: seis fuentes no aptas. Segunda ronda: Careerjet, Jooble, Greenhouse y Lever no aptas; **BOE y JobTech aptas con condiciones** (criterio de «2 aptas» cumplido). `endpoints.json` tiene JobTech con `activa: false`; BOE necesita adaptador. Pendiente tras el profesor (6-nov): ingesta real con las aptas y el campo «licencia de origen»; «añadir oferta por enlace»; agente descubridor de empresas con ATS. Detalle y preguntas: `docs/preguntas-profesor.md (apartado «Consulta sobre fuentes de ofertas»)` (pregunta 32 de `preguntas-profesor.md`).

**Decisiones de Mar (5-nov):** preferencias deducidas vacías hasta confirmar; sí al campo de horario; sí a instalar `pypdf`; sí a versionar `evals/resultados/*.json` (datos inventados); sí a calificar EURES, Adzuna, Arbeitnow, The Hub e InfoJobs; compartir la página del profesor con él desde *Share*; **`settings.json` «más adelante»** (hook y bloqueo de `.env` siguen sin activar durante las pruebas).

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

- **Paso 4 (5-nov):** web de ingesta en `web/src/app/`: `/ofertas` (filtros y auditoría visible), `/fuentes` (tabla y formulario de alta o edición) y `/ejecuciones` (resumen por ejecución). Validación de fuentes en `web/src/lib/fuentes.ts`; consultas en `consultas.ts`. `npm test` = 27 pruebas en verde; `tsc`, `lint` y `build` sin errores; formulario probado a mano en el navegador. Revisado por `revisor-seguridad` y arreglados sus puntos 1-8 (servidor solo en 127.0.0.1; `clave_env` solo `FUENTE_*`; sin claves en cabeceras, parámetros, mapeo ni ruta de la URL; URLs internas y puertos raros rechazados). Las ofertas de prueba tienen la taxonomía vacía: sector y familia no tienen qué filtrar hasta clasificar ofertas. **Sin login: las acciones de `/fuentes` escriben sin autenticación, así que no se expone la web fuera de este ordenador.**

- **Paso 5 (5-nov):** web de candidatas. Migración `003` (`perfiles.cv_texto`) y el importador guarda el texto del `cv.md` (sin `--forzar` solo lo rellena si estaba vacío). Páginas `/candidatos` (lista) y `/candidatos/[id]` (perfil con «de dónde sale» en cada dato, CV original desplegable, preguntas pendientes y formulario de preferencias validado con `preferencias.json`). Código en `web/src/app/candidatos/` y `web/src/lib/preferencias.ts`. `npm test` = 34 pruebas en verde; `tsc`, `lint` y `build` sin errores; probado a mano en el navegador. Revisado por `revisor-seguridad` y `auditor-lineas-rojas`, con sus arreglos aplicados. El perfil se muestra solo para leer: editar cargos o fechas necesita su propio diseño (regla de los huecos). **Sin login: cualquiera que llegue a la web edita cualquier perfil; no se expone fuera de este ordenador.**

**Siguiente (reordenado el 5-nov): primero la ingesta real desde las APIs y `verificar` (días 1 a 3 del plan), y después el paso 6 — dashboard del flujo agéntico.** Después: 7 observabilidad en cada componente y página `/salud` · 8 `revisor-seguridad` y `auditor-lineas-rojas` antes del commit. (Antes figuraba aquí «6 dashboard del flujo agéntico») · 7 observabilidad en cada componente y página `/salud` · 8 `revisor-seguridad` y `auditor-lineas-rojas` antes del commit. Cada paso termina con comprobaciones a mano. Fuera de esta entrega: login, cola y worker, puerta al LLM, PWA, tablero.

**Pendiente de seguridad de la pista B** (de las revisiones de `revisor-seguridad` y `auditor-lineas-rojas`). Las letras sirven para encontrar cada punto en la bitácora. Están ordenados por cuándo hay que atenderlos.

*Paso 4 — hechos (a), (d), (h) e (i):* toda escritura de fuentes pasa por `validarFuente`; las claves no caben en cabeceras, parámetros, mapeo ni URL; ningún texto externo se pinta como HTML; los mensajes de error no repiten claves. **Regla que sigue vigente para el paso 5:** nada se guarda sin `validar()` y los apuntes de `eventos` solo con `registrarEvento`.
- **(b) SSRF — queda para cuando exista la descarga.** Hoy se rechazan al guardar `localhost`, IP privadas, puertos distintos de 443 y hosts sin punto. Al descargar hay que repetir la comprobación sobre la IP ya resuelta por DNS (un dominio público puede apuntar a una IP interna), con `redirect: "manual"`, límite de tamaño y de tiempo, y pasar una revisión específica.
- **Antes de abrir la web a otra persona:** login (y comprobar la sesión dentro de cada acción, no solo en un middleware); cabeceras de seguridad (CSP, `frame-ancestors 'none'`); rol `horma_app` (ver abajo). La detección de claves en las fuentes es una ayuda, no una garantía: la defensa real es que la clave solo vive en una variable `FUENTE_*`.
- Quien escriba `ejecuciones_ingesta.errores` debe guardar códigos o frases fijas, no mensajes de red (la página los corta a 200 caracteres).

*Paso 5 — hecho:* (k) el `origen` ya vivía dentro de las columnas jsonb; ahora también se guarda el texto del CV y la web lo enseña. Las empresas no ven nada: no existe ninguna ruta de empresas y una prueba (`preferencias.test.ts`) vigila que ningún archivo nuevo lea perfiles o preferencias fuera de una lista blanca, ni ordene por una nota.
*Pendiente que sale del paso 5:*
- **Al llegar el login:** el id de usuaria sale de la sesión y no del campo oculto del formulario; id opaco (UUID) y no un nombre en la URL; la acción de preferencias debe comprobar además que la usuaria tiene perfil; y la lista `/candidatos` desaparece o queda solo para administración.
- **Exportar y borrar datos (RGPD) debe incluir `perfiles.cv_texto`** (borrar la usuaria ya lo elimina por `ON DELETE CASCADE`).
- **Topes en el esquema compartido `preferencias.json`** (`maxItems`/`maxLength`): hoy los pone el código de la web; añadirlos al esquema afecta a la pista A, así que se avisa antes.
- **`traza.json` y los CV por oferta** no se importan todavía; llegan con la web de candidaturas.
- Las páginas «no encontradas» devuelven código HTTP 200 (Next envía la página por trozos); no afecta hoy.
- Los CV reales nunca van a git: `datos/.gitignore` ya ignora todo salvo `fixtures/`.

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
8. Specs por flujo en `specs/` y umbral de cobertura ATS (con ejecuciones reales).

**Mensaje para abrir sesión:** «Lee `docs/tareas-pendientes.md` y las últimas tres entradas de `docs/bitacora.md`. Empieza por el punto 1 del plan y no toques nada sin avisarme».

## 4. Abiertas, por prioridad
**Media**
- **Comprobar «sin RAG»:** buscar «RAG» en el PRD, `analisis-tecnico.md` y el Cuaderno y decidir caso a caso.
- **Aviso de huecos:** pasar a US-002 del PRD y a `analisis-tecnico.md` lo que el profesor pidió (Horma avisa de dónde rellenó cada hueco).
- **Multiagente para construir Horma:** en pequeño y sin framework; falta definir roles y el ok del profesor. LangGraph solo dentro de Horma; si dice que no, Python plano sin cambiar agentes ni flujos. Cada agente, una función independiente del framework.
- **Por confirmar (Mar):** ingesta como proceso aparte; agente de relleno LLM frente a adaptadores por ATS (lo decide el eval de ablación).
- **Investigaciones:** seguimiento por correo (Gmail frente a reenvío); coste del servidor; condiciones de InfoJobs y EURES, SmartRecruiters, Ashby, Workable y la sentencia C-30/14.
- **Pregunta sobre fuentes al profesor:** ¿Apify para portales que prohíben el scraping o base en APIs y ATS públicos? Datos en `docs/archivo/investigacion-fuentes-y-costes.md`. Recomendación: híbrido.
- **Rúbrica y fecha exacta de entrega** (20 o 24 de noviembre) en Neoland; si el repositorio es público en la entrega.
- **Obligación RGPD:** exportar y borrar datos, antes de tener usuarias reales.

**Baja (ramas)**
- Minijuegos (miden una habilidad del puesto, nunca rasgos; el resultado no llega a ninguna empresa); voz del entrenador; tiendas de apps; **servidor MCP «Horma»** (recomendado: solo lectura, 3-4 herramientas, ninguna que envíe).
- **Evidencias del perfil humano:** perfeccionar la función (no reescribir; ocultar; pedir corrección). Mar la considera importante.
- **Ideas de honestidad** (`docs/archivo/honestidad.md`, ideas 11-18; auditadas, ninguna en rojo): por decidir con el profesor cuáles entran; por decidir (Mar) confesionario solo por texto, peso y salud (art. 9) en la idea 13, y si historial y registro de correcciones son un solo sistema; verificar licencia y API de ESCO.
- **Condiciones del auditor (29-oct)** en `propuesta-horma.md`, apartado 4: carta «cómo trabajo», entrenador, asistente de edición, modo autónomo y lema.
- **Topes:** sin tope de ofertas ni candidaturas; los demás se perfilan más adelante. Diseñar el supervisor del modo autónomo; elegir transcripción en la UE.
- **Seguridad previa al código:** los 20 puntos de `analisis-tecnico.md`, apartado 8, pasan a ADR; los de mejor relación coste/beneficio: roles de BD con RLS forzada, máquina de estados del envío y reglas duras del supervisor en código.
- **Diagramas en pantalla completa:** abrir una página del artefacto en pestaña nueva da error (`claude.ai/code/frame/…`). Decidir: quitar el botón u otra forma.
- **PRD:** mantenerlo al día y cerrar los «por fijar» con mediciones.
- **Ideas de Michael Page** (seguimiento hasta la incorporación, proceso visible en pasos, transparencia de datos como mensaje, modo «escucho ofertas»): ideas, no decisiones.
- Pulido final: revisar con Mar cómo queda todo junto.

## 5. Artefactos pendientes de actualizar
Actualizados el 4-nov con Next.js, «candidatos» y el orden de la web (ingesta y candidatos primero): Cuaderno personal, «Horma por fases», «Construcción de Horma», «Horma por dentro» y la página del profesor. Tabla y reglas en `docs/indice.md`.

**Pendiente:** el PRD (`docs/archivo/prd-horma-v1.html`, RES-01) aún dice «backend 100 % Python (FastAPI)». No se toca hasta que el profesor responda a las preguntas 29 y 30, porque el PRD es su documento de partida.

## Prompt de construcción optimizada (para usar cuando la pista B esté completa)

Mar lo pidió el 6-nov: construir Horma de la forma más rápida y sólida posible, y sobre todo **que funcione**. Se pega tal cual al abrir la sesión; los bloques de trabajo salen de este mismo documento, no del prompt.

````text
Actúa como la Copiloto de Horma jobs, con la mentalidad de una desarrolladora y arquitecta de software muy eficaz. Tu objetivo único es llevar Horma a un estado en el que FUNCIONA de punta a punta con datos reales, con la construcción más rápida y sólida posible. Funcionar de verdad, comprobado y mostrado, vale más que cualquier cosa bonita o a medias.

## Antes de nada (no toques código todavía)
1. Lee `docs/tareas-pendientes.md` (sección «Retomar: empieza aquí»), la última entrada de `docs/bitacora.md` y `git status`.
2. Comprueba el entorno: `horma-db` arrancada, `npm test` en `web/` y `python -I evals/correr_evals.py` en verde. Dime el resultado real, errores incluidos.
3. Preséntame un plan corto con el orden, qué va en paralelo y cómo se comprueba cada bloque. Espera mi ok.

## Principios de optimización
- **Esqueleto andante primero:** el camino más corto de un dato real a la pantalla. Lo que no está en esa cadena espera.
- **Rebanadas verticales:** cada bloque termina funcionando y verificado antes de abrir el siguiente («cerrar frentes antes de abrir otros»). Nada a medias.
- **Ruta crítica y paralelismo real:** primero lo que bloquea a lo demás (seguridad, datos). Solo lo independiente corre en paralelo, con subagentes de contexto limpio.
- **Reutilizar antes que inventar; borrar antes que añadir.** Sin sobreingeniería: la solución más simple que funcione.
- **Pruebas baratas y deterministas:** los tests no llaman a ningún LLM de pago; usa fixtures con datos inventados. El test del riesgo (SSRF, duplicados, esquemas) va antes o junto al código, y se comprueba que protege rompiendo el código a propósito.
- **Fallos pensados desde el principio:** red caída, respuesta rara, lista vacía, ejecución repetida sin duplicar, errores como códigos fijos y nunca como mensajes de red.
- **Cada bloque tiene un «hecho cuando» medible,** y no lo das por cerrado sin mostrarme la salida real del comando.
- **La bitácora se actualiza en cada bloque,** en prosa y con párrafo «En llano», en el mismo commit que el trabajo.

## Orden de trabajo
El de `docs/tareas-pendientes.md`: primero los troncos (ingesta, perfil y CV maestro, CV base, adaptación por oferta, envío, seguimiento, portal de empresas), después las ramas. Exportar y borrar datos (RGPD) antes de tener usuarias reales.

## Reglas que no se negocian
- Las del `CLAUDE.md` del proyecto: líneas rojas del producto, ningún dato inventado, nunca leer `.env`, `git add` por nombre tras `git diff`, sin push a `main` sin mi orden, nada destructivo sin confirmación, nunca modificar Jobs.
- Todo lo irreversible o con coste (migraciones, dependencias nuevas, contratos de datos) me lo avisas ANTES, con coste y mantenimiento.
- Duda sobre lo que quiero: me preguntas con un menú de 2 a 4 opciones. Duda técnica: decides y me explicas el porqué en una o dos líneas.
- Antes de cada commit: `revisor-seguridad` y, si el cambio toca contenido de usuarias o líneas rojas, `auditor-lineas-rojas`. Me traes sus hallazgos con la solución propuesta; los de revisores que no pudieron ejecutar código son hipótesis que compruebas.

## Cómo me hablas
En español, concisa y directa. Término técnico con una línea de definición. Al cerrar cada bloque: hecho / no hecho / siguiente paso, en tres líneas.
````
