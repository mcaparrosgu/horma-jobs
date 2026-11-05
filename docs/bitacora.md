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
