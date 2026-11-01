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
   - Agentes: redactora de CV y carta, agente de candidatura y entrevistadora de voz.
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

12. **Stack:** FastAPI + PostgreSQL/pgvector + HTML, CSS y JS planos, instalable como PWA (sin HTMX ni Caddy, Mar, 1-nov). Sin React. ¿Le parece bien?
13. **n8n en la ingesta:** n8n trae las ofertas y llama a la API de Horma; toda la lógica de producto está en Python. ¿Lo acepta como parte del proyecto, o quiere la ingesta también en Python?
14. **¿Framework de agentes o SDK directo?** ¿Espera LangGraph (u otro framework) o basta con el SDK del LLM y function calling?
14 bis. **«Subagente ATS» (pendiente de cerrar):** el PRD v1 lo nombra así, pero en la arquitectura actual medir las palabras clave lo hace una herramienta de código (`medir_ats`) y el redactor adapta el texto. ¿Cómo define usted «agente»? ¿Le vale esta opción o quiere un subagente con LLM? Según su respuesta se corrige el PRD o la arquitectura.
    - Propuesta (1-nov): SDK directo en el resto, y LangGraph solo en dos flujos: CV y cartas (bucle redactor-juez con tope de 2 y pausa para que la usuaria apruebe) y envío (pausa para aprobar). Orquestación en código, sin LangChain. Si prefiere Python plano, los agentes y los flujos no cambian.
    - Diagramas: Cuaderno, Proyectos, «Horma v3».
    - Por qué: cada framework añade mantenimiento y una capa más que depurar.
15. **Modelos:** Jobs usa Claude (Haiku y Sonnet) y `gpt-4.1-mini`. ¿Hay libertad de proveedor? ¿El bootcamp da créditos?
16. **Voz con Vapi** (aprox. 1-3 € por usuaria). Desde el 29 oct, en la entrevista del perfil solo habla la usuaria (se transcribe, sin voz de Horma); la voz de Horma solo estaría en el entrenador de entrevistas, si hay tiempo antes del 24 de noviembre. ¿Es aceptable un servicio de pago en el proyecto, o prefiere voz montada a mano (speech-to-text + LLM + text-to-speech)?
17. **Agente de candidatura con Playwright:** maneja un navegador para rellenar formularios ATS. ¿Le parece bien para el MVP o es demasiado frágil para la demo?
18. **Observabilidad:** ¿basta con una tabla propia de coste, tokens y latencia, o espera una herramienta como Langfuse?
18 bis. **Arquitectura por procesos (29 oct, a raíz de su comentario sobre el análisis técnico):** en lugar de una sola API, proponemos un monolito modular con dos procesos (API síncrona y worker, mismo código base), n8n en contenedor propio y un navegador aislado para el envío; la cola de tareas sería una tabla de PostgreSQL y no Redis. ¿Le parece el nivel de detalle y de complejidad adecuado para un proyecto final, o espera algo más (o menos)?
    - Propuesta: la de `docs/analisis-tecnico.md`; diagramas en el WB (`tecnico`, `recomendacion`, `redactora`, `envio`, `calidad`). Si responde a la 14 con «SDK directo», los grafos del worker se simplifican.
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

23. **Alojamiento:** API, base de datos y n8n de Horma en contenedores Docker en un servidor propio.
    - Pregunta: ¿recomienda algún proveedor? ¿El bootcamp ofrece alguno?
    - Coste: pendiente de investigar en el paso 6.
24. **Licencia de n8n:** usarlo solo para la ingesta interna dentro de un producto con suscripción. ¿Ve algún problema?
25. **Pagos:** Stripe en modo de prueba durante el bootcamp. ¿Espera que los pagos funcionen de verdad o basta la demo?
26. **Repositorio:** ¿público o privado para la entrega? El nombre lo decido yo más adelante.

## Después de la reunión

- Apuntar las respuestas aquí, debajo de cada punto.
- Pasarlas a `docs/propuesta-horma.md` (apartado 4) y a `docs/tareas-pendientes.md`.
- Si da el ok: empezar con `/paso-01-problema`.
