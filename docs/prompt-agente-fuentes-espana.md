# Prompt para un agente externo: cómo conseguir ofertas de empleo en España (versión 2)

Pensado para pegarlo tal cual en un agente de IA con búsqueda web y razonamiento profundo. Sin datos personales. La versión 2 incorpora la respuesta de un tercer asistente (6-nov): sus afirmaciones aparecen como hipótesis a verificar, no como hechos. Si el agente devuelve ideas nuevas, se añaden a `docs/ideas-banco.md`.

---

## Rol

Actúa como un equipo de cuatro personas expertas a la vez: (1) arquitecta de datos y producto de agregadores de empleo, (2) abogada especialista en derecho digital europeo y español (derecho sui generis sobre bases de datos, propiedad intelectual, RGPD, condiciones de uso, Reglamento de IA), (3) responsable de alianzas con portales de empleo y (4) auditora que verifica en la fuente primaria. Piensa despacio, contrasta y no des nada por cierto si no lo has verificado tú.

## El problema

Estoy construyendo **Horma**, un metabuscador de empleo cuya razón de ser es que la persona no tenga que ir de web en web ni de app en app: todas las ofertas llegan a un solo sitio. Cuantas más fuentes **legales y fiables**, más nos diferenciamos. **Por ahora el alcance es solo España** (con Cataluña como zona de interés; ampliaremos a Europa más adelante).

El cuello de botella es el **volumen de ofertas de España que podemos obtener sin saltarnos ninguna norma**, con un coste de mantenimiento bajo. Quiero la mejor estrategia posible, con pruebas, y una opinión honesta sobre qué es viable y qué no.

## Qué es Horma (contexto)

- Multiusuaria. La candidata sube su CV; Horma extrae su perfil, genera CV y carta adaptados a cada oferta sin inventar datos (cada afirmación se rastrea al CV) y gestiona el seguimiento. La candidata aprueba antes de cualquier envío. Las empresas pueden publicar ofertas en un portal propio, pero **no ven ni ordenan candidatas** (decisión deliberada: sería un sistema de alto riesgo según el Reglamento de IA, Anexo III.4).
- Stack actual: web Next.js (TypeScript) + PostgreSQL, ya con login, exportar y borrar datos (RGPD); ingesta con scripts propios en Python; agentes de IA que procesan las ofertas fuera de la web con esquemas JSON cerrados. El emparejamiento actual usa una taxonomía propia (sector, familia de puesto, nivel, stack) y un agente que puntúa y explica; no usa vectores. Hoy la web no lleva ningún modelo de lenguaje dentro; **si una solución lo requiere de verdad, se puede estudiar**, pero hay que justificarlo, y la decisión final es del profesor del bootcamp.
- Presupuesto inicial casi nulo; las suscripciones de las usuarias pagarán los costes cuando existan. Cada pieza nueva se paga durante años: prefiero pocas fuentes bien integradas a muchas que se rompen.
- Es un proyecto final de bootcamp y a la vez un producto que aspira a existir de verdad, así que el cumplimiento legal importa desde el principio.

## Líneas rojas (no negociables)

1. Nada de saltarse bloqueos técnicos ni condiciones de uso: sin rotar IP, sin evadir antibots o CAPTCHA, sin cuentas ajenas, sin extracción sistemática no autorizada.
2. Nunca LinkedIn ni Indeed como fuente de extracción (en ellos, la persona envía la candidatura). Si propones un acuerdo comercial con ellos, dilo aparte, como hipótesis a largo plazo.
3. RGPD: las ofertas pueden contener nombres y contactos de reclutadores; no se guardan datos personales de terceros innecesarios.
4. Cada oferta guarda su **licencia de origen** y su atribución; si no hay base legal clara, no entra.
5. Nada de datos inventados: si no sabes algo, dilo.
6. El producto ayuda a la candidata; no puntúa, filtra ni ordena candidatas para empresas.

## Lo que ya hemos averiguado (no lo repitas; contradícelo solo con pruebas nuevas)

Calificamos 12 fuentes leyendo sus condiciones de uso y `robots.txt`:
- **Aptas con condiciones:** BOE (datos abiertos; reutilización permitida con atribución y enlace; solo convocatorias de empleo público; ya integrado) y JobTech Suecia (CC0, fuera de alcance).
- **No aptas por uso personal/no comercial o acuerdo escrito:** Arbeitnow, Adzuna, The Hub.
- **No aptas porque prohíben bots o distribuir a terceros:** Jooble, Lever.
- **No claro (sin permiso expreso o condiciones que no pudimos leer):** EURES, InfoJobs, Personio.
- **Greenhouse:** API pública, nada la prohíbe, pero tampoco hay autorización expresa; el texto es de cada empresa.
- **Careerjet:** programa para mostrar sus ofertas; los términos están dentro de la cuenta de publicador (aún no la abrimos).
- Remotive, Himalayas y We Work Remotely prohíben, según terceros, pasar sus ofertas a otros agregadores.
- Los ATS españoles para pymes (Bizneo, Factorial, Sesame HR, Talent Clue, Hiring Room) publican hacia InfoJobs, Indeed y LinkedIn; no hemos encontrado API pública de lectura.
- Scraping y Apify: aparcados, pendientes de decisión con el profesor.

## Hipótesis de un tercer asistente: verifícalas o refútalas con fuente primaria

Marca cada una como ✔ cierta, ✖ falsa o ◐ matizable, con enlace y fecha:

1. **InfoJobs** tiene un programa oficial para desarrolladores (developer.infojobs.net) con credenciales por aplicación. ¿Qué dicen exactamente sus condiciones sobre agregar, almacenar, mostrar ofertas y enlazar de vuelta? ¿Permite un metabuscador?
2. **Feina Activa** (Servei d'Ocupació de Catalunya) publica un feed XML de ofertas en el catálogo de datos abiertos de la Generalitat (datos.gob.es / analisi.transparenciacatalunya.cat), actualizado a diario. ¿Qué licencia tiene? ¿Se pueden reutilizar las ofertas con fines comerciales? ¿Cuántas ofertas contiene?
3. **Adzuna** exige un acuerdo de licencia para uso comercial; **Jooble** limita a 500 peticiones de por vida por clave en el plan gratuito. ¿Es exacto? ¿Cubre Adzuna a España?
4. **Greenhouse, Lever, Ashby y SmartRecruiters** exponen ofertas publicadas sin credenciales; **Workable, Teamtailor y Recruitee** requieren credenciales de cada empresa. (Nuestra investigación anterior, basada en terceros, decía lo contrario para algunos.) ¿Cuál es la verdad, con la documentación oficial de cada uno? ¿Qué dicen sus condiciones sobre uso por terceros agregadores?
5. **ESCO** (clasificación europea de ocupaciones y competencias, con API y 28 idiomas) sirve para normalizar profesiones y competencias. ¿Qué licencia tiene, permite uso comercial, y cómo se compara con nuestra taxonomía propia? ¿Merece la pena mapear a ESCO?
6. **`robots.txt` no es una autorización legal**, y la **extracción sistemática de partes sustanciales de una base de datos** puede vulnerar el derecho sui generis aunque la página sea pública. Dime qué dice la ley y la jurisprudencia aplicable y dónde acaba lo seguro y empieza lo dudoso.
7. **Datos estructurados `JobPosting` y sitemaps** de webs de empleo de empresas: ¿es legal y razonable usarlos como fuente? ¿Qué condiciones habría que cumplir (permiso de la empresa, `robots.txt`, términos)?
8. **Tarifas de infraestructura:** Vercel Hobby es solo para uso no comercial; Cloudflare Workers gratuito tiene límites de CPU y subpeticiones; Supabase gratuito pausa proyectos inactivos; la edición Community de n8n no permite ofrecerlo como servicio. Confirma las condiciones vigentes y di qué alternativa legal y barata recomiendas para un producto con suscripciones.
9. **Reglamento de IA:** confirma que los sistemas de selección de personal y análisis de candidaturas para empleadores son de alto riesgo, y que un buscador que solo ayuda a la candidata se mantiene fuera de esa categoría. Matiza si la función «adaptar CV y enviar candidatura automáticamente» cambia algo.

## Qué quiero que investigues y resuelvas

1. **Mapa completo de fuentes españolas legalmente utilizables**, más allá de lo que ya tenemos: servicios públicos de empleo estatal y autonómicos (Feina Activa y equivalentes de otras comunidades), boletines oficiales (BOE, BOCM, BOJA, DOGC, DOG, BOPV y provinciales), empleo público local y universitario, datos abiertos (datos.gob.es y portales autonómicos), programas de socios o afiliados de portales, ATS y plataformas con feeds públicos, portales sectoriales con permiso (Tecnoempleo, Turijobs, Hosco, Welcome to the Jungle, Wellfound, Malt, Domestika Jobs), colegios profesionales, cámaras de comercio y agencias de colocación. Para cada una rellena esta **ficha de fuente**: URL; método de acceso; condiciones de uso exactas con cita; licencia; límites de peticiones; frecuencia de actualización; política de almacenamiento permitida; volumen aproximado de ofertas de España; coste; mantenimiento; riesgo; siguiente paso.
2. **Análisis jurídico honesto del modelo «metabuscador»** en España y la UE: derecho sui generis (Directiva 96/9/CE y texto refundido de la Ley de Propiedad Intelectual), jurisprudencia relevante (por ejemplo TJUE C-30/14 *Ryanair* y la más reciente sobre scraping y agregación), reutilización de información del sector público (Ley 37/2007), diferencia entre mostrar un fragmento con enlace y copiar la oferta completa, y RGPD respecto a datos de reclutadores. Distingue lo que es **ley o sentencia verificada** de lo que es **interpretación tuya**, y marca qué debería revisar una abogada antes de tener usuarias reales.
3. **Cómo lo hacen otros** agregadores y buscadores que operan en España y Europa (Google for Jobs, Jooble, Jobrapido, Talent.com, Adzuna, Careerjet, Welcome to the Jungle): de dónde obtienen las ofertas, bajo qué acuerdos, y qué podemos copiar de su modelo legalmente.
4. **Descubrimiento de empresas como fuente.** Un asistente propone «empezar buscando empresas, no ofertas»: construir una base de empresas españolas, detectar qué ATS usan y descubrir sus bolsas de empleo. Evalúa si es viable y legal en España, cómo se construiría la lista inicial (registros públicos, directorios, datos abiertos), cuántas empresas españolas usan ATS con feed público, y cuántas ofertas aportaría de forma realista.
5. **Estrategia de alianzas:** a quién escribir primero, con qué propuesta de valor (tráfico, atribución, enlace de vuelta, candidatura en su web) y un **borrador de correo** reutilizable para pedir permiso o programa de socios, en tono sobrio y sin promesas que no podamos cumplir.
6. **Alternativas de producto si el volumen legal es limitado:** ofertas publicadas por empresas en nuestro portal, ofertas aportadas por la usuaria (enlace, texto, marcador del navegador, alertas reenviadas), enlaces profundos «buscar también en…» hacia portales que no indexamos. Para cada una, volumen realista que cabe esperar y riesgos.
7. **Calidad de los datos:** diseño de deduplicación entre portales (identificador y URL canónica, huella de empresa + título + ubicación + descripción, y comparación semántica solo para casos dudosos) y de un verificador de ofertas caducadas o fantasma. Prefiero reglas deterministas; dime dónde un modelo de lenguaje aportaría de verdad y dónde sobraría. Incluye el riesgo de inyección de instrucciones en textos externos y cómo mitigarlo.
8. **Emparejamiento:** nuestro enfoque actual es taxonomía + reglas + un agente que explica. Otros proponen embeddings multilingües, pgvector y un ranking sobre 100 puntos con «potencial de encaje» y «búsqueda inversa de carrera» (qué otros puestos encajan con tu experiencia). Dime qué de eso merece la pena, qué cuesta y qué riesgo de honestidad o sesgo introduce (nunca usar atributos como sexo, edad, religión o salud).
9. **Un plan combinado por fases** (de la opción más segura a la más arriesgada), con troncos (imprescindibles) y ramas (prescindibles), coste y mantenimiento de cada pieza, y **criterios para decidir** cuándo pasar a la siguiente fase. Incluye una estimación de ofertas de España accesibles legalmente al final de cada fase.
10. **Ideas que yo no he pedido pero que cambiarían el juego.** Propón al menos cinco, razonadas, y di cuáles descartarías tú misma y por qué.

## Cómo quiero la respuesta

- En español, sin relleno. Empieza por un **resumen ejecutivo de 10 líneas máximo** con tu recomendación principal y el volumen realista de ofertas que se puede esperar.
- Después, secciones numeradas como arriba. Usa **tablas** para las fuentes con las columnas de la ficha.
- **Cada afirmación factual lleva su enlace y la fecha en que lo consultaste.** Marca cada dato como: ✔ verificado en la fuente oficial · ◐ verificado solo en terceros · ✖ no he podido verificarlo. No rellenes huecos con suposiciones: di «no lo sé».
- Si una de nuestras líneas rojas o decisiones te parece errónea, **dímelo con argumentos y alternativa**, en una sección aparte llamada «Discrepancias». Prefiero que me contradigas con pruebas a que me des la razón.
- Termina con tres listas: **lo que haría esta semana**, **lo que preguntaría a una abogada** y **lo que no pude averiguar**.
