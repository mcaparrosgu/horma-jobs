# Horma jobs · preguntas para el profesor

> Preparado el 2026-10-27 para la reunión con el profesor. Orden = prioridad: los bloques A y B deciden si se puede empezar y qué se evalúa; los demás, cómo se construye.
> En cada punto: **la pregunta**, **nuestra propuesta** y **por qué importa**. Contexto completo en `docs/propuesta-horma.md` y en la página del profesor del WB de Horma.

## A. Para poder empezar

1. **¿Tengo el ok para que Horma jobs sustituya a Erna como proyecto final?**
   - Propuesta: sí, con el alcance de `propuesta-horma.md` (metabuscador UE, entrevista por voz, CV y carta honestos, agente de candidatura, seguimiento y portal de empresas).
   - Por qué: sin este ok no empiezan ni la definición (pasos 1-8) ni el código.
2. **Rúbrica y fecha exacta de entrega.** Tenemos dos fechas, el 20 y el 24 de noviembre.
   - Por qué: la rúbrica dice qué se puntúa y la fecha marca cuánto cabe.
3. **Plazo frente a alcance.** Quedan unas 4 semanas para 10 módulos más la fase de calidad.
   - Pregunta: ¿qué es imprescindible para aprobar y qué se valora como extra?
   - Propuesta: un recorrido completo que funcione de principio a fin (alta → CV → ofertas → CV y carta → candidatura → seguimiento) antes que diez módulos a medias. La entrevista por voz y el portal de empresas, después.
   - Por qué: es el mayor riesgo del proyecto. Mejor decidir el orden ahora que recortar en la última semana.

## B. Qué se evalúa

4. **¿Cuentan como el «RAG, base de datos y agentes» que se pidió en clase?**
   - RAG: búsqueda híbrida de ofertas (embeddings con pgvector y búsqueda por palabras), y el LLM explica por qué encaja cada oferta.
   - Base de datos: PostgreSQL con pgvector.
   - Agentes: redactor y juez para CV y cartas; relleno y supervisor para el envío (el ejecutor es un script); extractor y verificador en la entrevista.
   - Por qué: si el profesor entiende RAG de otra forma (por ejemplo, sobre documentos), hay que saberlo antes de diseñar.
5. **¿Valora evals, LLM-as-judge, guardrails, red teaming y LLMOps?** Es lo que menos se practica en el bootcamp y lo que más distingue a una ingeniera de IA.
   - Propuesta: evals con dataset de referencia, un juez que comprueba que cada frase del CV tiene origen, lectura ATS del PDF y registro de coste y latencia de cada llamada.
6. **¿Puedo desarrollar con Claude Code y agentes de apoyo?** ¿Cómo quiere que lo documente en la memoria?
   - Por qué: deja clara la autoría desde el principio.
7. **¿Qué demo espera?** Propuesta: demo en directo con cuentas de prueba y datos inventados, en móvil y ordenador.

## C. Fuentes de ofertas y legalidad

8. **Para un producto con suscripción, ¿es aceptable usar Apify para leer portales cuyas condiciones prohíben el scraping (LinkedIn), o la base deben ser APIs, feeds y los ATS públicos de las empresas?**
   - Propuesta: híbrido. Base con APIs y feeds públicos (EURES, Adzuna, Arbeitnow…), los listados públicos de los ATS (Greenhouse, Lever, Ashby, Workable) y el portal de empresas. Apify no es la base (29 oct): solo como excepción y con el coste vigilado a mano, porque en Horma no hay topes. Nunca LinkedIn ni Indeed.
   - Datos de Jobs: las fuentes gratuitas aportan la mayoría de las ofertas; Apify es lo más caro y frágil (Indeed paga 100 ofertas por pasada y aporta 0).
   - Riesgo legal: la sentencia del TJUE C-30/14 permite prohibir el scraping comercial en las condiciones de uso.
9. **Agente buscador de fuentes:** propone portales nuevos y cada uno entra solo después de revisar sus condiciones y `robots.txt`. ¿Le parece bien, o prefiere solo conectores fijos? La Copiloto recomendaba conectores sin agente.
10. **Envío automático de candidaturas:** por defecto la usuaria aprueba cada envío. El modo autónomo solo se usa donde está permitido (formularios ATS de empresa y portal de Horma) y nunca en LinkedIn ni Indeed. ¿Lo ve correcto?
11. **Encaje legal:** Horma ayuda a la candidata y nunca ordena candidatas para empresas, así que no entra en el alto riesgo del AI Act (Anexo III.4). La voz no se analiza: solo el contenido. ¿Quiere el análisis legal en la memoria?

## D. Arquitectura y stack

12. ~~**Stack:** FastAPI + PostgreSQL/pgvector + HTML, CSS y JS planos, PWA. Sin React.~~ **Resuelta por él (4-nov):** Next.js, sin FastAPI. Sigue abierto en 29.
13. ~~n8n en la ingesta~~ **Resuelta (30-oct):** sin n8n; la ingesta es un script propio en Python con un dashboard. Número conservado para no alterar las referencias.
14. **¿Framework de agentes o SDK directo?** ¿Espera LangGraph (u otro framework) o basta con el SDK del LLM y function calling?
    - Propuesta (1-nov): SDK directo en el resto, y LangGraph solo en dos flujos: CV y cartas (bucle redactor-juez con tope de 2 y pausa para que la usuaria apruebe) y envío (pausa para aprobar). Orquestación en código, sin LangChain. Si prefiere Python plano, los agentes y los flujos no cambian.
    - Diagramas: Cuaderno, Proyectos, «Horma jobs» (apartado de agentes).
    - Por qué: cada framework añade mantenimiento y una capa más que depurar.
    - Matiz (2-nov): el argumento técnico para LangGraph es débil (ambos flujos se resuelven con Python plano; solo la pausa del envío se beneficia de guardar y reanudar estado, y eso también cabe en una tabla de PostgreSQL). El argumento sólido es **aprender** el framework para el bootcamp y el portfolio. ¿Prefiere que lo usemos por eso, aunque no haga falta?
    - Propuesta de prueba: implementar el flujo de envío (el que tiene pausa) en LangGraph y en Python plano, y comparar líneas, claridad y fallos. Cada agente se escribe como función con entrada y salida claras, independiente del framework, para poder cambiar el orquestador sin rehacer nada.
    - Alternativas a LangGraph que conozco, sin verificar su estado actual: Pydantic AI, OpenAI Agents SDK, Claude Agent SDK, CrewAI, AutoGen/Microsoft Agent Framework, LlamaIndex Workflows, Google ADK. ¿Alguna le parece mejor para un proyecto final?
14 bis. **«Subagente ATS» (pendiente de cerrar):** el PRD v1 lo nombra así, pero en la arquitectura actual medir las palabras clave lo hace una herramienta de código (`medir_ats`) y el redactor adapta el texto. ¿Cómo define usted «agente»? ¿Le vale esta opción o quiere un subagente con LLM? Según su respuesta se corrige el PRD o la arquitectura.
15. **Modelos:** Jobs usa Claude (Haiku y Sonnet) y `gpt-4.1-mini`. ¿Hay libertad de proveedor? ¿El bootcamp da créditos?
16. **Voz con Vapi** (aprox. 1-3 € por usuaria). Desde el 29 oct, en la entrevista del perfil solo habla la usuaria (se transcribe, sin voz de Horma); la voz de Horma solo estaría en el entrenador de entrevistas, si hay tiempo antes del 24 de noviembre. ¿Es aceptable un servicio de pago en el proyecto, o prefiere voz montada a mano (speech-to-text + LLM + text-to-speech)?
17. **Envío con Playwright:** el relleno (LLM) prepara un plan, el supervisor (código) lo comprueba y el ejecutor (script) maneja el navegador para rellenar formularios ATS. ¿Le parece bien para el MVP o es demasiado frágil para la demo?
18. **Observabilidad:** ¿basta con una tabla propia de coste, tokens y latencia, o espera una herramienta como Langfuse?
18 bis. **Arquitectura por procesos (29 oct, a raíz de su comentario sobre el análisis técnico):** en lugar de una sola API, proponemos un monolito modular con dos procesos (API síncrona y worker, mismo código base), un script de ingesta aparte y un navegador aislado para el envío; la cola de tareas sería una tabla de PostgreSQL y no Redis. ¿Le parece el nivel de detalle y de complejidad adecuado para un proyecto final, o espera algo más (o menos)?
    - Propuesta: la de `docs/analisis-tecnico.md`; diagramas en el WB (`tecnico`, `recomendacion`, `calidad` y los del apartado de agentes de «Horma jobs»). Si responde a la 14 con «SDK directo», los grafos del worker se simplifican.
    - Por qué importa: separa lo lento de lo rápido y aísla el envío (lo único irreversible), sin el coste de microservicios.
    - Pedirle también una opinión sobre los requisitos de seguridad previos al código (apartado 8 del análisis): roles de BD con RLS forzada, navegador sin red interna, máquina de estados del envío y supervisor con denegación por defecto.

## E. MCP, subagentes y hooks

19. **Seguimiento por correo:** ¿hace falta un MCP para leer el correo de la usuaria?
    - Nuestra lectura: no. Se puede usar la API del proveedor. Lo difícil es el permiso: leer Gmail de usuarias exige una verificación de seguridad de Google (de pago).
    - Propuesta: dirección de reenvío propia de Horma. ¿Le parece suficiente?
20. **Servidor MCP «Horma»:** para consultar ofertas y candidaturas desde Claude.
    - Propuesta: sí, en la fase final, solo lectura, 3-4 herramientas y ninguna que envíe.
    - Pregunta: ¿suma en la evaluación o es un extra prescindible?
21. **Subagentes de desarrollo** (en Claude Code): `revisor-seguridad` y `auditor-lineas-rojas`, de solo lectura, que se usan al cerrar cada módulo y antes de cada commit. Más adelante, un revisor de evals (paso 14).
    - Pregunta: ¿lo valora como parte del proceso de ingeniería? ¿Añadiría o quitaría alguno?
22. **Hooks** (reglas que Claude Code aplica de forma automática): bloquear la lectura de `.env` ya; en el paso 9, impedir `git add .` y el push a `main`, y pasar los tests antes de cada commit.
    - Pregunta: ¿le parece bien, o deberían lanzar también los subagentes automáticamente?

## F. Infraestructura y costes

23. **Alojamiento:** API, base de datos y script de ingesta en contenedores Docker en un servidor propio.
    - Pregunta: ¿recomienda algún proveedor? ¿El bootcamp ofrece alguno?
    - Coste: pendiente de investigar en el paso 6.
24. ~~Licencia de n8n~~ **Resuelta (30-oct):** sin n8n, no aplica. Número conservado para no alterar las referencias.
25. **Pagos:** Stripe en modo de prueba durante el bootcamp. ¿Espera que los pagos funcionen de verdad o basta la demo?
26. **Repositorio:** ya existe, `mcaparrosgu/horma-jobs`, privado (1-nov). ¿Debe ser público para la entrega?

## G. Resueltas con sus comentarios (3-nov)

27. ~~¿«Aprobar y enviar» entra en la Fase 1, 2 o 3? ¿Vale una Fase 1 sin PDF ni origen visible?~~ **Resuelta sin preguntarle (3-nov):** lo deducimos de lo que él ya fijó.
    - Su PRD pone US-004 «Aprobar y enviar» en «Fase 2 o 3»; el 3-nov coloca las aplicaciones automáticas en la Fase 3 y el portal de empresas en la 2. Su Fase 1 no envía desde Horma.
    - También mueve él a la Fase 3 el origen visible, los diseños y el PDF y el editor. Si lo quisiera en la 1, no lo habría movido.
    - Resultado: en la Fase 1 la usuaria aprueba y envía ella misma, y el tablero lo registra; el portal da el envío desde Horma (Fase 2); el automático, en la 3. `medir_ats` cuenta palabras clave sobre el texto y relee el PDF cuando llegue (Fase 3).
    - Se mantiene: el juez comprueba el origen de cada frase desde la Fase 1 (línea roja). Solo se retrasa mostrárselo.
    - Si en la reunión dice otra cosa, se recoloca: es orden de trabajo, no alcance.

28. **Diseños y PDF del CV:** en la Fase 3 aparecen «diseños y PDF», pero hemos decidido que el CV estético lo sube la usuaria. ¿Horma genera diseños propios o solo un PDF limpio para ATS? (Por decidir: no lo hemos resuelto nosotras.)

29. **Next.js y lo que ya existe en Python (4-nov):** al quitar FastAPI, ¿el worker, la cola y los scripts de la pista B pasan también a TypeScript, o pueden seguir en Python junto a Next.js? ¿Qué usamos para validar datos y qué para el dashboard y la observabilidad (por ejemplo, tabla propia o una herramienta)? Propuesta: la pista A no cambia; solo la web.
30. **Orden de la web (4-nov):** ¿confirma que primero va la web de ingesta de ofertas y de candidatos, con su dashboard, y luego el resto (recomendación, candidatura, envío, seguimiento, portal)? Entendemos que sí.

31. **Ingesta desde las APIs «como antes» (5-nov):** pidió que el pipeline tome las ofertas de las APIs como lo hacía antes. Entendemos que es la misma lógica de Jobs (fuentes, filtros, deduplicación) como **script propio**, sin n8n (30-oct), y que la web es un **dashboard** que muestra las ejecuciones y los datos guardados. ¿Es así, o quiere n8n otra vez? ¿La descarga y la base de datos en TypeScript o el script sigue en Python (ligada a la 29)?
    - Propuesta: script en Python (ya existe `ingestar.py`), el dashboard solo muestra y pide, y un comando `verificar` comprueba que lo descargado está en la base.
    - Por qué: reaprovechar lo hecho, una herramienta menos que mantener y una web sin permiso para lanzar programas.

32. **Fuentes de ofertas y permisos (5-nov):** calificamos Arbeitnow, EURES, Adzuna, The Hub, InfoJobs y Personio: ninguna sale apta (uso personal o no comercial, acuerdo escrito, o sin poder leer sus condiciones). Proponemos un metabuscador por capas con «licencia de origen» (ATS públicos de empresas, programas de socios como Careerjet y Jooble, datos abiertos como JobTech y BOE, ofertas que trae la usuaria, y permisos a los grandes) y un agente que descubra empresas y ATS sin copiar contenido. ¿Lo valida? Documento con el detalle y seis preguntas: `docs/preguntas-profesor.md (apartado «Consulta sobre fuentes de ofertas»)`.
    - Por qué: cambiar la herramienta (subagentes, scraper propio) no cambia el permiso: las condiciones de cada portal mandan.

## Después de la reunión

- Apuntar las respuestas aquí, debajo de cada punto.
- Pasarlas a `docs/propuesta-horma.md` (apartado 4) y a `docs/tareas-pendientes.md`.
- Si da el ok: desglosar en tareas pequeñas y construir por componentes, empezando por la ingesta (su método, 30-oct).


---

## Consulta sobre fuentes de ofertas (5-nov-2026)


Documento para comentar con el profesor. Resume qué pasó al calificar las primeras fuentes, qué opciones hay para que Horma sea un metabuscador sin depender de permisos lentos, y qué decisiones necesitamos de él. Lista completa de fuentes y su estado: `docs/artefactos/fuentes-de-empleo.html`. Nada de esto es asesoramiento legal.

## 1. Objetivo

Horma es un metabuscador de empleo europeo: la persona no debe ir de web en web ni de app en app, porque todas las ofertas llegan a un solo sitio. Esa es la diferencia con el resto. El flujo agéntico exige que la ingesta traiga ofertas de APIs (instrucción del 5-nov).

## 2. Qué ha pasado: las seis primeras fuentes salen «no aptas»

`/calificar-fuentes` (agente `auditor-fuentes`: condiciones de uso, `robots.txt`, API) sobre Arbeitnow, EURES, Adzuna, The Hub, InfoJobs y Personio (ATS de prueba).

| Fuente | Resultado | Motivo |
|---|---|---|
| Arbeitnow | No apta | API sin clave con enlace de vuelta, pero sus términos dicen uso personal y no comercial |
| Adzuna | No apta | La clave gratuita es para evaluar; un metabuscador necesita acuerdo escrito |
| The Hub | No apta | Solo uso personal; sin API; sin España |
| EURES | No apta (no claro) | Ni permite ni prohíbe; sin API oficial encontrada; reutilización citando a ELA |
| InfoJobs | No apta (no claro) | API con credenciales, pero condiciones sin leer (bloqueo a bots, error 456) y `robots.txt` que bloquea listados |
| Personio | No apta (no claro) | Ayuda y términos no legibles (errores 403 y 429): sin base para decidir |

Ninguna prohíbe expresamente la API. Todas limitan el uso a fines personales o no comerciales, piden acuerdo escrito o no se pudieron leer. Limitación: el agente leyó las páginas a través de un resumen automático, no siempre literal; las cláusulas citadas hay que verificarlas a mano antes de decidir.

### 2 bis. Segunda ronda (5-nov, tarde): Careerjet, Jooble, Greenhouse, Lever, JobTech y BOE

Las seis siguen `apta = false` hasta verificar, pero con diferencias:

| Fuente | Estado | Lo más relevante |
|---|---|---|
| **BOE (datos abiertos)** | Candidata fuerte | El aviso legal permite reutilizar «para fines comerciales y no comerciales», con copia y modificación, citando la fuente con enlace; prohíbe desnaturalizar el sentido y sugerir carácter oficial. API sin clave. Falta leer la licencia tipo (27-jun-2024), el esquema del sumario (sección II.B, oposiciones y concursos) y el `robots.txt` completo |
| **JobTech (Suecia)** | Candidata fuerte | Licencia CC0 y acceso público confirmados en la fuente oficial. Faltan los términos y límites de la API. Solo Suecia |
| **Careerjet** | Pendiente de cuenta | Programa para mostrar sus ofertas; los términos están dentro de la cuenta de publicador; obliga a reenviar IP y navegador de la usuaria |
| **Greenhouse** | Con matices | API pública sin autenticación; sin prohibición ni autorización para agregadores; el texto de cada oferta es de la empresa |
| **Lever** | Descartada sin permiso | Términos para clientes: no distribuir a terceros; sin licencia visible |
| **Jooble** | Descartada sin permiso | Prohíbe bots y copiar para republicar; 500 peticiones de por vida por clave |

Conclusión: la capa de datos abiertos (BOE y JobTech) es hoy la base más sólida; los ATS valen empresa por empresa; los portales comerciales necesitan permiso escrito. Hallazgo para la pregunta 1: empezar con menos volumen pero con permiso es viable (BOE para empleo público en España; JobTech para Suecia), y el resto crece con empresas que se registran. Limitación: todo se leyó a través de un resumen automático; cláusulas por verificar a mano.

## 3. Por qué cambiar la herramienta no resuelve el problema

La pregunta no es cómo se descargan las ofertas, sino si hay permiso para guardarlas y mostrarlas en un producto de pago. Un subagente con LLM o un scraper propio entran por la misma puerta que los términos de uso y el `robots.txt`. Además, un subagente cuesta tokens y puede recibir instrucciones escondidas en una oferta.

Marco jurídico (sin verificar con un abogado):
- Sentencia del TJUE C-30/14 (Ryanair contra PR Aviation, 2015): si una base de datos no está protegida por derechos de autor ni por el derecho `sui generis`, su dueño puede limitar su uso **por contrato**, es decir, con sus condiciones de uso. Es lo que hacen estos portales. No hay constancia, en lo que he encontrado, de una sentencia española sobre scraping de ofertas.
- Los datos personales dentro de una oferta (nombre o correo de quien selecciona) entran en el RGPD.
- LinkedIn e Indeed prohíben la automatización en sus términos; el profesor ya los descartó.

## 4. Propuesta: el metabuscador por capas, con licencia de origen

Principio: fuentes que **quieren ser leídas**. Cada oferta guarda su origen y su licencia o permiso (`empresa`, `socio`, `abierto`, `usuaria`) y la web enseña siempre el enlace a la original.

1. **Empresas que publican para ser difundidas.** Las APIs públicas de Greenhouse, Lever, Ashby, Workable y Personio sirven para que terceros monten bolsas de empleo. Greenhouse documenta que los datos del tablero son públicos y no piden autenticación; Lever dice que su API sirve para crear un sitio de empleo (citas de terceros). **Ninguna da una licencia expresa de redistribución**: aplican las condiciones de cada empresa. Añadir una empresa cuesta una línea y se puede ofrecer desde el portal de empresas.
2. **Programas de socios pensados para sitios como Horma.** Careerjet ofrece cuenta de publicador con clave por sitio y paga por clic; Jooble entrega clave por formulario. Ambos se piden por **formulario web, sin esperar correos**. Falta leer sus condiciones (los acuerdos con límites y reglas de atribución van con la clave).
3. **Datos abiertos de servicios públicos.** JobTech de Suecia publica los anuncios, según terceros, con CC0 (dominio público); su API JobStream está pensada para hacer una copia completa, con un límite de una petición por minuto. En España, el BOE tiene API de datos abiertos y la Ley 37/2007 regula la reutilización del sector público; falta confirmar la licencia en su aviso legal y que cubra convocatorias de empleo público.
4. **Ofertas que trae la usuaria.** Pegar el enlace de una oferta (se guarda como en un gestor de marcadores, para uso personal) o reenviar a Horma las alertas de correo que ella ya recibe de InfoJobs o LinkedIn.
5. **Permisos a los grandes** (InfoJobs, Arbeitnow, EURES, The Hub, Adzuna): por escrito, ofreciendo tráfico y candidaturas de vuelta. Lento; se hace en paralelo sin bloquear nada.

## 5. Agentes que buscan ofertas por la web: cómo encajan en Horma

Contexto: Mar usa en otro proyecto un agente que busca ofertas por toda la web. La utilidad es real, pero el límite legal es el mismo: lo que cuenta es qué se hace con lo encontrado.

- **Agente descubridor de fuentes (recomendado).** Busca páginas de empleo de empresas y detecta qué ATS usan por la dirección (`boards.greenhouse.io`, `jobs.lever.co`, `apply.workable.com`, `*.jobs.personio.de`). No copia contenido: **rellena el registro de empresas**, y las ofertas se leen después con la API pública de ese ATS. Resuelve el problema real que vimos con los ATS, que no es la API sino saber qué empresas usar.
- **Agente de búsqueda de la usuaria.** A petición de ella («busca ofertas de X»), busca por la web y le devuelve **enlaces con un resumen**, sin guardarlos en una base compartida. Se comporta como su asistente y como un buscador, no como una copia de otros portales. Hay que revisar los términos del proveedor de búsqueda: Brave, por ejemplo, restringe crear una base de datos con sus resultados y solo permite almacenamiento transitorio; hay proveedores con derechos de almacenamiento como opción de pago.
- **Agente que normaliza y comprueba.** Ya existe en el flujo: `extractor-oferta`, `auditor-oferta` y `clasificador-oferta` dan formato común, detectan ofertas fantasma o fraudulentas y las clasifican, siempre sobre ofertas de fuentes con permiso.
- **Agente auditor de fuentes.** Ya existe (`auditor-fuentes`); el siguiente paso es darle acceso a los textos completos, porque con el resumen automático falló en varias páginas.
- **Dato estructurado `JobPosting`.** Muchas empresas marcan sus ofertas con este formato para Google for Jobs, y Google pide un mapa del sitio con las páginas de cada oferta. Hay conjuntos abiertos de esas marcas (Web Data Commons). El marcado se hace para aparecer en buscadores, **no es una licencia** para terceros, así que se usa solo para descubrir, no para copiar.

Regla común: el agente **descubre y clasifica**; no copia en masa contenido de portales que lo limitan.

## 6. Plan de trabajo propuesto (a falta de su visto bueno)

1. Calificar con el mismo método: Careerjet, Jooble, Greenhouse, Lever, JobTech, Työmarkkinatori y reutilización del BOE (2 a 3 horas).
2. Ingesta real con las aptas, con el campo «licencia de origen» (día 2).
3. Pieza propia: «añadir oferta por enlace» y «reenviar alertas».
4. Agente descubridor de fuentes (registro de empresas con ATS).
5. Solicitud de permiso a los grandes, en paralelo, desde el portal de socios o por correo.

## 7. Preguntas para el profesor

1. ¿Está de acuerdo en que solo se usen fuentes que pasen la calificación, aunque eso limite al principio el volumen de ofertas?
2. ¿Valida el enfoque por capas y el campo de licencia de origen?
3. ¿Qué espera del scraping? Mar lo ha aparcado de momento y Horma no usa LinkedIn ni Indeed.
4. ¿Acepta que un agente descubra empresas y ATS, y que la ingesta lea solo sus APIs públicas?
5. ¿Para el proyecto del bootcamp basta una demostración con las fuentes aptas (ATS de empresas, datos abiertos y alguna cuenta de socio) y ofertas publicadas por empresas con `/publicar-oferta`?
6. ¿Revisamos con él, o con alguien de la escuela, la parte legal antes de abrir a usuarias reales?

## 8. Qué no sabemos

- Las condiciones completas de Careerjet y Jooble, de Greenhouse y Lever, y la licencia exacta de JobTech y del BOE.
- Si existe una sentencia española sobre agregadores de empleo.
- Casi todo el estado de las fuentes viene de documentación de terceros; los datos oficiales están marcados en la página de fuentes.

## 9. Actualización (5-nov, noche): BOE y JobTech verificadas

Ya hay **dos fuentes aptas con condiciones**: el BOE (empleo público en España; reutilización comercial permitida con atribución, API sin clave que exige la cabecera `Accept`, sección II.B = código `2B`) y JobTech de Suecia (CC0, acceso público, sin clave). Ambas respondieron a una consulta de prueba. Restricciones: el BOE publica resoluciones, no ofertas con formato propio (se filtran convocatorias y se descartan listas de aprobados, que llevan nombres); JobTech trae campos de contacto que no se guardan. Con esto la pregunta 1 queda respondida en parte: se puede empezar con menos volumen, pero con permiso. Faltan: límites de peticiones de ambas y cláusulas por revisar a mano.

## 10. Decisión de Mar (5-nov, noche)

Mar prefiere **una demostración con pocas fuentes, pero limpias, y ampliar después**. Es lo que se construirá primero (JobTech, BOE y ofertas de empresas), con la ampliación de fuentes en paralelo. Esto responde a la pregunta 5 desde nuestro lado; seguimos queriendo su opinión sobre el resto.
