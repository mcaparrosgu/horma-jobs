# Prompt para otros LLM: cómo unir en un solo sitio las ofertas de terceros y de los portales de referencia (versión 1, 7-nov-2026)

Pensado para pegarlo tal cual en otros modelos (con búsqueda web y razonamiento profundo si lo tienen). Sin datos personales. Las respuestas se contrastan después: lo que digan es hipótesis hasta verificarlo en fuente primaria. Si traen ideas nuevas, entran en `docs/ideas-banco.md`.

---

## Rol

Actúa como un equipo experto a la vez: (1) arquitecta de datos y de producto que ha construido agregadores y metabuscadores de empleo, (2) abogada de derecho digital europeo y español (derecho sui generis sobre bases de datos, propiedad intelectual, condiciones de uso y contratos, RGPD, DSA, Reglamento de IA), (3) responsable de alianzas y de negocio con portales y ATS, (4) ingeniera de ingesta que sabe qué rompe y qué aguanta en producción, y (5) auditora que cita fuentes primarias. Piensa con amplitud y sé creativa: quiero que explores todas las vías, incluidas las incómodas, indirectas o parciales, y que me digas con honestidad cuánto riesgo tiene cada una.

## El problema

Construyo **Horma**, un metabuscador de empleo cuya razón de ser es que la persona **no tenga que ir de web en web ni de app en app**: todas las ofertas, en un solo sitio. **Reunir la mayor cantidad posible de ofertas, incluidas las de terceros y las de los portales de referencia (InfoJobs, LinkedIn, Indeed, Infoempleo, Tecnoempleo, Jooble, Adzuna, etc.), es la clave del producto.** Hoy el alcance es España; después, Europa.

Necesito **la mejor manera de lograrlo**: legal si es posible; y, donde no lo sea, la opción de riesgo menor y asumible, descrita con exactitud y con lo que haría falta para convertirla en segura. No me des un «no se puede» sin alternativa.

## Qué es Horma (contexto)

- Multiusuaria. La candidata sube su CV; Horma extrae su perfil, genera CV y carta adaptados a cada oferta sin inventar datos (cada afirmación se rastrea al CV), recomienda ofertas, y gestiona el seguimiento y el envío (la candidata aprueba; en LinkedIn e Indeed envía siempre la persona).
- Las empresas pueden publicar ofertas directamente en Horma. Horma **no** ordena ni filtra candidatas para empresas.
- Hoy: web en Next.js y PostgreSQL; ingesta con scripts propios y agentes de IA que procesan cada oferta; cada oferta lleva su licencia de origen, su atribución y un enlace a la original.
- Es el proyecto final de un bootcamp de AI Engineering y portfolio de su autora, con vocación de producto real (de pago por suscripción) si funciona.

## Lo que ya hemos medido (7-nov-2026, descargas reales)

Fuentes abiertas de servicios públicos de empleo: Feina Activa (Cataluña) 4.715 ofertas, CIDO (empleo público catalán) 1.615 con plazo abierto, Castilla y León ~787, Murcia 255, Andalucía (entidades instrumentales y libre designación) ~200, Lanbide (País Vasco) 628. En total ≈ 7.600–8.200 ofertas, **pero solo unas 100–170 son del sector informático y 15–25 de desarrollo, datos o IA**. Sin licencias exactas leídas todavía. Conclusión: el empleo público abierto da volumen generalista; **el volumen que importa está en los portales privados y en los ATS de las empresas.**

## Lo que creemos saber (sepáralo en tu respuesta entre «confirmado» y «no confirmado»)

Con grado de confianza variable; verifícalo tú:
- TJUE C-762/19 (CV-Online Latvia, 2021): un buscador especializado que copia e indexa un portal de empleo puede infringir el derecho sui generis si perjudica la inversión del creador. C-202/12 (Innoweb): reutilizar consultando en tiempo real el buscador de otra web puede serlo. C-30/14 (Ryanair): las condiciones de uso pueden limitar el uso aunque la base no esté protegida.
- Las condiciones de la API de InfoJobs prohibirían, según una fuente secundaria, «aplicaciones que sean agregadores de ofertas»; no hemos podido leer el texto primario. Adzuna exige licencia para productos con ingresos o leads, y no hemos podido confirmar que cubra España con clave gratuita. Jooble tiene programa de afiliados (CPC/CPA, API y feed XML) y su formulario pregunta si la plataforma muestra ofertas agregadas de terceros. Careerjet y Talent.com tienen programas de publisher cuyos términos no hemos leído.
- Los ATS (Greenhouse, Lever, Ashby, SmartRecruiters, Recruitee, Teamtailor, Workable, Personio) exponen endpoints públicos de lectura por empresa, pero ninguno autoriza expresamente a agregadores; el texto es del empleador.
- Los grandes agregadores crecen **recibiendo** feeds (empresas, ATS y portales los envían a cambio de tráfico o candidaturas), no extrayendo.
- Reglamento de IA: ayudar a la candidata a adaptar su CV y ordenar ofertas para ella, bajo su control, queda fuera de alto riesgo; filtrar o puntuar candidatas para empresas es alto riesgo (Anexo III.4).

## Lo que queremos explorar sin límites a priori

Propón, evalúa y ordena **cualquier vía** que se te ocurra, tengo especial interés en:

1. **Acuerdos y alianzas:** qué ofrecen y piden los portales de referencia a terceros (programas de partner, data licensing, white label, afiliación, co-marketing, intercambio de tráfico por feed); a quién escribir, con qué propuesta de valor, y qué hace que digan sí a un proyecto pequeño. Qué ha funcionado a agregadores nuevos.
2. **Arquitecturas del lado de Horma:** cómo estructurar la ingesta para minimizar el riesgo (adaptador por fuente, solo metadatos más enlace frente a copia completa, caché y retirada, derecho de cita y de enlace, enlaces profundos con la búsqueda ya rellenada, qué se puede mostrar y qué no). Dime qué distingue jurídicamente un «índice con enlace» de una «copia de la base de datos» y dónde se rompe esa distinción.
3. **Estándares y datos abiertos:** JobPosting/schema.org, Google for Jobs e Indexing API, sitemaps, Common Crawl y Web Data Commons, datos abiertos de servicios públicos, EURES, Euraxess, ESCO, Wikidata/BORME para listar empresas, convenios con bolsas de universidades, colegios profesionales y cámaras.
4. **Lado empresa:** cómo conseguir que las empresas y sus ATS nos envíen o autoricen sus ofertas (entrada en marketplaces de Factorial/Teamtailor/Recruitee y similares, especificación de feed entrante, etiqueta para que se identifiquen), y cuántas ofertas reales aporta cada canal en España.
5. **Marco jurídico a fondo:** qué dice la jurisprudencia europea y española posterior a 2021, la Directiva (UE) 2019/790 (minería de textos y datos, art. 3 y 4, con su reserva de derechos), la Directiva de datos abiertos (UE) 2019/1024 y la Ley 37/2007, el Reglamento de Datos, el DSA y el RGPD aplicados a ofertas con datos de reclutadores. Qué argumentos tendría un agregador pequeño y cuáles no resisten un litigio.
6. **Lo que no se nos ha ocurrido:** vías de otros países o sectores (marketplaces, comparadores de precios o de vuelos, buscadores de vivienda) que se pueden trasladar al empleo.

## Marcos que mantenemos, y que puedes cuestionar con argumentos

Salvo el marcado como firme, los tenemos como punto de partida, no como dogma. Si crees que alguno es innecesario o mal planteado, dilo y razona; si no, respétalos al proponer:
- **Firme (no lo propongas ni lo cuestiones):** la candidata **no** aporta ofertas, ni pegándolas, ni con enlaces, ni con extensión del navegador, ni reenviando alertas. Toda oferta entra por Horma.
- No saltarse captchas, logins ni bloqueos técnicos; respetar robots.txt y límites de velocidad.
- No inventar datos del CV; no analizar la voz; no ordenar candidatas para empresas.
- En LinkedIn e Indeed, la persona envía siempre.
- Cada oferta lleva licencia de origen, atribución y enlace a la original; retirada rápida si el titular lo pide.
- Cualquier cosa irreversible o con coste (licencias, contratos, servicios de pago) se decide antes de hacerla.

## Qué quiero que me devuelvas

1. **Resumen de una página:** tu recomendación principal y por qué.
2. **Tabla de vías**, una fila por vía: qué es · cómo funcionaría técnica y comercialmente · volumen estimado de ofertas de España con la razón de la cifra · esfuerzo · coste mensual y puntual · riesgo jurídico **verde / amarillo / rojo** con la norma o sentencia concreta · qué lo rompería · **qué haría falta para pasarlo de amarillo a verde** · primer paso concreto (con plazo y a quién escribir).
3. **Dos combinaciones:** «prudente» (todo verde) y «ambiciosa» (con amarillos señalados), con el volumen que cada una alcanzaría y lo que cuesta mantenerlas.
4. **Qué harías tú en las próximas dos semanas, sin dinero**, y qué en los próximos tres meses con un presupuesto pequeño.
5. **Lo que no sabes o no has podido verificar**, explícito.
6. **Preguntas que haría a una abogada** para decidir lo que quede dudoso, ordenadas por impacto.

## Reglas de honestidad (muy importantes)

- Cita **fuente primaria** (texto de la norma o sentencia, condiciones oficiales de uso, documentación del proveedor) con URL y fecha de consulta. Marca cada afirmación como ✔ verificada en fuente primaria, ◐ solo en terceros, ✖ no verificada. No inventes cifras, precios, límites de API ni cláusulas.
- Distingue **hecho**, **interpretación jurídica** y **opinión**. Si una vía es arriesgada, dilo claro y di qué probabilidad de problema tiene y de qué tipo (carta de cese, bloqueo, demanda, sanción).
- Si algo es el mejor camino aunque incomode, dilo. Si crees que nuestro planteamiento tiene un fallo, dilo y propón uno mejor.
- No me des relleno ni generalidades. Prefiero una respuesta larga y concreta a una breve y vaga.
