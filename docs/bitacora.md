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
