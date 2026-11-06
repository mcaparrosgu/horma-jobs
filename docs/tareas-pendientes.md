# Estado y tareas pendientes de Horma jobs

Actualizado el 2026-11-05 por la noche (día 1 del plan de 6 días hecho; ver «Retomar mañana»). Única fuente de estado y próximos pasos (mapa de documentos: `docs/indice.md`). Orden = prioridad.

## Estado en tres líneas
- **Fase 0, versión del profesor** (`docs/flujo-agentico-claude-code.md`): **pista A hecha** (agentes, skills, comandos, esquemas, scripts y evals en `.claude/` y `evals/`); **pista B** (web **Next.js** + PostgreSQL en `web/`; FastAPI se quitó el 4-nov) **en marcha: pasos 1 a 5 hechos el 5-nov, sigue el paso 6** (ver «Pista B: por dónde seguir»).
- **Instrucciones nuevas del profesor (4-nov):** (1) **dashboard** para ver el flujo agéntico (pipelines o workflows); (2) **observabilidad** en cada componente; (3) construir **primero** la web de **ingesta de ofertas** y la de **candidatos** (se escribe «candidatos», no «postulantes»); (4) web con **Next.js**, sin FastAPI; (5) probar y pasar los tests **a mano**. **Nuevas (5-nov):** (6) el **pipeline de ingesta toma las ofertas de las APIs**, como hacía antes (en Jobs con n8n; en Horma, script propio); (7) seguir construyendo la web **como un dashboard**; (8) **validar que los datos se guardan en la base de datos**. Dudas que quedan: preguntas 29, 30 y 31 de `docs/preguntas-profesor.md`.
- **Pruebas:** resultados, fallos y límites en `docs/informe-pruebas.md`.
- **Repositorio:** `mcaparrosgu/horma-jobs`, rama `main`, al día con `git log` (último push: 2026-11-05, pista B pasos 1 y 2). El repo `workbook` (Cuaderno y página del profesor) va aparte.

## Retomar mañana (6-nov): empieza aquí

**Dónde estamos.** El día 1 del plan está hecho: `pypdf` instalado, campo `horario` en esquema, base de datos, web y agentes (migración `005`; 35 tests de la web y 35 evals en verde), preferencias deducidas vacías, y 12 fuentes calificadas con `/calificar-fuentes` (registro en `datos/fuentes/calificacion.json`, ignorado por git; resumen en `docs/bitacora.md`). Dos son **aptas con condiciones**: **BOE** (empleo público, España) y **JobTech** (Suecia, CC0). Las otras diez salieron no aptas (Arbeitnow, EURES, Adzuna, The Hub, InfoJobs, Personio, Careerjet, Jooble, Greenhouse, Lever). `endpoints.json` tiene JobTech con `activa: false`; el BOE necesita un adaptador porque su respuesta va anidada. Último push: `0675eb5`; los cambios de este cierre (documentación) pueden estar sin subir: mira `git status`.

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
Mar prueba el resultado con `docs/artefactos/guia-pruebas-manuales.md` al acabar cada bloque.

**Ya no hace falta:** que Mar cree claves de Adzuna e InfoJobs (ninguna salió apta).

## Reglas permanentes (Mar)
- En la sección Proyectos del Cuaderno nunca se hacen ejercicios ni examen.
- La Copiloto es la agente predeterminada.
- Cerrar frentes antes de abrir otros.
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
