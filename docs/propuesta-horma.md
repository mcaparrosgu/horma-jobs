# Horma jobs · propuesta para valorar juntas

> Sesión de exploración del 2026-10-24, con Claude como Copiloto. Esto es una **propuesta** y está abierta a discusión.
> **Estado:** ver `docs/tareas-pendientes.md`. Desde el 3-nov se construye la versión del profesor (`docs/flujo-agentico-claude-code.md`); este documento sigue siendo la fuente de las decisiones de producto.
> **Cambios del 29-oct-2026** (decididos por Mar, marcados «29 oct»): Horma no es una red social; sin topes de ningún tipo; Apify no es base; asistente de edición; entrenador de entrevistas; entrevista del perfil sin voz de Horma; lema de honestidad. Las ideas de honestidad viven en `docs/archivo/honestidad.md`.
> **Análisis técnico ampliado (29-oct, a petición del profesor):** la arquitectura se desglosa en procesos y contenedores en `docs/analisis-tecnico.md` y en cinco diagramas del Cuaderno (`tecnico`, `recomendacion`, `calidad`; `cv-cartas` y `envio` en «Horma v3»). Lo allí marcado como *propuesta* (cola en PostgreSQL, observabilidad en tabla propia) no es decisión de Mar: se confirma en el paso 6.
> **PRD (29-oct):** los requisitos de esta propuesta, con la estructura de clase (MA·S03), están como apartado 23 del documento «Horma jobs» (Cuaderno y página del profesor). Los umbrales numéricos están «por fijar».
> **Cambios del 30-oct-2026 (revisión del profesor, aceptados por Mar; prevalecen sobre lo que diga el resto de este archivo):** (1) **CV base por sector:** hasta 4 CV base y sin cartas base (versión del profesor, 3-nov), generados una vez del CV completo para ahorrar tokens; cada oferta se adapta desde el base que le toca y un subagente ATS lo ajusta a las palabras clave (forma pendiente de cerrar con el profesor, pregunta 14 bis). (2) **Regla de los huecos:** Horma cambia qué se muestra y cómo se cuenta, nunca fechas, cargos, empresas ni titulaciones; lo poco relevante se condensa en una línea («Otras experiencias»), puede mostrarse solo el año (prohibido en la fase 0 hasta que el verificador lo admita) y decide la usuaria; lo que Horma propone, lo marca y lo aprueba ella. (3) **Sin n8n:** la ingesta es un script propio controlado desde un dashboard en el frontend. (4) **LinkedIn e Indeed:** Horma prepara y envía siempre la persona; sin «quizá más adelante». (5) **Envío automático:** es tronco (no se recorta); la fase solo ordena el trabajo. (6) **Entrevista del perfil humano:** el profesor la sitúa en la Fase 3; Mar la considera diferenciadora y la subirá de fase si hay holgura. (7) **Estructura de construcción:** la del profesor (PRD → arquitectura → desglose de tareas priorizadas → construir por componentes, empezando por la ingesta), no los 20 pasos. (8) **PDF** como formato por defecto del CV y la carta. Hilos originales en `docs/archivo/comentarios-profesor-30oct.md`; PRD vigente en `docs/archivo/prd-horma-v1.html`.
> Fuente de verdad: las decisiones de Mar están en el apartado 4; lo abierto, en `docs/tareas-pendientes.md`. El Cuaderno y `CLAUDE.md` deben decir lo mismo que este archivo.

## 1. Punto de partida

**Horma jobs sustituye a Erna como proyecto final** del bootcamp de AI Engineering de Neoland, que cierra en noviembre de 2026. Mar le dedica casi todo el día, casi todos los días, así que **no se recorta el alcance por falta de tiempo**. Sí se evita la sobreingeniería.

**Qué es hoy Jobs** (`C:\AI Engineering\n8n\Jobs`; la versión pública es `jobs-publico`):
- 4 workflows de n8n con Google Sheets como base de datos e interfaz.
- Recoge ofertas de 13 fuentes y aplica filtros deterministas.
- `claude-haiku-4-5` puntúa el encaje de cada oferta (0-100).
- `claude-sonnet-5` redacta el CV y la carta; `gpt-4.1-mini` humaniza el texto.
- Un agente lee los correos de las empresas y propone el estado de cada candidatura.
- **Lo rudimentario:**
  - el perfil está escrito a mano en el código;
  - los filtros funcionan con listas de palabras y los tipos de cambio son fijos;
  - la hoja hace de base de datos e interfaz para una sola usuaria;
  - no hay tests, evals, trazas ni medición de costes;
  - la protección contra prompt injection no se ha probado.

**Qué ha pedido la Wiki en clase:** integrar **RAG, base de datos y agentes**. En la Wiki apenas se practican los evals, LLM-as-judge y la observabilidad de LLM, que es justo lo que más distingue a una ingeniera de IA.

## 2. Propuestas iniciales de la Copiloto

Están como referencia; las ideas de Mar del apartado 3 mandan sobre ellas.

| # | Propuesta | Estado |
|---|---|---|
| 1 | Backend propio con FastAPI y PostgreSQL | ✅ elegida por Mar; **sustituida el 4-nov por Next.js + PostgreSQL** (profesor) |
| 2 | Panel web propio | ✅ incluida (interfaz navegable) |
| 3 | Multiusuaria + RLS + RGPD | ✅ incluida |
| 4 | Servidor MCP «Horma» para usarlo desde Claude | ⏸ sin decidir |
| 5 | Búsqueda semántica: embeddings, pgvector y búsqueda híbrida | ✅ recomendada; es el RAG que justifica el proyecto |
| 6 | RAG de la memoria profesional | ❌ el perfil cabe en el contexto y no lo necesita |
| 7 | Agentes con LangGraph | ✅ en forma de agentes donde aportan (apartado 5). **1-nov:** multiagente A-ajustada (`docs/analisis-tecnico.md`, apartado 9) con LangGraph solo en CV y cartas y en envío; pendiente del profesor |
| 8 | Coach de entrevistas | ✅ convertida en la entrevista de Mar; 29 oct: además, entrenador de entrevistas por oferta |
| 9 | Evals + LLM-as-judge | ✅ recomendada |
| 10 | Guardrails + red teaming | ✅ recomendada |
| 11 | LLMOps: coste y latencia de cada llamada | ✅ recomendada; también sirve para fijar precios |
| 12 | Tests + CI + Docker | ✅ recomendada |

## 3. Ideas de Mar (24 oct)

1. **Entrevista por voz de 20 minutos como máximo**, a modo de simulacro, para sacar el **perfil humano**.
   - Nada de preguntas típicas de RRHH ni de psicotécnico.
   - ~~Puede incluir problemas o minijuegos cortos y nada tediosos.~~ → 27 oct: sin minijuegos en el MVP; mejora futura si da tiempo, solo de habilidades (apartado 4).
   - Con ese perfil, Horma elige ofertas que la usuaria puede editar ~~y ayuda a presentarla a empresas afines~~ (27 oct: Horma no dirige candidatas a empresas; ver apartado 4, «Portal de empresas»).
2. **Interfaz navegable y sencilla**, con el minimalismo de thehub.io como inspiración.
3. **Más plataformas de empleo**, centradas en la UE y España (por ejemplo, thehub.io).
4. **Filtros con casillas** para elegir las condiciones de las ofertas que interesan.
5. ~~**Backend 100 % en Python.** El frontend en HTML, CSS y JavaScript, aunque en eso Mar es flexible.~~ **Sustituida el 4-nov-2026 por instrucción del profesor:** la web se hace con **Next.js** (TypeScript) y se quita FastAPI. Se mantiene en Python la pista A: agentes, scripts y evals.
6. **Web o app para móvil y ordenador, multiusuaria.**
7. **Sin sobreingeniería:** actuar como una ingeniera de IA profesional.
8. **Sección para empresas** donde publicar sus ofertas.
9. **Que la usuaria acabe usando solo Horma:** un metabuscador con todo bajo el mismo techo.
10. **Apartado para ver y editar el CV y la carta.**
11. **12 diseños de CV y carta**, cuidados y profesionales; en la configuración se elige uno predeterminado.
12. **La redacción tiene MUY presentes los filtros ATS.**
13. **Seguimiento de las ofertas** a las que se envía el CV y la carta.
14. **Aprovechar lo que ya funciona en Jobs** cuando sea práctico.
15. **Agentes**, por ejemplo un subagente que entra en las plataformas, adjunta la documentación y rellena los formularios.
16. **Ideas anteriores que siguen vigentes** (`Jobs\docs\honest-jobs-*.md`):
    - CV sin inventar nada;
    - ~~varios CVs subidos, con la IA eligiendo el mejor para cada oferta~~ → sustituida el 27 oct: un CV y una carta nuevos para cada oferta (apartado 4);
    - ~~modo demo para el tribunal~~ → retirada el 27 oct: no hay tribunal; la demo es para el profesor;
    - transparencia salarial;
    - detector de ofertas fantasma;
    - privacidad europea.

## 4. Decisiones tomadas por Mar

| Tema | Decisión |
|---|---|
| Erna | Horma la sustituye como proyecto final; Erna queda aparcada |
| n8n (30 oct) | **Fuera.** La ingesta es un script propio, controlado desde un dashboard en el frontend, que escribe por `POST /ofertas`. ~~27 oct: n8n sigue con la ingesta con los workflows de Jobs~~ |
| Motivación: metabuscador (5 nov) | **Que la gente evite ir de web en web y de app en app: todas las ofertas se unen en Horma.** Es lo que nos diferencia, y por eso se investigan muchas fuentes (solo España y Europa de momento), en tres tramos: acceso fácil, API con clave fácil de conseguir y acceso difícil vía Apify o scraping. Lista y estado de cada una: `docs/artefactos/fuentes-de-empleo.html` |
| Demostración con pocas fuentes limpias (5 nov, Mar) | Primero una demostración con las fuentes que pasan la calificación (JobTech, BOE) y las ofertas que publiquen empresas; después se amplía con más fuentes. Calidad y permiso antes que volumen |
| Fuentes por capas (5 nov, **pendiente del profesor**) | Las seis primeras fuentes salieron no aptas. Propuesta: ATS públicos de empresas, programas de socios (Careerjet, Jooble), datos abiertos (JobTech, BOE), ofertas que trae la usuaria y permisos a los grandes; cada oferta guarda su licencia de origen. Detalle: `docs/preguntas-profesor.md (apartado «Consulta sobre fuentes de ofertas»)` |
| Empresas | Publican ofertas y **solo ven lo que la candidata decide compartir**. Horma nunca ordena ni puntúa candidatas para ellas |
| Horma no es una red social (29 oct) | **No se sigue a las empresas y no hay perfiles de empresa.** Solo publican ofertas y, como mucho, Horma enlaza a su web oficial. Sin seguidores, contactos ni muro: Horma se distancia de LinkedIn y similares |
| Envío de candidaturas | Por defecto, la usuaria aprueba en Horma y el agente envía. **Se puede configurar como autónomo.** Rellena siempre con datos del CV y del perfil: **jamás inventa ni exagera** |
| Modo autónomo (29 oct) | La usuaria da permiso **una vez** y el agente rellena y envía sin pedir aprobación en cada candidatura. Solo donde esté permitido (formularios ATS de empresa y portal de Horma); nunca LinkedIn ni Indeed. Topes: a perfilar más adelante. Se mantienen aviso inmediato de cada envío, registro y botón de pausa. Lo enviado no se puede retirar. **Condiciones del auditor (29 oct):** (1) si falta un dato, no se envía: queda «pendiente de ti»; (2) preguntas de categorías especiales (art. 9), salariales o legales nunca se contestan solas; (3) si el texto no pasa el eval de trazabilidad, no se envía; (4) solo dentro del rango de compatibilidad elegido, revocable, con aviso claro de qué datos van a quién; (5) términos de cada ATS comprobados antes de integrarlo; (6) **decidido por Mar (29 oct): un supervisor auditor** revisa cada envío autónomo antes de salir (puntos 1-4) y pausa el modo ante errores repetidos; detalle de diseño en el paso 6 |
| Audio de la entrevista (29 oct) | **Se borra tras transcribirlo.** Solo se conserva el texto, con consentimiento explícito y borrado a petición. Transcripción en la UE y sin análisis de emociones: se elige en el paso 6 |
| Costes | **Los pagan las usuarias con su suscripción** |
| Agente de trabajo (27 oct) | **La Copiloto** es la agente predeterminada del proyecto, fijada en `.claude/settings.json` (efectiva en la siguiente sesión) |
| Compatibilidad con ofertas (27 oct) | La usuaria elige un rango: numérico para experiencia y formación; 3 niveles sobre condiciones de trabajo para el perfil humano, nunca sobre rasgos. **Puede ampliar la flexibilidad** de la búsqueda para abrirse a ofertas menos compatibles en las que todavía tenga opciones de ser contratada, y volver a cerrarla cuando quiera (ver `docs/tareas-pendientes.md`, «Decididas») |
| Topes (27 y 29 oct) | **Vigente:** nunca hay tope de ofertas mostradas ni de candidaturas. **Los demás topes (entrevistas, CVs, envíos, por plan, diarios en el modo autónomo) se exploran y perfilan más adelante** (Mar, 29 oct); mientras tanto no se decide ninguno. Consecuencia: el precio debe cubrir un uso intenso (apartado 7.4). Las protecciones técnicas contra abuso y ataques no son topes de producto |
| Frenos técnicos (29 oct) | Se incluyen como **medida de seguridad, no como tope de producto**: límite de envíos por hora y por día en el modo autónomo, pausa tras N fallos seguidos, límites de ritmo y de coste por tarea contra abuso y bucles. El tope de producto sigue sin existir |
| Apify (29 oct) | **No es la base.** La base son APIs, feeds, ATS públicos y el portal de empresas, que no dependen de un tercero que cobra y puede retirarse. Con «sin topes», Apify solo entraría si el profesor lo ve bien y con coste vigilado a mano; nunca LinkedIn ni Indeed |
| Asistente de edición (29 oct) | En el editor del CV, la carta y otros documentos, un **asistente de IA** al estilo de Claude: la usuaria señala una frase («no me gusta», «demasiado informal») y el asistente la reescribe. Solo reformula lo respaldado por su CV o perfil; sin datos nuevos. Si hace falta uno, pregunta. **Auditor:** el eval de trazabilidad se pasa también al texto editado; se muestra el cambio antes de aceptarlo; un dato nuevo que ella dicte se guarda como dato declarado suyo; la oferta se trata como dato, no como orden |
| Entrenador de entrevistas (29 oct) | Módulo nuevo: entrenador y preparador **personalizado** para las ofertas a las que ha aplicado o quiere aplicar. Simulacro por escrito y, **solo si se llega a la entrega del 24 de noviembre**, con voz de Horma. Sin analizar la voz de la usuaria, sin puntuarla ni guardar notas (ver `docs/archivo/honestidad.md`, idea 11). **Auditor:** solo la transcripción, sin tono, emoción ni fluidez; las sugerencias se apoyan en su CV o perfil, nunca «cuenta que lideraste X» si no es cierto; datos de la oferta solo de la oferta publicada; se avisa de que la voz es una IA (AI Act, art. 50); «sin notas» = ningún perfil de rendimiento; historial solo si ella lo pide y borrable |
| Voz en la entrevista del perfil (29 oct) | La entrevista opcional del perfil humano **no tiene voz de Horma**: la usuaria habla, Horma transcribe y pregunta por escrito. La voz de Horma solo existe en el entrenador. Línea roja intacta: se usa el texto transcrito, nunca la voz |
| Lema de honestidad (29 oct) | Horma presume de ser **«brutalmente honesta»**. La promesa es sobre Horma («nunca inventamos nada en tu CV»), no sobre las usuarias, porque Horma no puede verificarlas. Cada afirmación pública debe poder cumplirse. **Auditor:** mejor «cada frase de tu CV viene de lo que tú nos diste» (comprobable con el eval) que «nunca inventamos nada»; no prometer «CV que pasa el ATS»; «brutal» es el lema de Horma, no permiso para ser dura con la usuaria |
| Carta «cómo trabajo» (29 oct) | Idea 18 de `docs/archivo/honestidad.md`; auditada el 29 oct (🟡 con condiciones); sin decidir |
| Perfil humano en el CV, forma (27 oct) | Sutil: evidencias redactadas como logros, sin etiquetas ni notas |
| Construcción | ~~No empieza hasta el ok del profesor~~ **Superado el 3-nov:** Mar ordenó construir la versión del profesor como fase 0 |
| Perfil humano en el CV (27 oct) | **Cada usuaria elige** si la información de su perfil humano aparece o no en su CV. Por defecto, apagado |
| CV y carta a medida (30 oct; el 3-nov, hasta 4 CV base y sin cartas base, versión del profesor) | **CV base por sector.** De su CV completo, Horma genera una sola vez hasta 4 CV base (uno por sector), para ahorrar tokens; la carta se redacta desde el CV base (3-nov). Para cada oferta, el redactor parte del base que le toca y escribe un CV y una carta nuevos, que revisa un juez: sin inventar, pensando en los ATS y con redacción natural. Un subagente ATS adapta el base a las palabras clave (forma pendiente de cerrar con el profesor, pregunta 14 bis). **Regla de los huecos:** cambia qué se muestra y cómo se cuenta, nunca fechas, cargos, empresas ni titulaciones. ~~27 oct: no hay CVs base~~ |
| Registro de candidaturas (27 oct) | Apartado en la web y la app con el historial: enviadas, descartadas por la usuaria, rechazadas, sin respuesta… |
| Demo (27 oct) | No hay tribunal ni «modo demo». La demo es para el profesor, con cuentas de prueba y datos inventados |
| Tiendas de apps (27 oct) | Más adelante, sin fecha. Primero la PWA |
| Evidencias del perfil humano (27 oct) | La usuaria **no puede reescribirlas**; sí **ocultarlas** (salen del CV y de los envíos) y **pedir que se corrijan** si son erróneas (RGPD art. 16): Horma vuelve a preguntar o usa sus palabras, y el cambio queda registrado. Mar quiere perfeccionar esta función |
| Preferencias de ofertas (27 oct) | Después de subir el CV, rellenadas solo con datos del CV (nunca deduciendo edad, nacionalidad ni datos del art. 9) y editables en Configuración. Puede **añadir puestos nuevos** para cambiar de carrera |
| Entrevista (27 oct) | Preguntas sobre hechos: base común más preguntas adaptadas al sector y la trayectoria. **Sin minijuegos en el MVP.** Mejora futura si da tiempo antes de la entrega: minijuegos que midan una habilidad del puesto con resultado comprobable, nunca rasgos, y sin nota para empresas |
| *Prompt injection* (27 oct) | Defensa por capas; el detalle, en los pasos 15-16. El visto bueno de la usuaria antes de enviar es una capa obligatoria |
| Salario a la vista (27 oct) | En el MVP: «salario publicado / no publicado», filtro, salario mínimo y frase para pedirlo, con la nota legal de que la Directiva 2023/970 aún no está en vigor en España |
| Origen de cada frase (27 oct) | En el MVP: cada frase del CV y la carta enseña de qué dato sale. Si no tiene origen, no se escribe y se pregunta |
| Portal de empresas (27 oct) | **Se mantiene** el portal donde publican ofertas. **No hay** sección de información de empresas. La empresa solo recibe la candidatura que la candidata envía: ni listas, ni puntuaciones, ni búsquedas de candidatas, ni ofertas dirigidas a personas concretas |
| Perfiles (27 oct) | Uno por persona, con búsquedas guardadas |
| Fuentes nuevas (27 oct) | Un **agente buscador de fuentes** propone portales y webs nuevas; cada una entra tras revisar sus condiciones de uso y `robots.txt`; nunca LinkedIn ni Indeed. Filtros: solo ofertas fiables y que encajen, sin datos de contacto, texto tratado como no fiable. La Copiloto recomendaba conectores sin agente (11A). Qué fuentes y si se usa Apify: **con el profesor** |
| Subagentes (27 oct) | Se mantienen `revisor-seguridad` y `auditor-lineas-rojas`; revisor de evals en el paso 14 |
| Hooks (27 oct) | Bloquear la lectura de `.env` ya; los de git, en el paso 9 |
| Definición (27 oct) | ~~Los pasos 1-8 esperan al ok del profesor~~ **Superado el 30-oct:** método del profesor, no los 20 pasos |
| Compatibilidad en tres capas (27 oct) | 1) Condiciones de la usuaria como **filtro** (sueldo mínimo, horario, teletrabajo, estabilidad; una oferta sin sueldo publicado no se descarta, sale marcada); 2) lo que pide la oferta; 3) forma de trabajar (autonomía, ritmo, equipo) frente a lo que ella declaró, nunca rasgos. La flexibilidad amplía las capas 2 y 3 |
| n8n de Horma (27 oct) | ~~Contenedor propio en el servidor de Horma, solo ingesta.~~ **Superado el 30 oct:** sin n8n (ver fila «n8n (30 oct)») |

## 5. Cómo sería Horma

### Funcionalidades
1. **Entrada y perfil:**
   - Varias usuarias, con entrada por Google o por email.
   - Se suben **varios CVs** y la IA los convierte en un perfil estructurado.
2. **Entrevista opcional**, de 20 minutos como máximo. Habla solo la usuaria (voz transcrita); Horma pregunta por escrito (29 oct). Formato:
   - preguntas de conducta («cuéntame la última vez que…»): una base común y otras adaptadas al sector y la trayectoria;
   - repreguntas cuando una respuesta queda corta;
   - sin minijuegos en el MVP (mejora futura, ver apartado 4).

   El resultado son **evidencias, no adjetivos**. La usuaria las revisa: no las reescribe, pero puede ocultarlas o pedir que se corrijan.
3. **Metabuscador UE y España:**
   - Las fuentes de Jobs.
   - EURES, el portal oficial de la UE.
   - Adzuna en sus países de la UE, Arbeitnow, The Hub, InfoJobs y otras.
   - Los **listados públicos de los ATS de empresa** (Greenhouse, Lever, Ashby, Workable): miles de empresas en JSON público, una fuente legal y estable que casi nadie conoce.
   - Las ofertas del portal de empresas.
   - Fuentes nuevas que propone el agente buscador de fuentes (apartado 4).
4. **Filtros con casillas:** remoto, salario, país, idioma, contrato, nivel, sector… Más **salario a la vista** (publicado o no, y tu mínimo).
5. **Recomendación de ofertas** según el perfil técnico y humano, con una **explicación del encaje** que la usuaria puede corregir.
6. **CV y carta:**
   - El redactor elige, de toda la información de la candidata, lo que más encaja con cada oferta, explica por qué y escribe un CV y una carta nuevos, partiendo del CV base del sector de la oferta (hasta 4 CV base y sin cartas base (versión del profesor, 3-nov); 30 oct).
   - Antes de enseñarlo sigue el ciclo generar → evaluar → corregir: palabras clave, lectura ATS, trazabilidad de cada frase y redacción natural.
   - Editor con vista previa y **asistente de edición** (29 oct): la usuaria señala una frase y le pide cambios de tono o contenido.
   - **12 diseños** y PDF generado en Python.
7. **Agente de candidatura:** rellena y adjunta en los formularios ATS abiertos y en el portal de empresas. Por dentro (1-nov): relleno (LLM), supervisor (código) y ejecutor (script).
8. **Seguimiento:** tablero con el estado de cada candidatura y **registro** con el historial (enviadas, descartadas por la usuaria, rechazadas, sin respuesta). Las respuestas de las empresas llegan por reenvío a un correo de Horma.
9. **Portal de empresas:** publicar ofertas y recibir las candidaturas que cada candidata decide enviar. Sin listas, puntuaciones ni búsquedas de candidatas. No hay sección de información de empresas (27 oct).
10. **Suscripciones** con Stripe, en modo de prueba durante el bootcamp. **Sin topes de producto por plan** (29 oct; sí hay frenos técnicos de seguridad, apartado 4): el precio sale del coste real medido con uso intenso.
11. **Entrenador de entrevistas** (29 oct): preparación personalizada a cada oferta, por escrito; con voz de Horma solo si hay tiempo antes del 24 de noviembre.
12. **Sin red social** (29 oct): no se sigue a empresas ni hay perfiles de empresa; cada oferta enlaza, como mucho, a la web oficial.

### Arquitectura
Visión por procesos (detalle y diagramas en `docs/analisis-tecnico.md`): **API síncrona** (Next.js), **worker** (mismo código base, tareas largas y agentes), **script de ingesta** (propio, con dashboard en el frontend; sustituye a n8n desde el 30 oct; dónde corre —tarea programada del worker o proceso aparte— se decide en la arquitectura) y **navegador aislado** (Playwright, sin acceso a la base de datos). Monolito modular con dos procesos, no microservicios. *Propuesta, a confirmar en el paso 6.*

- **Ingesta:** el script de ingesta trae las ofertas de las fuentes, filtra, deduplica y las envía a `POST /ofertas`; se controla desde un dashboard en el frontend (30 oct).
  - **5-nov (profesor):** el pipeline toma las ofertas de las APIs como lo hacía antes y la web se construye como dashboard; hay que validar que los datos se guardan en la base. Se mantiene el script propio sin n8n; el dashboard muestra y pide, no ejecuta. Pregunta 31 al profesor.
- **API de Horma** (Next.js): valida cada oferta con un esquema y le extrae los campos estructurados con el LLM.
- **Almacenamiento:** PostgreSQL con pgvector guarda la oferta junto con su embedding.
- **Recomendación:** búsqueda híbrida contra el perfil (técnico y humano), y después el LLM ajusta la puntuación y explica el encaje.
- **Web:** Next.js, sin HTMX (Mar, 1-nov). Se construye primero la web de **ingesta de ofertas** y de **candidatos**, con un **dashboard del flujo agéntico** y **observabilidad en cada componente** (profesor, 4-nov).
  - Se instala en el móvil como app (PWA). Más adelante, también en las tiendas de apps (sin fecha).
  - Es una sola base de código (Next.js incluye React).
- **Agentes**, solo donde aportan:
  - la entrevista del perfil: transcripción de la voz de la usuaria, sin voz de Horma (29 oct; sustituye al entrevistador de voz con Vapi, a replantear en el paso 6);
  - el entrenador de entrevistas (29 oct; voz de Horma solo si hay tiempo);
  - el asistente de edición (29 oct);
  - el redactor y el juez de CV y carta;
  - el relleno y el supervisor del envío; el ejecutor es un script con Playwright (maneja un navegador), no un agente.
- **Deterministas:** filtros, deduplicación y estados de las candidaturas. Es el relato para el profesor: «agentes donde aportan, flujos deterministas donde no».
- **LLMOps:** cada llamada al LLM se guarda con su modelo, tokens, coste y latencia, y todas pasan por una única puerta (módulo propio) con guardrails de entrada y salida.
- **Tareas lentas:** la API las encola y el worker las ejecuta; la cola sería una tabla de PostgreSQL (propuesta; Redis descartado el 27-oct).

### Qué tema del bootcamp practica cada pieza

| Tema del bootcamp | Dónde se practica en Horma |
|---|---|
| API por capas (TaskFlow, ahora con Next.js), SQL, Docker | API y base de datos de Horma |
| Embeddings, BD vectoriales, RAG | Búsqueda semántica de ofertas |
| Agentes, function calling | Redactor y juez de CV y carta; relleno y supervisor del envío |
| Agentes de voz (Vapi) | Entrenador de entrevistas, solo si hay tiempo (29 oct); la entrevista del perfil se transcribe |
| n8n (Unidad 9) | Desde el 30 oct ya no se practica en Horma (la ingesta es un script); queda en Jobs |
| Seguridad de APIs (OAuth, JWT) | Entrada de usuarias y permisos |
| HTML, CSS, JavaScript | Web y PWA |
| AI Act y RGPD | Líneas rojas (apartado 6) |
| Evals, guardrails, red teaming (Manual, pasos 14-16) | Calidad (fase 4) |
| APIs de LLM: costes y latencia | LLMOps y precios de los planes |

## 6. Líneas rojas, de honestidad y legales

- **Ningún dato inventado** en el CV, la carta ni los formularios. Cada afirmación tiene que poder rastrearse hasta el CV o el perfil, y un eval lo comprueba. Si falta un dato, el agente lo pregunta.
- **Se analiza lo que dice la usuaria, nunca su voz.** No se sacan emociones ni se intenta detectar mentiras por el tono, porque el AI Act prohíbe el reconocimiento de emociones en el ámbito laboral y además la ciencia no lo respalda.
- **No se puntúa ni se ordena la personalidad de nadie.**
- **No hay preguntas de categorías especiales** (RGPD, art. 9): religión, política, salud…
- **Horma nunca filtra candidatas para empresas.** Si lo hiciera, el AI Act lo trataría como sistema de alto riesgo (Anexo III.4): conformidad, registro y supervisión, algo inviable.
- **Datos de las usuarias:**
  - consentimiento explícito para la voz;
  - borrado y exportación de datos;
  - fuera de los logs y de los tests;
  - datos de prueba inventados.

## 7. Matices de la Copiloto para valorar mañana

1. **«Pasar siempre el ATS» no se puede garantizar.** Lo que sí se puede asegurar:
   - que el ATS lea bien el CV;
   - que el CV recoja las palabras clave de la oferta sin inventar nada.

   Un eval vuelve a leer el PDF de Horma para comprobarlo. Por eso los 12 diseños tienen que ser legibles por un ATS: una sola columna y sin tablas. La diferencia entre diseños estará en la tipografía, el color y el espaciado.
2. **Modo autónomo** (29 oct: sin topes; la usuaria da el permiso una vez): solo en los sitios donde está permitido, que son los formularios ATS de empresa y la sección de empresas de Horma. Riesgo sin topes: un error de perfil se enviaría a muchas ofertas sin revisión; por eso se mantienen el aviso de cada envío, el registro y el botón de pausa.
   - En LinkedIn o Indeed el agente prepara la candidatura y la envía la usuaria, también en modo autónomo (confirmado por Mar el 30 oct; sin «quizá más adelante»).
   - Esos portales prohíben automatizar el envío y la usuaria podría perder su cuenta.
   - Hay que tener en cuenta que algo enviado no se puede retirar.
3. **Gmail de cada usuaria:** leerlo obliga a pasar una verificación de pago de Google. La alternativa es que cada usuaria reenvíe las respuestas de las empresas a un correo de Horma.
4. **Suscripciones:** mientras no haya usuarias de pago, los costes de desarrollo son de Mar, aunque pequeños.
   - La entrevista por voz cuesta aproximadamente 1-3 € por usuaria (cifra con voz de Horma; sin ella debería bajar, a recalcular), y ese coste marca el precio de los planes.
   - **Sin topes (29 oct):** el uso intenso (muchos envíos, entrevistas y CVs) lo paga el precio; se mide el coste del usuario más intensivo antes de fijarlo.
   - Los precios se estudian con `/asesora-negocio`.
5. ~~**n8n en la ingesta**~~ → superado el 30 oct: el profesor recomendó evitar herramientas de más y la ingesta pasa a un script propio en Python, así que todo el backend es Python.
6. **Fuentes de ofertas:** se comprueban las condiciones de uso de cada una antes de integrarla, durante el paso 6.

## 8. Plan por fases

> **30 oct:** este plan (fases 0-5 y pasos 1-20) queda sustituido por la estructura del profesor: PRD → revisión de la arquitectura → desglose en tareas pequeñas y priorizadas → construcción por componentes, empezando por la ingesta (después, el que arma los CV, etc.). Fases del PRD: Fase 1 (alcance base: PWA, multiusuaria, ingesta, recomendación, CV y carta, seguimiento, portal de empresas); Fase 2 o 3 (aplicaciones automáticas, que son tronco); Fase 3 (entrevista del perfil, privacidad, exportación y borrado); Fase 4 (construcción más avanzada, por definir con el profesor). Lo de abajo se conserva como histórico.

0. **Preparar el terreno:**
   - Crear `CLAUDE.md` con la Copiloto. Lleva las secciones genéricas de `Erna\CLAUDE.md` y estas reglas propias de Horma:
     - ~~Python 100 % en el backend~~ (sustituido el 4-nov: web en Next.js; pista A en Python).
     - Sin recortes por tiempo y sin sobreingeniería.
     - Las líneas rojas del apartado 6.
     - No tocar Jobs personal ni el n8n de Mar sin permiso.
     - Seguridad de git y `.env`.
     - Explicarlo todo para principiantes.
   - `.gitignore` y `.env.example` (el repositorio ya existe desde el 1-nov).
   - Anotar en Erna que queda aparcada, con confirmación antes de tocar ese repositorio.
1. **Workbook, antes de construir.** Documento «Horma jobs» en la sección **Proyectos** del Cuaderno AI Engineering (hecho; 22 apartados a 27 oct).
   - Teoría para principiantes (definición, analogía y ejemplo de Horma) de: API y capas, embeddings y búsqueda híbrida, agentes, voz, ATS, evals, guardrails, LLMOps, servidores, MCP y subagentes.
   - **Sin ejercicios ni examen: en Proyectos nunca se hacen** (decisión de Mar, 27 oct).
   - Diagramas y mapas conceptuales con **archify**:
     - arquitectura de Jobs frente a Horma;
     - flujo de datos de la ingesta;
     - secuencia de la entrevista y del agente de candidatura;
     - estados de una candidatura;
     - mapa de conceptos del bootcamp aplicados en Horma.
2. **Definición:**
   - Pasos 1-8 del método, reaprovechando `04-spec.md` y `03-legal.md` de Jobs. Las salidas van a `docs/`.
   - Investigación de fuentes de ofertas y sus condiciones de uso.
   - Precios y planes.
3. **Construcción por módulos** (paso 10), en este orden:
   1. API y base de datos.
   2. Ingesta.
   3. Perfil y CVs.
   4. Recomendación.
   5. CV y carta.
   6. Entrevista.
   7. Agente de candidatura.
   8. Seguimiento.
   9. Empresas.
   10. Suscripciones.
4. **Calidad** (pasos 13-16):
   - pytest y CI;
   - evals con golden dataset, LLM-as-judge de fidelidad y ATS, y prueba de lectura del PDF;
   - guardrails;
   - red teaming con ofertas que intentan manipular a la IA.
5. **Publicar, vigilar y presentar** (pasos 17-20): despliegue, demostración para el profesor (cuentas de prueba con datos inventados), case study y memoria.

## 9. Pendiente de Mar

- La rúbrica de Neoland.
- La fecha exacta de entrega (constan el 20 y el 24 de noviembre; Mar lo pregunta en Neoland).
- Si el repositorio debe ser público en la entrega (ya existe: `mcaparrosgu/horma-jobs`, privado, 1-nov).
- ¿Servidor MCP «Horma»? (27 oct: se decide más adelante). Recomendación de la Copiloto: sí, en la fase 5, solo lectura y sin herramientas que envíen.
- (27 oct) Fuentes de ofertas y uso de Apify: con el profesor (29 oct: Apify no es la base).
- (29 oct) Explorar y perfilar los topes (por plan, diarios, modo autónomo). El supervisor auditor del modo autónomo está decidido; falta diseñarlo (paso 6).
- (29 oct) Replantear la entrevista del perfil sin voz de Horma (¿quitar Vapi? ¿solo transcripción?) en el paso 6.
- (29 oct) Entrenador de entrevistas: alcance, y si la voz de Horma llega a tiempo para el 24 de noviembre.
- (29 oct) Auditoría hecha (ninguna en rojo; 5 con condiciones, ya escritas en el apartado 4). Audio: se borra tras transcribir (decidido). Falta elegir el servicio de transcripción en la UE (paso 6).
- (27 oct) Seguimiento por correo: investigar leer Gmail frente a reenvío.
- Alojamiento, quién asume HTTPS, límites y cabeceras (sin Caddy, Mar, 1-nov) y cola de tareas (propuesta: tabla en PostgreSQL) (paso 6).
- (29 oct) Confirmar con el profesor la arquitectura por procesos de `docs/analisis-tecnico.md` y, en el paso 6, documentarla como diagrama C4 de contenedores y una ADR por decisión. Requisitos de seguridad previos al código (roles de BD con RLS forzada, navegador aislado, máquina de estados del envío, supervisor con denegación por defecto): `docs/analisis-tecnico.md`, apartado 8.
- Valorar los matices del apartado 7.
- (27 oct) Discutir en el pulido cómo se muestra el perfil humano en el CV: sutil o explícito. Recomendación de partida: evidencias redactadas como logros, nunca etiquetas ni notas (línea roja).
- (27 oct) Rango de compatibilidad elegible por la usuaria (experiencia, formación, perfil humano) para las ofertas recomendadas. Ver `docs/tareas-pendientes.md`, 1.3, por el riesgo de puntuar la personalidad.
- ~~(27 oct) Sección de empresas~~ → decidido el 27 oct (8C): portal de empresas sí; sección de información de empresas, no.

## 10. Cómo se comprobará que funciona

- **Cada módulo:** demo real en móvil y escritorio, tests en verde y una entrada en la bitácora.
- **Recorrido completo:**
  1. Alta.
  2. Subida de CVs.
  3. Entrevista de voz de menos de 20 minutos.
  4. Perfil revisado (evidencias aprobadas, ocultas o corregidas).
  5. Ofertas recomendadas con su explicación.
  6. CV y carta con el diseño elegido y revisión ATS.
  7. Candidatura aprobada y enviada a un ATS de prueba.
  8. Seguimiento.
- **Evals con números de antes y después.**
- **Red teaming sin fugas.**
- **Jobs personal sigue funcionando** sin ningún cambio.
