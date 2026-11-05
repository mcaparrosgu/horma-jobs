# Fuentes de ofertas de Horma: resultado de la calificación y propuesta (5-nov-2026)

Documento para comentar con el profesor. Resume qué pasó al calificar las primeras fuentes, qué opciones hay para que Horma sea un metabuscador sin depender de permisos lentos, y qué decisiones necesitamos de él. Lista completa de fuentes y su estado: `docs/fuentes-de-empleo.html`. Nada de esto es asesoramiento legal.

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
