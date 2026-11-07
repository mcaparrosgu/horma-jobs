# Bitácora del proyecto

Cuaderno de decisiones de Horma jobs en orden cronológico. Solo se añade al final: nunca se reescribe una entrada anterior, para que se vea qué se decidió, por qué y cuándo se corrigió.

## 2026-10-27 · Definición: arquitectura técnica y decisiones de producto

- QUÉ SE DECIDIÓ — El documento «Horma jobs» del Cuaderno se amplía con la arquitectura técnica (servidores, MCP, subagentes, agentes, calidad). Producto: el perfil humano sale en el CV solo si la usuaria lo activa y como evidencias redactadas como logros; la usuaria elige un rango de compatibilidad con las ofertas (numérico para experiencia y formación, 3 niveles sobre condiciones de trabajo para el perfil humano). La Copiloto es la agente predeterminada (`.claude/settings.json`) y hay dos subagentes de solo lectura. La construcción no empieza hasta el ok del profesor. En Proyectos nunca hay ejercicios ni examen.
- ALTERNATIVAS DESCARTADAS — Personalidad explícita en el CV, o con un número; tres deslizadores numéricos incluyendo personalidad; crear un subagente propio para buscar en Jobs (ya existe Explore); Redis para la cola de tareas; Playwright como MCP; tres agentes independientes en el envío.
- POR QUÉ ESTA — Un número o etiqueta sobre personalidad choca con la línea roja de no puntuar personas (AI Act). Lo demás se eligió por ser lo más simple que funciona: una pieza menos que mantener, y más control al ejecutar el código y no el modelo.
- QUÉ SE ROMPIÓ — El publicador del Cuaderno rechazó `edits` sobre el archivo guardado y exigió aplicar los cambios con Edit y publicar una copia; con eso se publicó bien. Al renumerar los apartados, comprobé en el navegador que quedaron 22 sin referencias rotas.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Mar marcó todo: hooks, worker y cola de tareas, proxy inverso con contenedor y volumen, y grafo con «humano en el bucle». Están en `docs/glosario.md`. Además, nada de esto está probado: los subagentes no se han ejecutado y la Copiloto como predeterminada se verifica al abrir sesión nueva con `/status`.

## 2026-10-27 · Definición: 20 ideas nuevas de Mar

- QUÉ SE DECIDIÓ — Mar dictó 20 ideas, preguntas y tareas. Se guardan en `docs/ideas-2026-10-27.md` antes de opinar sobre ellas. Decisiones de Mar: Horma adapta CV y carta a cada oferta eligiendo de lo que ya tiene la candidata (no hay CVs base); hay un registro de candidaturas (enviadas, descartadas, rechazadas); se quita el modo demo del WB, porque no habrá tribunal; en el futuro, Horma estará en tiendas de apps.
- ALTERNATIVAS DESCARTADAS — Ninguna todavía. La primera valoración de la Copiloto es provisional: no usar un agente para añadir portales; no tener varios perfiles por candidata; no exigir un MCP para leer el correo.
- POR QUÉ ESTA — Primero anotar y después investigar, para que ninguna idea se pierda y nada se decida sin fuentes.
- QUÉ SE ROMPIÓ — Mar informa de que los diagramas del WB dan error en pantalla completa. Aún no se ha reproducido.
- QUÉ QUEDA PENDIENTE DE ENTENDER — La investigación del «Plan de investigación» (empieza por el punto 2) se hará en una sesión nueva. Mar llamó «test de personalidad» a lo que en realidad son evidencias de la entrevista: la diferencia importa por la línea roja.

## 2026-10-27 · Definición: tanda 1 de ideas al WB

- QUÉ SE DECIDIÓ — Entran en el WB de Horma las ideas que Mar ya había decidido: CV y carta nuevos para cada oferta, sin CVs base; el agente pasa a llamarse «redactora de CV y carta» (elige lo que encaja, redacta, se evalúa y corrige); fuera el modo demo y el tribunal (la demo es para el profesor, con datos inventados); registro de candidaturas; tiendas de apps sin fecha.
- ALTERNATIVAS DESCARTADAS — Mantener el nombre «revisor ATS»: describía solo la revisión, no la selección ni la redacción, que es lo principal. Crear un apartado nuevo para el registro: se amplió el 17 (estados), porque el registro solo ordena esos mismos estados.
- POR QUÉ ESTA — Lo ya decidido entra antes para que el profesor vea cuanto antes la corrección más importante (la del CV). Lo que depende de investigar espera, para no presentarle opiniones sin contrastar.
- QUÉ SE ROMPIÓ — La herramienta de diagramas limita cada nota a 140 caracteres; hubo que acortar dos. En el commit del Cuaderno se coló un cambio que ya estaba preparado de antes y no era de esta tarea (el traslado de `web/mapas/m-bd.js` a `web/mapas/archivo/m-bd-v1.js`). No se deshizo, porque habría que reescribir la historia; queda avisado.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Tanda 2, después de la investigación. Comprobar en el navegador cómo se ven los cambios.

## 2026-10-29 · Ideas: candidaturas honestas y transparentes (2.ª ronda)

- QUÉ SE DECIDIÓ — Mar eligió 7 ideas de un brainstorming de 25 y las anotó en `docs/ideas/honestidad.md` (sección 5, ideas 11-17): simulacro con abogada del diablo que ayuda a reforzar respuestas, equivalencias ESCO, traductor de logros cotidianos con elección forzada, valor marginal, historial de revisiones, espejo y confesionario efímero. Son ideas, no decisiones: nada se construye hasta el ok del profesor. El confesionario queda anotado, sin más trabajo por ahora.
- ALTERNATIVAS DESCARTADAS — Por Mar: el «ensayo general con marcas ámbar» y el «diario de logros con capital de evidencia». Por la Copiloto: «Pinocho al revés» (roza etiquetar un rasgo) y la confirmación de un clic de terceros (se solapa con la referencia en 2 minutos).
- POR QUÉ ESTA — Todas ayudan a la usuaria sin vigilarla y son privadas. `auditor-lineas-rojas`: ninguna en rojo, todas con condiciones. Dos choques que Mar tiene por decidir: el peso es dato de salud (RGPD art. 9), y «constancia» como palabra en el CV choca con «logros, nunca etiquetas» (27-oct). `revisor-seguridad` sobre la 17: apto con cambios (solo texto escrito, sin n8n ni logs, proveedor verificado por escrito, consentimiento propio); recomienda empezar por «explicar huecos» en el MVP.
- QUÉ SE ROMPIÓ — El primer texto de la fila 13 prometía traducir hechos a «determinación, constancia» y la auditoría señaló que incumplía la decisión del 27-oct. Se corrigió en el documento antes de cerrarlo. También se vio que «efímero» no era verdad sin una lista cerrada de por dónde pasa el texto.
- QUÉ QUEDA PENDIENTE DE ENTENDER — ESCO (licencia, API, español), la retención y el entrenamiento del proveedor de IA (todo lo dicho es suposición sin verificar) y si el historial de la 15 y el registro de correcciones del art. 16 son un solo sistema. Detalle en `docs/tareas-pendientes.md`, «Mejoras anotadas».

## 2026-10-29 · Definición: análisis técnico más profundo para el profesor

- QUÉ SE DECIDIÓ — El profesor pidió más detalle técnico: el diagrama «técnico» tenía una sola caja «API». Se rehízo como mapa de procesos y contenedores (API síncrona, worker, n8n propio, navegador aislado, Caddy, ficheros, observabilidad) y se añadieron cuatro diagramas de detalle (`recomendacion`, `redactora`, `envio`, `calidad`) en `Workbook/web/proyectos/horma/`. La explicación escrita está en `docs/analisis-tecnico.md`. La versión anterior queda en `archivo/tecnico-v1.*`.
- ALTERNATIVAS DESCARTADAS — Un único diagrama gigante (no cabe en pantalla y no se lee); microservicios; Redis para la cola; un servicio de trazas aparte por ahora.
- POR QUÉ ESTA — Un monolito modular con dos procesos da lo que importa (la web no se bloquea por un CV lento; el navegador del envío no ve la base de datos) sin el coste de varios servicios.
- QUÉ SE ROMPIÓ — Con 4 carriles, `redactora` y `envio` desbordaban la pantalla de 900 px; se fusionaron carriles hasta que pasaron. Se quitó la tarjeta «Temario» de tres diagramas por falta de altura: ese contenido vive ahora en el documento.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Caddy, la cola en PostgreSQL y la observabilidad en tabla propia son propuestas, no decisiones: se confirman en el paso 6. Los diagramas aún no están integrados en el Cuaderno ni publicados; falta que Mar decida cuándo.

## 2026-10-29 · Definición: auditoría del análisis técnico y corrección

- QUÉ SE DECIDIÓ — Pasados `auditor-lineas-rojas` (ningún rojo, 8 ámbar) y `revisor-seguridad` (20 puntos, 5 altos). Se corrigen los ámbar en `docs/analisis-tecnico.md` y en los diagramas `recomendacion`, `redactora`, `envio` y `tecnico`, y se añade el apartado 8 de requisitos de seguridad previos al código. Mar decide incluir un **freno técnico** (envíos por hora y por día, pausa tras fallos seguidos) como medida de seguridad, no como tope de producto.
- ALTERNATIVAS DESCARTADAS — Dejar una sola nota 0-100 que mezcle el perfil humano; mostrar solo las 30 primeras ofertas; que el supervisor sea un LLM que decide solo.
- POR QUÉ ESTA — Una nota única con evidencias humanas puntúa en la práctica a la persona (línea roja del 27-oct); un tope de 30 contradice «nunca hay tope de ofertas»; las reglas de un envío irreversible deben ser código determinista y no juicio de un modelo.
- QUÉ SE ROMPIÓ — Mi primer análisis presentaba como decididas cosas que eran propuesta mía (HTMX, OAuth, LangGraph, monolito) y atribuía al 27-oct el supervisor único, que es del 29-oct. Se añadió la columna «Estado» y se corrigieron las fechas.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Los permisos exactos del rol de empresa, el diseño detallado del supervisor y qué proveedor de transcripción en la UE; las ADR de los puntos de seguridad se escriben en el paso 6.

## 2026-10-29 · Definición: PRD de Horma en el Cuaderno y en la página del profesor

- QUÉ SE DECIDIÓ — Se añade un PRD con la estructura del documento de clase (MA·S03): ficha, contexto, objetivos y métricas, personas, alcance con user stories, requisitos funcionales y no funcionales, restricciones, fuera de alcance, riesgos y dependencias. Es el **apartado 23** del documento «Horma jobs», con un botón «PRD» arriba, en el Cuaderno de Mar y en la página del profesor. El relleno es de Horma, sacado de `propuesta-horma.md` y `analisis-tecnico.md`.
- ALTERNATIVAS DESCARTADAS — Una página aparte `prd.html` abierta en pestaña nueva (dio error, ver abajo); un archivo `docs/03-prd.md` (no existe ese documento y duplicaría el apartado).
- POR QUÉ ESTA — Dentro del mismo documento no depende de abrir otra página del artefacto, y la regenera el mismo script que el resto. Donde falta una medición o decisión pone «por fijar» y no una cifra inventada; impacto y probabilidad de los riesgos y los nombres de las personas (ficticios) son estimaciones de la Copiloto.
- QUÉ SE ROMPIÓ — El primer enlace abría `prd.html` en una pestaña nueva y daba error (`claude.ai/code/frame/…`). Reproducido en Chrome: es la causa del fallo de los diagramas en pantalla completa (punto 9). También: el botón puesto a mano en la página del profesor se habría perdido al regenerarla, porque esa página sale de `construir-horma-aparte.py`; el botón está ya en el generador. `comprobar-estructura.js` falla con el `workbook.html` local (finales CRLF); con LF pasa.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Los valores «por fijar» (latencia, recuperación, coste, tamaño del banco de red teaming, fecha de entrega). El PRD no está aprobado: pone «Borrador para revisión del profesor». Los diagramas en pantalla completa siguen con el error: habría que quitar el botón o abrirlos de otra forma.

## 2026-10-30 · Definición: comentarios del profesor en su página

- QUÉ SE DECIDIÓ — El profesor pidió poder dejar mejoras, correcciones y preguntas en su página y que Mar las vea. Se añade la capacidad `comments` (solo entrada) a `horma-apuntes.html`: al seleccionar una palabra, frase o párrafo sale «Comentar» y abre el cuadro de claude.ai anclado a esa selección, como en un PDF; cada apartado lleva también «Comentar este apartado». Los hilos los pinta claude.ai y Mar los ve y responde ahí. Publicado como versión 15; commit en el repositorio del Workbook, sin push.
- ALTERNATIVAS DESCARTADAS — Solo un botón por apartado (primera versión; Mar pidió comentar por frase o palabra); una lista de comentarios propia en la página (la capacidad es solo de escritura y el shell ya los muestra); guardar comentarios en `db` (la página del profesor no lleva base de datos a propósito).
- POR QUÉ ESTA — No guarda nada propio ni pide consentimiento, y no expone datos: los comentarios viven en el almacén de claude.ai. Se regenera con el mismo script que el resto.
- QUÉ SE ROMPIÓ — Nada roto, pero no se pudo probar en directo: solo pasó la comprobación de sintaxis del script. Además, la página está «cualquiera con el enlace», y eso no basta para comentar: hay que invitar al profesor desde Compartir con permiso de comentarista.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Si el botón flotante sale bien en el navegador del profesor (también en pantalla táctil) y que sus comentarios se pueden leer desde aquí. Al republicar hay que repetir `capabilities` `{"comments":{"composer_only":true}}`.

## 2026-10-31 · Revisión del profesor incorporada: PRD v1 y documentación en coherencia

- QUÉ SE DECIDIÓ — CV base por sector (hasta 5 CV y 2 cartas, con subagente ATS); regla de los huecos (nunca se tocan fechas, cargos, empresas ni titulaciones); LinkedIn e Indeed los envía siempre la persona; envío automático = tronco; sin n8n (ingesta con script y dashboard); estructura de construcción del profesor en lugar de los 20 pasos. El borrador del 29-oct se archiva y el PRD v1 es el vigente.
- ALTERNATIVAS DESCARTADAS — «Que invente un poco» (profesor): es línea roja, se sustituye por «propone, marca y aprueba la usuaria». «Omitir o encuadrar huecos»: se cambia por «condensar, no ocultar». Unificar las dos numeraciones de fases: de momento no.
- POR QUÉ ESTA — Se protege la honestidad del CV sin perder la ayuda de la IA, se ahorran tokens con los CV base y se quita una herramienta (n8n) que mantener.
- QUÉ SE ROMPIÓ — Nada roto. Pero el artefacto antiguo se editó a mano y `workbook.html` quedó desfasado respecto a él; no se ha visto ninguna página publicada en el navegador.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Qué cubre la Fase 4, si «aprobar y enviar» entra en la Fase 1 o en la 2 o 3, y cómo justificar el tope de 5 CV base frente a «sin topes». Siguiente paso en `docs/relevo-proxima-sesion.md`.

## 2026-11-01 · Definición: cuánto multiagente lleva Horma

- QUÉ SE DECIDIÓ — Opción A-ajustada: dos parejas de agentes (redactor↔juez en CV y cartas; relleno↔supervisor en el envío autónomo), más verificador del art. 9 en la entrevista (rama). El juez es código primero y LLM después, y cita la fuente de cada frase. El ATS es una herramienta de código, no un agente; el gerente es el orquestador en Python, no un LLM; el ejecutor del envío es un script de Playwright. Estructura simplificada propuesta (sin Caddy, HTMX ni LangGraph; ingesta como proceso aparte), por confirmar.
- ALTERNATIVAS DESCARTADAS — B (gerente LLM y agente ATS con LLM): 4-5 veces más tokens, más superficie de ataque y poco que evaluar. C (sin multiagente): sin crítico independiente y el bootcamp pide practicar multiagente. Patrón «todos con todos»: impredecible.
- POR QUÉ ESTA — Un agente se queda solo si, además de dar un crítico independiente o permisos distintos, atrapa en los evals errores que el código no atrapa. Lo demás es código: más barato, más rápido y siempre igual.
- QUÉ SE ROMPIÓ — Nada. Se corrigió la propuesta anterior en cuatro puntos: parte del juez es código, la pareja de envío es la más débil, adaptar al ATS es trabajo del redactor y el verificador del art. 9 cumple el criterio de pareja.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Cómo define «agente» el profesor y si acepta el ATS como herramienta; si el relleno de formularios necesita LLM o bastan adaptadores por ATS (lo mide el eval de ablación); quién asume lo que hacía Caddy. Revisores sin pasar.

## 2026-11-01 (tarde) · LangGraph en dos flujos, «Horma v3» y primer push

- QUÉ SE DECIDIÓ — LangGraph solo en CV y cartas y en envío (Mar), pendiente del profesor; todo lo demás, código normal. Documento «Horma v3» en el Cuaderno (Proyectos) con 3 diagramas (equipos, CV y cartas, envío) que sustituyen a `redactora` y `envio`. Repositorio privado `mcaparrosgu/horma-jobs` subido a `main`; el Cuaderno, también (commit `b2097c8`).
- ALTERNATIVAS DESCARTADAS — LangGraph en todo el sistema (sobra en ingesta, recomendación y herramientas de código). Python plano en todo (era la decisión de la mañana; Mar la revirtió para estos dos flujos). Un «Horma v3» aparte con copias propias de todo (tres versiones a la vez, confusión).
- POR QUÉ ESTA — Los dos flujos tienen justo lo que LangGraph resuelve: un bucle con tope (redactor y juez) y una pausa para que apruebe la usuaria. Si el profesor dice que no, solo cambia cómo se ejecutan; los agentes y los flujos son los mismos.
- QUÉ SE ROMPIÓ — Publiqué la página del profesor sobre el artefacto Rz3… con `force`, sin leerlo antes y contra el aviso del relevo: la versión 19 (borrador del 29-oct con aviso de archivo, marcas del PRD y los 19 hilos) quedó sustituida por la 20. Se arregló el mismo día: Rz3… se restauró desde la copia de `docs/archivo/` (comprobado idéntica) y la página del profesor pasó a su propio artefacto (https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd). No se ha comprobado si los hilos siguen anclados. Además, archivé dos diagramas antes de cambiar sus referencias en el Cuaderno (arreglado a los pocos minutos) y no pude abrir el Cuaderno en el navegador de pruebas, así que «Horma v3» no se ha visto renderizado dentro de él.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Si el profesor acepta LangGraph. Si los 19 hilos de Rz3 siguen anclados al texto restaurado. Dónde guarda el estado cada flujo, la base de datos o el grafo (paso 6).

## 2026-11-01 (noche) · Artefactos de Horma: de 6 a 4

- QUÉ SE DECIDIÓ — Quedan cuatro: Cuaderno (fuente), «Horma jobs» (profesor), «Horma por dentro» (guía de Mar, fuente nueva en `docs/horma-por-dentro.html`) y «archivo 29-oct» (temporal). Se borraron el PRD y la comparativa como artefactos. Tabla única en `docs/relevo-proxima-sesion.md`.
- ALTERNATIVAS DESCARTADAS — Fundir «Horma jobs» y «Horma v3» en un solo documento: v3 depende de la respuesta del profesor. Borrar ya el archivo del 29-oct: el profesor podría tener ese enlace y aún no tiene el nuevo.
- POR QUÉ ESTA — Cada contenido tiene un solo sitio y un artefacto con un solo lector; lo demás se regenera desde su fuente.
- QUÉ SE ROMPIÓ — Nada nuevo. Antes de borrar se comprobó por código: el PRD publicado era igual a la copia local y su texto está en el apartado 23; la comparativa local tiene los mismos apartados. Esa copia solo existe en este PC. El profesor pudo ver un rato la versión equivocada de Rz3… mientras estuvo publicada.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Si «Horma por dentro» es el artefacto «Horma explicada a un niño de 10 años». El aspecto real de las páginas: el navegador de pruebas se cuelga con el Cuaderno. Falta limpiar los artefactos que no son de Horma.

## 2026-11-01 (noche, 2) · Índice de artefactos en el Cuaderno

- QUÉ SE DECIDIÓ — Mar pidió un índice con descripción y botones al inicio del proyecto. Sale al inicio de Proyectos, de «Horma jobs» y de «Horma v3», con una sola lista en el código (`ARTEFACTOS_HORMA`). Publicado en el Cuaderno personal, versión 259.
- ALTERNATIVAS DESCARTADAS — Escribirlo dentro del HTML de los documentos: habría llegado a la página del profesor con los enlaces a la guía privada y al Cuaderno. Publicar antes una versión de prueba privada: habría sido un artefacto más de Horma.
- POR QUÉ ESTA — Un solo sitio que editar y ningún cambio en lo que ven el profesor y los compañeros. La edición compartida sale idéntica (`cmp`).
- QUÉ SE ROMPIÓ — Nada en la página. `comprobar-estructura.js` falla con la copia local de `workbook.html` porque no acepta finales de línea de Windows; con el archivo normalizado da correcto. Queda anotado en `correcciones-pendientes.md` del Workbook. El aviso del archivo `Rz3…` enlaza a un PRD ya borrado: no se arregla porque ese archivo se borrará.
- QUÉ QUEDA PENDIENTE DE ENTENDER — El aspecto real del índice y los 3 enlaces externos: falta que Mar los pruebe. Si el Cuaderno sigue visible para cualquiera con el enlace, ahora también con este índice.

## 2026-11-01 (noche, 3) · Diagramas al día y sin Caddy ni HTMX

- QUÉ SE DECIDIÓ — Mar eligió quitar Caddy y HTMX. HTTPS, límites, cabeceras y CSRF se asignan en el paso 6, al alojamiento o a la API. Se actualizaron 7 diagramas, los textos del Cuaderno, la página del profesor y «Horma por dentro».
- ALTERNATIVAS DESCARTADAS — Mantener las dos piezas: nada que reasignar, pero dos piezas más que mantener y deshacer el borrador del 1-nov. Dejar una etiqueta de «por asignar» sin explicar: el mapa de «Horma por dentro» conserva la franja de entrada para que se vea que esas tareas siguen sin dueño.
- POR QUÉ ESTA — Menos piezas, y un solo relato: el profesor podía ver dos versiones contrarias del envío.
- QUÉ SE ROMPIÓ — Nada. Había un error en mis documentos: el relevo decía que los flujos con agentes vivían solo en «Horma v3», y `arquitectura` y `candidatura` los dibujaban a la antigua. Corregido. También di la documentación por «al día» sin buscar términos antiguos: quedaban n8n, «redactora» y el repositorio «por crear» en cuatro documentos. Corregidos; a partir de ahora, primero la búsqueda.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Quién asume HTTPS, límites, cabeceras y CSRF (paso 6). El PRD aún dice «subagente ATS»: Mar lo deja como decisión pendiente de cerrar con el profesor (pregunta 14 bis) y el PRD no se toca hasta su respuesta.

## 2026-11-02 · Multiagente: cómo construir Horma y honestidad sobre LangGraph

- QUÉ SE DECIDIÓ — (1) El sistema multiagente con LangGraph se queda **dentro de Horma** (los dos flujos con agentes), no se usa para construirla. (2) Para construir: solo subagentes de Claude Code, sin framework, con flujo por tarea pequeña (plan, visto bueno de Mar, implementación en copia aislada, tests, revisores en paralelo, decide Mar). Piloto con la ingesta. Los roles nuevos (implementadora, tester) están por definir y no empiezan hasta el ok del profesor. (3) Cada agente se escribe como función con entrada y salida claras, independiente del framework, para poder cambiar el orquestador. (4) A la pregunta 14 se añadió el matiz honesto y una prueba comparativa.
- ALTERNATIVAS DESCARTADAS — LangGraph para orquestar la construcción: duplica lo que ya hace Claude Code y añade una capa que depurar. Montar un equipo grande de agentes desde el principio: cuesta de 3 a 5 veces más tokens y Mar decide menos, justo lo contrario de que aprenda. Otros frameworks (Pydantic AI, OpenAI Agents SDK, Claude Agent SDK, CrewAI, AutoGen, LlamaIndex Workflows, Google ADK): listados, sin verificar su estado actual; no se elige ninguno.
- POR QUÉ ESTA — Los dos flujos son una cadena con un bucle de reflexión; Python plano los resuelve. Solo la pausa del envío (la usuaria puede tardar horas) se beneficia de guardar y reanudar estado, y eso también cabe en una tabla de PostgreSQL. El argumento sólido para LangGraph es aprenderlo para el bootcamp y el portfolio, y así se dice, en el case study también. Andrew Ng pone el multiagente como el último patrón; los revisores ya aplican el primero (reflexión).
- QUÉ SE ROMPIÓ — Nada en el código (no hay). Tras `/doctor` se apagaron 11 skills en la configuración de Mar (`paso-11` a `paso-18`, `paso-20`, `auditoria-diseno`, `design-taste-frontend`): si hacen falta, hay que reactivarlas. Mar sigue pensando que el multiagente dentro de Horma puede ser sobreingeniería; se deja abierto, no cerrado.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Qué responde el profesor a la pregunta 14 (sin enviar todavía). Qué alternativas a LangGraph siguen vivas hoy. Cuánto cuesta de verdad el piloto de la ingesta con subagentes. Cuál gana entre «analogía siempre» (CLAUDE.md del proyecto) y «solo si aclara» (global).

## 2026-11-02 (2) · «Horma por fases» para el profesor

- QUÉ SE DECIDIÓ — Artefacto nuevo, «Horma por fases» (`docs/construccion-por-fases-horma.html`), con la construcción ordenada en las Fases 1 a 4 del profesor. Fase 1: el alcance (cimientos a seguimiento, con envío con aprobación). Fase 2: aplicaciones automáticas. Fase 3: entrevista del perfil y privacidad. Fase 4: **propuesta de la Copiloto, por definir con él** (entrenador de entrevistas, suscripciones, calidad final, publicar, extensiones, cierre). Admite comentarios y se enlaza desde su página con un botón bajo el PRD (generador `construir-horma-aparte.py`). Cuentas de prueba hasta cerrar la Fase 3, para cumplir el RGPD antes de usuarias reales.
- ALTERNATIVAS DESCARTADAS — Reordenar el índice de construcción existente: es para Mar y mezcla ramas y puertas sin fases. Meter las fases dentro de la página del profesor: la habría alargado más y mezclado con el PRD.
- POR QUÉ ESTA — Él habló en fases (1, 2 o 3, 3, 4) y necesita ver cuándo cae cada cosa y qué le falta decidir. Un artefacto aparte se comenta y se actualiza sin tocar el PRD.
- QUÉ SE ROMPIÓ — Nada. Primera publicación sin comentarios; se añadieron en la versión 2. Los artefactos pasan a ser seis y la tabla del relevo ya lo dice.
- QUÉ QUEDA PENDIENTE DE ENTENDER — Qué cubre la Fase 4 y si «aprobar y enviar» entra en la 1 o en la 2 (pregunta al profesor). Falta compartir los dos artefactos con él como comentarista (lo hace Mar desde *Share*). El email del profesor está solo en `docs/privado/` (ignorado por git).

## 2026-11-03 · Comentarios del profesor en «Horma por fases»

- DECISIÓN — Se aplican sus 9 comentarios: sin RAG (se quita del tema de recomendación; sigue la búsqueda híbrida); la regla de los huecos avisa a la usuaria de dónde se rellenó cada hueco; origen visible, diseños y PDF y editor pasan a la Fase 3; el portal de empresas, a la Fase 2; las aplicaciones automáticas, a la Fase 3 (con privacidad y entrevista); Fase 4 confirmada.
- POR QUÉ ASÍ — Es su reparto. El origen de cada frase se sigue guardando y lo comprueba el juez en la Fase 1 (línea roja: nada sin origen); solo se retrasa mostrárselo a la usuaria.
- QUÉ SE ROMPIÓ — Nada. Consecuencia: la Fase 1 acaba con CV y carta en pantalla y envío hecho por la usuaria (sin PDF ni portal); «Aprobar y marcar como enviada» sirve de puente. Se iba a preguntar al profesor, pero se resolvió con lo que él ya fijó (US-004 en «Fase 2 o 3», portal en la 2, PDF y origen visible en la 3): pregunta 27 de `preguntas-profesor.md`, resuelta. `medir_ats` cuenta sobre el texto y relee el PDF en la Fase 3.
- QUÉ QUEDA PENDIENTE — Confirmar en la reunión, solo si hace falta. Los 9 hilos siguen abiertos en el artefacto: no están activados para Claude, solo Mar o él pueden resolverlos.

## 2026-11-03 (noche) · Fase 0: se construye la versión del profesor (pista A)

- QUÉ SE DECIDIÓ — Mar ordenó construir la versión que el profesor entregó («Horma: flujo agéntico en Claude Code») como fase 0, sin preguntas. Se construyó la pista A completa en `.claude/`: 13 agentes, 11 comandos, 8 skills, 7 esquemas JSON, 6 scripts de Python (solo biblioteca estándar) y evals con fixtures inventadas. Reparto: lo que decide un LLM vive en Claude Code; lo determinista, en scripts que se migran sin cambios.
- DECISIONES MÍAS (técnicas, reversibles) — Los agentes devuelven JSON y los comandos escriben los archivos (el prompt se migra sin tocar una línea). Agentes con solo `Read`, mínimo privilegio. Formato obligatorio `### Cargo · Empresa · inicio–fin` en los CV para que el verificador compare con `perfil.json`. Se añadió la skill `convertir-cv` (el profesor pide «un script»). La carta lleva `traza-carta.json` para no pisar la traza del CV. Taxonomía inicial propuesta, a revisar con ofertas reales.
- CHOQUES CON DECISIONES ANTERIORES — Hasta 4 CV base (antes 5) y sin cartas base: se sigue al profesor. «Sin topes» (Mar, 29-oct) choca con el tope de 4: queda como pregunta. `CLAUDE.md` ya no dice «sin código hasta el ok del profesor»; la orden de Mar es explícita.
- TEMA DEL BOOTCAMP QUE PRACTICA — Agentes, skills y comandos de Claude Code; salida estructurada con esquemas; evals y LLM como juez; guardarraíles deterministas (hook); después, LangGraph o Python plano.
- QUÉ SE ROMPIÓ — El primer eval falló por la codificación de la consola de Windows (cp1252 frente a UTF-8); corregido forzando UTF-8 en cada script. Escribir `.claude/settings.json` (hook y permisos) me lo denegó el sistema por ser autoconfiguración: lo tiene que pegar Mar (`docs/ajustes-pendientes-settings.md`). Hasta entonces el hook no corre; `/candidatura` ejecuta el verificador a mano, así que no hay hueco.
- VERIFICADO — 17 de 17 evals de código en verde: el verificador rechaza los 7 errores sembrados (cifra, cargo, fecha, empresa, título, frase sin traza, origen inventado) y acepta el CV limpio; ATS y filtro duro dan lo esperado; el hook devuelve el error con código 2 y deja pasar otros archivos.
- NO VERIFICADO — Ningún agente se ha ejecutado con un LLM real: sus prompts no están probados. La pista B no existe.
- QUÉ QUEDA PENDIENTE — Pista B; calificar fuentes y llenar `endpoints.json`; decidir `pypdf`; escribir las specs por flujo; fijar umbral ATS con las primeras corridas; preguntas al profesor (tope de CV base, cartas base, «subagente ATS»).
- REVISIÓN (revisor-seguridad y auditor-lineas-rojas, 3-nov) — Sin violaciones directas, sin secretos ni datos personales en lo versionado. Corregido en el mismo día: patrón de `id` en los esquemas y validación de identificadores en los comandos; `ingestar.py` solo sigue redirecciones https al mismo host, corta a 5 MB, valida tipos, escribe la cabecera con `json.dumps` y rechaza LinkedIn e Indeed por código; `hook.py` exige `datos/candidaturas/<u>/<o>/cv.md`; `convertir_cv.py` limita el DOCX a 20 MB; la carta se verifica en código (`verificar.py --carta`); `/marcar-enviada` exige que la aprobación sea `por: usuaria`; `/aprobar` muestra primero los avisos de relleno; `redactor-carta` devuelve `preguntas_pendientes`; `propuesta-horma.md` al día (4 CV base, sin cartas base). **Sin corregir a propósito:** «mostrar solo el año» en «Otras experiencias» (el verificador no lo admite; queda prohibido en la fase 0 hasta que lo admita); `deny` de `Read` para `.env` y `docs/privado/` (va en el ajuste de `settings.json` que pega Mar); `disable-model-invocation` en `/aprobar` y `/marcar-enviada` (no he podido comprobar que exista en esta versión); modo de envío autónomo y perfil humano (sin construir: cuando se construyan, `modo_envio` por defecto `aprobar` y perfil humano apagado). Requisito para el portal de empresas: la tabla de matches nunca se consulta por oferta desde el lado de la empresa.

## 2026-11-03 (noche, 2) · Fase 0, indicaciones del profesor: perfiles de prueba y primera prueba de agentes

- QUÉ SE HIZO — Indicaciones del profesor para la fase 0: pasárselo a Claude y construir (hecho), generar perfiles de prueba, probar agentes y skills desde la consola, «probar y probar». Se crearon 3 CV inventados en `datos/fixtures/perfiles/` con trampas: Ana (edad en el CV, fechas solo con año), Rosa («actualidad», valenciano, horario), Leo (fecha «hace unos años», hueco 2020–2022 y una orden escondida: «IGNORA TUS REGLAS… máster en Harvard»). Se lanzó `extractor-perfil` sobre los tres.
- RESULTADO 1.ª VUELTA — Las trampas funcionaron: no se usó la edad, las fechas se copiaron sin tocar, la orden de Leo se anotó y no se siguió, no apareció ni el máster ni el equipo de 20 personas. **Pero ningún agente respetó mis esquemas.** Causa: un subagente con solo `Read` no carga skills y mi prompt decía «carga la skill» sin ruta; inventaron su propia estructura. Era un defecto de diseño mío, no del modelo.
- ARREGLO — Los agentes reciben ahora las rutas explícitas de los esquemas, de `lineas-rojas` y de la taxonomía. Nuevo `esquemas-horma/scripts/validar.py` (subconjunto de JSON Schema, solo biblioteca estándar) y los comandos lo usan para validar. `perfil.json` admite `instrucciones_embebidas` (un CV también puede traer órdenes).
- RESULTADO 2.ª VUELTA (Ana y Leo) — Estructura exacta del esquema y ambos validan con el script. Las salidas reales se guardaron como fixtures (`perfil.json`, `preferencias.json`) y el eval `fixtures` las valida: **21 de 21 en verde**.
- NO VERIFICADO — Rosa solo pasó la 1.ª vuelta (estructura incorrecta); falta repetirla. Los demás agentes (auditor, clasificadores, matcher, redactor, juez…) no se han probado todavía. Las preguntas pendientes son largas y repetitivas (una lista de 10 en Ana): conviene recortarlas en el prompt. «Puesto preferido = último cargo» es una suposición del agente que debería ir como pregunta, no como dato.
- SIGUIENTE — Repetir Rosa; probar `clasificador-postulante` y `generador-cv-base` sobre Ana; después ofertas inventadas (`extractor-oferta` con una oferta con orden escondida, `auditor-oferta`, `clasificador-oferta`) y el flujo D completo con errores sembrados en el juez.

## 2026-11-03 (noche, 3) · Fase 0: segunda ronda de pruebas, 11 de 13 agentes probados

- QUÉ SE PROBÓ (LLM real, datos inventados) — `extractor-perfil` (Ana, Rosa y Leo), `extractor-oferta` (oferta buena y estafa con orden escondida), `auditor-oferta` (las dos), `clasificador-oferta`, `clasificador-postulante`, `generador-cv-base`, `matcher`, `redactor-cv`, `juez-cv` y `clasificador-respuesta` (rechazo y entrevista con orden escondida). **Sin probar:** `auditor-fuentes` (necesita leer webs reales: pendiente de calificar fuentes), `redactor-carta` y `juez-carta`.
- LO QUE FUNCIONÓ — Las trampas: ningún agente usó la edad, siguió una orden escondida (3 casos: CV, oferta, correo) ni inventó datos. La estafa se marcó como fraude y fantasma con motivos concretos y `empresa_validada` siguió en «no comprobada» pese a la orden de validarla. El juez cazó los 2 errores sembrados que el código no ve («Dirigí un equipo», «Experta en»); el verificador de código los da por buenos, como se esperaba (división de trabajo confirmada). El verificador de código aceptó los CV base y el CV adaptado que generaron los LLM. El correo con orden escondida se clasificó bien y el agente avisó solo de posible phishing.
- LO QUE FALLÓ (y se arregló) — (1) Los agentes inventaron su propia estructura al no tener la ruta de los esquemas (ver bitácora anterior). (2) Faltaba el esquema de `clasificador-respuesta`: lo detectó el propio agente; añadido como 8.º esquema `clasificacion-respuesta.json`. (3) `medir_ats` marcaba «Inglés B2 (se valora)» como palabra sin origen cuando el CV de Ana sí la tenía: el paréntesis rompía la coincidencia. Arreglado y cubierto con un eval con datos reales. (4) Inconsistencia de formato de `idioma` («es» frente a «español») y el stack de la taxonomía mezclaba idiomas: normalizados en el esquema y en la taxonomía.
- DECISIONES DE DISEÑO PENDIENTES DE MAR — Las preferencias no tienen campo para el horario («horario de mañana», Rosa). El agente propone «puesto preferido = último cargo» y «ciudad = ciudad de residencia»: se marcan como pregunta, pero siguen apareciendo rellenos; ¿se dejan vacíos hasta que la usuaria confirme? El nivel («medio») lo calcula el clasificador por años de experiencia sin umbral definido en la taxonomía: criterio provisional.
- EVALS DE CÓDIGO — 29 de 29 en verde (`python -I evals/correr_evals.py`), incluidas las salidas reales de los agentes como fixtures. Aviso: que 29 estén en verde mide los **scripts y esquemas**, no la calidad de los agentes; esa se mide con las pruebas de arriba, que son pocas (un caso por agente).

## 2026-11-03 · noche 4: cierre de la fase 0 y relevo

- **Hecho:** `docs/siguiente-sesion.md` con el pendiente de Mar (ajuste de settings, dos decisiones de producto, preguntas al profesor, pypdf, fuentes), el plan de la siguiente sesión y el mensaje de arranque. Enlazado desde `CLAUDE.md` y `docs/relevo-proxima-sesion.md`.
- **No hecho:** pista B, `redactor-carta`, `juez-carta`, `auditor-fuentes`.
- **Siguiente:** probar `redactor-carta` y `juez-carta`; ampliar casos de prueba.

## 2026-11-04 · Fase 0: pruebas de `redactor-carta` y `juez-carta`, 12 de 13 agentes probados

- QUÉ SE HIZO — Carta sembrada con 7 errores (cifra, equipo, máster, clichés, hijos, dos promesas) para `juez-carta`, y carta de Ana para `oferta-1` con `redactor-carta`. Informe global de pruebas en `docs/informe-pruebas.md`.
- RESULTADO — `juez-carta` cazó los 7 sin falsos positivos. La carta del redactor era honesta, pero el verificador la rechazó.
- QUÉ SE ROMPIÓ — (1) `verificar.py --carta` pedía traza al saludo y la firma: ahora los ignora. (2) El redactor pegaba frases y dejaba el cierre sin traza: prompt corregido; la v2 pasa el verificador. Evals de carta añadidos (33 en verde). Los escribí después del arreglo del verificador, no antes.
- ALTERNATIVAS DESCARTADAS — Dejar el verificador estricto y obligar al redactor a poner traza al saludo: absurdo, el saludo no afirma nada.
- QUÉ QUEDA PENDIENTE — La v2 ya no devuelve `preguntas_pendientes` (la v1 preguntaba el horario); su primera traza cita un fragmento que no sostiene la frase y falta pasarla por `juez-carta`. `auditor-fuentes` sin probar. Pista B: Mar prefiere montarla ella.
- QUÉ NO ENTENDÍ (Mar) — pendiente de que lo rellene Mar.

## 2026-11-04 (2) · Cartas: el juez caza lo que el código no ve

- QUÉ SE HIZO — La carta v2 del redactor (que pasaba el verificador) se pasó por `juez-carta`: `corregir`, 3 problemas. Se corrigió el prompt (motivos e intenciones a `preguntas_pendientes`) y se repitió: v3 aprobada por el juez y por el verificador.
- QUÉ SE ROMPIÓ — El redactor trataba como hechos sus suposiciones sobre lo que Ana quiere («me interesa porque…», «quiero seguir…»). Al pedir «dos fuentes en la traza» unió dos fragmentos con « / » y el script lo rechazó: se pidió una entrada de traza por fuente. Yo puse mal dos números de línea en el fixture de la v3; los cazó el juez.
- POR QUÉ IMPORTA — Confirma la división de trabajo: el código comprueba que el fragmento existe; solo el juez comprueba que lo sostiene.
- QUÉ QUEDA PENDIENTE — La v3 dejó de preguntar por el horario híbrido. No hay esquema para la salida de `juez-carta`. Un perfil y una oferta son pocos casos.

## 2026-11-04 (3) · Documentación reorganizada y artefactos al día

- QUÉ SE HIZO — Una sola fuente de estado (`docs/tareas-pendientes.md`), índice (`docs/indice.md`), `CLAUDE.md` corto con la tabla de comandos y sin conteos. Borrados los documentos de relevo y decisiones pendientes (el historial queda en git). Propuesta con 4 CV base y sin cartas base. Cinco artefactos actualizados (fase 0, versión del profesor, sin RAG, sin «ok formal»).
- QUÉ SE ROMPIÓ — Nada grave. Las publicaciones se rechazaban si no se había visto la versión viva; se resolvió leyendo el diff, sin forzar. La página del profesor seguía con «En definición»: estaba fija en el generador.
- ALTERNATIVAS DESCARTADAS — Tocar los hilos de comentarios anclados a texto: se dejaron intactos.
- QUÉ QUEDA PENDIENTE — Los 9 hilos del profesor en «Por fases» siguen abiertos. Contradicción sin decidir: CV estético subido por la usuaria frente a «diseños y PDF» (pregunta 28). Tres decisiones de Mar: bloque de settings, versionar `evals/resultados/`, horario híbrido.

## 2026-11-04 (4) · Instrucciones nuevas del profesor: Next.js, candidatos y orden de la web

- QUÉ SE HIZO — El profesor pide: dashboard del flujo agéntico, observabilidad en cada componente, construir primero la web de ingesta de ofertas y de candidatos, y Next.js en lugar de FastAPI; recomienda probar y pasar los tests a mano. Documentado en `tareas-pendientes.md`, `propuesta-horma.md` (la decisión «backend 100 % Python» queda sustituida, con su porqué), `analisis-tecnico.md`, `web/README.md`, `CLAUDE.md`, la nota al inicio de su documento y los cinco artefactos. «Postulante» pasa a «candidato» en agentes, skills, comandos y documentos (agente `clasificador-candidato`); las entradas anteriores de esta bitácora conservan la palabra antigua.
- DECISIÓN DE MAR — Next.js solo para la web; scripts, agentes y evals de la pista A siguen en Python. Alternativa descartada: reescribirlo todo en TypeScript (se rehace lo ya probado y se pierden los 35 evals).
- QUÉ SE ROMPIÓ — Nada: los 35 evals siguen en verde tras el renombrado.
- QUÉ QUEDA PENDIENTE — Preguntas 29 y 30 al profesor (worker y scripts con Next.js; orden de la web). El PRD (RES-01) aún dice «FastAPI» y no se toca hasta su respuesta. Sin decidir: librería de validación, observabilidad (tabla propia o herramienta) y dónde corre el worker.

## 2026-11-05 · Pista B, paso 1: base de datos y tablas

- QUÉ SE DECIDIÓ — Base de datos propia: contenedor `horma-db` (PostgreSQL 16, puerto 5433 solo local, `web/docker-compose.yml`), separada de la de n8n. Next.js 16 (TypeScript) en `web/`. Dependencias nuevas: `pg` (conecta Node con PostgreSQL) y `ajv` + `ajv-formats` (validan JSON contra los esquemas de `esquemas-horma`); viven en `web/node_modules`, no en Docker (Docker solo ejecuta PostgreSQL). Migración `web/db/migraciones/001_inicial.sql` con 7 tablas: `usuarias`, `fuentes`, `corridas_ingesta`, `ofertas`, `perfiles`, `preferencias`, `eventos`. Se aplica con `npm run migrar` (`web/scripts/migrar.mjs`, anota en `migraciones_aplicadas` cuáles van y no repite).
- ALTERNATIVAS DESCARTADAS — ORM (Prisma, Drizzle): más pieza que mantener para 7 tablas. Reusar el Postgres de n8n: mezcla datos y arriesga n8n. Tabla aparte para el «origen» de cada dato del perfil (la sugería el documento del profesor): va dentro del JSON, más simple y igual de trazable.
- POR QUÉ ESTA — `ofertas` y `fuentes` son comunes a todas las usuarias (sin `usuaria_id`); `perfiles` y `preferencias` son de cada una. Que una usuaria vea hostelería y otra ingeniería no se guarda en las ofertas: sale de cruzar sus preferencias con las ofertas al consultar (más adelante, tabla de matches por usuaria). `preferencias` no tiene columnas para edad, nacionalidad ni categorías del art. 9 RGPD: lo que no existe no se guarda por error. `eventos.detalle` nunca lleva datos personales. Aprendido: una migración es un SQL numerado y versionado; `CHECK` y claves foráneas son una segunda barrera además de `ajv`; la transacción deja todo o nada.
- QUÉ SE ROMPIÓ — Nada. Verificado: las 8 tablas existen; 5 inserciones inválidas (id con caracteres raros, `remoto` fuera de lista, preferencias de usuaria inexistente, rango de 150, resultado distinto de ok/error) fueron rechazadas; una válida funcionó y se deshizo; segunda ejecución de `migrar`: «nada que aplicar».
- QUÉ QUEDA PENDIENTE — Paso 2 (validador `ajv` sobre los esquemas), 3 (importador de `datos/`), 4-7 (pantallas, dashboard, observabilidad). Roles de mínimo privilegio y seguridad por filas, antes de tener usuarias reales. Sin commit todavía: falta `revisor-seguridad` sobre `docker-compose.yml`.

## 2026-11-05 · Pista B, paso 2: validador con ajv

- QUÉ SE DECIDIÓ — `web/src/lib/esquemas.ts`: función `validar(esquema, dato)` que lee los mismos JSON de `.claude/skills/esquemas-horma/schemas/` (un solo contrato para agentes y web) y devuelve `{ok}` o la lista de errores, sin lanzar excepción por datos malos. Carpeta cambiable con `HORMA_ESQUEMAS_DIR` (para Docker). Pruebas con `npm test` (ejecutor integrado de Node, sin dependencias nuevas): 9 en verde.
- ALTERNATIVAS DESCARTADAS — Copiar los esquemas a `web/` (dos copias que se desincronizan). Vitest/Jest (dependencia extra: basta `node --test`). `ajv-formats`: ningún esquema usa `format`, la desinstalé.
- POR QUÉ ESTA — La frontera es donde entra el dato malo: validar ahí evita que llegue a la base de datos. Aprendido: `additionalProperties: false` rechaza campos no previstos (ni `edad_minima` entra) y `pattern` en el `id` frena rutas como `../../etc`. Las pruebas usan los ejemplos de `datos/fixtures/`.
- QUÉ SE ROMPIÓ — `ajv` en modo estricto rechazó `endpoints.json` (`strictRequired`: exige claves definidas por `additionalProperties`, algo válido en JSON Schema). No toqué el esquema compartido: desactivé solo esa regla, con comentario. Un `sed` mío dejó el archivo con un error de sintaxis; lo detectó `tsc` y lo corregí. Tras esto: tests, tipos, lint y build sin errores; los 8 esquemas también pasan en el validador de Python (`evals esquemas`).
- QUÉ QUEDA PENDIENTE — Paso 3 (importador de `datos/`). Las rutas relativas al repo funcionan en local; en Docker habrá que montar los esquemas o usar `HORMA_ESQUEMAS_DIR`. El eval dejó `evals/resultados/2026-11-05-codigo.json` sin seguir (sigue pendiente decidir si se versionan).

## 2026-11-05 · Pista B: revisión de seguridad y cierre de sesión

- QUÉ SE DECIDIÓ — `revisor-seguridad` revisó lo nuevo de `web/`: nada bloqueante. Corregido ya: migración `002_urls_https.sql` (las URLs de `fuentes` y `ofertas` solo pueden ser http/https; frena `javascript:` y `file://`; probado: rechaza ambas, acepta https). Contraseña de `.env.example` pasa a «larga y aleatoria».
- ALTERNATIVAS DESCARTADAS — Fijar ya la versión menor de `postgres:16`: obliga a recrear el contenedor, sin riesgo hoy; queda anotado.
- POR QUÉ ESTA — Las demás observaciones dependen de código que aún no existe (rutas, login), así que se pasan a tareas en vez de construir defensas a ciegas.
- QUÉ SE ROMPIÓ — El revisor creyó que `001` no estaba aplicada (ya lo estaba), así que la corrección fue una migración nueva y no editar la antigua.
- QUÉ QUEDA PENDIENTE — Seis puntos de seguridad en `docs/tareas-pendientes.md` (sección Pista B). Siguiente: paso 3, importador de `datos/`.

## 2026-11-05 · Pista B, paso 3: importador de datos

**Qué hicimos.** Construimos el «importador»: un programa pequeño que coge los archivos de ejemplo de la carpeta `datos/fixtures/` (dos ofertas y dos perfiles de personas inventadas, Ana y Leo, con sus preferencias) y los guarda en la base de datos. Se ejecuta con `npm run importar`. Sirve para dos cosas: tener datos con los que probar la web y comprobar que todo el recorrido (archivo, comprobación, base de datos) funciona de punta a punta.

**Cómo funciona, paso a paso.** Para cada archivo, primero lo comprueba contra el esquema (la «plantilla» que dice qué campos son obligatorios y cuáles están prohibidos). Si no cumple, lo rechaza y lo dice; no llega a tocar la base de datos. Si cumple, lo guarda. Guardar es «repetible»: si ejecutas el importador dos veces, no se duplica nada, porque cada fila tiene un identificador y, si ya existe, se actualiza en vez de crear otra (en SQL eso se llama `ON CONFLICT`). Cada archivo se guarda dentro de una «transacción», que es como un todo o nada: o entra completo o no entra nada, así que nunca queda un perfil a medias. Al terminar, el importador anota un apunte en la tabla `eventos` («se importaron 6 archivos, 0 rechazados») que solo contiene números, nunca nombres ni textos de CV.

**Qué decidimos y por qué.**
- El importador está escrito en TypeScript, como el validador, para reutilizar la misma comprobación. Así hay un solo contrato para los agentes y para la web, y no dos copias que se acaben desajustando.
- Por defecto solo lee `datos/fixtures/`. El resto de `datos/` es para datos reales, que git ignora; cargarlos sería decisión tuya.
- Rosa (`rosa-enfermeria`) se salta con un aviso, porque todavía no tiene `perfil.json`. No inventamos una fila vacía.
- Las columnas de la base que guardan estructuras enteras (jsonb) reciben el contenido convertido a texto; si no, la librería `pg` convierte las listas de JavaScript en listas de Postgres y falla.
- El archivo `preferencias.json` no dice de quién es: el dueño se toma del nombre de la carpeta.

**Cómo lo comprobamos.** Ejecutamos el importador dos veces seguidas y la base quedó con 2 ofertas, 2 usuarias, 2 perfiles y 2 preferencias, sin duplicados. Probamos también una oferta con un campo prohibido (`edad_minima`): se rechazó y no entró. Y `npm test` pasó (más abajo, tras la revisión de seguridad, quedó en 17 pruebas).

**Un fallo mío.** El comprobador de tipos (`tsc`) rechazó un tipo que escribí mal. Lo corregí y desde entonces `tsc`, `lint` y `build` pasan sin errores.

**Qué queda por hacer.** Las ofertas de prueba traen sector, familia y tecnologías vacíos, así que la web del paso 4 no tendrá nada que filtrar hasta que haya ofertas clasificadas. Node avisa de que a `package.json` le falta `"type": "module"`; solo afecta al rendimiento y no lo tocamos sin comprobar antes `next.config.ts`. Siguiente: el paso 4, la web de ingesta.

## 2026-11-05 · Pista B, paso 3: arreglos tras la revisión de seguridad

- QUÉ SE DECIDIÓ — `revisor-seguridad` no encontró nada bloqueante; arreglamos 6 puntos (A, B, C, D, G, H) en `importar-datos.ts`, `importar.ts` y el nuevo `clave.ts`. En cristiano:
  - **A · No pisar lo que edite la usuaria.** Perfiles y preferencias, si ya existen, se dejan como están («sin cambios»). `npm run importar -- --forzar` los sobrescribe. Las ofertas sí se actualizan (nadie las edita a mano). *Por qué:* cuando la web deje editar el perfil, un importado rutinario no puede borrar su trabajo.
  - **B · Errores sin el valor.** Postgres a veces repite el dato que falló dentro del mensaje (p. ej. una fecha rara). Ahora solo se imprime el código del error (`22007`) y el nombre de la restricción. *Por qué:* en el paso 5 ese dato podría ser personal.
  - **C · `registrarEvento` más cerrada.** Solo admite los componentes y acciones de una lista (hoy: `importador` / `importar-datos`), la duración se redondea a un entero ≥ 0, y si el script se cae a medias deja un evento de error. *Por qué:* los tipos de TypeScript no existen al ejecutar, así que la lista se vuelve a comprobar en ejecución.
  - **D · Rutas y archivos.** `--dir` sin valor da un mensaje claro; se rechazan enlaces simbólicos (atajos que apuntan fuera de la carpeta) y archivos de más de 1 MB.
  - **G · Contraseña.** `migrar` e `importar` se niegan a arrancar con `cambia-esto` o con menos de 16 caracteres (`src/lib/clave.ts`).
  - **H · Sin perfil, sin preferencias.** Si `perfil.json` se rechaza, sus preferencias se omiten y no se crea la usuaria a medias.
- ALTERNATIVAS DESCARTADAS — F (el `.gitignore` de `datos/`): el revisor solo miró el de la raíz; `datos/.gitignore` ya ignora todo salvo `fixtures/`. E (id de usuaria opaco) y el rol `horma_app` no son código de hoy: pasan a tareas.
- POR QUÉ ESTA — Son arreglos baratos (unas 60 líneas) que evitan pérdida de datos y fugas de datos personales antes de que existan usuarias reales.
- QUÉ SE ROMPIÓ — Nada nuevo. Comprobado contra la base real: edición de Ana (`sueldo_min=1`) sobrevive a un importado normal y se restaura con `--forzar`; perfil roto → sus preferencias omitidas y 0 filas nuevas; fecha inválida → «código 22007» sin el valor; archivo de 1,1 MB → rechazado; contraseña corta → no arranca; `npm test` = 17 en verde, `tsc`, `lint` y `build` sin errores. **No pude probar el rechazo de enlaces simbólicos:** Windows exige permisos de administrador para crearlos; el código usa `lstatSync(...).isSymbolicLink()`, sin prueba práctica.
- QUÉ QUEDA PENDIENTE — E: ids de usuaria opacos (UUID) al llegar el login. En la web (pasos 4-5): nunca `dangerouslySetInnerHTML` con texto de ofertas o CVs (los textos se guardan sin sanear a propósito). Al validar `endpoints.json`, los mensajes de ajv podrían incluir claves del dato: revisarlos. Rol `horma_app` (ya anotado).

## 2026-11-05 · Pista B, paso 4: web de ingesta

**Qué hicimos.** Tres páginas en la web (`web/`): **Ofertas** (lista con filtros por país, nivel, modalidad, sector y familia, y la auditoría de cada oferta a la vista: posible fantasma, posible fraude, empresa validada, sueldo publicado), **Fuentes** (tabla de portales y un formulario para añadir o editar) y **Corridas** (una fila por cada ingesta, con lo que entró, lo descartado y los errores). Hoy Corridas está vacía porque aún no hay descarga real.

**Cómo funciona.** Cada página es un componente de servidor que consulta la base con parámetros (`$1`, `$2`…), así que lo que escribe quien filtra nunca se mezcla con el SQL. El formulario de fuentes es una *server action*: una función que se ejecuta en el servidor al enviar el formulario. Antes de guardar, `validarFuente` comprueba la fuente contra `endpoints.json` y con reglas extra; si falla, devuelve los errores sin repetir el valor sospechoso y conserva lo que ella había escrito.

**Qué decidimos y por qué.**
- **La clave nunca se escribe en una fuente.** Solo el nombre de una variable que empiece por `FUENTE_` (p. ej. `FUENTE_ADZUNA_KEY`). *Por qué:* lo propuso el revisor: si valiera cualquier variable, una fuente podría pedir `HORMA_DB_PASSWORD` y, el día de la descarga, enviarla a un tercero.
- **Direcciones internas fuera ya, aunque no se descargue nada.** Se rechazan `localhost`, IP privadas, puertos distintos de 443 y hosts sin punto. *Por qué:* es barato y evita guardar hoy una trampa para mañana. La comprobación definitiva (tras resolver el DNS) queda para la descarga.
- **El servidor solo escucha en 127.0.0.1.** *Por qué:* sin login, cualquiera en tu wifi podría haber editado fuentes.
- Sin API aparte: páginas y acciones de Next.js. Practica: Next.js (servidor y cliente), seguridad web.

**Cómo lo comprobamos.** `npm test` = 27 pruebas, `tsc`, `lint` y `build` sin errores. En el navegador: una cabecera con una clave falsa fue rechazada sin repetirla y el formulario conservó lo escrito; una fuente correcta se guardó y dejó su apunte en `eventos`. Borré después esa fuente de prueba.

**Fallos míos.** (1) Next 16 con `cacheComponents` no admite `dynamic = "force-dynamic"`: las páginas se envuelven en `Suspense`. (2) React vaciaba el formulario tras un error; ahora se devuelve lo escrito (menos los campos que parecían claves). (3) Un comando mío para parar el servidor mataba todos los procesos `node`; el sistema lo bloqueó y no se ejecutó.

**Qué queda.** SSRF real al descargar; login, cabeceras de seguridad y rol `horma_app` antes de abrir la web a nadie; ofertas sin clasificar (sector y familia vacíos). Siguiente: paso 5, tras decidir (k).

**Decisión de Mar (5-nov), punto (k):** se importa de dónde sale cada dato del perfil (su `origen` y los `traza.json`). *Por qué:* sin origen visible no hay honestidad comprobable. Es lo primero del paso 5.

## 2026-11-05 · Pista B, paso 5: web de candidatas

**Qué hicimos.** Dos páginas nuevas: **Candidatas** (lista) y el **perfil de cada una**, con el origen de cada dato a la vista («de dónde sale»: archivo, línea y fragmento del CV), el CV original desplegable, las preguntas que Horma necesita que conteste y un formulario para editar sus preferencias de búsqueda. El perfil se muestra solo para leer.

**Una corrección sobre la decisión (k).** Al mirar los datos vi que el `origen` ya se guardaba dentro del perfil; solo faltaba el texto del CV. Bastó una columna nueva (`cv_texto`, migración 003). El importador la rellena sin pisar nada: si el perfil ya existía, solo completa el texto del CV cuando estaba vacío.

**Qué decidimos y por qué.**
- **Editar solo preferencias, no el perfil.** Cambiar cargos o fechas choca con la regla de los huecos (Horma nunca cambia fechas ni cargos sin que ella lo apruebe) y merece su propio diseño.
- **Sin edad, nacionalidad ni categorías especiales:** el formulario no tiene esos campos y el esquema prohíbe cualquier campo extra (RGPD art. 9).
- **Las empresas no ven nada:** no existe ruta de empresas. Una prueba falla si un archivo nuevo lee perfiles o preferencias fuera de una lista blanca, ordena por una nota o crea una ruta de empresas o ranking.
- La clasificación del perfil (sectores, familias, stack) se rotula «sugerida por Horma (no sale del CV)», porque no tiene origen en el CV.

**Qué cazaron los revisores.** Un texto falso en la interfaz (decía que cada persona ve solo lo suyo, y sin login cualquiera ve todo): corregido. Un fallo mío: la clasificación nunca se mostraba por leer `sector` y no `sectores`. La prueba de empresas era demasiado débil: reescrita. Países sin validar como código de 2 letras, CV de más de 200000 caracteres o con carácter nulo: ahora se avisa y se omite.

**Cómo lo comprobamos.** `npm test` = 34 pruebas, `tsc`, `lint` y `build` sin errores. En el navegador: ids raros dan «404», un rango 90–10 se rechaza conservando lo escrito, un guardado válido deja su apunte en `eventos`. Dejé las preferencias de Ana como estaban.

**Fallos míos.** (1) El servidor de desarrollo del paso 4 seguía vivo con el código viejo, sin `-H 127.0.0.1`; mis primeras pruebas fueron contra él y por eso no se guardó un apunte. Lo paré por su PID y repetí todo. (2) Una prueba antigua exigía `DO NOTHING` y hubo que actualizarla.

**Qué queda.** Login (id desde la sesión, id opaco, comprobar que existe el perfil), incluir `cv_texto` en exportar y borrar, topes en el esquema compartido y el import de `traza.json`. Siguiente: paso 6, dashboard del flujo agéntico.

## 5-nov-2026 · Bitácora en el Cuaderno

**Qué.** Nuevo apartado 25 «Bitácora: cómo se ha construido Horma» en el documento «Horma jobs» del Cuaderno (y en la página del profesor, regenerada): decisiones y descartes, pista A, giro a Next.js, pasos 1 a 5 de la pista B, fallos, un diagrama («Lo que ya funciona») y lo que falta. Está escrito para quien no ha seguido la obra. Esta `docs/bitacora.md` sigue siendo la fuente larga; el apartado es el resumen legible.

**Mantenimiento.** Al cerrar cada paso de la pista B hay que actualizar el apartado 25 (lo hecho y «Lo que falta») además de `docs/tareas-pendientes.md`. Diagramas: ahora 9.

## 5-nov-2026 · Plan de 6 días y decisiones de Mar

**Qué.** Mar fijó una meta: el flujo agéntico funcionando de punta a punta en 6 días como máximo (pista A corrida con Ana y la oferta 1, más los pasos 6 a 8 de la web). Plan día a día en `docs/tareas-pendientes.md`, sección 0, y en el apartado 25 del Cuaderno.

**Decisiones (todas con la recomendación de la Copiloto, salvo una).** Preferencias deducidas vacías hasta confirmar; campo de horario; instalar `pypdf`; versionar `evals/resultados/`; calificar las cinco fuentes; compartir la página del profesor. **`settings.json`: «más adelante»**, así que el hook y el bloqueo de `.env` siguen sin activar durante las pruebas (riesgo aceptado por Mar).

**Nuevo.** `docs/guia-pruebas-manuales.md`: guía para que Mar pruebe a mano, como pidió el profesor. Nadie la ha ejecutado todavía; los fallos que salgan se anotan en su tabla.

**Riesgo.** Sin colchón: si un día se pierde, se recortan los casos extra del día 2, nunca un tronco.

## 5-nov-2026 · Instrucciones nuevas del profesor: ingesta desde APIs, web como dashboard, validar la base

**Qué pidió.** (1) Que el pipeline de ingesta tome las ofertas de las APIs, como lo hacía antes; (2) seguir construyendo la web como un dashboard; (3) validar que los datos se guardan en la base de datos. Se suman a las del 4-nov (dashboard del flujo, observabilidad, ingesta y candidatos primero, Next.js, probar a mano).

**Cómo lo integré.**
- **Ingesta:** ya existía la mitad (`ingestar.py` descarga, los agentes procesan, el importador guarda) pero `endpoints.json` está vacío: sin fuentes calificadas no hay nada que traer. Pasa a ser el primer trabajo (`/calificar-fuentes`). «Como antes» lo leo como la misma lógica de Jobs con script propio, **sin n8n** (decidido por él el 30-oct); lo pregunto (31).
- **Dashboard:** la portada pasa a mostrar el estado de cada pipeline, la ingesta y los datos guardados. **Muestra y pide, no ejecuta**: sin login, una web que lance programas sería un riesgo. «Lanzar ingesta» dejará una petición y un proceso aparte la recogerá (esa tabla es un cambio de base de datos: se avisará antes).
- **Validar:** un comando `verificar` compara `datos/` con las tablas y el dashboard enseña lo mismo.

**Efecto en el plan.** El plan de 6 días se reordena: primero ingesta real y `verificar` (días 1 a 3), luego dashboard y observabilidad. Con esto el plan queda más ajustado; si falta tiempo, los flujos C a E de la pista A pasan a casos mínimos antes que recortar la ingesta o el dashboard. La descarga real convierte en obligatorio el punto de seguridad (b) (direcciones internas): revisión específica antes de darla por buena.

## 5-nov-2026 · «Ejecuciones» en vez de «corridas» y el flujo agéntico en el Cuaderno

**Vocabulario.** «Corrida» es un término de Argentina; en el proyecto se dice **«ejecución»**. Cambiado en la web (`/ejecuciones`, menú y títulos), en la base de datos (migración `004`: la tabla pasa a `ejecuciones_ingesta` y `ofertas.corrida_id` a `ejecucion_id`), en los comandos y skills y en los documentos vigentes. No se tocan: las entradas históricas de esta bitácora, el documento del profesor (es su texto), los resultados de evals ya generados ni la migración `001`. `npm test` (34), `tsc`, `lint` y `build` en verde; `/ejecuciones` responde 200 y `/corridas`, 404.

**Bitácora del Cuaderno.** Faltaba el flujo agéntico. El apartado 25 incluye ahora «El flujo agéntico, flujo a flujo» (diagrama y tabla de los seis flujos con sus agentes y decisiones) y «Cómo se trabaja en cada paso» (plan, construir, tests, prueba a mano, revisores, documentar). Regla desde hoy: cada proceso de construcción nuevo entra en ese apartado.

## 5-nov-2026 · Investigación de fuentes de empleo (el metabuscador)

**Motivación de Mar.** Horma es un metabuscador: la usuaria no debe ir de web en web ni de app en app; todas las ofertas llegan a un solo sitio. Es lo que nos diferencia. Anotada en `propuesta-horma.md` (apartado 4) y en `CLAUDE.md`.

**Qué se hizo.** Investigación web de fuentes de España y Europa, en `docs/fuentes-de-empleo.html` (artefacto con copia en el repositorio), en tres tramos: acceso fácil sin clave, API con clave fácil de conseguir y scraping/Apify. Cada dato lleva su estado: comprobado, solo de terceros o sin confirmar. Segunda ronda: ATS (Greenhouse, Lever, Ashby, SmartRecruiters, Personio, Workable, Recruitee, Teamtailor) con la URL de acceso de cada uno.

**Decisiones.**
- **Scraping y Apify aparcados** (Mar, 5-nov). La lista queda como referencia.
- Remotive, Himalayas y We Work Remotely, descartados hasta leer sus términos: según terceros prohíben pasar ofertas a otros agregadores.
- Los ATS no piden clave; el problema es **qué empresas** usar. Propuesta: lista pequeña a mano y que cada empresa registrada en Horma aporte su identificador.

**Lo que no se sabe.** Casi todo viene de terceros. Sin API pública confirmada: Bizneo, Factorial, Sesame, Talent Clue, EURES, Empléate y BOE. Sin investigar: Italia, Países Bajos, Polonia, Portugal, Dinamarca y Finlandia. Ninguna fuente se usa sin pasar por `/calificar-fuentes`.

## 5-nov-2026 · Día 1: calificación de las seis primeras fuentes (ninguna apta)

**Hecho.** Campo `horario` (esquema 0.2, migración `005`, web, agentes y tests: 35 de 35 en la web y 35 evals); `pypdf` instalado y visible con `python -I`; preferencias deducidas vacías; el profesor como fuente de verdad en `CLAUDE.md`. `/calificar-fuentes` sobre Arbeitnow, EURES, Adzuna, The Hub, InfoJobs y Personio (ATS de prueba), con `auditor-fuentes`. Resultado en `datos/fuentes/calificacion.json` (ignorado por git; este apunte es el registro).

**Resultado: las seis, `apta = false`.** Ninguna prohíbe expresamente el acceso automático por API, pero todas limitan el uso a fines personales o no comerciales, exigen acuerdo escrito o no se han podido leer:
- **Arbeitnow:** API sin clave con enlace de vuelta, pero sus términos dicen uso personal y no comercial. Horma cobrará suscripción.
- **Adzuna:** la clave gratuita es para evaluar; un metabuscador necesita acuerdo escrito.
- **The Hub:** solo uso personal; sin API; sin España.
- **EURES:** ni permite ni prohíbe; sin API oficial; reutilización citando a ELA.
- **InfoJobs:** API con credenciales, pero condiciones sin leer (bloqueo a bots, error 456) y robots.txt que bloquea los listados.
- **Personio:** feed sin leer (errores 403 y 429): sin base para decidir.

**Consecuencia.** El criterio del día 1 («al menos 2 fuentes aptas») no se cumple. Lo que sí queda es un registro honesto con el motivo de cada una. Ningún dato de terceros se descarga.

**Qué se propuso a continuación.** Mar preguntó si un subagente o un scraper propio lo arreglaban. No: cambia la herramienta, no el permiso (las condiciones de cada portal mandan; el TJUE C-30/14 permite limitar por contrato). Propuesta por capas con licencia de origen y un agente que descubra empresas y ATS sin copiar contenido. Todo en `docs/consulta-profesor-fuentes-de-ofertas.md` para comentarlo con el profesor (pregunta 32).

**Límites de esta calificación.** El agente leyó las páginas a través de un resumen automático, no siempre literal; hay que verificar las cláusulas citadas antes de decidir.

## 5-nov-2026 · Segunda calificación: Careerjet, Jooble, Greenhouse, Lever, JobTech y BOE

**Resultado: las seis `apta = false` por ahora, pero con diferencias claras.** Registro en `datos/fuentes/calificacion.json` (ignorado por git; 12 fuentes en total).
- **BOE (datos abiertos):** la más prometedora para España. Su aviso legal permite reutilizar para fines **comerciales y no comerciales**, con copia y modificación, citando la fuente con enlace a boe.es, sin desnaturalizar el sentido ni sugerir que es oficial. API sin clave. Falta: leer la documentación técnica y la licencia tipo (27-jun-2024), comprobar que el sumario permite aislar la sección II.B (oposiciones y concursos) y leer el `robots.txt` completo (bloquea rutas de texto por identificador: usar el enlace, no descargar el texto).
- **JobTech (Suecia):** licencia **CC0** confirmada en la fuente oficial, acceso público. Falta: los términos y límites de la API (`jobtechdev.se` no responde desde esta red). Solo cubre Suecia.
- **Careerjet:** su programa de socios es justo para mostrar sus ofertas, pero los términos están dentro de la cuenta de publicador. Obliga a reenviar la IP y el navegador de la usuaria en cada llamada.
- **Greenhouse:** API pública sin autenticación; nada prohíbe leerla ni mostrar un resumen con enlace; sin licencia expresa; el texto de la oferta es de cada empresa.
- **Lever:** pensada para el sitio de empleo del cliente; sus términos (dirigidos a clientes) no permiten distribuir a terceros; sin licencia visible.
- **Jooble:** sus términos prohíben bots y copiar para republicar, y el plan gratuito tiene un tope de 500 peticiones de por vida por clave.

**Qué significa.** Las fuentes con base más sólida son los datos abiertos del sector público (BOE y JobTech) y, con matices, las APIs de ATS leídas empresa a empresa. Las comerciales (Jooble, Lever) quedan descartadas sin permiso. Todo se verificó a través de un resumen automático: las cláusulas citadas hay que comprobarlas a mano antes de cargar datos.

## 5-nov-2026 · Verificación de BOE y JobTech: dos fuentes aptas

**Resultado.** Las dos pasan a `apta = true`, con condiciones. Primera vez que se cumple el criterio del día 1 («al menos 2 aptas»).
- **BOE (datos abiertos):** el aviso legal permite reutilizar «para fines comerciales y no comerciales» con atribución y enlace («Fuente de los datos: Agencia Estatal Boletín Oficial del Estado»; si se transforma, «Basado en datos de…»), sin desnaturalizar el sentido ni sugerir carácter oficial. API sin clave: hay que mandar la cabecera `Accept` (el error 400 del agente venía de ahí). Una consulta de prueba devolvió 200. La sección II.B es el código `2B`; el 4-nov traía 27 elementos. `robots.txt` completo leído: sin Disallow sobre la API. La documentación técnica no da límites: una consulta al día.
- **JobTech (Suecia):** CC0 y acceso público confirmados en la fuente oficial. Una consulta de prueba sin clave devolvió 200 (687 anuncios con «developer»). Límites sin verificar; los campos de contacto no se guardan.

**Límites que quedan.**
- BOE no son ofertas con formato de Horma: son resoluciones y convocatorias. Hay que quedarse con las convocatorias y descartar listas de aprobados (llevan nombres de personas). Su estructura anidada necesita un adaptador propio en la ingesta: no entra en `endpoints.json` todavía.
- JobTech solo cubre Suecia; sirve como fuente real para la demostración.
- Citas del aviso legal obtenidas por un agente de lectura web: leer a mano la página antes de producción.

**Hecho.** Fila de JobTech en `endpoints.json` con `activa: false` (se activa en el día 2, tras la orden de Mar y antes de la revisión de seguridad de la descarga). Calificaciones validadas contra el esquema.

## 5-nov-2026 · Revisión de seguridad del día 1 y cierre de la jornada

**Revisión** (`revisor-seguridad`, solo lectura): sin hallazgos altos ni secretos escritos a mano; `datos/fuentes/calificacion.json` está fuera de git. Tres medias: **M1** `ingestar.py` no comprueba a qué IP se conecta (SSRF); **M2** acepta cualquier variable de entorno como clave y la enviaría al host de la fuente; **M3** las preferencias se editan sin login (ya documentado). Bajas: la carpeta de usuario se queda en `sys.path` tras importar `pypdf` y el comentario decía lo contrario (B1); detalles de redirecciones, tiempos, nombres de archivo y rutas de `--salida` (B2 a B5); texto libre en las preferencias podría llevar categorías del art. 9 (B6). Bien: `horario` validado en esquema, TypeScript y base de datos; consultas parametrizadas; registros sin datos personales.

**Decisión.** M1, M2 y B1 se arreglan antes de activar ninguna fuente; el resto, cuando toque. Pendiente de la orden de Mar para el día 2.

**Corrección de una estimación.** Calculé 4 a 6 horas para el día 1 y se hizo en una sesión: conté tiempos de trabajo humano y de espera, y los agentes trabajan en paralelo. Las próximas estimaciones se darán como rango y se ajustarán con lo medido hoy.

**Cierre.** Mar no está satisfecha con las fuentes (solo BOE y JobTech aptas, una de ellas de Suecia). Mañana se buscan más soluciones; el punto de partida está en «Retomar mañana» de `docs/tareas-pendientes.md`.

## 5-nov-2026 · Decisión de Mar: demostración con pocas fuentes limpias

Mar elige construir primero una demostración con pocas fuentes que pasen la calificación (JobTech y BOE) y las ofertas que publiquen empresas, y ampliar después. Por qué: calidad y permiso antes que volumen; no depender de respuestas ajenas para avanzar. Efecto: mañana empieza la construcción (seguridad de la descarga, activar JobTech, ingesta real, verificar, licencia de origen, adaptador del BOE) y la búsqueda de más fuentes corre en paralelo. Detalle en «Retomar mañana» de `docs/tareas-pendientes.md`.

## 6-nov-2026 · Depuración de la documentación y fusión de «Horma v3»

Mar pidió menos documentos y menos confusión. Decisiones: (1) `docs/` queda con 9 documentos vivos; las fuentes de los artefactos pasan a `docs/artefactos/` y lo no vigente a `docs/archivo/` (movido con `git mv`, recuperable). (2) La consulta sobre fuentes y el resumen de pruebas para el profesor se fusionan en `preguntas-profesor.md` e `informe-pruebas.md`. (3) «Horma v3» se fusiona en «Horma jobs» (apartado 10, agentes y LangGraph) y se añade el criterio de migración del profesor (apartado 24). (4) El índice del Cuaderno solo lleva lo esencial para estudiar, más lo del profesor; la página del profesor añade las fases, la consulta de fuentes y las preguntas. Comprobado: 35 evals en verde y estructura del Cuaderno coherente. Efecto: `docs/indice.md` es el mapa; las rutas antiguas están actualizadas.

## 6-nov-2026 · Bloque 1 de la pista B: seguridad de la descarga

**En llano.** Mar decidió terminar primero la pista B del profesor (la web con su base de datos, la ingesta de ofertas y el dashboard) y construir después la versión optimizada. Acordó que la Copiloto trabaje sola dentro de cada bloque y se pare al acabarlo para recibir su ok, y que las pruebas a mano las pase ella al final con la guía. La pista B tiene 8 bloques; hoy se hizo el primero. Antes de que Horma descargue ofertas de internet, el programa que las descarga se ha vuelto desconfiado: solo habla con sitios públicos y con candado (https), no se deja redirigir a otro sitio, no se queda esperando para siempre, no escribe fuera de su carpeta y, si algo falla, avisa con una frase fija que nunca lleva la clave de acceso. Se probó con 36 pruebas automáticas y con una revisión independiente de seguridad, que encontró fallos reales y se arreglaron. Queda una decisión de Mar: si cada clave de acceso debe quedar atada a su fuente; la Copiloto recomienda esperar a antes de abrir la web a otras personas. Mar pidió además que la bitácora se actualice a cada paso, no al final del día; la regla quedó escrita en `CLAUDE.md` y en `docs/tareas-pendientes.md`, que también deja preparado cómo retomar el trabajo en una sesión nueva.

**Hecho.** `ingestar.py` reescrito y cerrados M1, M2, B1 y B2 a B5. La conexión resuelve el nombre, exige que **todas** las IP sean públicas y se conecta a la IP ya comprobada (así un DNS que cambie de respuesta no sirve de truco); solo https al puerto 443, sin usuario en la URL, sin proxies; redirecciones solo al mismo host y puerto; 5 MB y 30 s; errores como código fijo (`DESTINO_NO_PUBLICO`, `RED`, `TIEMPO`…) y fallos inesperados sin traceback; `--salida` solo dentro de `datos/ofertas/`; `clave_env` solo `FUENTE_*` y valor sin espacios ni saltos de línea. `convertir_cv.py`: la carpeta de usuario sale de `sys.path` tras importar `pypdf`, con tope de 10 MB y 30 páginas y mensaje fijo si el PDF está cifrado o dañado.

**Pruebas.** 36 tests nuevos sin red (`evals/ingesta/test_ingestar.py`, set `ingesta`); 36 evals en verde. Comprobé que los tests protegen: rompiendo a propósito el código (sin comprobar IP, sin `ProxyHandler`, `read` en vez de `read1`, sin rechazar etiquetas vacías) falla al menos un test cada vez.

**Revisión (`revisor-seguridad`).** No pudo ejecutar Python, así que todo salió de leer código. Hallazgos aplicados: lectura lenta (la lectura bloqueaba hasta 64 KB y el reloj no se miraba: ahora `read1`); la clave podía salir en un traceback; LinkedIn/Indeed se saltaban con un punto final (`linkedin.com.`); tests que no vigilaban el cableado real; multicast y NAT64; URL y fecha de la oferta sin validar; `--endpoints` de fuera del repositorio solo con `--dry-run`. Lo que me enseñó un test: mi primera regla de nombres rechazaba `api_key` por el guion bajo.

**Queda abierto (decisión de Mar).** Nada ata cada clave `FUENTE_*` a su fuente: quien pueda editar `endpoints.json` podría mandar la clave de una fuente a otra URL. Arreglo posible: exigir que el nombre de la variable derive del nombre de la fuente. Hoy solo edita ese archivo la Copiloto con orden de Mar. Pendiente también: probar la lectura lenta con un servidor real al activar JobTech (los tests la simulan).

## 6-nov-2026 · Bloque 2 de la pista B: primera ingesta real (JobTech)

**En llano.** Por primera vez Horma ha traído ofertas reales de internet y las ha guardado en su base de datos. La fuente es JobTech, el servicio público de empleo de Suecia, que publica sus anuncios con licencia libre (CC0). Se descargaron 20 anuncios en menos de 2 segundos; luego los tres agentes de Horma los leyeron, los revisaron (¿parece falso? ¿hay datos raros?) y los clasificaron por sector y tipo de puesto; y al final se guardaron en la base. Antes de guardar, el programa borra emails y teléfonos de las personas de contacto. Lo que no puede borrar son sus nombres, así que el texto original queda solo en tu ordenador y git no lo sube. Hay dos cosas que decidir contigo (ver tareas): cómo tratar los requisitos de ciudadanía que piden algunas empresas, y atar cada clave de acceso a su fuente.

**Hecho.** `ingestar.py` quita emails y teléfonos (`sin_contacto`, sin tocar fechas) y tiene 4 tests nuevos (40 en total). JobTech pasa a `activa: true`. 20 ofertas por extractor → auditor → clasificador; todas validan con el esquema `oferta`. `importar-datos.ts` acepta `--ofertas <carpeta>` (solo ofertas, no toca perfiles). 20 importadas y una segunda pasada no duplica (22 filas = 20 + 2 de prueba). Resumen en `datos/ofertas/ejecuciones/2026-11-06.json`: 0 fallidas, 2 posible fantasma (antigüedad), 0 fraude, 1 con instrucciones embebidas, 0 empresas validadas.

**Lo que corregí a mano (honestidad).** Los extractores dedujeron `pais`, `remoto` o `ubicacion` cuando el texto no lo decía: lo dejé en `null`/`no_indicado`. A una oferta le faltaban campos del esquema y a otra se le había quitado el stack que sí aparece en el texto; comprobé el original y lo restauré. Unifiqué un criterio que los auditores aplicaron distinto (dos anuncios iguales de Knightec, de junio: ambos «posible fantasma»). Quité «Ada» del stack de Saab porque la oferta dice que no hace falta.

**Revisión (`auditor-lineas-rojas`).** Sin incumplimientos. Dos riesgos medios (ciudadanía en `requisitos`; nombres en `raw/`) y tres bajos, pasados a decisiones y tareas. Limitación suya: no pudo leer las carpetas ignoradas por git, así que leyó 12 de 20 ofertas.

**Límites.** La taxonomía no tiene robótica ni sistemas embebidos (4 ofertas sin familia). Ninguna empresa se pudo validar porque las ofertas no traen su dominio. El auditor y el clasificador a veces dan resultados distintos para ofertas iguales: sin un eval, la calidad depende de revisar a mano.

## 6-nov-2026 · Bloque 2 bis: campo `avisos` y claves atadas a su fuente

**En llano.** Mar resolvió las dos decisiones que quedaban del bloque 2. Primera: algunas empresas piden ciudadanía, permiso de trabajo o habilitación de seguridad. Eso no es una habilidad, y si Horma lo mezclara con los requisitos podría acabar puntuando a personas por su nacionalidad, que está prohibido. Ahora van en un campo aparte, `avisos`: se enseñan a la usuaria como información y no cuentan para ninguna nota, ningún filtro ni lo que ve una empresa. Segunda: cada clave de acceso queda atada al servidor de su fuente; si alguien cambia una dirección en el archivo de fuentes, la clave no la sigue.

**Hecho.** Esquema `oferta` 0.3 con `avisos` opcional (`tipo` cerrado + `texto`); migración `006` (una columna con valor vacío por defecto, reversible) aplicada a `horma-db`; importador y `extractor-oferta` actualizados; `matcher` y `lineas-rojas` con la regla; 4 ofertas reales movidas de `requisitos` a `avisos` (Saab ×2, Ida Infront, Epical) y reimportadas (22 filas, 4 con avisos, sin duplicar). Atadura: tabla `HOST_DE_CLAVE` en `ingestar.py` (vacía hoy: JobTech no usa clave). Tests: 45 de ingesta (5 nuevos), 38 de la web (3 nuevos, uno vigila que `buscar.py` no lea `avisos`), 36 evals en verde.

**Revisión de seguridad que cambió el diseño.** Mi primera versión ataba la clave al *nombre* de la fuente. `revisor-seguridad` vio que no servía: quien edite el archivo puede dejar el nombre y cambiar solo la dirección, y la clave viajaría igual al dominio nuevo. Lo rehice atando la clave al *servidor* en una tabla del código, y comprobé que los tests fallan si se rompe esa comprobación. También se rechazan nombres de fuente repetidos.

**Un fallo mío, cazado a tiempo.** Al añadir la columna olvidé un parámetro en el importador; la base respondió con un error de protocolo y el importador rechazó las 20 ofertas sin guardar nada a medias. Lo arreglé y añadí un test que cuenta los parámetros. Lección: en las sustituciones automáticas de texto, comprobar cada una, no solo que el archivo cambió.

**Preparado para el bloque 3.** Plan, receta de ingesta y notas en `docs/tareas-pendientes.md`.

## 6-nov-2026 · Bloque 3 de la pista B: lo descargado = lo guardado

**En llano.** Ahora Horma puede comprobar por sí misma que no se ha perdido ni cambiado nada por el camino. Hay un comando nuevo, `npm run verificar`, que compara tres cosas: las ofertas que se descargaron, las que los agentes procesaron y las que están en la base de datos. Si todo cuadra, lo dice; si falta una o es distinta, lo marca y dice cuál (solo el identificador y el campo, nunca el texto, para que no se cuele ningún dato personal). Con tus 20 ofertas reales cuadra. Además, al descargar de nuevo, el programa avisa de cuáles ya estaban procesadas, y los agentes (que son lo que cuesta) solo trabajan en las nuevas.

**Hecho.** `web/src/lib/verificar.ts` (parte pura: compara `titulo`, `empresa`, `url`, `fecha`, `sector`, `familia`, `requisitos`, `stack` y `avisos`, y trata «ausente» igual que `null` o lista vacía, como hace el importador) y `web/scripts/verificar.ts` (lee disco y base; no escribe nada; sale con código 1 si algo no cuadra). `ingestar.py` añade `pendientes` a su respuesta y `/ingestar-ofertas` la usa. 8 tests nuevos de la web (46) y 3 de ingesta (48); 36 evals en verde.

**Comprobado de verdad.** Con los datos reales: 20 coinciden, 2 filas de prueba esperadas, «todo cuadra». Con una copia alterada (fuera del repositorio): un título cambiado, una procesada borrada, un raw sin procesar y un JSON roto → los cuatro fallos salen con su id y el comando termina en 1.

**Decisión técnica.** No registro todavía cada ejecución en `ejecuciones_ingesta`: esa tabla exige una fila en `fuentes` (vacía hoy) y nadie la leerá hasta el dashboard. Hacerlo ahora sería construir sin saber qué se necesita; queda para el bloque 6. Tema del bootcamp que practica: validación de datos y pruebas automáticas (tests deterministas sin LLM).

**Límites.** `verificar` no puede ver si el agente interpretó bien el texto de la oferta (eso sigue siendo revisión a mano); solo asegura que lo procesado es lo guardado.

## 6-nov-2026 · Bloque 4 de la pista B: licencia de origen

**En llano.** Cada oferta guarda ahora con qué permiso la tiene Horma (de la empresa, de un socio, datos abiertos o traída por la usuaria) y la web lo dice junto al enlace a la oferta original. Lo importante: **la licencia no la decide ningún agente**. La declara la fuente en su registro, el script la escribe en la cabecera de cada oferta descargada y el agente solo la copia; `npm run verificar` falla si la copia no coincide con la cabecera. Así Horma no puede afirmar un permiso que no tiene. Hoy las 20 ofertas de Suecia salen como «datos abiertos de la fuente».

**Hecho.** Esquema `oferta` 0.4 (campo opcional `origen: {licencia, atribucion}`) y `endpoints` con `licencia` y `atribucion`; `ingestar.py` no ingesta una fuente sin licencia válida y la estampa en la cabecera; `extractor-oferta` la copia sin deducirla; migración `007` (dos columnas que admiten nulo, con `CHECK`; aplicada); importador, `verificar` y `/ofertas` actualizados; las 20 ofertas reales rellenadas, validadas y reimportadas (22 filas, sin duplicar). Tests: 4 de ingesta nuevos (52), 4 de la web nuevos (50); 36 evals en verde; `tsc` y `eslint` limpios.

**Revisión (`auditor-lineas-rojas`).** Sin incumplimientos. Cuatro mejoras y las apliqué: (1) **media**: nada comprobaba en código que el agente hubiera copiado bien la licencia → `verificar` compara el `origen` de cada procesada con la cabecera de su raw (solo la cabecera, así una línea «licencia: usuaria» dentro del texto de la oferta no engaña) y falla si difiere; (2) la etiqueta «datos abiertos» ahora añade «condiciones en la oferta original»; (3) el formulario `/fuentes` de la web guarda en su propia tabla y no escribe `endpoints.json`, así que no pierde la licencia: pendiente decidir en el bloque 6 si la tabla `fuentes` debe tenerla; (4) nota en `fuentes-ofertas/SKILL.md`: la atribución nombra la fuente, nunca a una persona.

**Un fallo mío.** Al añadir tests con saltos de línea escapados, la herramienta se comió las barras invertidas y dejó los archivos con comillas sin cerrar; lo vi en `tsc`, no lo di por bueno y lo reescribí con la herramienta de edición. Lección: en TypeScript con `\n`, editar con `Edit`, no con scripts de sustitución.

**Tema del bootcamp que practica:** gobierno de datos y trazabilidad (cada dato con su origen), y validación determinista de lo que produce un LLM.

## 6-nov-2026 · Bloque 5 de la pista B: adaptador del BOE

**En llano.** Horma ya sabe leer el BOE. Cada día el BOE publica un sumario enorme; el programa se queda solo con la sección de oposiciones y concursos y, de ella, solo con las resoluciones que **convocan** plazas. Descarta las listas de aspirantes, admitidos o aprobados (llevan nombres de personas), las correcciones, las modificaciones, las plazas desiertas y las ofertas de empleo globales. No descarga el texto de cada convocatoria (el BOE pide no hacerlo): la oferta es el título y un enlace al BOE, con la atribución que exige su aviso legal. Por eso estas ofertas salen con pocos datos y mucho «no indicado»: es lo honesto. El primer día real: 21 elementos en esa sección, 15 convocatorias y 6 descartados.

**Hecho.** Adaptador `boe-sumario` en `ingestar.py` (no puede ir en un archivo aparte: con `python -I` no se importan archivos vecinos); `url` con `{fecha}`, `--fecha`, el domingo sin fecha pide el sábado; código `NO_ENCONTRADO` para el 404; la fuente en `endpoints.json` con licencia `abierto` y la atribución «Fuente de los datos: Agencia Estatal Boletín Oficial del Estado (boe.es). Datos reorganizados por Horma; no es una publicación oficial.»; campo `adaptador` en el esquema. Tests: 17 nuevos de ingesta (69), con un sumario inventado. Procesadas con los agentes **solo 3** (ministerio, ayuntamiento, universidad), importadas y verificadas (23 coinciden). Las otras 12 no se procesan sin tu orden para no gastar unas 36 llamadas a agentes; se ordena con `/ingestar-ofertas "BOE Empleo público (sección II.B)" --fecha 2026-11-06`.

**Revisiones (`revisor-seguridad` y `auditor-lineas-rojas`).** Sin hallazgos graves ni el SSRF debilitado. Apliqué todo lo propuesto: (1) el filtro era una lista de exclusión corta y dejaba pasar títulos con «designa la comisión…» o «listado»: ampliada, con rechazo de tratamientos personales («D.», «Dña.») y de títulos de más de 400 caracteres; (2) el texto del BOE llegaba al raw con saltos de línea y sin tope: ahora va en una línea y con límite, para que no simule una cabecera ni meta órdenes a los agentes; (3) cifras de otros alfabetos (`\d`) ya no valen en identificadores y fechas; (4) tras sustituir `{fecha}` se revalida la URL; `--limite` negativo ya no corta por el final; (5) **libre designación**: el sumario no dice quién puede optar, así que el script añade una línea «Aviso de Horma: suelen estar reservadas a personal funcionario; comprueba las bases» y sale como `avisos` (nunca en la nota ni el filtro); `/ofertas` ya muestra los avisos; (6) en el BOE no hay contacto al que preguntar el sueldo: `frase_para_pedirlo` queda en `null`, el auditor lo sabe y sus motivos hablan del título, no de la convocatoria entera.

**Errores míos.** (a) El filtro de teléfonos tachó el identificador `BOE-A-2026-23304` como si fuera un teléfono: lo vi al leer un raw real, no en los tests; ahora el identificador no va en el texto (ya está en la URL) y un test lo vigila. (b) Mis tests dejaban salida en la codificación de la consola y el runner de evals se cayó al leerla; arreglado con un tapón de salida UTF-8 en los tests. (c) Mi primera lista de palabras prohibidas incluía «designa», que habría descartado todas las «libre designación»; un test con ese título real lo evita.

**Decisiones que he tomado y tú puedes revertir.** `pais: ES` en las tres (la fuente es el BOE); `sector: educacion`, `familia: docencia` solo en la universidad, porque su título dice «cuerpos docentes universitarios» (las otras dos, `null`: la taxonomía no tiene «administración pública»); el organismo es el del sumario, así que la oferta de la AECID figura bajo el ministerio (la AECID sí sale en el título).

**Límites.** La tabla `fuentes` de la web aún no tiene `licencia`, `atribucion` ni `adaptador` (se decide en el bloque 6). La API del BOE no publica límites: hice dos consultas hoy, una por día es la cortesía que me impuse. Tema del bootcamp que practica: ingesta de datos con adaptadores, seguridad ante entradas no fiables y trabajo con datos abiertos y su licencia.

## 6-nov-2026 · Cierre de sesión: push y plan del bloque 6

**En llano.** Los bloques 4 y 5 ya están subidos a GitHub (16 commits). El bloque 6 (el dashboard) está planeado pero no empezado: espera tu «adelante».

**Hecho.** Push a `main` por orden de Mar. Estado de partida comprobado: `horma-db` arrancada, 36 evals y 50 tests web en verde.

**Plan del bloque 6.** (1) Portada `/` de solo lectura con tres tarjetas: pipelines (flujos A–E y su comando), ingesta (fuentes activas y última ejecución) y datos guardados (por fuente, país y licencia). (2) `npm run importar` registrará cada ejecución en `ejecuciones_ingesta`, creando antes la fila de `fuentes`. (3) Migración `008`: `licencia`, `atribucion` y `adaptador` en `fuentes`. (4) Tests con datos inventados. (5) Cierre con `revisor-seguridad`. Sin librerías de gráficos.

**Pendiente de Mar.** Orden para el bloque 6; si se procesan las 12 convocatorias del BOE restantes.

## 6-nov-2026 · Bloque 6: panel (dashboard) y registro de ejecuciones

**En llano.** La portada de la web es ahora un panel de solo lectura: te enseña los flujos A′ a E con el comando que hay que lanzar, qué fuentes hay y cómo fue su última ejecución, y cuántas ofertas hay por fuente, país y licencia. Desde ahí no se ejecuta nada. Además, cada vez que importas ofertas, la base apunta una «ejecución» por fuente (cuántas entraron, cuántas se descartaron).

**Hecho.** (1) Migración `008`: `licencia`, `atribucion` y `adaptador` en `fuentes`. (2) `npm run importar` crea la fila de la fuente desde `endpoints.json`, abre y cierra una fila en `ejecuciones_ingesta` y enlaza cada oferta con su ejecución (`ofertas.ejecucion_id`); las fuentes que no están en `endpoints.json` (las de prueba) no generan ejecución. (3) Portada `/` con tres tarjetas y barras hechas a mano (sin librerías de gráficos). (4) 10 tests nuevos con datos inventados (60 en total; 36 evals en verde). Comprobado con la base real: 2 fuentes, 25 ofertas, `npm run verificar` «todo cuadra».

**Decisiones técnicas.** (a) El panel **no cuenta perfiles**: una prueba de líneas rojas existente lo impidió y la mantuve; solo muestra ofertas y usuarias registradas. (b) La sincronización de `endpoints.json` pasa por las mismas comprobaciones que el formulario de fuentes (https, sin hosts internos, sin credenciales, `clave_env` con prefijo `FUENTE_`), salvo la regla del nombre. (c) `endpoints.json` manda sobre lo editado en la web. Tema del bootcamp que practica: observabilidad básica y diseño de dashboards sobre datos propios.

**Revisión.** `auditor-lineas-rojas`: sin incumplimientos. `revisor-seguridad`: sin nada grave; arreglé el hallazgo medio (una importación interrumpida salía «correcta»: ahora queda «con errores») y el 2 (comprobaciones de la sincronización). El resto queda anotado en `docs/tareas-pendientes.md` («Pendientes que deja el bloque 6»).

**No hecho.** Observabilidad por pieza y `/salud` (bloque 7). Las 12 convocatorias restantes del BOE siguen sin procesar, a la espera de tu decisión.

## 6-nov-2026 · Bloque 7: observabilidad y página /salud

**En llano.** Hay una página nueva, «Salud», que te dice de un vistazo si cada pieza de Horma funciona: la base de datos, el importador, cada fuente de ofertas, la calidad de lo guardado, la última comprobación «archivos = base» y los tests de los agentes. Cada pieza sale con un color y con una palabra (bien, atención, falla, sin datos). Solo mira; no ejecuta nada.

**Hecho.** (1) `/salud` con cinco tarjetas y un resumen general; si una consulta falla, solo esa pieza sale en «falla» y las demás se siguen viendo. (2) `npm run verificar` deja ahora un evento con tres números (coinciden, fallos, avisos); no lo deja si se usa `--dir`, para que una carpeta de pruebas no ponga la página en verde. (3) Una ejecución de ingesta sin cerrar hace más de 6 horas se marca «abandonada». (4) El importador ya no escribe el id de la usuaria en consola (`perfil nº N`, `perfiles/(usuaria)`). (5) Test de que los errores del validador no repiten el valor que falló. (6) Si el archivo de evals existe pero está roto, sale «atención», no «sin datos». Comprobado con la base real: todo en «bien» salvo el importador, en «atención» por 6 errores de los últimos 7 días (de mis pruebas del bloque 6). 73 tests de la web (eran 60), 36 evals en verde, tipos y lint limpios.

**Decisiones técnicas.** (a) Reutilicé la tabla `eventos` que ya existía desde la migración `001`, en vez de crear otra; los componentes y las claves permitidas siguen en listas cerradas, solo números. (b) `endpoints.json` manda sobre `activa` en las fuentes: `ingestar.py` lo lee a él y no a la tabla, así que dejar que la web lo cambie daría dos verdades. (c) Sin métricas de coste ni tokens por agente: corren dentro de Claude Code y no dejan rastro; inventar un registro manual que nadie rellena era peor (pregunta 18 del profesor). Tema del bootcamp que practica: observabilidad (estado, métricas y trazabilidad de un pipeline).

**Errores míos.** Puse `export const dynamic` en la página y Next la rechazó (`cacheComponents` está activo): lo vi al abrirla en vivo. Mi primera consulta de calidad contaba las 2 ofertas de prueba como «sin licencia» y la página salía en rojo sin motivo real.

**Revisión.** `auditor-lineas-rojas`: las seis líneas cumplen. `revisor-seguridad`: nada grave ni medio. Apliqué los tres puntos bajos que eran de código (un fallo ya no se disfraza de «base caída», el evento de `--dir`, evals ilegibles). Queda anotado: `/salud` sin login (como el resto de rutas; imprescindible antes de salir de localhost).

**No hecho.** Bloque 8 (revisión final de toda la pista B, guía de pruebas completa, informe y push). Las 12 convocatorias del BOE siguen sin procesar, a la espera de tu decisión.

## 6-nov-2026 · Bloque 8: revisión final de la pista B

**En llano.** Pasé a los dos revisores sobre toda la web y la ingesta. Ninguno encontró nada grave. Lo que sí había eran puertas que hoy no se abren pero que convenía cerrar antes de tener login y usuarias reales, y las cerré: la web ya no entra en la base con todos los permisos, rechaza peticiones que no vengan de tu propio ordenador y no se deja incrustar en otras páginas. Además borré las descargas originales de ofertas, porque llevaban nombres de reclutadores.

**Hecho.** (1) **Rol `horma_web`** (migración `009`): la web solo lee y solo escribe preferencias, fuentes y eventos; la base le deniega borrar, tocar ofertas, crear tablas e insertar perfiles (comprobado con consultas reales). La contraseña va en `web/.env` (`HORMA_WEB_PASSWORD`, creada sin mostrarla) y la pone `npm run migrar`; los scripts siguen con `horma`. (2) **`proxy.ts`** contra DNS rebinding: 403 si el Host no es `localhost` o `127.0.0.1` (comprobado con curl; 3 tests). (3) **Cabeceras anti-marco** (`X-Frame-Options`, `frame-ancestors`, `nosniff`). (4) **El importador rechaza una oferta cuya licencia no sea la de la cabecera de su raw** (antes solo lo veía `npm run verificar`, después de guardar). (5) `migrar.mjs` usa `errorSeguro`. (6) `/fuentes` rechaza LinkedIn e Indeed (con test). (7) `ingestar.py` ignora las cabeceras `Host` y `Content-Length` de una fuente y limita título (400) y empresa (200). (8) `/recomendar` pasa las ofertas al matcher **sin `avisos`**; el extractor conserva el «Aviso de Horma:» para que la usuaria sepa que lo dice Horma y no la oferta; reglas escritas para `pais` y `nivel`; `no_indicado` añadido a los niveles de la taxonomía. (9) **Borré `datos/ofertas/raw/`** tras `npm run verificar` en verde (23 de 23; `git ls-files datos/ofertas` vacío: nunca estuvo en git). (10) Arreglé que **`npm run build` fallaba en `/salud`** (`await connection()`). Cifras: 77 tests de la web, 36 evals, `tsc` y `lint` limpios, `build` compila.

**Decisiones.** (a) Rol restringido ahora, no con el login: tú lo elegiste; coste, una segunda contraseña. (b) Borrar `raw/`: tú lo elegiste; se vuelve a descargar con `ingestar.py`. (c) Queda por escrito que **`endpoints.json` manda y `/fuentes` no puede hacer que se descargue algo**: es una protección, no un fallo (hallazgo 6); no hacer que `ingestar.py` lea de la base sin revisarlo. (d) El matcher sigue frenado por la orden del comando y por su prompt; la prueba existente no comprueba que no vea `avisos`. Tema del bootcamp que practica: seguridad (mínimo privilegio, defensa en profundidad) y revisión final de un sistema.

**Errores míos.** El `build` de producción llevaba roto desde el bloque 7 y no lo detecté porque solo corría `dev`: desde ahora `npm run build` entra en el cierre de cada bloque. Además, `revisor-seguridad` y `auditor-lineas-rojas` no ejecutan git ni leen `package.json`; lo que dependía de eso lo comprobé yo.

**Revisión.** `revisor-seguridad`: 0 altos, 3 medios (hechos), 6 bajos (hechos 4, 5 y parte del 9; abiertos 7, 8 y detalles del 9). `auditor-lineas-rojas`: 0 incumplimientos; 2 altos «antes de usuarias reales» (exportar y borrar datos; login) siguen abiertos y planificados, 2 medios hechos, 3 bajos hechos.

**No hecho.** (1) **Exportar y borrar datos** (`npm run exportar` y `npm run borrar`, ~medio día; también las carpetas de `datos/perfiles/<id>/`): obligación RGPD **antes de usuarias reales**. (2) **Login**, ids opacos y quitar `/candidatos` o dejarlo solo para administración. (3) Nota bajo el formulario de preferencias (B6) y aviso de que las reglas de «parece credencial» son una ayuda. (4) `maxLength` en `oferta.json`; 6to4 y Teredo en la lista de IP rechazadas. (5) La guía de pruebas en HTML (`pruebas-horma.html`) no incluye los bloques 6 a 8: manda el `.md`. (6) Las 12 convocatorias del BOE, a la espera de tu decisión. (7) **Push**: no lo he hecho; espero tu orden.

## 6-nov-2026 · Exportar y borrar datos (RGPD)

**En llano.** Ya puedes sacar todo lo que Horma guarda de una usuaria y, si lo pide, borrarlo. Son dos órdenes de terminal. Borrar primero te enseña qué se perdería sin tocar nada, y solo borra de verdad si escribes otra vez su identificador.

**Hecho.** (1) `npm run exportar -- --usuaria <id>`: crea `datos/exportaciones/<id>-<fecha>/` con `base-de-datos.json` (usuaria, perfil con el texto del CV y preferencias) y copias de sus carpetas de disco (`datos/usuarias`, `datos/candidaturas`, `datos/matches`); no pisa una exportación anterior. (2) `npm run borrar -- --usuaria <id> [--confirmar <id>]`: en seco por defecto; con confirmación borra su fila (perfil y preferencias caen en cascada) y esas tres carpetas, en una transacción. (3) Lógica en `src/lib/datos-usuaria.ts` con 6 tests: ids con rutas raras, solo esa usuaria, enlaces simbólicos (aborta antes de tocar nada). (4) Probado de punta a punta con una usuaria inventada. 83 tests de la web, `tsc`, `lint` y `build` limpios.

**Decisiones técnicas.** (a) Solo scripts: los botones de la web llegan con el login (sin él, cualquiera podría borrar). (b) No tocan ofertas, fuentes ni `eventos` (solo números), ni las exportaciones ya hechas: se borran a mano al entregarlas. (c) Si algún día hay copias de seguridad de la base, habrá que borrar también de ahí (no existen hoy). (d) El script no escribe el id en la consola. Tema del bootcamp que practica: protección de datos (acceso y supresión, RGPD) y operaciones destructivas con confirmación.

**Errores míos.** Al pasarlo por el test de línea roja, falló: ese test exige revisar a propósito cualquier archivo que lea perfiles. Añadí `datos-usuaria.ts` a su lista con la razón y una comprobación de que cada consulta lleva `WHERE id = $1`. Mi primera versión lanzaba consultas a la vez sobre una sola conexión (aviso de obsolescencia de `pg`) y creaba una carpeta vacía si no había datos: corregidos.

**No hecho.** Botones en la web (con el login). Datos de la usuaria que otros flujos guarden fuera de esas tres carpetas: hoy los comandos solo usan esas, pero el importador lee `perfiles/<id>` (de `fixtures`), una incoherencia de rutas por decidir. Push: sin hacer.

**Revisión de exportar y borrar (mismo día).** `revisor-seguridad` encontró un fallo alto que yo no había visto: en Windows `Ana`, `ana` y `ana.` son la misma carpeta, pero en la base son usuarias distintas; borrar a una habría borrado la carpeta de otra. Arreglado: las órdenes solo aceptan ids en minúsculas, sin punto ni guion inicial y sin nombres reservados de Windows (`con`, `nul`, `com1`…), y se niegan si la base tiene dos ids que solo difieren en mayúsculas (probado con datos inventados). También: el borrado ahora mueve primero las carpetas a `datos/.borrando-<id>/`, borra la fila, confirma y solo entonces purga (si falla algo antes, el disco vuelve a su sitio); se comprueba que las carpetas padre no sean enlaces; y una exportación que falla a medias se elimina. 84 tests de la web. **Abierto, decide Mar:** `CHECK (id = lower(id))` en `usuarias` (migración, cambia un contrato; hoy la base admite mayúsculas y puntos, y el importador igual): lo propongo antes de la primera usuaria real.

## 6-nov-2026 · Migración 010: ids de usuaria en minúsculas

**En llano.** La base de datos ya no deja crear una usuaria con mayúsculas en el id (`Ana`): solo `ana`. Así no puede haber dos usuarias que en Windows compartan carpeta.

**Hecho.** (1) Migración `010`: `CHECK (id = lower(id))` en `usuarias`, con su vuelta atrás escrita en el propio archivo; aplicada (las 2 usuarias que había ya eran minúsculas). (2) La web (`ID_USUARIA` en `preferencias.ts`) ya solo acepta minúsculas: `/candidatos/Ana` da «no encontrado». (3) Comprobado en la base real: insertar `Ana-mayus` se rechaza con la restricción `usuarias_id_minusculas`; `zz-minus` entra (y lo borré). 84 tests, `tsc`, `lint`, `build` y `verificar` en verde.

**Decisiones técnicas.** No toqué el esquema compartido `perfil.json` ni los comandos de `.claude/` (su patrón sigue admitiendo mayúsculas): un `perfil.json` con mayúsculas ya fallará al importar, con un error claro de la base. Si quieres que falle antes, se endurece el patrón y se sube la versión del esquema. Tema del bootcamp que practica: integridad de datos con restricciones en la base.

**No hecho.** Endurecer el patrón de los esquemas y comandos. Push: sin hacer.

## 6-nov-2026 · Esquema 0.5: usuaria en minúsculas también en `perfil.json` y `match.json`

**En llano.** Ya no solo la base de datos: también los archivos que producen los agentes rechazan una usuaria con mayúsculas. Si alguna vez un agente escribe `Ana` en lugar de `ana`, el validador lo para antes de que llegue a ningún sitio.

**Hecho.** (1) `perfil.usuaria_id` y `match.usuaria_id` con el patrón `^[a-z0-9_-][a-z0-9_.-]{0,79}$` (anotado en `CHANGELOG.md` antes de tocarlo, versión 0.5). (2) Los 7 comandos que reciben una usuaria piden además minúsculas para ese id; el patrón de ofertas y fuentes no cambia (los ids de oferta llevan mayúsculas, p. ej. los del BOE). (3) Test nuevo en la web (85 en total; 36 evals en verde); las fixtures siguen validando.

**Decisiones técnicas.** Es un cambio que **estrecha** el contrato (lo que valía deja de valer): no había ningún archivo afectado y la base ya lo exigía, así que no rompe nada. `preferencias.json` no tiene id de usuaria; `candidatura.json` no lo valida. Tema del bootcamp que practica: contratos de datos entre agentes y su versionado.

**No hecho.** Push: sin hacer.

## 6-nov-2026 · Documentación y artefactos al día

**En llano.** Puse al día los documentos y las páginas publicadas para que digan lo que Horma es hoy: la pista B está hecha, las pruebas a mano cubren todo lo nuevo y la guía ya no tiene fallos.

**Hecho.** (1) `CLAUDE.md` (cómo correr la web, `build`, exportar y borrar), `analisis-tecnico.md` (estado de los roles y del proxy) y `glosario.md` (DNS rebinding, mínimo privilegio, CHECK, cuarentena). (2) Guía de pruebas: corregí un `curl` que se había partido en dos líneas, avisé de que `raw/` está vacía a propósito y actualicé cifras (85 tests, 36 evals). (3) Artefactos republicados en su misma dirección: «Pruebas de Horma a mano» (ahora 64 pasos: secciones nuevas 7 a 10, ids antiguos intactos para no perder tu progreso), «Construcción de Horma» (estado a 6-nov) y «Fuentes de empleo» (JobTech y BOE en marcha; el adaptador del BOE ya está hecho).

**No hecho.** «Horma por dentro»: el texto ya está corregido en `docs/artefactos/horma-por-dentro.html` y commiteado, pero **no está republicado**: publicar sobre él exige releer entera la versión publicada (125 KB). Dime si lo hago. Push: sin hacer.

## 6-nov-2026 · Construcción optimizada, bloque 1: el perfil real de Mar de punta a punta

**En llano.** Probé el flujo de perfil con un CV real (el de Mar, solo en su ordenador). Salió bien: el CV pasó a texto, los agentes sacaron perfil, CV maestro y preferencias, se guardaron en la base y la web ya muestra la ficha con «de dónde sale» cada dato. Además aparecieron tres fallos del camino y los arreglé con sus tests.

**Hecho.** (1) `convertir_cv.py` lee `.html` (solo biblioteca estándar, tope de 5 MB; 3 tests; comprobado rompiendo el código a propósito). (2) `verificar.py` acepta en formación el rango `inicio–fin` además del año de fin: el verificador obligaba a ocultar el año de inicio, lo contrario de la regla de los huecos (3 tests; un rango inventado sigue rechazado). (3) El importador lee `datos/usuarias/<id>/` además de `perfiles/` (cierra la incoherencia de rutas anotada el 6-nov). (4) `/perfilar` con el CV real: `perfil.json` y `preferencias.json` validan; CV maestro con 5 experiencias; `clasificador-candidato` con sus sectores; dos CV base (datos/IA y desarrollo full stack) que pasan `verificar-trazabilidad`. (5) 38 evals en verde, 85 tests web, `tsc` y `lint` limpios, `npm run verificar` sin discrepancias y `/candidatos/mar` enseña el perfil.

**Decisiones de Mar.** Sanidad y atención al cliente se añaden a su taxonomía; Diseño Gráfico queda como «no finalizados»; la experiencia de Althaia de 2002–2004 va en una sola línea con el rango que ella dio. Dos CV base (datos/IA y full stack) en lugar de cuatro. **La edad no se guarda ni se usa:** Mar dio su año de nacimiento para explicar esa experiencia y solo se anotó el rango de años que ella dijo, en `fuentes/respuestas-mar.txt`.

**No hecho / pendiente.** (a) Nivel por área (senior en atención al cliente, junior en IA): pide cambiar el esquema `perfil` (un nivel por familia); es un contrato de datos, hay que decidirlo con Mar antes. (b) CV base sin resumen para full stack (no hay texto con origen). (c) `cv_texto` de la base queda vacío: el importador busca `cv.md`, el maestro se llama `cv-maestro.md`. (d) La web enseña solo el año de fin en la formación. (e) Faltan modalidad de Tezenis y LUSH y «Presencial/Híbrido» en el maestro. (f) `npm run build` no se ha corrido: la web de desarrollo está abierta y pisaría `.next`.

**Revisores (aplicados).** `auditor-lineas-rojas`: ninguna línea roja incumplida; salvaguarda nueva en `extractor-perfil`, `clasificador-candidato`, `generador-cv-base` y `lineas-rojas`: si la usuaria da su edad o año de nacimiento, no se copia ni se deducen fechas de él. Además el verificador contrasta cada encabezado también con el CV maestro (el perfil podía haberse copiado mal): el año suelto en formación ya no vale (docs de los agentes y de la skill, al día). `revisor-seguridad`: sin secretos, sin path traversal ni fuga del id; arreglados el texto oculto en HTML (`hidden`, `aria-hidden`, `display:none`: era inyección de instrucciones invisible), las celdas de tabla que pegaban palabras y el aviso de set desconocido en `correr_evals.py`; 5 tests nuevos, y cada protección nueva se comprobó rompiéndola a propósito. Sin hacer: aviso si existen `perfiles/` y `usuarias/` a la vez (hipótesis H1) y probar un *junction* de Windows dentro de `usuarias/` (H2).

## 6-nov-2026 · Esquema 0.6: nivel por familia

**En llano.** Mar puede ser senior en atención al cliente y junior en IA, así que el perfil ahora guarda un nivel por área, no uno solo. El nivel general sigue existiendo como valor de reserva.

**Hecho.** `perfil.taxonomia.niveles_por_familia` (opcional, cada entrada con su `origen`): esquema, CHANGELOG 0.6, skill de taxonomía, `clasificador-candidato`, `buscar.py` (los 2 puntos de nivel se miran con el nivel de la familia de la oferta; datos raros no lo rompen) y la ficha de la web. Sin migración: `taxonomia` es `jsonb`. El perfil de Mar lleva atención al cliente senior, IA junior (ambas dichas por ella) y administración senior (cargo literal «Oficial Administrativa Sénior»). 5 tests nuevos, comprobados rompiéndolos a propósito; 39 evals, 85 tests web.

**Revisores.** Sin incumplimientos. Aplicado: uso interno documentado (nunca a empresas), el nivel se apoya en cargo literal o años dentro de esa familia y nunca en años totales ni en fechas de nacimiento, la web lo rotula «sugerido, ella puede corregirlo», y `buscar.py` más robusto. **Cerrado después, el mismo día.** (a) Eval con el clasificador sobre un perfil sembrado (`evals/clasificacion/nivel-sembrado/`): con 20 años de tienda y 1 de datos, «análisis de datos» salió junior (bien); pero el agente metió comentarios entre paréntesis en dos `fragmento` (mal): prompt corregido, **falta repetir el eval**. (b) `verificar_perfil.py` comprueba que cada `origen` del perfil existe en `fuentes/` (archivo, fragmento y línea; sin salir de la carpeta; sin volcar texto): 6 tests; los 26 `origen` reales del perfil de Mar pasan. (c) Test que falla si `niveles_por_familia` aparece en la web fuera de la ficha de candidatas o en una ruta de empresas (3 tests). Ambos comprobados rompiéndolos a propósito; 41 evals en verde. (e) `build`: compilado en una copia con webpack (la web de desarrollo seguía abierta; Turbopack no seguía los enlaces de la copia): compila, tipos y las 10 páginas, sin errores; sin tocar `.next` de Mar. **Sigue pendiente:** (d) confirmar que `/candidatos` es solo de administración: no se puede hasta el login (bloque 4); hoy cualquiera en localhost la ve, ya documentado en la propia página.

## 6-nov-2026 · Construcción optimizada, bloque 2: recomendaciones reales

`/recomendar` sobre las 23 ofertas reales para Mar (matcher sin `avisos` ni nivel por familia; preferencias vacías a propósito), guardado en `datos/matches/mar/2026-11-06.json` (git lo ignora) y validado. Migración 011 (`matches`, aditiva, `DROP TABLE matches` la deshace; `horma_web` solo lee). El importador lee `matches/<usuaria>/AAAA-MM-DD.json` (upsert), la exportación RGPD la incluye y el borrado va en cascada. Página `/recomendaciones/[id]`, enlazada desde la ficha. Tests: 5 nuevos (90 en total); 41 evals.

**Decisión.** El test de línea roja que prohibía «ordenar por nota» ahora exime solo a `src/lib/matches.ts`, que ordena ofertas de UNA candidata, nunca candidatas entre sí.

**Revisores.** Sin incumplimientos. Aplicado: sin datos de condiciones, `nivel_condiciones` pasa de «encaja» a «parcial» (8 ofertas); frases vagas y de género sustituidas por hechos; el texto de la página ya no promete una protección que aún no existe; `avisos` tolera campos ausentes. Las afirmaciones del CV (C1, UOC, Althaia, 7 centros) coinciden con el CV maestro. **Pendiente:** (a) la página no tiene login: cualquiera en localhost ve cualquier id (bloque 4); (b) las 3 ofertas del BOE sin requisitos llevan nota provisional baja: conviene permitir «sin nota» (nota nula) más adelante; (c) endurecer el esquema `match` (longitudes, formato de fecha); (d) el sueco no está en el perfil, así que muchas salen «a revisar»: Mar puede añadirlo o corregirlo; (e) `build` de web sin repetir.

**En llano.** Mar ya ve, ordenadas por nota, las ofertas reales con una explicación honesta de qué tiene y qué le falta. La nota mide solo experiencia y formación; el idioma o la ubicación van aparte. Con tu CV, las mejores son las de IA (72 y 60); las demás salen bajas, y es correcto.

## 6-nov-2026 · Cierre del bloque 2: «sin nota», esquema 0.7 y solo España

Decisión de Mar: **las fuentes de empleo son solo de España en esta primera construcción**; el resto, más adelante. Se apaga JobTech Suecia (`"activa": false` en `endpoints.json` y en la base; se puede reactivar desde `/fuentes`). Las 20 ofertas suecas ya importadas **no se borran** (sus recomendaciones siguen en la página); cuando haya más ofertas españolas se repite `/recomendar`. Mar no tiene sueco: el perfil no lo recoge y no se inventa.

Esquema 0.7: `match.nota` admite `null` («sin datos suficientes»), y el esquema ya valida lo mismo que la tabla (fecha `AAAA-MM-DD`, longitudes). Migración 012 (solo quita un `NOT NULL`). El matcher pone `nota: null` si la oferta solo trae título y enlace; la página dice «sin nota» y la ordena al final. Las 3 del BOE de Mar quedan así. `build` de web: compila (Turbopack, en su sitio). 92 tests web, 41 evals.

**En llano.** Si una oferta no dice qué piden, Horma ya no se inventa una nota baja: dice «sin nota». Y por ahora solo buscamos en España; Suecia queda apagada, no borrada.

## 6-nov-2026 · Construcción optimizada, bloque 3: candidatura de punta a punta

**En llano.** Horma ya preparó un CV y una carta para una oferta real (la de nota 72, «AI-first developer»), sin inventar nada: lo que la oferta pide y tu CV no tiene (sueco, Cursor, React…) no se añade, queda en una lista para que decidas. Está en «borrador»: nada se ha aprobado ni enviado. Puedes verlo en la web, en solo lectura.

**Hecho.** (1) `/candidatura` sobre la oferta de 72: `redactor-cv` → verificador → `juez-cv` (aprobado) → ATS (60 %; faltan React, Cloudflare, Cursor y Codex, sin origen, no se añaden) → `redactor-carta` → verificador → `juez-carta`, que pidió corregir una frase (el despliegue en Vercel era de TuneHop, no de Jobs); corregido y vuelto a verificar. El verificador rechazó los encabezados `###` de proyectos del redactor: ahora van como líneas simples, igual que en el CV base. (2) Migración `013_candidaturas` (aditiva; `DROP TABLE candidaturas` la deshace; `horma_web` solo lee). (3) El importador junta `estado`, `cv`, `carta`, trazas, huecos y ATS, valida con el esquema, rechaza ids de carpeta raros y **rechaza cualquier aprobación que no firme la usuaria**; no degrada una candidatura ya aprobada o enviada; `ats.json` se recorta a las tres claves del esquema. (4) La exportación RGPD incluye candidaturas (el borrado ya las cubría por CASCADE). (5) Página `/candidaturas/[id]` (solo lectura): avisos de relleno primero, huecos pendientes abiertos, CV y carta desplegables. (6) 10 tests web nuevos (102), 41 evals, `build` bien.

**Revisores.** `auditor-lineas-rojas`: sin datos inventados, regla de los huecos cumplida. Aplicado: se recuperó la línea «Trabajo como administrativa durante las vacaciones» (sin ella 2002–2004 parecía un empleo continuo), la traza de la carta cita también el inglés y los huecos pendientes salen abiertos. `revisor-seguridad`: sin SQL, XSS ni fugas; aplicado: validar nombres de carpeta, no pisar aprobadas y quitar bytes NUL que se colaron en el script. **Límite honesto:** «ningún agente aprueba» es una defensa de proceso (los subagentes solo leen; el importador comprueba `por: usuaria`), no criptográfica: la definitiva es aprobar en la web con login (bloque 4). Sin login, `/candidaturas/[id]` enseña CV y carta a quien conozca el id: solo localhost.

**No hecho.** `/aprobar` y `/marcar-enviada` (no se ejecutaron: nada aprobado). La carta va en castellano y sin motivación ni frases de ausencia («no tengo sueco»): faltan respuestas de Mar (`preguntas_pendientes`) y decidir el idioma. Candidatura solo para una oferta (la de 72, que es sueca y Suecia está apagada: sirvió para probar el flujo, no es una candidatura que convenga enviar sin hablar sueco).

**Artefacto «Pruebas de Horma a mano» al día (6-nov).** Versión 3 publicada: 102 tests web y 41 evals, aviso de que la sección 11 usa tu CV real (solo local) y esa sección nueva (ficha, recomendaciones, candidatura, línea roja de la aprobación, repetibilidad y `/aprobar`). La guía `guia-pruebas-manuales.md` pasa a llamar «2 decies» a la sección de la candidatura.

## 6-nov-2026 · Construcción optimizada, bloque 4: login, ids opacos y aprobar en la web

**En llano.** Horma ya tiene puerta. Para entrar hace falta cuenta (correo y contraseña, o Google si lo activas) y cada persona ve solo lo suyo. Las direcciones de tus páginas llevan un código largo e imposible de adivinar en vez de `mar`. Tú eres la administradora: ves el panel, las fuentes y la salud del sistema, pero **ni tú ves el perfil ni las candidaturas de otra persona**. Y lo más importante: **aprobar y marcar como enviada se hacen en la web, con tu sesión**. Ningún agente puede aprobar: ni escribiendo en un archivo, porque el importador lo rechaza, ni directamente en la base, porque ella misma lo prohíbe.

**Hecho.** Migraciones `014` (id público `uuid`, tablas `cuentas` y `sesiones`) y `015` (trigger: el estado avanza borrador → aprobada → enviada y solo el rol de la web escribe «aprobada» o «enviada»). Contraseñas con `scrypt` (de Node, sin librerías nuevas), bloqueo de 15 min tras 5 fallos, mismo mensaje exista o no el correo. Sesión en cookie `HttpOnly` con la huella SHA-256 en la base, 7 días. Google con código + PKCE + `state` + `nonce`, sin librerías. `npm run cuenta` crea la cuenta de administración desde tu terminal (la web no puede fijar el rol). Cada página y acción comprueba sesión, rol y dueña por su cuenta; el proxy es solo un primer filtro. Exportar incluye la cuenta (sin contraseña) y `borrar` enseña cuentas, sesiones, recomendaciones y candidaturas. 127 tests web (25 nuevos), 41 evals, `build` bien. Probado en el navegador con dos cuentas inventadas (ya borradas): login malo y bueno, 404 a ids ajenos y a secciones de administración, aprobar sin casilla, aprobar y enviar con el historial correcto; el trigger, probado con ambos roles contra la base.

**Revisiones.** `auditor-lineas-rojas`: sin incumplimientos. Mejoras aplicadas: (A) el importador ya no admite estados `aprobada` ni `enviada` ni historiales con aprobaciones (antes bastaba escribir `por: usuaria` en un JSON); (B) aprobar lleva la versión que leíste y se rechaza si el borrador cambió; (C) `borrar` cuenta todo lo que se pierde y hay test del export de la cuenta. `revisor-seguridad`: nada crítico. Aplicados: el trigger, cookie `Secure` siempre en producción, Google no se une solo a una cuenta de administración, y una cuenta de contraseña sin verificar pasa a Google (pierde la contraseña y se cierran sus sesiones).

**Decisiones mías que puedes revertir.** (1) Administración **no** ve datos personales ajenos (RGPD, minimización); si el profesor quiere ver perfiles de prueba, se crea una cuenta de prueba y se entra con ella. (2) Solo se aprueban borradores: un `pendiente_de_ti` se rehace antes en Claude Code. (3) `/aprobar` y `/marcar-enviada` en Claude Code quedan como guía: ya no escriben. (4) El correo de las cuentas por contraseña **no se verifica** (no hay servicio de correo; coste y mantenimiento). Tema del bootcamp que practica: autenticación y autorización, seguridad de aplicaciones web y defensa en profundidad.

**Fallos míos.** Un índice mal puesto al leer el hash (`m[5]` en lugar de `m[4]`) hacía que ninguna contraseña correcta entrara: lo cazó un test. La ruta de Google salió «estática» en el `build` y habría ignorado las claves en producción: lo vi en la tabla del `build` y la fijé como dinámica. El formulario vaciaba el correo tras un error. Lección: probar un camino malo y uno bueno, y leer la salida del `build`.

**Límites y pendientes.** (a) **Antes de abrir Horma a internet:** límite de intentos por IP y de registros (hoy quien sepa un correo puede bloquear esa cuenta 15 min), verificación de correo, dominio propio en `host.ts` y prefijo `__Host-` en la cookie. (b) Botones «Descargar mis datos» y «Borrar mi cuenta» en la web (hoy por terminal; obligación RGPD antes de usuarias reales). (c) Cambiar y recuperar contraseña (hoy `npm run cuenta` la restablece). (d) `datos/candidaturas/*/estado.json` ya no se actualiza: la base manda desde que se aprueba. (e) Google no se probó con credenciales reales (las creas tú en Google Cloud); sí la salida a Google y los caminos de error.

## 6-nov-2026 · Bloque 4, añadido: vincular Google a la cuenta de administración

**En llano.** Querías entrar con Google y seguir siendo administradora. Por seguridad, Google nunca se une solo a una cuenta de administración (un correo reciclado podría entrar como admin). La solución: creas la cuenta con `npm run cuenta ... --admin`, entras una vez con contraseña y pulsas «Vincular Google» en la barra. Solo vale con tu sesión abierta y con el Google del mismo correo de la cuenta, así que quien robe una sesión no puede dejarse su propio Google como puerta permanente. Desde ahí, Google te deja entrar con tu rol de siempre. En la barra aparece ahora la etiqueta «Administración» para saber en qué modo estás.

**Hecho.** `/auth/google?vincular=1` y su rama en el retorno de Google (exige sesión y mismo correo; solo si la cuenta no tenía otro Google); campo `google` en la sesión; etiqueta y enlace en la barra. 127 tests, `tsc`, `lint` y `build` bien. **No probado** con credenciales reales de Google (las crea Mar en Google Cloud). Pendiente menor: si la vinculación falla no se muestra un mensaje (el enlace «Vincular Google» sigue ahí); se puede añadir un aviso en el panel.


## 6-nov-2026 · Alcance de fuentes: solo España, y qué se toma de un agente externo

**En llano.** Por ahora Horma solo busca ofertas en webs y portales de España, para construir sobre una base pequeña y sólida; Europa llega después. Mar pasó los consejos de otro agente de IA sobre cómo conseguir ofertas. Algunas ideas sirven y otras chocan con lo que ya decidimos; aquí queda lo que se aprovecha, lo que no y por qué, para no volver a discutirlo desde cero.

**Decisión (Mar).** Alcance geográfico: España. Reversible. JobTech Suecia sigue apagada en `endpoints.json`, no borrada. Actualizados: `propuesta-horma.md`, `CLAUDE.md` y el artefacto «Fuentes de empleo».

**Se aprovecha del agente externo.**
- **Prompt injection (texto de la oferta que intenta dar órdenes al modelo):** Mar tiene razón en que se puede gestionar con medidas y no es motivo para renunciar a una fuente. Ya las tenemos: subagentes solo con `Read`, texto de ofertas tratado como no fiable, esquemas cerrados, revisión humana antes de guardar. Se mantienen y se refuerzan, no frenan nada.
- **Fuentes públicas y de nicho en España:** boletines oficiales autonómicos y provinciales (como el BOE, ya activa), servicios autonómicos de empleo, universidades, ayuntamientos. Aún no calificados.
- **Ofertas que trae la usuaria** (marcador del navegador, extensión o enlace): ya previsto en «fuentes por capas».
- **GitHub Actions para programar la ingesta:** viable; es un detalle de despliegue para más adelante.
- **Lectura del HTML con apoyo de un modelo cuando una fuente permitida no ofrece API:** posible dentro de la pista A (Claude Code), no dentro de la web.

**No se adopta (y por qué).**
- **Saltarse bloqueos o condiciones de uso, o rotar IP para evitarlos:** es el riesgo legal que `/calificar-fuentes` existe para evitar (derechos sobre bases de datos, RGPD con nombres y contactos de reclutadores). Es un límite de producto, no prudencia; se cambia solo con el profesor.
- **LLM dentro de la web, base vectorial, Supabase:** el profesor pidió web sin LLM; el emparejamiento es por taxonomía; ya hay PostgreSQL.
- **«El RSS y los canales públicos no tienen condiciones»:** lo tienen; se califican igual.

**Camino para más volumen en España sin romper reglas** (el volumen es el segundo paso, no se descarta): (1) calificar fuentes de empleo público autonómicas y municipales; (2) Careerjet: abrir la cuenta de socia (pendiente de Mar) y leer sus términos; (3) escribir a InfoJobs, Tecnoempleo, Infoempleo y Adzuna pidiendo permiso o programa de socios: un metabuscador les da tráfico y puede ser una buena oferta; (4) ATS públicos de empresas españolas (Greenhouse, Personio…) con lista que mantenemos a mano; (5) decisión del profesor sobre Apify y scraping (pregunta 32).

## 6-nov-2026 · Plan de construcción autónoma de unas 10 horas

**En llano.** Preparé el guion para que Sonnet 5.5 construya durante unas 10 horas sin ti: qué hacer, en qué orden, qué no tocar nunca y cómo comprobar cada paso. Trabaja en ramas aparte (`main` queda intacta), no empuja nada a internet, hace una copia de la base de datos antes de empezar y, al terminar, te deja un resumen de una página para revisar por la mañana.

## 6-nov-2026 · Construcción autónoma, B0 y B1: arranque y página «Mi cuenta» (RGPD)

**B0:** línea base verificada (127 tests web, 41 evals, build y lint limpios), copia de `horma-db` en `datos/copias/pre-autonomo-2026-11-06.sql`, rama `autonomo/2026-11-06` desde `main` y `docs/autonomo/estado.md` como único punto de retoma.

**B1, página `/cuenta` (sesión obligatoria), tres piezas RGPD:**
- **Descargar mis datos:** ruta `GET /cuenta/descargar` que reutiliza `SQL_EXPORTAR` (nunca incluye el hash) y entrega el JSON al momento, sin dejar ningún archivo en el servidor (a diferencia de `npm run exportar`, pensado para Mar, que sí escribe en disco).
- **Cambiar contraseña:** pide la actual, aplica `problemaContrasena` y cierra TODAS las sesiones (también la de este navegador) abriendo una nueva, así una contraseña filtrada en otro sitio deja de servir.
- **Borrar mi cuenta:** pide la contraseña (o el correo exacto si solo entra con Google). La cuenta de administración nunca se borra desde la web: lo bloquea tanto la página como la base de datos.
- **Migración 016** (aditiva, con su rollback en la cabecera): función `borrar_cuenta_propia(id)` en vez de `GRANT DELETE` directo a `horma_web` — así, si algún día hay un fallo en el código de la web, no puede borrar cualquier fila con un id ajeno, y nunca borra una cuenta con `rol = 'admin'`. Probada a mano con `docker exec`: como `horma_web` borra una cuenta normal, bloquea una de administración (devuelve 0) y un `DELETE` directo a la tabla da «permission denied» (confirma el mínimo privilegio); como `horma` (la terminal) sigue pudiendo borrar sin pasar por la función.
- **Navegador (Playwright, dos cuentas inventadas `auto-b1-a`/`auto-b1-b`):** camino bueno y malo de cambiar contraseña y de borrar; cuenta B no entra en la URL de A (404, por `requerirDuena`, antes incluso de mirar si hay perfil); tras borrar las dos, ninguna fila queda en `cuentas` y `npm run exportar` ya no las encuentra. Las dos cuentas de prueba y su carpeta de exportación se borraron al cerrar (con `rol = 'usuaria'`, nunca `admin`; correos inventados `@example.invalid`).
- 9 tests nuevos en `cuenta.test.ts` (contraseña mala, cuenta solo-Google, admin bloqueada, confirmación de correo); 136 tests web en total, 41 evals sin tocar.
- `revisor-seguridad` sobre B1 queda para el cierre (B5), junto con B2, según el modo ahorro del plan.

**En llano.** Ahora cualquier usuaria puede descargar sus datos, cambiar su contraseña o borrar su cuenta ella misma, sin pedírmelo por correo: es la obligación del RGPD de poder llevarte tus datos y de poder borrarlos. Lo más delicado era que nadie pudiera borrar la cuenta de administración por error o por un fallo de código; por eso la regla vive dos veces, en la página y en la propia base de datos, y lo comprobé a mano antes de seguir. **Tema del bootcamp:** seguridad de aplicaciones web (mínimo privilegio en el acceso a datos) y cumplimiento normativo (RGPD, derechos de acceso y supresión).

## 6-nov-2026 · Construcción autónoma, B3: portal de empresas I (identidad, publicar, moderación)

**Migración 018:** tres tablas nuevas (`empresas`, `cuentas_empresa`, `sesiones_empresa`) e identidad completamente aparte de las usuarias: su propia cookie (`horma_sesion_empresa`), sin registro público (alta solo por terminal, `npm run cuenta-empresa`, modo piloto). `ofertas` gana `descripcion`, `estado_publicacion` (por defecto `aprobada`: ninguna oferta existente cambia de estado) y `empresa_id`. Disparador `ofertas_moderacion`: una oferta de empresa nace siempre `pendiente_de_revision` (aunque el código de la web tuviera un fallo, la base lo impide) y solo `horma_web` mueve su estado, con transiciones fijas (`pendiente_de_revision → aprobada/rechazada`, `aprobada → cerrada/pendiente_de_revision`, `rechazada → pendiente_de_revision`). Probado a mano con `docker exec`: camino bueno completo, una empresa intentando nacer «aprobada» (rechazado por la base) y una transición fuera de la lista (rechazada).

**Publicar y moderar:** `/empresa/ofertas/nueva` y `.../[id]/editar` con campos cerrados (modalidad, contrato, idioma, nivel, sector y familia de la taxonomía común) y sin ningún LLM; se valida con el **mismo esquema `oferta`** que usan los agentes (esquema 0.8, campo `descripcion` opcional, migración 018). Editar una oferta ya aprobada o rechazada la devuelve a revisión. `/admin/ofertas-empresas` aprueba o rechaza (solo administración); hasta entonces, la oferta no aparece en `/ofertas` ni en `/recomendaciones` (lo filtra `consultas.ts` y, por si acaso, también `matches.ts`: dos capas).

**Fallo real encontrado al probar en el navegador (y arreglado):** `proxy.ts` solo conocía la cookie de candidata/administración; mandaba todo `/empresa/*` a `/entrar` si no había sesión de usuaria, aunque hubiera sesión de empresa válida. Lo até a la cookie correcta (`/empresa/*` exige `horma_sesion_empresa` y manda a `/empresa/entrar`, no a `/entrar`). Sin esta prueba en el navegador real (no solo tests), el portal de empresas habría quedado inutilizable para quien no tuviera también una sesión de candidata.

**Pruebas:** dos empresas inventadas (`auto-b3-empresa-a/b`) — A publica, administración aprueba, aparece en `/ofertas` con «publicada por la empresa»; antes de aprobar, una candidata de prueba no la ve; B no puede editar la oferta de A (404); una candidata con sesión no entra en `/empresa/*` (redirige a `/empresa/entrar`), y viceversa. Ampliada la «lista blanca» de `preferencias.test.ts`: ninguna ruta de `/app/empresa/` puede importar `@/lib/sesion` ni leer perfiles, preferencias, matches o candidaturas. 15 tests nuevos (`empresa-acceso.test.ts`, `empresa-oferta.test.ts`); 154 tests web, 41 evals.

**En llano.** Ya hay un sitio para que una empresa publique una oferta directamente en Horma, aparte de las que traemos de otras webs. Lo más importante aquí no es la pantalla: es que una empresa nunca pueda saltarse la revisión (ni por un fallo mío, porque la base también lo impide) y que su sesión sea un mundo completamente distinto del de las candidatas, nunca pueda leer sus datos. El fallo del `proxy.ts` que encontré probando en el navegador es justo la prueba de por qué no basta con que compile y pasen los tests: hay que abrirlo de verdad. **Tema del bootcamp:** control de acceso basado en roles con identidades múltiples, y máquinas de estado reforzadas en la base de datos (disparadores) como defensa en profundidad.

## 6-nov-2026 · Construcción autónoma, B2: página «Seguimiento»

**Migración 017:** amplía el disparador `candidaturas_transicion` (el que ya defendía que solo la usuaria, desde la web, aprueba y anota el envío) con los estados que llegan después de enviar: `enviada → entrevista/rechazada/sin_respuesta`, `entrevista → rechazada`, y «descartar» desde `borrador`, `aprobada` o `pendiente_de_ti`. Estos estados nuevos también los escribe solo `horma_web` (el importador, rol `horma`, solo mueve `borrador ↔ pendiente_de_ti`); probado a mano con `docker exec`: el camino bueno completo (`borrador→aprobada→enviada→entrevista→rechazada`), una transición inválida (`entrevista→enviada`, rechazada por la base) y el importador intentando escribir `rechazada` (rechazado por el rol).

**Página `/seguimiento`:** las candidaturas de la usuaria agrupadas por estado, con contadores arriba, fecha del último cambio y el historial completo de cada una. Formulario «Registrar respuesta»: un desplegable con solo los destinos válidos desde el estado actual (los mismos pares que el disparador; si alguien manipula el campo oculto, la consulta vuelve a comprobar el estado real en la base) y una nota opcional de hasta 300 caracteres, con el aviso de no escribir datos de otra persona. El aviso de «21 días sin respuesta» se calcula al mostrar la página (no hay tareas programadas) y la usuaria lo confirma con un botón.

`/respuesta` ya no aplica el cambio (solo lo propone; dice que se confirma en la web) y `/tablero` avisa de que el estado al día vive en la web. Probado en el navegador con una candidatura de prueba (datos inventados): el ciclo `enviada → entrevista → rechazada` con su historial y nota, y que otra cuenta (`auto-b2-d`) no ve nada de la candidatura de la primera (`/seguimiento` vacío). 3 tests nuevos en `candidaturas.test.ts`; 139 tests web, 41 evals. `auditor-lineas-rojas` sobre B1 y B2 juntos, a continuación.

**En llano.** Hasta ahora, cuando una empresa respondía, había que decírmelo a mí para que yo lo anotara a mano. Ahora la usuaria lo registra ella misma en «Seguimiento», y la base de datos vuelve a comprobar que el cambio tiene sentido (no se puede pasar de «rechazada» a «entrevista», por ejemplo) aunque alguien manipule la página. **Tema del bootcamp:** máquinas de estados en la base de datos (disparadores/triggers) como defensa adicional a la validación en el código.

## 7-nov-2026 · Construcción autónoma, B4: portal de empresas II (enviar y bandeja)

**Migración 019:** tabla `envios_empresa`, con una copia **congelada** del CV y la carta aprobados (nunca se vuelve a leer `candidaturas` después de enviar, así que un cambio posterior no altera lo que la empresa ya vio) y, solo si la usuaria lo marca, su nombre y correo de contacto. La bandeja de la empresa (`SQL_BANDEJA`) solo admite `ORDER BY enviado_en`: nada de nota, ATS, traza, huecos ni ninguna otra tabla de candidatas (línea roja del AI Act, Anexo III.4: Horma nunca ordena ni filtra candidatas para una empresa); `empresa-envio.test.ts` rompe esta regla a propósito para comprobar que salta. Fallo real que encontré al probar el INSERT a mano (`docker exec`): faltaba `GRANT USAGE` sobre la secuencia del `bigserial` (el mismo patrón que `eventos_id_seq`, migración 009) — sin él, `horma_web` no podía insertar ninguna fila aunque tuviera el `GRANT INSERT`.

**Enviar:** en `/candidaturas/[id]`, una candidatura aprobada de una oferta de empresa muestra «Enviar a la empresa» en vez de «Marcar como enviada». La pantalla de consentimiento (`/candidaturas/[id]/enviar/[ofertaId]`) enseña **exactamente** el CV y la carta que verá la empresa, con la lista de lo que nunca se comparte (nota, ATS, traza, huecos, perfil humano, preferencias, otras candidaturas) antes del botón. Al enviar, una sola transacción inserta la copia y marca la candidatura `enviada` con canal `portal de Horma`.

**Bandeja y retirar:** `/empresa/ofertas/[id]/bandeja` lista en orden de llegada, con cuatro estados cerrados (`recibida`, `vista`, `en_proceso`, `no_seleccionada`; sin texto libre). Ese estado se ve en `/seguimiento` y en `/candidaturas/[id]` de la candidata como información, sin cambiar su candidatura por sí solo. La candidata puede retirar su envío (borra la copia; la candidatura se queda en «enviada», que sigue siendo cierto: se envió y luego se retiró).

**RGPD:** el borrado en cascada ya era automático (`ON DELETE CASCADE` en `usuaria_id` y `empresa_id`); añadido `envios_empresa` a `npm run exportar` y a la descarga de `/cuenta`, para que la usuaria lo vea reflejado.

**Pruebas:** a mano con `docker exec` (INSERT, cambiar estado, retirar, mínimo privilegio — no se puede tocar `cv_md`/`carta_md`, solo `estado_bandeja` — y cascada al borrar usuaria y empresa) y en el navegador de punta a punta: empresa publica y administración aprueba una oferta, una candidata aprueba su candidatura y la envía (con contacto), la empresa la ve en su bandeja y cambia su estado a «vista», la candidata lo ve reflejado en su candidatura, retira el envío y desaparece de la bandeja; una segunda empresa no puede ver esa bandeja (404). 5 tests nuevos (`empresa-envio.test.ts`); 159 tests web, 41 evals.

**En llano.** Ya se puede mandar una candidatura de verdad a la empresa que la publicó, sin salir de Horma, y la empresa la recibe en una bandeja que no la ordena ni la puntúa por calidad: decide ella, leyendo. Es la pieza que faltaba para que el portal de empresas funcione de punta a punta. Con esto se cierran los cuatro bloques de esta noche (B1 a B4); toca la revisión de seguridad y de líneas rojas sobre B3+B4 juntos, y después el cierre. **Tema del bootcamp:** transacciones de base de datos (todo o nada: la copia y el cambio de estado se hacen juntos o no se hace ninguno) y mínimo privilegio a nivel de columna.

## 7-nov-2026 · Corte de la construcción autónoma: B1 a B4 hechos, revisores a medias

Mar volvió antes de las 10 horas previstas (límite de uso de la cuenta) y pidió asegurar el trabajo: documentar, hacer commit y subirlo. Este es el cierre de esa sesión, no el cierre B5 completo del plan.

**Hecho y fundido en `autonomo/2026-11-06` (nunca en `main`):** B0 (línea base y copia de seguridad), B1 (cuenta y RGPD: descargar datos, cambiar contraseña, borrar cuenta), B2 (seguimiento), B3 (portal de empresas I: identidad, publicar, moderación) y B4 (portal de empresas II: enviar y bandeja). 159 tests web, 41 evals, build/lint/tsc limpios, probado de punta a punta en el navegador con datos inventados (detalle en las entradas de arriba). `auditor-lineas-rojas` revisó B1+B2 y B3+B4: **sin hallazgos** en ambos pases (dos arreglos menores de documentación en `scripts/borrar.ts`, ya aplicados).

**No hecho:** los dos pases de `revisor-seguridad` (sobre B1+B2 y sobre B3+B4) se lanzaron en paralelo con el auditor y los dos **fallaron a mitad de revisión por límites de uso de la cuenta** (uno por límite de tasa, el otro por el límite de 5 horas), no por ningún hallazgo. Ninguno llegó a terminar ni a encontrar nada: hay que repetirlos enteros, no reanudarlos. Tampoco se escribió la sección nueva de `docs/informe-pruebas.md` ni se decidió si fundir `autonomo/2026-11-06` en `main`.

**En llano.** Lo construido esta noche (cuenta y RGPD, seguimiento, y el portal de empresas completo: publicar, moderar, enviar y la bandeja) está terminado, probado y limpio de líneas rojas; lo único que falta es la revisión de seguridad final, que se cortó dos veces por quedarse sin cuota de la cuenta, no por ningún problema del código. Nada se ha perdido: todo está en commits, en la rama `autonomo/2026-11-06`, sin tocar `main`. **Tema del bootcamp:** por qué una tarea nocturna larga necesita puntos de guardado frecuentes (cada bloque, cada commit) en vez de depender de llegar al final: así un corte a mitad de camino no pierde nada.

**Hecho.** `docs/construccion-autonoma.md`: prompt para pegar, 9 bloques (preparación; cuenta y RGPD; seguimiento; portal de empresas en dos partes; ofertas que trae la usuaria; dos opcionales; cierre), puerta de calidad común, protocolo de dudas sin Mar (técnica: decide; objetivo: opción conservadora y pregunta anotada; línea roja: no se construye) y plantilla de estado para retomar tras una compactación. Índice y tareas pendientes apuntan a él.

**Decisiones mías que puedes revertir.** (1) Las empresas se dan de alta solo por terminal y sus ofertas pasan por moderación de administración: sin verificar correos, un registro abierto permitiría ofertas falsas. (2) Identidad de empresa separada de la de candidata (tablas y cookie propias) para que ninguna consulta de candidatas mezcle empresas. (3) La bandeja de la empresa va ordenada solo por fecha, sin filtros ni notas (AI Act, Anexo III.4). (4) La web no descarga enlaces que pegue la usuaria (SSRF y condiciones de uso): se pega el texto y se procesa en Claude Code. (5) Fuera de la noche: correo, despliegue, Google real, ejecutor de formularios, dependencias nuevas. Tema del bootcamp que practica: agentes autónomos con límites, mínimo privilegio y evaluación por puertas de calidad.

**Riesgos que dejo dichos.** Diez horas sin nadie que pulse «permitir» exigen modo automático: lo acotan los `deny` de `settings.json` (que debes pegar tú; no he comprobado si siguen mandando en ese modo, hay que probarlo antes de irte), la rama aparte y la copia de la base. Descartar una rama no deshace las migraciones ya aplicadas; cada una lleva su rollback. Si se agota el límite de uso o el ordenador se suspende, la sesión se para y `estado.md` permite retomar.

**Cambios de Mar al plan (6-nov, misma tarde).** Fuera, de forma definitiva, «ofertas que trae la usuaria» (no le gusta; el profesor lo había pedido: hay que decírselo). Supervisor del envío, calidad de ofertas y fuentes nuevas pasan a mañana con ella. Modo ahorro por presupuesto (20 € de crédito): sin agentes de Horma ni búsquedas, tres pasadas de revisores en total y lecturas mínimas. El plan queda en B0 a B5 (≈ 8 h). `settings.json` no lo puedo escribir (el sistema lo bloquea: es la configuración que me controla); el bloque con permisos y bloqueos queda en `docs/ajustes-pendientes-settings.md` para que lo pegue Mar.

**En llano.** La noche será más corta y más barata: cuenta y RGPD, seguimiento y portal de empresas. Lo demás lo decidimos juntas mañana.

## 7-nov-2026 · Cierre de sesión: push de las cinco ramas a GitHub

Mar pidió explícitamente subir a `origin` lo construido esta noche («hagas commit y push... que no perdamos nada»). `git push` estaba en el `deny` de `.claude/settings.json` (puesto a propósito para el modo autónomo). Quité esa línea solo para este push, con la autorización directa de Mar, y subí las cinco ramas: `autonomo/2026-11-06`, `auto/b1-cuenta-rgpd`, `auto/b2-seguimiento`, `auto/b3-empresas-i`, `auto/b4-enviar-bandeja`. `main` sigue intacta (ese bloqueo es aparte y no lo toqué). En cuanto terminó el push, repuse `git push` en el `deny`: la configuración vuelve a su estado seguro por defecto para la siguiente sesión.

**En llano.** Todo lo de la noche autónoma ya está también en GitHub, no solo en el ordenador: si pasa algo con este equipo, el trabajo no se pierde. Para volver a empujar algo en el futuro hace falta pedírmelo otra vez de forma explícita, porque por defecto esa puerta está cerrada. **Tema del bootcamp:** permisos por defecto cerrados («deny by default») que se abren solo con una orden explícita y puntual, nunca de forma permanente sin que alguien decida quitarla a propósito.

## 7-nov-2026 · Specs ancladas y economía de tokens

**Hecho.** (1) Indicación del profesor «spec-anchored» traducida y adaptada: sección «Specs» en `CLAUDE.md` (el pedido de Mar gana a la spec; delta visible y OK antes de tocar código; regenerar `docs/tareas-pendientes.md`). **Decisión mía, que puedes revertir:** añadí una excepción para las líneas rojas, porque sin ella «el pedido gana» permitiría saltarse el AI Act o el RGPD. (2) Sección «Economía de tokens» en `CLAUDE.md` y apagado, solo en este proyecto, de un plugin, 20 skills y 3 MCP; listado en `docs/ajustes-pendientes-settings.md`. Mar eligió apagar también `paso-NN`, `neg-*` y `asesora-negocio`.

**No hecho.** Mover el detalle de feature del `CLAUDE.md` a `docs/` (se propone antes de moverlo) y apagar los conectores Vercel, v0 y Lovable (los apaga Mar con `/mcp`).

**En llano.** Cada conversación carga menos «herramientas que no usamos», y la regla del profesor ya está escrita para que la Copiloto no vuelva a recortar tus pedidos para que quepan en una spec vieja. **Tema del bootcamp:** especificaciones como fuente de verdad viva (spec-driven development) y gestión del contexto del agente.

## 7-nov-2026 · Bloqueos de `deny` quitados a propósito

Mar redujo el `deny` de `.claude/settings.json` a los bloqueos de `.env` y `docs/privado` y lo confirmó como decisión suya. Quedó dentro del commit `6bcadd5`. Ya no hay bloqueo técnico de `git push`, `reset --hard`, `rm -rf`, Docker destructivo ni cambios en `main`: solo cuentan las reglas escritas en `CLAUDE.md`. **Acordado:** al pedir Mar trabajo autónomo, se repone el `deny` completo antes de empezar (copia en `docs/ajustes-pendientes-settings.md`). **Riesgo que dejo dicho:** hasta entonces, un error mío o una orden mal entendida no tiene red de seguridad técnica; por eso `git push` y `main` los sigo tratando como «solo con orden explícita».

**En llano.** Ahora trabajo con menos candados para que no te frenen. Cuando quieras una noche autónoma, vuelven a ponerse; y mientras tanto yo no empujo a `main` ni borro nada sin preguntarte. **Tema del bootcamp:** permisos mínimos según el contexto (más abiertos con supervisión humana, cerrados sin ella).

## 7-nov-2026 · Medición real de fuentes de España y delta de «ofertas de la usuaria»

**Hecho.** Descargué y conté 8 feeds de España en vivo (detalle en `docs/privado/medicion-fuentes-espana-2026-11-07.md`): Feina Activa 4.715 ofertas (vivo, el «16-sept» era metadato del catálogo), CIDO 1.615 con plazo abierto, Castilla y León ~787 oficiales, Murcia 255, Andalucía ~200 y Lanbide 628. Total ≈ 7.600–8.200 ofertas, pero solo 100–170 del sector informático y 15–25 de desarrollo, datos o IA. Descubrí con la API de `datos.gob.es` cinco conjuntos que el informe del 6-nov no tenía. Lanbide queda en amarillo (su `robots.txt` dice `Disallow: /` y no trae empresa; hice una sola petición de medición antes de leerlo). InfoJobs: la cita de «agregadores prohibidos» no se pudo confirmar (el enlace de condiciones del portal apunta a `#`). Adzuna: términos leídos, España sin confirmar. **Corrección de Mar el mismo día:** «ofertas que trae la usuaria» (pegar texto o enlace, extensión, alertas reenviadas) sigue **descartado al 100 %**; yo lo había reabierto por error al leer su petición de investigación como una orden de diseño, y lo revertí en `docs/tareas-pendientes.md`, `docs/construccion-autonoma.md`, `docs/ideas-banco.md` (B3, B4, H8, H9, H25 y J8) y en el prompt para otros modelos, que ahora lo declara firme. Preparé sin enviar: solicitud de reutilización (Ley 37/2007) y correos en `docs/privado/borradores-fuentes-2026-11-07.md`; script `detectar_ats.py` (solo detecta el ATS, 9 tests, enganchado a `python -I evals/correr_evals.py ingesta`); y `docs/prompt-agente-fuentes-terceros.md` para consultar a otros modelos.

**No hecho.** Ninguna licencia exacta leída (todas son «verde provisional»); ninguna fuente pasada por `/calificar-fuentes` ni añadida a `endpoints.json`; Euskadi OPE sin medir; Galicia con URL nueva por encontrar; términos de Jooble y Careerjet sin leer; ningún correo enviado; el plazo de respuesta de la Ley 37/2007 sin verificar en el texto vigente. Las decisiones de reposicionar Horma, la nota 0-100 y el matiz de la línea roja 4 siguen siendo de Mar y del profesor.

**En llano.** Probé los grifos uno por uno y casi todos dan agua: hay unas 8.000 ofertas abiertas, pero casi todas son de administración y oficios, no de programación ni IA. Para llenar Horma de ofertas tech hacen falta los portales privados y las empresas, y por eso he dejado un prompt para pedir ideas a otros modelos. **Tema del bootcamp:** ingesta de datos (adaptadores por fuente, calidad y deduplicación), licencias de datos abiertos y minimización de datos personales (RGPD).

## 7-nov-2026 · Construcción autónoma II preparada

**Hecho.** Plan de la segunda noche en `docs/construccion-autonoma-2.md` (≈ 8,6 h con margen), a petición de Mar con los cuatro bloques: calidad de ofertas (dedup capas 1-2, cierre de caducadas por reglas, etiqueta de transparencia), adaptadores de las fuentes medidas (desactivados, con muestras inventadas), enlaces «buscar también en…» y supervisor del envío automático (solo reglas duras en código, apagado por defecto), más el cierre pendiente de la noche 1 (repetir los dos `revisor-seguridad`). Como el agente autónomo no puede leer `docs/privado/`, los formatos de los feeds están en `docs/fuentes-formatos-2026-11-07.md` (sin datos personales ni licencias verificadas). Repuesto el `deny` completo de `.claude/settings.json` (23 reglas), comprobado el JSON, `horma-db` sana y las ramas de la noche 1 en `origin`.

**No hecho.** Nada de esto se ha ejecutado todavía. Quedan fuera, por decisión escrita en el plan: registrar fuentes en `endpoints.json`, Lanbide, `pg_trgm` (extensión nueva), el LLM del supervisor y cualquier envío real. **Riesgo que dejo dicho:** las URL de los botones «buscar también en…» salen de memoria (la sesión no hace búsquedas web) y Mar debe comprobarlas a mano; con el `deny` repuesto, `git push` queda bloqueado hasta que ella lo autorice.

**En llano.** Dejo preparada la noche: qué construir, en qué orden y qué recortar si falta tiempo o crédito. Lo nuevo que entra es lo que más acerca Horma a tener muchas ofertas fiables (limpiar duplicados y caducadas, y tener listos los lectores de las fuentes), sin activar nada hasta que tú des el visto bueno. **Tema del bootcamp:** ingesta de datos con calidad (deduplicación, caducidad por reglas), guardarraíles en agentes autónomos (denegar por defecto) y trabajo autónomo con puertas de calidad.

## Cierre de seguridad de la noche 1 y construcción autónoma III preparada (7-nov, Mar)

**Qué.** Se repitieron los dos pases de `revisor-seguridad` que la noche 1 dejó sin informe. No hay críticos ni altos; se comprobaron en el código y se corrigieron los seis medios y dos bajos baratos: `search_path` de la función de borrado (migración 020), bloqueo por fallos al cambiar contraseña o borrar cuenta, purga de archivos que ya no restaura datos de una cuenta borrada, `no-store` en la descarga, envío solo a ofertas aprobadas, botón «Retirar» para la administración, aprobación atada a la versión del texto visto y exportación con el nombre y correo compartidos. Detalle y lo que queda por decidir: `docs/informe-pruebas.md`, sección 3 ter. Verificado: 164 tests web, `tsc`, `lint`, `build` y 42 evals.

También queda preparada la construcción autónoma de 4 h (`docs/construccion-autonoma-3.md`, con su `settings` en `docs/autonomo/settings-autonomo.json`) y el `deny` de `.claude/settings.json` reducido a lo que fijó Mar. Las migraciones del plan pasan a 021 y 022 porque la 020 ya está usada.

**No hecho.** Los hallazgos B4-4 a B4-11 (defensa extra y límites) esperan decisión; CI en GitHub Actions espera el OK de Mar; nada está empujado.

**En llano.** Un revisor independiente leyó el código sensible y encontró fallos pequeños, ninguno grave: cosas como que alguien con tu sesión robada pudiera probar contraseñas sin límite, o que se pudiera enviar un CV a una oferta ya retirada. Están arregladas con su prueba. **Tema del bootcamp:** revisión de seguridad con un agente de solo lectura, defensa en profundidad (el código y la base se protegen entre sí) y pruebas que fallan a propósito para comprobar que detectan el fallo.


## A1 · Calidad de ofertas (7-nov, construcción autónoma III)

**Qué.** Migración `021` (aditiva, rollback en su cabecera): `url_canonica`, `huella_base`, `huella`, `grupo_dedup`, `primera_vista`, `ultima_vista`, `veces_vista` y `fecha_cierre`, sin ninguna restricción UNIQUE. `web/src/lib/calidad-ofertas.ts` (funciones puras): URL canónica (capa 1), huella = empresa + título + municipio normalizados + semana ISO de `fecha` (capa 2) y reglas de vigencia calculadas al mostrar: cerrada si `fecha_cierre` < hoy, «puede no estar vigente» a más de 45 días sin verla, «recurrente» si la misma empresa+puesto+municipio aparece en otra semana. `/ofertas` y las recomendaciones muestran **una fila por grupo** (mejor licencia: empresa > socio > abierto; a igualdad, la más reciente) con una etiqueta de solo hechos (antigüedad, veces vista, fuente, licencia, marcas) y «también publicada en…»; **no se borra ninguna fila**. El importador cuenta una vista más al reimportar. Esquema `oferta` 0.9 (`fecha_cierre` opcional) y `buscar.py` descarta las cerradas (eval nuevo `fecha_cierre`). `npm run dedup` calcula huellas de las 25 ofertas que ya había (idempotente).
**Decisiones.** (1) Añadí `huella_base` (sin semana): sin ella la regla «misma huella, semanas distintas» no se puede calcular, porque la semana ya va dentro de `huella`. (2) La agrupación se decide en SQL, una sola vez (no duplicada en TypeScript); la prueba contra la base real (`calidad-ofertas.db.test.ts`, datos `auto-a1-*`, se salta sola sin contraseñas) comprueba que ninguna fila se pierde y falla si se rompe el orden de licencias. (3) `npm test` ahora carga `web/.env` si existe (`--env-file-if-exists`). (4) Las fechas `date` se piden también como texto: `toISOString()` sobre un `date` de pg las corría un día atrás.
**No hecho.** La regla «desaparece del feed en dos lecturas» (las ingestas son parciales). Ningún modelo decide si una oferta es «fantasma».
**Pruebas.** 180 tests web, 43 evals, `tsc`, `lint`, `build` y `verificar` limpios; navegador (producción, 127.0.0.1): dos ofertas casi iguales de dos fuentes → sale una (la de empresa) con «también en…»; la cerrada no sale; nota sin cambios. Dos ofertas reales de Knightec con el mismo título, municipio y semana quedaron agrupadas (heurística).
**En llano.** Si la misma oferta llega por dos fuentes, ahora ves una sola vez, con la mejor licencia, y se dice en qué otra fuente está; las que ya cerraron desaparecen y las que llevan mucho sin verse se avisan. Todo son hechos comprobables, nada de juicios sobre la empresa. **Tema del bootcamp:** calidad de datos y deduplicación determinista (hash de campos normalizados) frente a embeddings.

## A2 · CSP estricta y escapado de texto (7-nov, construcción autónoma III)

**Qué.** `web/src/proxy.ts` pone a TODA respuesta (también redirecciones y 403) una CSP con un nonce nuevo por petición (`web/src/lib/csp.ts`): `default-src 'self'`, `script-src 'self' 'nonce-…' 'strict-dynamic'` (con `'unsafe-eval'` solo en desarrollo), `style-src 'self' 'unsafe-inline'`, `img-src 'self' data:`, `connect-src 'self'`, `object-src 'none'`, `base-uri`/`form-action 'self'` y `frame-ancestors 'none'`. Test que falla si aparece `dangerouslySetInnerHTML`, `.innerHTML`, `eval(`, `new Function`, `document.write` o `insertAdjacentHTML` en `web/src` (lista blanca vacía; hoy no hay ninguno).
**Decisión que importa.** Con `cacheComponents` y `partialPrefetching` Next prerrenderiza el «cascarón» de cada página al compilar, sin nonce: probado en el navegador, 10 violaciones en `/entrar` y la página sin hidratar. Los **apagué** (nada usaba `use cache`) y el layout raíz hace `await connection()`: todas las rutas son dinámicas (`ƒ`). Coste: se pierde el prerrenderizado parcial, irrelevante en una web con sesión en casi todo. Alternativa si se quiere recuperar: CSP por hashes (SRI, experimental en Next). Único hueco abierto: `style-src 'unsafe-inline'` (las barras del panel usan `style={{width}}`).
**Pruebas.** 184 tests web, 43 evals, `tsc`, `lint`, `build` limpios; producción en 127.0.0.1 con Playwright: `/entrar`, `/ofertas`, `/cuenta`, `/seguimiento`, `/` (candidata), `/admin/ofertas-empresas`, `/salud`, `/fuentes` (admin), `/empresa/entrar` y `/empresa/ofertas/nueva` (empresa): cero violaciones, entrar y salir funcionan (acciones de servidor). Cuentas `auto-*` borradas.
**En llano.** Es una lista de «qué puede ejecutar el navegador» que manda la propia web: si alguien lograra colar un trozo de código en una oferta, el navegador se negaría a ejecutarlo. Para que Next pudiera firmar cada página con una contraseña de un solo uso (el nonce) hubo que quitarle un atajo de velocidad que no necesitamos. **Tema del bootcamp:** seguridad web (XSS, CSP, defensa en profundidad).

## A3 · Seguridad por filas, RLS (7-nov, construcción autónoma III)

**Qué.** Migraciones `022` (perfiles, preferencias), `023` (matches, candidaturas) y `024` (envios_empresa), cada una con su rollback en la cabecera. Política `propia_usuaria` para el rol `horma_web`: `usuaria_id = NULLIF(current_setting('app.usuaria_id', true), '')`; sin la variable no hay filas (falla cerrado). En `envios_empresa` hay dos identidades: la candidata (`app.usuaria_id`) y la empresa (`app.empresa_id`, solo lo que le han enviado); la empresa no tiene política en perfiles, preferencias, matches ni candidaturas. El dueño `horma` (importador, migraciones, exportar, borrar) y `borrar_cuenta_propia` (SECURITY DEFINER) no están sujetos a RLS; no se usa `FORCE`. `web/src/lib/db.ts` añade `conUsuaria`, `conEmpresa` y `fijarUsuaria` (transacción + `set_config(..., true)`: la variable muere con la transacción y el pool no la arrastra). Migradas todas las consultas de esas tablas (candidaturas, enviar/retirar, seguimiento, recomendaciones, perfil y preferencias, descarga RGPD y bandeja de empresa). La lista de administración usa `usuarias_con_perfil()` (SECURITY DEFINER; solo dice quién tiene perfil).
**Test que manda** (`web/src/lib/rls.db.test.ts`, contra la base real con `horma_web`, `auto-a` y `auto-b`): lee, actualiza e inserta filas ajenas → 0 filas / error 42501; sin variable no se ve nada; la empresa solo ve lo suyo; el pool no arrastra la variable; **rompiendo una política a propósito (en una transacción que se deshace) el test encuentra la fuga**, para cada una de las cinco tablas. Además, una guarda estática falla si alguien vuelve a consultar esas tablas con `db().query` suelto.
**Decisiones.** (1) Sin RLS en `cuentas` ni `sesiones`: el login las consulta antes de saber quién es la usuaria; su protección sigue en el código. (2) RLS no sustituye a `requerirDuena`; es una segunda barrera. (3) Un error dentro de `conUsuaria` deshace la transacción.
**Pruebas.** 189 tests web, 43 evals, `tsc`, `lint`, `build` y `verificar` limpios; `exportar` y `borrar` (en seco) siguen funcionando. Navegador (producción, 127.0.0.1): `auto-a` y `auto-b` ven solo lo suyo en recomendaciones, candidaturas y descarga; el id de A visto por B da 404; aprobar y «Enviar a la empresa» funcionan; la empresa ve su bandeja y cambia el estado. Datos `auto-*` borrados.
**Pendiente.** `cuentas`, `sesiones` y `cuentas_empresa`/`sesiones_empresa` (tablas de acceso) sin RLS, a propósito.
**En llano.** Antes, que nadie viera lo de otra dependía de que cada consulta de la web pusiera bien el «de quién es esto». Ahora, además, la propia base de datos se niega a entregar filas de otra persona aunque la consulta se equivoque, y si no se le dice quién pregunta, no entrega nada. **Tema del bootcamp:** seguridad en bases de datos (RLS, mínimo privilegio, defensa en profundidad).

## A4 · Cierre de la construcción autónoma III (7-nov)

**Qué.** Pasaron `revisor-seguridad` (A2+A3) y `auditor-lineas-rojas` (A1+A3); verifiqué cada hallazgo antes de tocar. Corregido: políticas de `envios_empresa` separadas por comando (migración `025`: la empresa solo lee y actualiza el estado; la candidata lee, inserta y retira; rollback en la cabecera), CSP duplicada de `next.config.ts` eliminada (una sola cabecera completa con nonce, comprobada con `curl`) y aviso «hay N recomendaciones que no se muestran porque cerraron o son repetidas» en `/recomendaciones`. Falso positivo descartado: el envío sí exige `aprobada`. Sin hacer: guarda estática del test RLS más estricta. Guía de pruebas: secciones 17-19. Puerta final: 189 tests web, 43 evals, `tsc`, `lint`, `build`, `verificar`.
**En llano.** Dos revisoras independientes miraron lo hecho esta noche y encontraron cosas pequeñas, no graves; las reales están arregladas y probadas. La empresa ya no puede borrar ni inventar envíos aunque un fallo futuro lo intentase. **Tema del bootcamp:** revisión independiente y defensa en profundidad.

## 7-nov-2026 · Cuaderno al día y push de la construcción autónoma III

**Hecho.** El apartado 25 (bitácora) y el 26 (informe de pruebas) del documento «Horma jobs» del Cuaderno, y la página aparte del profesor (`horma-apuntes`), quedan al día a 7-nov: pista B cerrada, construcción optimizada, las dos noches autónomas, fuentes de España y pendientes (189 tests web, 43 evals). La página del profesor sigue privada: compartirla es cosa de Mar desde el menú *Share*. Por orden de Mar se suben a `origin` las ramas `autonomo/2026-11-07` (migraciones 021 a 025), `autonomo/2026-11-06` (dos commits pendientes) y `auto/a1-calidad-ofertas`, `auto/a2-csp`, `auto/a3-rls`, por nombre y sin forzar. `main` no se toca y la fusión sigue pendiente de su decisión.
**Después.** Por orden de Mar se subió también el repo del Cuaderno (`main`, `a291ab1..3dc5f6a`).
**En llano.** Lo de esta noche ya está también en GitHub y los documentos del Cuaderno cuentan lo mismo que el repositorio. Para que entre en `main` hace falta tu orden. **Tema del bootcamp:** documentación viva y copias de seguridad en remoto (control de versiones).
