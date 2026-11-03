# Tareas pendientes de Horma jobs

Actualizado el 2026-11-03 (el profesor comentó «Horma por fases» y se aplicaron sus 9 comentarios; ver bitácora del 3-nov). Antes, 2-nov («Horma por fases» publicado; diagramas al día, sin Caddy ni HTMX; «subagente ATS» pendiente del profesor; artefactos ordenados; PRD v1 en el Cuaderno; ver `docs/relevo-proxima-sesion.md`). Antes: ideas de Michael Page, PRD como apartado 23. Orden = prioridad. Cada tarea lleva su siguiente acción y qué la bloquea.

## Reglas permanentes (decididas por Mar)
- **Construcción y definición: no empiezan hasta tener el ok del profesor** (27 oct: también los pasos 1-8). Mientras tanto, solo investigación y documentación de apoyo.
- **En la sección Proyectos del Cuaderno nunca se hacen ejercicios ni examen.** Solo teoría, diagramas y glosario.
- **La Copiloto es la agente predeterminada** de este proyecto.
- **Cerrar frentes antes de abrir otros** (27 oct): Mar prefiere terminar lo abierto antes de las ampliaciones nuevas que trae.

## Abiertas

### 0. Siguiente sesión (31-oct)
**Prioridad: alta.** Detalle paso a paso en **`docs/relevo-proxima-sesion.md`**.
- **Fase 0, indicaciones del profesor (3-nov):** (1) pasárselo a Claude y construir: hecho; (2) perfiles de prueba: 3 CV inventados en `datos/fixtures/perfiles/` (Ana y Leo con salida validada, falta repetir Rosa); (3) probar agentes y skills desde la consola: 11 de 13 agentes probados con un caso cada uno (bitácora del 3-nov, noche 3); faltan `redactor-carta`, `juez-carta` y `auditor-fuentes`; los casos son pocos: ampliarlos (más perfiles, ofertas y errores sembrados); (4) probar y probar.
- **Fase 0 (3-nov noche): pista A construida; falta la pista B.** Versión del profesor en `docs/flujo-agentico-claude-code.md`. Pendiente: (1) Mar pega `docs/ajustes-pendientes-settings.md` en `.claude/settings.json` (hook y permisos); (2) probar los agentes con un LLM real sobre fixtures; (3) `/calificar-fuentes` y llenar `endpoints.json`; (4) decidir si se instala `pypdf` (PDF); (5) pista B en `web/` (orden en `web/README.md`); (6) specs por flujo en `specs/`; (7) preguntar al profesor: tope de 4 CV base frente a «sin topes», cartas base, «subagente ATS».
- **Mirar las páginas (Mar):** abrir el Cuaderno, la página del profesor y «Horma por dentro». El Cuaderno no se ha visto renderizado. Probar también el índice nuevo de Proyectos y sus 3 enlaces externos.
- **¿«Horma por dentro» es el artefacto «Horma explicada a un niño de 10 años»? (Mar):** no hay ninguno con ese título. Si es ese, esa tarea queda hecha: se actualizó el 1-nov (ya sin Caddy ni HTMX).
- **Borrar `Rz3…` (archivo 29-oct):** cuando el profesor haya visto https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd. Antes, pasarle ese enlace. Irreversible; los hilos están en `docs/archivo/comentarios-profesor-30oct.md`. Al borrarlo, quitarlo de `ARTEFACTOS_HORMA` en `workbook.html` y republicar el Cuaderno personal, o quedará un botón roto.
- **Decidir si el Cuaderno personal deja de ser «cualquiera con el enlace» (Mar):** se cambia desde *Share*.
- **Limpiar los artefactos que no son de Horma:** Cuadernos antiguos, «Mapa de una API» repetidos y pruebas. Tarea aparte, con la lista delante.
- **Pasar `auditor-lineas-rojas` y `revisor-seguridad`** sobre el diseño multiagente (`analisis-tecnico.md`, apartado 9) antes de dar nada por cerrado.
- **Esperando al profesor (LangGraph):** Mar lo quiere en CV y cartas y en envío (1-nov). Pregunta 14 de `preguntas-profesor.md` y diagramas en el Cuaderno, Proyectos, «Horma v3». Si dice que no: Python plano, sin cambiar agentes ni flujos.
- **Multiagente para construir Horma (2-nov):** sí, en pequeño y sin framework; piloto con la ingesta. Falta definir los roles (implementadora, tester) en `.claude/agents/` y que el profesor dé el ok. LangGraph queda solo dentro de Horma. Detalle en la bitácora del 2-nov.
- **Pregunta 14 ampliada (2-nov):** ya incluye que LangGraph no hace falta técnicamente (la razón es aprenderlo), una prueba comparativa del flujo de envío y la lista de alternativas. Falta llevársela al profesor. Antes, verificar el estado actual de esas alternativas.
- **Cada agente de Horma, una función independiente del framework (2-nov):** regla de diseño para el paso 6, para poder cambiar de orquestador sin rehacer nada.
- **Skills apagadas (2-nov):** `paso-11` a `paso-18`, `paso-20`, `auditoria-diseno` y `design-taste-frontend` están en «off» en `~/.claude/settings.json` (copia en la carpeta temporal de la sesión). Reactivarlas si hacen falta. Pendiente: Mar ejecuta `/mcp disable n8n-mcp`, `semantic-scholar` y `google-sheets` en este proyecto.
- **Contradicción por resolver (Mar, 2-nov):** `CLAUDE.md` del proyecto pide analogía y ejemplo siempre; el global dice analogía solo si aclara. Recomendación: que mande el global.
- **«Horma por fases» (3-nov): comentarios del profesor aplicados** (v4 de https://claude.ai/artifact/SSztJsDarsow9YaRju6aAR). Sin RAG; la regla de los huecos avisa dónde se rellenó cada hueco; portal de empresas en Fase 2; aplicaciones automáticas, privacidad, entrevista y origen visible, PDF y editor en Fase 3. Los 9 hilos siguen abiertos (no activados para Claude): los resuelve Mar o él desde el artefacto.
- **Reformular la pregunta 4 de `preguntas-profesor.md` (3-nov):** dice que la búsqueda híbrida es «RAG», y el profesor dijo «No vamos a hacer RAG». Quitar la palabra y preguntar solo si cuentan la BD vectorial y los agentes.
- **Comprobar fuera de esta página que «sin RAG» no rompe nada:** el PRD, `analisis-tecnico.md` y el Cuaderno aún pueden nombrarlo. Buscar «RAG» y decidir caso a caso.
- **Regla de los huecos con aviso (3-nov):** el profesor pidió que Horma avise de dónde rellenó cada hueco. Ya está en «Horma por fases»; falta pasarlo al PRD (US-002) y a `analisis-tecnico.md`.
- **Compartir la página del profesor (Mar):** https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd es privada; hay que compartirla con él desde *Share*. Qué artefacto es cada cosa: tabla en `docs/relevo-proxima-sesion.md`.
- **Decisión pendiente de cerrar con el profesor: «subagente ATS» (Mar, 1-nov).** El PRD v1 dice «subagente ATS» y la arquitectura usa `medir_ats`, que es código, más el redactor que adapta. Pregunta 14 bis de `preguntas-profesor.md`: cómo define «agente» y si le vale esta opción. El PRD no se cambia hasta tener su respuesta. Las notas de Gemini no muestran que pidiera un gerente.
- **Por confirmar (Mar):** ingesta como proceso aparte; agente de relleno LLM frente a adaptadores por ATS (lo decide el eval de ablación).
- Pedir al profesor: qué cubre la Fase 4 y el ok formal para empezar. «Aprobar y enviar» ya está resuelto con sus comentarios del 3-nov (pregunta 27): la usuaria envía en la Fase 1, el portal en la 2 y el automático en la 3.
- Actualizar las skills `paso-NN` o dejarlas como consulta (ya anotado en `CLAUDE.md`).

### 1. Reunión con el profesor
**Prioridad: alta.** Mar la pide. **Guion completo (26 preguntas): `docs/preguntas-profesor.md`.**
- Pedir el **ok para definir y construir** (bloquea el paso 1 en adelante, git, código y Docker).
- **Pregunta sobre fuentes:** «Para un producto con suscripción, ¿es aceptable usar Apify para leer portales cuyas condiciones de uso prohíben el scraping (LinkedIn), o la base debe ser APIs, feeds y los ATS públicos de las empresas?». Datos en `docs/ideas-2026-10-27.md` (C4.4 y «Puntos 3 y 8»). Recomendación de la Copiloto: híbrido.
- Preguntar en Neoland la **rúbrica** y la **fecha exacta de entrega** (20 o 24 de noviembre).
- **Repositorio:** creado (`mcaparrosgu/horma-jobs`, privado, 1-nov). Queda preguntar si debe ser público en la entrega (pregunta 26).

### 2. Hook que bloquea la lectura de `.env`
**Prioridad: media.** Decidido (16A): ya. Los de git (`git add .`, push a `main`, tests antes de commit), en el paso 9.
- **Siguiente acción:** configurarlo con la skill `update-config` y probarlo. **Coste:** un archivo de configuración; si está mal escrito puede bloquear trabajo legítimo.

### 3. Investigaciones pendientes
**Prioridad: media.** Solo documentación; no tocan código ni Jobs.
- **Seguimiento por correo (14A):** requisitos de Google para leer Gmail frente a una dirección de reenvío de Horma.
- **Coste del servidor** donde vivirán la API y el script de ingesta, en el paso 6.
- **Fuentes** (cuando lo decida el profesor): condiciones de InfoJobs y EURES, SmartRecruiters, Ashby, Workable y la sentencia C-30/14.

### 4. Mejoras anotadas para cuando haya tiempo
**Prioridad: baja.**
- **Minijuegos en la entrevista**, si da tiempo antes de la entrega. Condición: miden una habilidad del puesto con resultado comprobable, nunca rasgos, y su resultado no llega a ninguna empresa.
- **Perfeccionar la función de evidencias** (1A: no reescribir; ocultar; pedir corrección). Mar dice que es importante: se trabaja a fondo en las historias (paso 2) y la spec (paso 5).
- **Ideas de candidaturas honestas** (`docs/ideas/honestidad.md`, sección 5, ideas 11-17: simulacro con abogada del diablo, ESCO, logros cotidianos, valor marginal, historial, espejo, confesionario). Auditadas: ninguna en rojo, todas con condiciones. Son ideas, no decisiones. **Por decidir con el profesor:** cuáles entran en el MVP. **Por decidir (Mar):** confesionario solo por texto y si va como «modo de huecos» en el MVP o en fase posterior; peso y salud (RGPD art. 9) en la idea 13; si el historial y el registro de correcciones (art. 16) son un solo sistema. **Por verificar en el paso 4:** licencia y API de ESCO, y retención y entrenamiento del proveedor de IA.
- **Auditoría del 29 oct** (`auditor-lineas-rojas`): ninguna en rojo; 🟡 con condiciones en carta «cómo trabajo», entrenador, asistente de edición, modo autónomo (serio) y lema. Condiciones escritas en `docs/propuesta-horma.md`, apartado 4. Clave del modo autónomo: dato que falta = no se envía; categorías especiales nunca se contestan solas.
- **Pendientes del 29 oct:** explorar los topes; diseñar el supervisor auditor del modo autónomo (decidido) y elegir transcripción en la UE (el audio se borra tras transcribir, decidido); replantear la entrevista del perfil sin Vapi (paso 6); alcance del entrenador; actualizar `CLAUDE.md`, `docs/preguntas-profesor.md` y el Cuaderno con estos cambios (el Cuaderno, con tu ok).
- **Fallo de los diagramas en pantalla completa** (punto 9): **causa encontrada el 29 oct**: abrir una página del artefacto en pestaña nueva (`claude.ai/code/frame/…`) da error. Arreglo pendiente de decidir con Mar: quitar el botón «pantalla completa» o abrirlos de otra forma. El PRD ya no depende de eso.
- **PRD (29 oct):** mantenerlo al día cuando cambie una decisión (vive en `workbook.html`, apartado 23) y cerrar los «por fijar» con mediciones en los pasos 6, 14 y 16; pedir al profesor que lo revise.
- **Estilo de las explicaciones en Horma:** el `CLAUDE.md` global (respuestas concisas, 27 oct) choca con «Cómo explicas» del `CLAUDE.md` de Horma, que pide definición, analogía y ejemplo para cada término. **Mar decide** si en Horma se acorta también (definición de una línea y la analogía solo si aclara) o se mantiene la versión larga.

- **Arquitectura por procesos (29 oct):** el profesor pidió más profundidad técnica y se ha desglosado (`docs/analisis-tecnico.md`). **Por confirmar con él (pregunta 18 bis de `docs/preguntas-profesor.md`):** monolito modular con API y worker, cola en PostgreSQL, Caddy y observabilidad en tabla propia (todo *propuesta*). **Para el paso 6:** diagrama C4 de contenedores y una ADR por decisión (temario «Arquitectura de software: UML, C4 y ADR»).

- **Seguridad previa al código (29 oct):** `revisor-seguridad` encontró 20 puntos (5 altos) en `docs/analisis-tecnico.md`, apartado 8. Pasan a ADR en el paso 6; los tres de mejor relación coste/beneficio: roles de BD con RLS forzada, máquina de estados del envío y reglas duras del supervisor en código. Los frenos técnicos están decididos como medida de seguridad.

- **Ideas de la metodología de Michael Page (30 oct):** inspiración de `michaelpage.es/quienes-somos/nuestra-metodologia`. Son ideas, no decisiones; ninguna toca líneas rojas. Para valorar en la spec (paso 5):
  - **Seguimiento hasta la incorporación:** ampliar el seguimiento con ayuda para preparar la negociación salarial y los primeros días. Condición: consejos basados en datos reales de la oferta y del perfil, sin inventar cifras.
  - **Proceso visible en pasos:** mostrar a la usuaria en qué fase está (perfil → CV → candidaturas → entrevista → cierre). Sirve también para el case study.
  - **Transparencia de datos como mensaje:** explicar en claro qué se guarda y que la usuaria decide qué comparte (RGPD). Casi todo ya está decidido; falta decirlo bien en la interfaz.
  - **Modo «escucho ofertas»:** perfil en pausa, sin búsqueda activa, con avisos de ofertas compatibles a partir de las búsquedas guardadas (9A).

### 5. Servidor MCP «Horma»
**Prioridad: baja.** Mar decide más adelante. Recomendación de la Copiloto: sí, en la fase 5, solo lectura, 3-4 herramientas y ninguna que envíe.

### 6. Pulido de Horma (tras definir)
**Prioridad: baja.** Revisar con Mar cómo queda todo junto: Cuaderno, spec y producto.

## Decididas, por reflejar en la spec (paso 5) y en el diseño (paso 6)
Detalle de las del 27 oct en `docs/propuesta-horma.md`, apartado 4.
- **Perfil humano en el CV:** solo si la usuaria lo activa (apagado por defecto) y como evidencias redactadas como logros.
- **Evidencias (1A):** no se reescriben; se ocultan o se pide su corrección (RGPD art. 16).
- **Rango de compatibilidad:** la usuaria lo elige; puede ampliar la flexibilidad; «tener opciones» = cumplir los requisitos excluyentes; nunca una «probabilidad de contratación». **Tres capas (27 oct):** 1) condiciones como filtro (una oferta sin sueldo publicado no se descarta); 2) lo que pide la oferta; 3) forma de trabajar, nunca rasgos.
- **Topes** (29 oct): sin tope de ofertas ni de candidaturas; los demás (por plan, diarios, modo autónomo) se exploran y perfilan más adelante. El precio debe cubrir el uso intenso.
- **Horma no es una red social** (29 oct): no se sigue a empresas ni hay perfiles de empresa; solo oferta y enlace a su web oficial.
- **Modo autónomo** (29 oct): permiso una vez, sin aprobar cada envío; solo donde esté permitido; aviso, registro y pausa.
- **Apify no es la base** (29 oct); la base son APIs, feeds, ATS públicos y portal de empresas.
- **Asistente de edición** del CV, la carta y otros documentos (29 oct).
- **Entrenador de entrevistas** por oferta (29 oct); voz de Horma solo si se llega al 24 de noviembre.
- **Entrevista del perfil sin voz de Horma** (29 oct): habla solo la usuaria; se usa el texto transcrito.
- **Lema «brutalmente honestos»** (29 oct): la promesa es sobre Horma, no sobre las usuarias.
- **Preferencias (2A):** tras subir el CV, desde datos del CV, editables; puestos nuevos para cambiar de carrera.
- **Entrevista (3A):** preguntas de hechos, base común y adaptada al sector; sin minijuegos en el MVP.
- **Prompt injection (4A):** por capas; detalle en los pasos 15-16.
- **Salario a la vista (5A)** y **origen de cada frase (7A):** en el MVP.
- **Portal de empresas (8C):** sí; sección de información de empresas, no. La empresa solo recibe lo que la candidata le envía.
- **Un perfil por persona (9A)**, con búsquedas guardadas.
- **Agente buscador de fuentes (11B)**, con filtros de fiabilidad y encaje, y las condiciones del auditor.
- ~~n8n de Horma (13A)~~ **Superado el 30-oct:** sin n8n; la ingesta es un script propio.
- **Indeed en Jobs (12C):** se deja como está.
- **Subagentes (15A):** los dos actuales; revisor de evals en el paso 14.
- **PWA primero (18A);** tiendas sin fecha.

## Cómo funcionan los subagentes (para no esperar avisos que no llegan)
- `revisor-seguridad` y `auditor-lineas-rojas` **no vigilan solos ni avisan por su cuenta**. Trabajan cuando la Copiloto los invoca o cuando Mar los nombra, y **devuelven un informe en la conversación**.
- No pueden modificar nada: la Copiloto traslada el informe a Mar y propone la corrección; Mar decide.
- Que se invoquen siempre solo está garantizado con un **hook**. Hasta entonces, la Copiloto los usa al cerrar cada módulo y antes de cada commit.

## Hecho
- **2026-11-01:** decidido por Mar: sin Caddy ni HTMX. Diagramas `candidatura`, `arquitectura`, `tecnico`, `entrevista`, `ingesta`, `recomendacion` y `estados` al día con la arquitectura A-ajustada; textos del Cuaderno, página del profesor y «Horma por dentro» alineados. **Falta (paso 6):** asignar HTTPS, límites, cabeceras y CSRF.
- **2026-11-01:** chat de dudas en «Horma por dentro» (versión 3): responde con el apartado que se lee y guarda en su colección `dudas`; `/workbook` las pasa a `Wiki\workbook\Dudas\Horma por dentro`. Mar lo probó con una pregunta real y funciona. **Falta:** comprobar el paso a Obsidian la próxima vez que se ejecute `/workbook`.
- **2026-11-01:** índice de los 4 artefactos de Horma, con descripción y botones, al inicio de Proyectos, «Horma jobs» y «Horma v3» (Cuaderno personal, versión 259). No llega a la página del profesor ni a la edición compartida.
- **2026-11-01:** sesión de diseño sobre multiagente. Decidida por Mar la opción A-ajustada (redactor↔juez con código primero; envío con ejecutor en script; ATS como herramienta de código; gerente en código). Anotada en `docs/analisis-tecnico.md` (apartado 9 y tablas) y en la bitácora. **No hecho:** diagramas, artefacto «niño de 10 años», `propuesta-horma.md` y `CLAUDE.md` (aún nombran LangGraph, HTMX y Caddy), revisores. **Commit:** no se hizo; no hay repositorio git y el `git init` lo decide Mar.
- **2026-10-31:** revisión del profesor (clase del 30-oct) incorporada. Leídos transcripción y 19 hilos; PRD v1 limpio (`docs/prd-horma-v1.html`, artefacto https://claude.ai/artifact/SC6HJfJZAWy1BkwQQoYiYR, provisional); borrador del 29-oct archivado (`docs/archivo/`, artefacto Rz3Lt… con aviso); `CLAUDE.md`, `docs/propuesta-horma.md` y `docs/analisis-tecnico.md` puestos en coherencia (CV base, sin n8n, LinkedIn humano, estructura del profesor). **No hecho:** WB (22 apartados + diagramas), `docs/decisiones-pendientes.md` y `docs/preguntas-profesor.md` (históricos), skills `paso-NN`.
- **2026-10-30:** comentarios del profesor en su página (`horma-apuntes.html`, versión 15): «Comentar» al seleccionar texto y «Comentar este apartado» bajo cada título; commit local en el Workbook, sin push. **Pendiente (Mar):** invitar al profesor desde Compartir con permiso de comentarista (el enlace público no basta) y pedirle una prueba; después, leer sus comentarios aquí. Al republicar, repetir `capabilities` `{"comments":{"composer_only":true}}`.
- **2026-10-29 (noche, 2):** PRD con la estructura de clase como apartado 23 del documento Horma. Publicados el Cuaderno personal (v250) y la página del profesor (v13). Fuente: `Workbook/web/workbook.html`; el botón de la página del profesor está en `construir-horma-aparte.py`. Sin commit.
- **2026-10-29 (noche):** pasados `auditor-lineas-rojas` (ningún rojo, 8 ámbar) y `revisor-seguridad` (20 puntos) sobre el análisis técnico. Corregidos: nota 0-100 solo de experiencia y formación y 3 niveles de condiciones; puntuación por tandas sin tope; supervisor con denegación por defecto y las 6 condiciones; evidencias humanas solo si activadas; asistente de edición bajo el eval de trazabilidad; transcripción en lugar de «voz»; columna «Estado» en las tablas. Publicados la página del profesor y el Cuaderno personal; push del Workbook hecho.
- **2026-10-29 (tarde):** análisis técnico más profundo para el profesor. Diagrama `tecnico` rehecho (procesos y contenedores; el anterior en `archivo/tecnico-v1.*`) y cuatro nuevos (`recomendacion`, `redactora`, `envio`, `calidad`); explicación en `docs/analisis-tecnico.md`. Apartado 5 del Cuaderno ampliado. Publicados la página del profesor (v9) y el Cuaderno personal (v247); commits `0f2e687` y `085f34a` en el Workbook, sin push.
- **2026-10-29:** brainstorming de honestidad (25 ideas, 3 finalistas; Mar descartó 2 y eligió 7 ideas distintas). Registradas en `docs/ideas/honestidad.md`, sección 5, auditadas con `auditor-lineas-rojas` y, la 17, con `revisor-seguridad` (apto con cambios). Nada construido ni decidido; ver «Mejoras anotadas».
- **2026-10-27 (noche, 2):** guion de la reunión en `docs/preguntas-profesor.md` (26 preguntas en 6 bloques, cada una con su propuesta; riesgo principal: plazo frente a alcance, pregunta 3). Fuera de Horma: estilo conciso de Mar en `C:\Users\ganja\.claude\CLAUDE.md` (global de Claude Code) y en las «Instrucciones para Claude» de claude.ai, con excepción para los textos dirigidos a terceros.
- **2026-10-27 (noche):** cerradas las preguntas 6 (compatibilidad en tres capas) y 13 (n8n en contenedor propio). WB publicado: página del profesor v6 y Cuaderno v242.
- **2026-10-27 (tarde):** Mar contestó las 23 decisiones pendientes (`docs/decisiones-pendientes.md`). `auditor-lineas-rojas`: ninguna incumple; 4 en riesgo con condiciones, ya escritas. WB de Horma actualizado y publicado: primero la página del profesor (versión 5) y después el Cuaderno de Mar (versión 241). Commit local `f140df0` en el repositorio del Cuaderno, sin push. `docs/propuesta-horma.md` al día.
- **2026-10-27:** investigación de los puntos 4 (Jobs, n8n y Apify, con datos reales de `Metricas`) y 3 y 8 (6 vías para obtener ofertas) en la Parte C de `docs/ideas-2026-10-27.md`.
- **2026-10-27:** investigación del punto 2 (Parte C, con fuentes) y primer debate con Mar: sin tope; flexibilidad del rango con «tener opciones = requisitos excluyentes».
- **2026-10-27:** tanda 1 de las ideas del 27 oct en el WB de Horma. Commit local `68aac12` en el repositorio del Cuaderno, sin push.
- **2026-10-27:** documento «Horma jobs» del Cuaderno ampliado con la arquitectura técnica (apartados 7-11).
- **2026-10-27:** `.claude/agents/copiloto.md` y `.claude/settings.json` (`"agent": "copiloto"`).
- **2026-10-27:** subagentes `revisor-seguridad` y `auditor-lineas-rojas` creados (solo lectura: Read, Grep, Glob).
- **2026-10-27:** `CLAUDE.md`, `docs/propuesta-horma.md`, esta lista y el Cuaderno puestos en coherencia.
