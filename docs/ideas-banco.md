# Banco de ideas de Horma

Todo lo que se nos ocurre o nos sugieren y puede servir. **Nada de aquí está decidido**: cada idea lleva un estado y, antes de construir, pasa por la selección y el plan (sección I). Las descartadas se quedan anotadas con su porqué, para no discutirlas dos veces y por si cambia el contexto.

Estados: **Encaja** (compatible con las reglas actuales) · **Con condiciones** (hay que resolver algo antes) · **Pendiente del profesor** · **Descartada por ahora** (con motivo) · **Aplazada**.
Alcance vigente de fuentes: **solo España** (6-nov). Líneas rojas: `CLAUDE.md`.
Origen: «Agente 1» y «Agente 2» son dos asistentes de IA externos consultados por Mar el 6-nov; «Copiloto» y «Mar» son ideas propias; «Profesor» son instrucciones suyas.

## A. Fuentes de ofertas

| # | Idea | Origen | Estado | Nota |
|---|---|---|---|---|
| A1 | Boletines oficiales autonómicos, provinciales y municipales (como el BOE) | Agente 1 | Encaja | Reutilización permitida con atribución; calificar uno a uno |
| A2 | Servicios públicos de empleo autonómicos, universidades y ayuntamientos | Agente 1 | Con condiciones | Sin API conocida en muchos casos; calificar |
| A3 | ATS públicos de empresas (Greenhouse, Lever, Ashby, Workable, SmartRecruiters, Personio) con lista de empresas española mantenida a mano | Ambos | Con condiciones | Greenhouse salió «no apta con matices» el 5-nov; el problema real es la lista de empresas |
| A4 | Descubrir empresas con ATS buscando por dirección (`site:boards.greenhouse.io`) | Agente 2 | Con condiciones | Ya previsto como agente descubridor de empresas |
| A5 | Datos estructurados `JobPosting` (JSON-LD de Google for Jobs) leyendo sitemaps de webs de empleo de empresas | Agente 2 | Con condiciones | Sin selectores frágiles; cada web con su `robots.txt` y condiciones. Web Data Commons: aspecto legal sin mirar |
| A6 | APIs con registro: InfoJobs (con aprobación), Adzuna, Jooble, Careerjet, EURES | Ambos | Con condiciones | Calificadas el 5-nov: casi todas «no aptas» por sus términos. Vía: pedirles permiso o programa de socios |
| A7 | Pedir permiso o acuerdo a InfoJobs, Tecnoempleo, Infoempleo y Adzuna: un metabuscador les da tráfico | Copiloto | Encaja | La Copiloto redacta los correos; Mar los envía |
| A8 | Careerjet: cuenta de socia y lectura de sus términos | Copiloto | Encaja | Pendiente de Mar |
| A9 | Scraping selectivo y respetuoso (solo si `robots.txt` y condiciones lo permiten), con un modelo como extractor en vez de selectores CSS | Ambos | Pendiente del profesor | Pregunta 32. Condición: calificar antes y no esquivar bloqueos |
| A10 | Apify para portales sin API | Anterior | Pendiente del profesor | Aparcado el 5-nov; riesgo legal |
| A11 | Feeds RSS públicos de portales y blogs de empleo | Agente 1 | Con condiciones | Tienen condiciones de uso; se califican igual |
| A12 | Canales de Telegram de empleo y webs de nicho | Agente 1 | Con condiciones | Que no tengan protección no es permiso; solo con permiso expreso |
| A13 | Agregadores secundarios pequeños sin anti-bots | Agente 1 | Descartada por ahora | Sin protección no significa con permiso |
| A14 | Remotive, Himalayas, We Work Remotely, RemoteOK, The Muse (remoto) | Agente 2 | Descartada por ahora | Fuera del alcance España; varias prohíben pasar sus ofertas a agregadores |
| A15 | JobTech Suecia | Anterior | Descartada por ahora | Apta (CC0) pero fuera de alcance; apagada, no borrada |
| A16 | Ampliar a Europa cuando las bases estén sólidas | Mar | Aplazada | Reversible |
| A17 | Esquivar bloqueos, rotar IP, «guerrilla digital» | Agente 1 | Descartada | Riesgo legal (bases de datos, RGPD) |

## B. El usuario como fuente

| # | Idea | Origen | Estado | Nota |
|---|---|---|---|---|
| B1 | **Botón «buscar también en…»**: enlace profundo con la consulta de la usuaria a InfoJobs, Tecnoempleo, Indeed, etc. | Agente 2 | Encaja | Sin tocar sus datos; cubre portales que no podemos indexar. Sin LLM |
| B2 | Añadir oferta por enlace o pegando el texto | Profesor | Encaja | Pedido por el profesor el 6-nov |
| B3 | Marcador del navegador o extensión «guardar esta oferta» | Ambos | Con condiciones | La extensión es otro producto que mantener; el marcador es más barato |
| B4 | Reenviar alertas de LinkedIn, Indeed o InfoJobs a un buzón de Horma y parsearlas | Agente 2 | Con condiciones | Son correos de la propia usuaria; cuesta un buzón y traen datos de terceros (RGPD) |
| B5 | Crowdsourcing: compartir ofertas encontradas fuera | Agente 1 | Con condiciones | Variante de B2 y B3; ojo con ofertas copiadas de portales con condiciones |
| B6 | Ofertas publicadas por empresas en el portal de empresas | Copiloto | Encaja | Ya es un tronco |

## C. Calidad de los datos

| # | Idea | Origen | Estado | Nota |
|---|---|---|---|---|
| C1 | **Deduplicar entre portales** (título, empresa, ciudad, fecha) | Agente 2 | Encaja | Hoy no hay; imprescindible con varias fuentes. Reglas, sin LLM |
| C2 | **Verificador de ofertas caducadas o fantasma** (enlace vivo, fecha reciente, señales de estafa) | Agente 2 | Encaja | Reglas primero; el modelo solo para casos dudosos |
| C3 | Normalizador que unifica títulos («Fullstack», «Full-Stack Engineer») | Ambos | Encaja | Existe en parte: `clasificador-oferta` y taxonomía |
| C4 | Un conector aislado por fuente (si una cae, el resto sigue) | Agente 2 | Encaja | Ya es así por diseño; comprobar al tener varias |
| C5 | Cachés desde el día uno; ingerir una vez y compartir entre usuarias, nunca por usuaria | Agente 2 | Encaja | Ya es así (ingesta compartida) |

## D. Emparejamiento y producto

| # | Idea | Origen | Estado | Nota |
|---|---|---|---|---|
| D1 | Búsqueda semántica con vectores (*embeddings*) para filtrar y el modelo solo para reordenar el top 20 | Ambos | Pendiente del profesor | Implica modelo y pieza nueva en la web. Hoy: taxonomía + matcher |
| D2 | Búsqueda en lenguaje natural («un sitio donde innovar con IA y teletrabajar») | Agente 1 | Pendiente del profesor | Depende de D1 |
| D3 | Planificador: traduce el perfil o la petición en consultas por fuente | Agente 2 | Con condiciones | Útil si hay varias APIs con parámetros distintos |
| D4 | Explicador «te encaja porque… te falta…» | Agente 2 | Encaja | Ya existe en `/recomendar` con explicación |
| D5 | Alertas de ofertas nuevas | Agente 2 | Encaja | Rama; necesita correo o notificaciones (coste y mantenimiento) |
| D6 | Adaptar CV y carta a cada oferta | Ambos | Encaja | Ya es tronco (`/candidatura`) |
| D7 | Agente que postula solo, con permiso | Agente 1 | Con condiciones | Ya previsto: solo donde esté permitido; LinkedIn e Indeed, nunca |
| D8 | Simulador de entrevista con preguntas típicas de la empresa | Agente 1 | Con condiciones | Rama de entrevista; sin analizar la voz |
| D9 | Freemium + Pro (suscripción) | Ambos | Aplazada | Ya decidido: las suscripciones pagan los costes |
| D10 | App móvil: PWA con Next.js y después Capacitor para tiendas | Agente 2 | Con condiciones | Las tiendas de apps ya son una rama |

## E. Infraestructura y coste

| # | Idea | Origen | Estado | Nota |
|---|---|---|---|---|
| E1 | GitHub Actions con cron para ingestar gratis | Ambos | Con condiciones | Detalle de despliegue; el repo privado tiene cupo gratuito limitado |
| E2 | Cloudflare Workers para la ingesta | Agente 2 | Descartada por ahora | Pieza nueva; ya tenemos script propio |
| E3 | Supabase (Postgres + pgvector) | Ambos | Descartada por ahora | Ya hay PostgreSQL; pgvector solo si D1 se aprueba |
| E4 | Embeddings multilingües (bge-m3) en Workers AI o Hugging Face | Agente 2 | Pendiente del profesor | Depende de D1 |
| E5 | Modelo de capa gratuita (Gemini, Groq) para reordenar y explicar | Agente 2 | Pendiente del profesor | Mar: si hace falta, se hace; manda la instrucción del profesor |
| E6 | Agentes con Ollama local o modelos gratuitos | Agente 1 | Descartada por ahora | Los agentes corren en Claude Code |
| E7 | LangChain, CrewAI | Agente 1 | Descartada por ahora | LangGraph está pendiente del profesor |

## F. Riesgos que señalaron los agentes

- Los planes gratuitos de muchas APIs prohíben el uso comercial: revisar antes de cobrar (ya lo hace `/calificar-fuentes`).
- Un CV son datos personales: consentimiento, borrado real y no usarlos para entrenar (exportar y borrar ya existen).
- Los límites gratuitos se agotan al crecer.
- Sin verificador aparecen ofertas caducadas y duplicadas, y eso mata la confianza (ver C1 y C2).

## G. Ideas del agente 3 (6-nov, tras el prompt inicial)

Todas con la etiqueta **por verificar** hasta contrastarlas con fuente primaria (ver `docs/prompt-agente-fuentes-espana.md`).

**Primera comprobación (6-nov, búsqueda web, sin leer aún las condiciones oficiales):**
- G1 Feina Activa: **confirmada la existencia** del conjunto en el catálogo de datos.gob.es (XML, actualización diaria, Generalitat de Catalunya). **Licencia sin confirmar**: la ficha solo remite a la página general de licencias de datos abiertos de la Generalitat. Falta leerla y probar el volumen.
- G2 InfoJobs: no se encontraron sus condiciones de API; hay que leerlas dentro de developer.infojobs.net (requiere cuenta de Mar).
- G4 ATS: **contradice a la respuesta del agente 3.** Según terceros, Workable (widget) y Teamtailor (feed de la página de empleo) se leen sin credenciales; Recruitee es dudoso (un tercero dice que exigirá cabecera con token desde feb-2027). Que se pueda leer no significa que esté permitido agregar: falta leer las condiciones oficiales.
- G5 ESCO: licencia **sin confirmar**; leer el aviso legal de esco.ec.europa.eu.
- G23 Vercel Hobby: **confirmado** en sus condiciones oficiales: solo uso personal y no comercial; lo comercial exige plan Pro.
- Reglamento de IA (Anexo III, 4a): **confirmado** que analizar y filtrar candidaturas para contratar es alto riesgo; una herramienta que solo redacta texto suele quedar fuera. Fechas de aplicación: fuentes discrepantes (una menciona diciembre de 2027), sin verificar.

| # | Idea | Estado | Nota |
|---|---|---|---|
| G1 | **Feina Activa**: feed XML diario de ofertas en el catálogo de datos abiertos de la Generalitat de Catalunya | Con condiciones | Candidata fuerte para arrancar (Cataluña); falta confirmar licencia y volumen |
| G2 | InfoJobs por su programa oficial de desarrolladores (credenciales por aplicación) | Con condiciones | Falta leer sus condiciones sobre agregar y almacenar |
| G3 | **Empezar buscando empresas, no ofertas**: base de empresas españolas, detectar su ATS y descubrir sus bolsas | Con condiciones | Variante de A3 y A4; el reto es la lista inicial |
| G4 | Workable, Teamtailor y Recruitee requieren credenciales de cada empresa (contradice a los terceros que dijeron «sin clave») | Por verificar | Cambia el valor de estos ATS como fuente abierta |
| G5 | **ESCO** (clasificación europea de ocupaciones y competencias) para normalizar profesiones | Con condiciones | Comparar con nuestra taxonomía; comprobar licencia |
| G6 | Ficha de fuente: método, condiciones, licencia, límites, frecuencia, almacenamiento, fecha de revisión jurídica y responsable | Encaja | `/calificar-fuentes` ya cubre buena parte; añadir límites y revisión jurídica |
| G7 | Tres niveles de fuentes: autorizadas, rastreo con revisión previa, restringidas (no se usan) | Encaja | Coincide con nuestra política |
| G8 | Nadie activa un conector nuevo sin controles (el descubridor propone; una persona o regla aprueba) | Encaja | Coincide con `/calificar-fuentes` |
| G9 | Fuentes sectoriales: Tecnoempleo, Turijobs, Hosco, Welcome to the Jungle, Wellfound, Malt, Domestika Jobs | Con condiciones | Calificar una a una |
| G10 | Monitorizar páginas de empleo de empresas pequeñas, sitemaps y bolsas recién creadas | Con condiciones | Depende de A5 |
| G11 | Ranking de compatibilidad sobre 100 puntos con desglose y filtros duros previos | Encaja | Ya hay nota y explicación; ver cómo mostrar el desglose |
| G12 | **Potencial de encaje**: «con esta certificación pasarías del 75 % al 88 %» | Con condiciones | Útil si se basa en lo que pide la oferta, sin inventar |
| G13 | **Búsqueda inversa de carrera**: puestos adyacentes que encajan con tu experiencia aunque no se llamen igual | Con condiciones | Honestidad: lo propone y lo aprueba ella |
| G14 | Describir lo que quieres en lenguaje natural, sin subir CV | Con condiciones | Depende de D1 y de un modelo en la web |
| G15 | Modo «Busca por mí»: criterios una vez y alertas diarias de lo relevante | Encaja | Rama; razón fuerte para suscribirse; ver D5 |
| G16 | Aprender de las ofertas guardadas, descartadas o solicitadas | Con condiciones | Mejora el emparejamiento; cuidado con sesgos |
| G17 | Deduplicación en tres capas: URL canónica, huella de contenido y similitud semántica | Encaja | Ampliación de C1 |
| G18 | Historial de cada oferta (primera y última vez vista, publicada, caducada, activa) y revalidación | Encaja | Ampliación de C2 |
| G19 | Procesar ofertas con reglas, NLP y ESCO, y reservar el LLM para explicar y generar cartas | Encaja | Reduce coste; coherente con nuestro diseño |
| G20 | Afiliación, ofertas patrocinadas claramente marcadas, servicios de carrera, licencias a consultoras | Aplazada | Patrocinadas sin alterar la puntuación; licencias a empresas = revisar alto riesgo |
| G21 | Eliminar el CV original tras extraer el perfil, salvo que la usuaria quiera conservarlo | Con condiciones | Minimización RGPD; comprobar con el flujo de CV maestro |
| G22 | Vigilancia periódica de APIs y feeds nuevos | Encaja | Tarea recurrente |
| G23 | Vercel Hobby no es para uso comercial; n8n Community no vale como servicio | Por verificar | Afecta al despliegue futuro |
| G24 | Cloudflare Workers y Supabase gratuitos con límites y pausas | Descartada por ahora | Ver E2 y E3 |
| G25 | LangGraph para orquestar agentes | Pendiente del profesor | Ya previsto en dos flujos |
| G26 | Embeddings de OpenAI `text-embedding-3-small` (0,02 $ por millón de tokens) | Pendiente del profesor | Depende de D1 |
| G27 | Mercado inicial España y Cataluña | Encaja | Alinea con el alcance de España |
| G28 | App nativa con React Native/Expo tras la PWA | Aplazada | Rama de tiendas de apps |
| G29 | Acuerdos comerciales con Indeed o LinkedIn | Descartada por ahora | Contra la indicación del profesor |

## H. Respuesta del agente 4 a nuestro prompt (6-nov)

Un agente con búsqueda web contestó al prompt de `docs/prompt-agente-fuentes-espana.md`. **Texto íntegro y análisis: `docs/privado/investigacion-fuentes-espana-2026-11-06.md` (privado, ignorado por git; solo existe en este ordenador).** Estado de cada punto tras contrastar lo que pude (búsqueda web, sin leer aún las páginas oficiales completas).

| # | Idea o hallazgo | Estado | Nota |
|---|---|---|---|
| H1 | **InfoJobs prohíbe en sus condiciones de API las «aplicaciones que sean agregadores de ofertas»**; almacenar datos exige su programa de Partners | Por verificar | Coincide con nuestro «no apta». Mi búsqueda no encontró el texto: leerlo en developer.infojobs.net |
| H2 | **Lanbide (País Vasco)**: JSON de ofertas sin clave, CC BY 4.0 | Con condiciones | Endpoint y campos confirmados; la licencia es la general de Open Data Euskadi, falta la del conjunto. Solo ofertas gestionadas por Lanbide (el campo `tipo` distingue origen) |
| H3 | **CIDO (Diputació de Barcelona)**: API con área «Ocupació»; todo el empleo público catalán | Con condiciones | Ficha CC BY (2022); documentación en dadesobertes.diba.cat. Falta confirmar endpoints y qué cubre «Ocupació» |
| H4 | Castilla y León (ECyL): CSV, JSON y XML sin clave, CC BY 4.0 | Por verificar | No comprobado por mí |
| H5 | Feina Activa: última actualización del catálogo 16-9-2026 (casi dos meses sin actualizar) | Con condiciones | Medir si el feed está vivo antes de integrarlo |
| H6 | Euskadi OPE, Aragón, Junta de Andalucía (entidades instrumentales) | Con condiciones | Ramas; verificar licencias |
| H7 | **Solicitudes formales de reutilización (Ley 37/2007)** a SEPE/Empléate, SAE, Comunidad de Madrid, LABORA | Encaja | Coste: unos correos; plazo: meses. Abre fuentes con base legal limpia |
| H8 | **Reposicionar Horma como copiloto de candidaturas**: la candidata trae la oferta de donde sea y Horma la convierte en candidatura excelente; el índice legal es complemento | Decisión de Mar | Choca con el objetivo «metabuscador». Ver discusión en la conversación del 6-nov |
| H9 | **Dos espacios en la base de datos**: índice común (fuentes con licencia o permiso) y espacio privado de cada candidata (lo que ella trae) | Encaja | El esquema `oferta.json` ya tiene `licencia: usuaria`; falta comprobar que la web nunca muestre esas ofertas a otras |
| H10 | Ser **destino de feeds de ATS** (Factorial, Teamtailor, Recruitee), como Talent.com y Welcome to the Jungle: feed XML entrante y marketplace de integraciones | Con condiciones | Fase 2; hay que ofrecer algo a la empresa (candidaturas mejor preparadas) |
| H11 | Programa de publishers de **Careerjet** y **Talent.com** (tráfico a cambio de ofertas) | Con condiciones | Mar abre cuenta de Careerjet y lee términos |
| H12 | Permiso por correo a 20–30 empresas tech catalanas con ATS de endpoint público; guardar el permiso como licencia de origen | Con condiciones | Borrador de correo en la conversación; no enviar hasta tener web, remitente y compromisos que podamos cumplir |
| H13 | Medir antes de estimar: 200 empresas catalanas de más de 50 empleados, detectar su ATS y contar ofertas | Encaja | Dato propio en dos días |
| H14 | Lista inicial de empresas: BORME, Wikidata (CC0), directorios de ecosistema (ACCIÓ, ENISA), alta voluntaria | Con condiciones | Revisar condiciones de cada directorio |
| H15 | Deduplicación en tres capas con `pg_trgm` de PostgreSQL para casos dudosos; fusionar sin borrar (`grupo_dedup`) | Encaja | Sin LLM salvo dudas |
| H16 | Reglas de ofertas caducadas (desaparece en dos lecturas, plazo vencido, 45 días sin cambios, 404/410) y **no usar un modelo para decidir «fantasma»**: mostrar hechos (antigüedad, republicaciones) | Encaja | Coherente con honestidad |
| H17 | Defensa contra inyección de instrucciones: oferta como dato delimitado, agentes sin herramientas, salida con esquema cerrado, limpiar HTML y texto oculto | Encaja | Ya aplicamos casi todo |
| H18 | Mapear la taxonomía a **ESCO** como columna extra (la API es EUPL 1.2; el contenido, Decisión 2011/833/UE: reutilización con atribución) | Con condiciones | Licencia sin comprobar por mí |
| H19 | **No usar puntuación sobre 100**: «alto / medio / bajo» con motivos (precisión falsa) | Con condiciones | Hoy usamos nota 0–100; decidir con Mar |
| H20 | Embeddings solo para dos usos: casos dudosos de deduplicación y «otros puestos parecidos» | Pendiente del profesor | |
| H21 | **Etiqueta de transparencia por oferta**: salario sí/no, antigüedad, republicaciones, fuente y licencia | Encaja | Barata y diferencial; la Directiva (UE) 2023/970 está citada de memoria |
| H22 | **Empleo público como nicho fuerte** (CIDO + BOE + boletines) con alertas por plazo de solicitud | Encaja | Rama temprana en Cataluña |
| H23 | No guardar nombres, correos ni teléfonos personales de reclutadores al ingerir (minimización RGPD) | Encaja | Ya filtramos contactos; revisar campo a campo en cada feed |
| H24 | Descripción completa solo a petición de la candidata, sin guardarla en el índice público | Con condiciones | Reduce riesgo de derecho de autor; revisar con abogada |
| H25 | Extensión de navegador y alertas reenviadas como «uso personal de la candidata» | Con condiciones | Revisión legal antes de publicar |
| H26 | Matices del Reglamento de IA: vender a empresas «visibilidad dirigida a candidatas que encajan» las metería en alto riesgo | Descartada | Coincide con nuestra línea roja |
| H27 | Compartir ofertas entre usuarias («comunidad»); licenciar Adzuna desde el día 1; vender a empresas candidatas que encajan | Descartada por ahora | Sin licencia, coste desconocido y alto riesgo respectivamente |
| H28 | Jurisprudencia útil: TJUE C-762/19 *CV-Online Latvia* (2021), C-202/12 *Innoweb*, C-30/14 *Ryanair*; consultar en tiempo real el buscador de otro portal también es dudoso | Por verificar | Las tres sentencias las conozco y concuerdan; la aplicación a Horma, a una abogada |
| H29 | Preguntas para una abogada (6): licencias abiertas con descripciones completas, ATS sin permiso, permiso por correo o contrato, extensión y alertas, RGPD, documentar por qué no es alto riesgo | Encaja | Lista lista para llevar |
| H30 | Pasar de Vercel Hobby y Supabase Free antes de cobrar | Encaja | Hobby verificado (solo no comercial); hoy usamos localhost y PostgreSQL propio |

## I. De ideas a plan (siguiente paso)

1. Mar marca las ideas que le atraen, con prioridad.
2. La Copiloto las agrupa en **troncos** (base de Horma) y **ramas** (movibles de fase), marca qué necesita permiso del profesor y qué cuesta mantener.
3. Se combinan en un plan por bloques pequeños. Combinaciones candidatas: B1 + B2 + A1 (cobertura sin riesgo); C1 + C2 (calidad); A3 + A5 (empresas españolas).
4. Cada decisión se anota en `docs/propuesta-horma.md` y el estado en `docs/tareas-pendientes.md`.
