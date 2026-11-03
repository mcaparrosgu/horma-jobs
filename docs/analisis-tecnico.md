# Horma jobs · análisis técnico de la arquitectura

> Complementa los diagramas de `Workbook/web/proyectos/horma/` (`tecnico`, `recomendacion`, `calidad`…) y `horma-v3/` (`equipos`, `cv-cartas`, `envio`). Es la **arquitectura prevista**, no código: la fase de definición sigue esperando el ok del profesor.
> **Cada decisión lleva su estado.** *Decidido* = lo decidió Mar (con fecha y fuente). *Propuesta* = la plantea la Copiloto y se confirma en el paso 6. Revisado el 29-oct-2026 con `auditor-lineas-rojas` (ningún rojo; ámbar corregidos aquí) y `revisor-seguridad` (apartado 8).
> **30-oct-2026:** n8n sale de la arquitectura; la ingesta es un script propio controlado desde un dashboard en el frontend. Los diagramas ya no dibujan n8n (1-nov).
> **1-nov-2026:** sesión de diseño sobre multiagente. **Decidido por Mar: opción «A-ajustada»** (apartado 9). **Sin Caddy y sin HTMX: confirmado por Mar (1-nov).** Multiagente con orquestación en código; ingesta como proceso aparte (propuesta). **LangGraph (1-nov, Mar): sí, solo en los dos flujos con bucle o pausa para la usuaria (CV y cartas, y envío); pendiente de que el profesor lo confirme.** Si dice que no, los agentes y los flujos no cambian: se ejecutan con Python plano. Todos los diagramas del Cuaderno y «Horma por dentro» están al día con esta arquitectura (1-nov); los flujos de CV y cartas y de envío, en detalle, en «Horma v3».

## 1. Visión general

Horma no es «una API». Son **cuatro tipos de proceso** con responsabilidades y niveles de confianza distintos:

| Proceso | Qué hace | Estado |
|---|---|---|
| **API síncrona** (FastAPI) | Responde a la web y a los webhooks en milisegundos: autentica, valida y lee o escribe en la base de datos | Decidido: backend 100 % Python con FastAPI (`propuesta-horma.md`, ap. 4) |
| **Worker** (Python, mismo código base) | Ejecuta lo lento o incierto: extracción y embeddings de ofertas, agentes (apartado 9) y evals | Propuesta |
| **Script de ingesta** (propio, con dashboard) | Trae ofertas de las fuentes y las manda por `POST /ofertas`, la única ruta por la que escribe. Sustituye a n8n. **Proceso aparte** (mismo repositorio e imagen, tercer comando de arranque: `api`, `worker`, `ingesta`), sin credenciales de la base de datos; el botón «lanzar ahora» del dashboard deja una petición en la API que el proceso recoge | Decidido (30-oct); proceso aparte: propuesta recomendada (1-nov) |
| **Navegador aislado** (Playwright) | Rellena formularios ATS sin acceso a la base de datos ni a la red interna | Propuesta (Playwright, decidido para el agente de envío) |

**Por qué un monolito modular con dos procesos y no microservicios** *(propuesta)*. La API y el worker comparten modelos, reglas de negocio y acceso a datos: son *un* código base con dos comandos de arranque. Separarlos da lo que importa (que un CV de 40 segundos no bloquee la web, y que el worker pueda caer sin tumbar la API) sin el coste de varios repositorios, contratos entre servicios y despliegues. Los microservicios solo se justificarían con equipos distintos o escalado independiente real.

## 2. Componentes

| Componente | Tecnología | Por qué | Tema del bootcamp | Estado |
|---|---|---|---|---|
| Web | HTML, CSS y JavaScript planos, PWA, servida por FastAPI. Sin HTMX | Un solo código base; sin React ni librerías extra | HTML, CSS, JavaScript | Sin HTMX: decidido por Mar (1-nov). HTML, CSS y JS planos: propuesta (es flexible en el frontend). PWA primero: decidido (27-oct) |
| Proxy inverso | ~~Caddy~~ Quitado en el borrador del 1-nov: TLS, límites de tamaño y ritmo y cabeceras de seguridad pasan al alojamiento o a la propia API (ver nota al final del apartado 8) | Una pieza menos | Docker, seguridad de APIs | Sin Caddy: decidido por Mar (1-nov). Quién asume cada función: paso 6 |
| API | FastAPI por capas: routers → servicios → repositorios | Los routers validan con Pydantic y no saben de negocio; solo los repositorios hablan SQL | FastAPI por capas (TaskFlow) | Decidido (FastAPI); capas: propuesta |
| Identidad | Google OAuth 2.0 + JWT | Alta sin contraseñas propias | Seguridad de APIs (OAuth, JWT) | Decidido: entrada por Google o por email; el mecanismo, propuesta |
| Base de datos | PostgreSQL + pgvector | Datos relacionales y vectores en un solo sitio | SQL; embeddings y bases vectoriales | Decidido (propuesta 1 y 5 elegidas por Mar) |
| Cola de tareas | Tabla en PostgreSQL con `FOR UPDATE SKIP LOCKED` | Una pieza menos que Redis | Patrones de acceso y modelado de datos | Propuesta (Redis descartado, 27-oct) |
| Agentes | Dentro del worker: cada agente es una función de Python con su prompt y sus herramientas; el orquestador es código (no un LLM). **LangGraph solo en CV y cartas y en envío** (un grafo por flujo, 4-5 nodos, sin LangChain); el resto, código normal. Una sola fuente de verdad para el estado (se decide en el paso 6) | LangGraph da el bucle con tope y la pausa para que apruebe la usuaria (`interrupt`), que son justo los dos flujos; si estorba, se sustituye por un bucle de Python sin tocar los agentes | Agentes de IA, function calling, patrones de diseño (reflexión, herramientas, multiagente) | Decidido por Mar (1-nov): opción A-ajustada (apartado 9) |
| Puerta al LLM | Un único módulo Python | Reintentos, tiempos límite, coste y guardrails en un solo lugar | APIs de LLMs: coste y latencia | Propuesta |
| Ficheros | Volumen con CV subidos y PDF generados | La base de datos no es un almacén de ficheros | Docker (volúmenes) | Propuesta |
| Métricas | Tabla de llamadas al LLM (modelo, tokens, coste, latencia) | Mide el coste real para fijar precios | LLMOps; Manual de obra, paso 18 | Decidido: se registra cada llamada; tabla propia, propuesta |
| Ingesta | Script propio en Python, proceso aparte, lanzado desde un dashboard en el frontend | Una herramienta menos que mantener; privilegios mínimos (sin acceso a la base de datos) y no retrasa los CV | APIs, cron (Unidad 5) | Decidido (30-oct); proceso aparte: propuesta (1-nov) |
| Calidad | pytest + evals en GitHub Actions | Un cambio de prompt que empeora no se fusiona | Manual de obra, pasos 13-16 | Decidido (evals, guardrails, red teaming); CI, propuesta |

## 3. Cómo viaja cada flujo

### 3.1 Ingesta de ofertas
1. El script de ingesta recorre las fuentes cada día (o cuando se lanza desde el dashboard), filtra y deduplica.
2. `POST /ofertas` con clave de API limitada a esa ruta. La API valida con Pydantic y rechaza lo mal formado.
3. La API guarda la oferta y **encola** su procesado; responde enseguida.
4. El worker pide al LLM los campos estructurados, calcula el embedding y lo guarda en pgvector.

La oferta es **texto no fiable**: se trata como dato, nunca como instrucción (apartado 8, punto 3).

### 3.2 Recomendación (diagrama `recomendacion`)
1. **Filtro duro en SQL** con las condiciones de la usuaria (país, contrato, sueldo mínimo). Una oferta sin sueldo no se descarta: sale marcada.
2. **Búsqueda híbrida** sobre lo que pasa el filtro: palabras clave (`tsvector`) y significado (pgvector), fusionadas con *Reciprocal Rank Fusion*.
3. **El LLM puntúa por tandas de 30**, no todo a la vez, y **no hay tope de ofertas mostradas**: las que aún no se han puntuado salen en el orden de la búsqueda, sin nota, y se puntúan al paginar. El resultado se cachea por perfil y oferta.

**Dos salidas separadas** (decisión del 27-oct, rango de compatibilidad):
- una **nota 0-100 solo de experiencia y formación**;
- **3 niveles (alto, medio, bajo) solo sobre condiciones de trabajo** (autonomía, ritmo, equipo), comparando lo que pide la oferta con lo que ella declaró.

**Las evidencias humanas no entran en el embedding ni en la nota**, y el LLM puntúa ofertas, nunca la personalidad de nadie. Un eval comprueba que ninguna explicación menciona rasgos. La flexibilidad que elige la usuaria amplía el rango, nunca el filtro duro.

**Quién lo ve:** puntuaciones, perfil humano y evidencias son privados de la usuaria (RLS). El rol de empresa no tiene acceso a ninguna de esas tablas: solo lee las candidaturas que la candidata envía. Cada tabla lleva su prueba de seguridad.

### 3.3 CV y carta (Cuaderno, «Horma v3», diagrama `cv-cartas`)
**Punto de partida (30-oct; el 3-nov la versión del profesor lo cambia a hasta 4 CV base y sin cartas base, ver `docs/flujo-agentico-claude-code.md`):** de su CV completo, Horma genera una sola vez hasta 5 CV base (uno por sector) y hasta 2 cartas base; una herramienta de código (`medir_ats`) mide las palabras clave y el redactor ajusta el base a la oferta. Cada oferta parte del base que le toca, lo que ahorra tokens. Regla: Horma cambia qué se muestra y cómo se cuenta (lo poco relevante se condensa en una línea; puede mostrarse solo el año), nunca fechas, cargos, empresas ni titulaciones.

Generar → evaluar → corregir, con un máximo de 2 intentos:
- **Elegir evidencias** del perfil que encajan con la oferta. Las evidencias del perfil humano solo entran si la usuaria las **activó** (apagadas por defecto) y no las **ocultó**, y siempre redactadas como logros, nunca etiquetas.
- **Redactar** CV y carta nuevos.
- **Trazabilidad:** un juez comprueba que cada frase tiene origen en el perfil (nunca en la oferta). Sin origen, no se escribe: se pregunta. El juez es **código primero** (fechas, cargos, empresas y titulaciones, coincidencia literal con el CV maestro) **y LLM después**, y el LLM debe citar la fuente de cada frase; el código comprueba la cita (apartado 9).
- **Lectura ATS:** herramienta de **código**, no agente: se vuelve a leer el PDF generado y se cuentan las palabras clave, y el resultado vuelve al redactor. Una palabra clave sin origen en el perfil **no se inserta**: se muestra a la usuaria como «la oferta pide X; no está en tu perfil». Se promete que el ATS *lee bien* el CV, no que lo *aprueba*.
- **Asistente de edición:** el texto que la usuaria edita con el asistente pasa los mismos controles; se muestra el cambio antes de aceptarlo y un dato nuevo que ella dicte se guarda como dato declarado suyo.

### 3.4 Envío (Cuaderno, «Horma v3», diagrama `envio`)
- Por defecto, la usuaria aprueba y el worker encola el envío.
- En **modo autónomo**, un supervisor revisa cada envío antes de salir. Las condiciones del auditor (propuesta, ap. 4) se traducen así:
  1. Falta un dato: no se envía; queda «pendiente de ti».
  2. Art. 9, salario o preguntas legales: nunca se contestan solas.
  3. Sin pasar el eval de trazabilidad: no se envía.
  4. Solo dentro del rango elegido; permiso único, **revocable**, con aviso de qué datos van a quién y botón de **pausa total**.
  5. Los términos de cada ATS se comprueban **antes de integrarlo**, no en tiempo de envío.
  6. Un único supervisor; los errores repetidos pausan el modo.
- **Denegar por defecto** *(propuesta)*: cualquier campo o pregunta que no esté en una lista conocida (nombre, contacto, CV, carta) pasa a «pendiente de ti». Las reglas duras son **código determinista**; un LLM solo puede endurecerlas (rechazar), nunca relajarlas.
- **Reparto de papeles (1-nov, apartado 9):** el agente de relleno solo propone un plan JSON de esquema cerrado; el supervisor es código con un LLM que solo rechaza; quien ejecuta en el navegador es un **script de Playwright**, nunca un LLM.
- Solo en formularios ATS de empresa y en el portal de Horma; **nunca LinkedIn ni Indeed**.
- El navegador aislado recibe **solo los datos de esa candidatura**, no ve la base de datos ni la red interna, y el envío es idempotente.

### 3.5 Webhooks
Stripe, el servicio de transcripción (por elegir) y el correo reenviado llaman a la API con petición firmada. Se verifica la firma antes de hacer nada y el procesado es idempotente (los proveedores reintentan). El correo reenviado es texto no fiable.

## 4. Datos y privacidad

- **Multiusuaria con RLS** (*row-level security*): cada fila pertenece a una usuaria y la propia base de datos impide leer filas ajenas (ver apartado 8, punto 1, para que funcione de verdad).
- **Fronteras de confianza:** lo de fuera entra solo por la API; el script de ingesta con clave de API, personas con JWT, terceros con firma. Nada llega directo a la base de datos.
- **Mínimo privilegio:** el navegador aislado y el script de ingesta no tienen credenciales de la base de datos (el script solo habla con la API).
- **Datos personales:** nunca en logs, tests ni mensajes de commit. Las métricas guardan cifras (modelo, tokens, coste), no el texto de la usuaria. Los casos de prueba son datos inventados. Al construir: que los errores de validación (422) no devuelvan el valor que escribió la usuaria.
- **Audio de la entrevista:** se borra tras transcribirlo (decidido, 29-oct). El proveedor de transcripción debe estar en la UE, **sin análisis de emociones ni de sentimiento**, y borrar también el audio en su lado. Se elige en el paso 6.
- **Empresas:** solo ven lo que la candidata decide compartir; Horma no ordena ni puntúa candidatas para ellas (AI Act, Anexo III.4).

## 5. Calidad y LLMOps (diagrama `calidad`)

- **Una sola puerta al LLM:** ningún servicio llama a un proveedor directamente.
- **Guardrail de entrada** (la oferta es dato, no orden; apartado 8, punto 3) y **de salida** (Pydantic + trazabilidad).
- **Registro de cada llamada** con modelo, tokens, coste y latencia: base para fijar el precio de los planes con uso intenso.
- **Evals en CI** con casos de referencia y LLM-as-judge (fidelidad y ATS), con una clave aparte de presupuesto limitado y datos inventados.
- **Red teaming** con ofertas que intentan manipular a la IA, incluidas las que intentan activar un envío o filtrar datos (paso 16).

## 6. Alternativas descartadas o pospuestas

| Alternativa | Estado | Motivo |
|---|---|---|
| Redis para la cola | Descartada por Mar (27-oct, bitácora) | Una pieza más que mantener |
| Playwright como servidor MCP | Descartada por Mar (27-oct, bitácora) | Más control al ejecutar código propio y no el modelo |
| Tres agentes independientes en el envío | Descartada por Mar (27-oct, bitácora); el supervisor único lo decidió Mar el 29-oct | Un supervisor único es más simple |
| Microservicios | Propuesta de no hacerlos | No hay equipos ni escalado independiente que lo justifiquen |
| React | Propuesta de no usarlo | HTML, CSS y JS planos servidos por FastAPI: un solo código base (Mar es flexible en el frontend) |
| HTMX y Caddy | Quitados por Mar (1-nov) | Menos piezas; sus funciones se reasignan (nota al final del apartado 8) |
| LangGraph en todo el sistema | Descartado (1-nov) | Sobra en ingesta, recomendación y herramientas de código. Se mantiene solo en CV y cartas y en envío (pendiente del profesor) |
| Gerente LLM | Descartado por Mar (1-nov) | Los pasos son fijos y los decide un `if`; costaría 2-3 veces más tokens y es difícil de evaluar |
| Agente ATS con LLM | Descartado (1-nov) | Contar palabras clave es código; adaptar el CV es trabajo del redactor |
| Patrón «todos con todos» (all-to-all) | Descartado (1-nov) | Impredecible; las líneas rojas exigen predecibilidad |
| Servicio de trazas aparte (por ejemplo Langfuse) | Propuesta de posponerlo | Servicio nuevo con coste de mantenimiento; la tabla propia basta de momento |

## 7. Lo que no está decidido (paso 6)

- Alojamiento, quién asume lo que hacía Caddy (TLS, límites, cabeceras) y librería de cola.
- Si el agente de relleno de formularios se queda como agente LLM o se sustituye por adaptadores por ATS (lo decide el eval de ablación, apartado 9).
- «Subagente ATS», decisión pendiente de cerrar con el profesor (Mar, 1-nov): herramienta de código en lugar de agente, y cómo define él «agente» (pregunta 14 bis de `preguntas-profesor.md`). El PRD no cambia hasta su respuesta.
- Proveedor de LLM, de embeddings y de transcripción en la UE.
- ORM.
- Diseño detallado del supervisor del modo autónomo (apartado 3.4).
- Si las métricas se quedan en tabla propia o pasan a un servicio.
- Permisos exactos del rol de empresa.

## 8. Requisitos de seguridad antes de escribir código

Revisión de `revisor-seguridad` (29-oct). Cada punto pasa a ser una ADR en el paso 6.

**Antes de escribir código (decidirlos en el paso 6):**
1. **RLS que se aplica de verdad.** La RLS no protege si la API o el worker se conectan con el rol dueño de las tablas o con un superusuario. Roles separados (`migrador`, `api`, `worker`, sin saltarse la RLS), `FORCE ROW LEVEL SECURITY` en las tablas con datos personales, y la usuaria fijada en cada transacción (en el worker, la de cada tarea). Un test que intente leer datos de otra usuaria y falle.
2. **Navegador aislado.** Red Docker propia sin ruta a la base de datos, al script de ingesta ni a la API; salida solo a internet público, con rangos privados bloqueados (SSRF: que una oferta maliciosa le haga llamar a direcciones internas) y revalidación tras cada redirección; solo `https`; lista de dominios ATS o, al menos, host del formulario igual al de la oferta; contenedor sin privilegios y perfil de navegador nuevo por envío, con límite de tiempo y memoria.
3. **Prompt injection.** Un filtro de entrada no basta. Los agentes que leen ofertas no tienen herramientas con efectos (sin navegador ni correo); salidas en esquemas cerrados validados con Pydantic; el agente de envío rellena con datos del perfil aprobado, no con texto de la oferta; el texto de la oferta se delimita, se acota y se limpia de HTML y texto invisible.
4. **Envío: máquina de estados en la base de datos** (borrador, aprobada, enviando, enviada, fallida, pendiente de ti) con transiciones comprobadas. El worker solo toma candidaturas en `aprobada` y revalida estado y versión del CV y la carta justo antes de enviar; clave de idempotencia única por candidatura; si el navegador cae en `enviando`, no se reintenta solo: pasa a «pendiente de ti». Solo la API, con el JWT de la dueña, puede aprobar.
5. **Supervisor del modo autónomo.** Reglas duras en código con denegación por defecto; el LLM solo endurece; registro de cada decisión con su motivo; activación solo con sesión reciente. **Freno técnico:** límite de envíos por hora y por día y pausa tras N fallos seguidos. *Decidido por Mar (29-oct): se incluye como medida de seguridad contra abuso y errores, no como tope de producto; el tope de producto sigue sin existir.*

**Con las primeras líneas de la API:**
6. Clave del script de ingesta limitada a `POST /ofertas`, guardada solo como hash y rotable, con límite de tamaño y ritmo.
7. Cola: intentos máximos, retroceso exponencial, estado `dead` y tope de coste por tarea; la carga de la tarea guarda solo ids, no texto.
8. JWT y OAuth: verificar firma, `exp`, `aud` e `iss`; PKCE y `state`; enlazar por `sub`, no por correo; token corto con refresco rotatorio; cookie `HttpOnly`, `Secure`, `SameSite`; protección CSRF (hay formularios y cookies); la usuaria sale siempre del token, nunca de la URL.
9. Webhooks: firma sobre el cuerpo en bruto con tolerancia de tiempo, tabla de eventos ya procesados y respuesta 2xx rápida. El correo reenviado necesita remitente verificado y tamaño máximo.
10. Secretos en variables de entorno o gestor del alojamiento, nunca en el repo ni en la imagen; cada proceso recibe solo las suyas; claves distintas por entorno con límite de gasto; escaneo de secretos en CI.
11. Logs y métricas sin datos personales: filtro central, solo ids y códigos de error; las trazas de los agentes (salidas y veredictos) van a tablas con RLS y se borran con la cuenta, nunca a logs.

**Con su módulo:** ficheros con nombre aleatorio y descarga solo por la API (nunca como estáticos); borrado del audio sin dejar huérfanos y borrado de transcripciones, embeddings y caché al cerrar la cuenta; límites de tamaño y ritmo, cabeceras de seguridad y sin publicar el puerto de la base de datos; texto siempre escapado al pintarlo y CSP estricta (la salida del LLM es texto derivado de ofertas no fiables); `user_id` en la caché de puntuaciones; contenedores sin root y versiones fijadas.

**Nota del 1-nov (sin Caddy ni HTMX, confirmado por Mar):** quitar Caddy deja sin dueño los límites de tamaño y ritmo, las cabeceras de seguridad, el TLS y la CSP; quitar HTMX no elimina la protección CSRF, porque los formularios y las cookies siguen existiendo. Hay que reasignar cada uno (alojamiento o API) en el paso 6.

**Siguiente paso:** documentar cada decisión de los apartados 7 y 8 como ADR (*Architecture Decision Record*, una página por decisión) en el paso 6 y dibujar este mapa como diagrama C4 de contenedores. Ambos son temario («Arquitectura de software: UML, C4 y ADR»).

## 9. Multiagente: opción A-ajustada (decidida por Mar, 1-nov-2026)

**Criterio.** Un agente aparte solo se justifica si aporta (a) un **crítico independiente** de quien genera o (b) **permisos distintos**, y además, medido con un eval de ablación (quitar el agente y comparar), atrapa errores que el código normal no atrapa. Si no, se borra. Es un flujo con roles de LLM orquestado por código: «sistema multiagente con orquestación determinista». En la clase del 29-oct los agentes eran funciones de Python; el patrón es el de la clase.

**Opciones valoradas** (costes en órdenes de magnitud, sin medir):

| | A-ajustada (elegida) | B: gerente + agente ATS LLM | C: sin multiagente |
|---|---|---|---|
| Tokens por oferta | ≈2× típico, tope ≈5-6× | ≈4-5×, sin tope claro | 1× |
| Seguridad | El juez nunca ve el texto crudo de la oferta | Más agentes leen texto no fiable | Sin crítico de invenciones |
| Mantenimiento | Medio | Alto | Mínimo |
| Aprendizaje | Alto | Añade «jerárquico», mal justificado | Bajo |

**Equipos, patrón y papeles**

| Equipo | Patrón (clases 23, 28 y 29-oct) | Agente | Herramientas | NO puede |
|---|---|---|---|---|
| **CV y cartas** | Lineal con bucle de reflexión; orquestador en código; máx. 2 correcciones | **Redactor** | Leer perfil y CV base de esa usuaria; leer campos estructurados de la oferta; `medir_ats` (código) | Enviar; escribir en la base de datos (guarda el orquestador); tocar fechas, cargos, empresas ni titulaciones; leer el HTML crudo de la oferta; insertar palabras clave sin origen en el perfil |
| | | **Juez** (código primero, LLM después) | Leer perfil y salida del redactor; `verificar_cita` (código) | Ver la oferta; ver el razonamiento del redactor; editar el texto |
| **Envío** (solo modo autónomo) | Lineal con puerta de veto | **Relleno** (LLM, esquema cerrado) | Recibe etiquetas de formulario ya limpias; devuelve un plan JSON | Navegar, pulsar, leer la base de datos; contestar art. 9, salario o preguntas legales |
| | | **Supervisor** (núcleo en código, LLM solo rechaza) | Leer el plan, el perfil aprobado y el estado de la candidatura | Aprobar (solo la usuaria, vía API con su JWT); relajar reglas; ver la página |
| | | **Ejecutor** (script de Playwright, no LLM) | Ejecutar el plan tal cual en el navegador aislado | Desviarse del plan |
| **Entrevista del perfil** (rama) | Lineal | **Extractor** y **verificador del art. 9** | Transcripción → evidencias → verificación | Guardar sin que la usuaria apruebe; inferir categorías especiales |

Fuera del multiagente: la **recomendación de ofertas** (filtro SQL → búsqueda híbrida → LLM puntúa) y la **ingesta** (script). La herramienta **ATS** es de código, no un agente; adaptar el CV a las palabras clave es trabajo del redactor. El **gerente** es el orquestador en Python, no un LLM.

**Estado y usuaria.** El estado vive en la base de datos (nada en memoria): el envío mantiene su máquina de estados (apartado 8, punto 4) y los documentos usan una análoga: `generando → en_revisión → corrigiendo (n/2) → listo_para_ti → aprobado`. Cada paso guarda salida y veredicto con RLS. La usuaria interviene en: aprobar CV y carta viendo el origen de cada frase; aprobar los huecos que Horma proponga; rellenar lo que falte («pendiente de ti»); aprobar el envío (salvo modo autónomo); activar u ocultar evidencias del perfil humano; aprobar las evidencias extraídas de la entrevista.

**Evals por componente** (umbrales «por fijar»): extracción de oferta (F1 por campo con ofertas anotadas); redactor (fechas, cargos, empresas y titulaciones idénticos al maestro, 100 % obligatorio); **juez** (CV con errores sembrados —cifra inventada, cargo subido, herramienta no usada, exageración— y CV sanos; recall de invenciones y falsas alarmas; ablación frente al código solo); `medir_ats`, supervisor y adaptadores (tests deterministas con `pytest`); relleno (formularios guardados de 3-5 ATS, campo trampa del art. 9, oferta con inyección); extractor y verificador del art. 9 (se prefiere falsa alarma a fallo); pocos casos extremo a extremo.

**Riesgos para las líneas rojas.** *Datos inventados:* el bucle ATS→redactor empuja a inventar, las evidencias humanas «como logros» pueden adornarse, los huecos propuestos pueden parecer cambios de fechas y un juez del mismo modelo es indulgente; mitigan la cita obligatoria, el código primero y la regla de «sin origen, no se inserta». *Art. 9:* un hueco puede ocultar una baja médica o una maternidad; **el redactor nunca infiere ni escribe la causa de un hueco** y el verificador rechaza ante la duda. *Envío:* inyección desde la página del ATS; ningún LLM ve la página cruda ni toca el navegador. *Datos personales:* más agentes son más copias del CV en prompts y trazas; las trazas van a tablas con RLS y el proveedor de LLM debe estar en la UE.

**Revisión.** `auditor-lineas-rojas` sobre cada prompt (redactor, juez, relleno, extractor) y el flujo de aprobación; `revisor-seguridad` sobre el envío, el aislamiento y las trazas. Pendiente de pasarlos sobre este diseño. No avisan solos.
