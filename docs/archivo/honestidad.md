# Ideas · candidaturas honestas y transparentes

> Brainstorming del 29-oct-2026 (Copiloto + Mar). **Son ideas, no decisiones.** Nada se construye hasta el ok del profesor.
> Auditadas con `auditor-lineas-rojas` el mismo día. Lo decidido por Mar vive en `docs/propuesta-horma.md`, apartado 4.

## 1. Enfoque

Horma no puede comprobar la experiencia ni la formación de nadie. Lo que sí puede:

1. **Que Horma nunca mienta.** Ya está: cada frase del CV tiene origen rastreable.
2. **Que no amplifique lo que la usuaria no respalda.** Sin evidencia, la frase no se escribe y se pregunta.
3. **Que decir la verdad sea el camino fácil y el que conviene.** Aquí está la parte creativa.

Planteamiento: «ayudar a que lo que ella cuenta esté bien respaldado y bien contado», **no** «verificar a la usuaria». Lo segundo deriva en puntuar honestidad, que cruza una línea roja.

**Por qué mienten:** miedo a los huecos, a no tener el título, a parecer junior. Menos miedo, menos motivo. Cifras orientativas (vienen de empresas que venden verificación; HR Examiner las critica por inconsistentes): fechas alteradas 50 %, responsabilidades exageradas 32 % ([Avvanz](https://www.avvanz.com/blog/resume-fraud-2026-employer-prevention), [HR Examiner](https://www.hrexaminer.com/p/resume-fraud-is-real)).

**No usar:** firmar una declaración de honestidad al principio del formulario. El [estudio original está retractado](https://pmc.ncbi.nlm.nih.gov/articles/PMC7132248) y las réplicas no hallaron efecto.

## 2. Ideas y veredicto del auditor

Regla común: **privado para redactar = ok; señal calculada por Horma que llega a una empresa = rojo.**

| # | Idea | Veredicto | Condición |
|---|---|---|---|
| 1 | **Prueba del entrevistador:** antes de enviar, Horma plantea las preguntas que una reclutadora haría sobre cada logro | ✅ con condiciones | Opcional, no bloquea el envío, no guarda ni puntúa respuestas, sin nota visible a nadie. Si hay voz, solo el texto transcrito (ni tono ni seguridad) |
| 2 | **Escalera de evidencia:** lo dices tú / detalle en la entrevista / documento / tercero | ✅ con condiciones | Etiqueta interna, visible solo para la usuaria. Nunca sale al CV como etiqueta, nunca se suma en un índice de fiabilidad, nunca llega a empresas. «Lo dices tú» no justifica omitir un dato |
| 3 | **Referencia en 2 minutos:** una excompañera confirma una línea por enlace | 🔴 tal cual; ✅ si cambia | Voluntaria; la tercera ve qué se le pide y puede negarse sin consecuencia; solo se guarda «sí/no» y contacto mínimo, con borrado; en el CV, «referencia disponible», no sello; sin comentarios libres (art. 9). Pasar por `revisor-seguridad` |
| 4 | **Explicar huecos y traducir experiencia no formal** | ✅ con condiciones | Solo reformula hechos que ella dijo; no decide competencias por ella (con ESCO, idea 12, Horma propone y ella confirma, solo si el hecho lo respalda literalmente; «cuidó a su madre» ≠ «gestión de equipos»). No pregunta la causa del hueco (salud, embarazo…): «si quieres contarlo, lo redactamos». **La más valiosa** |
| 5 | **Retos de 3 minutos** de habilidades | 🔴 si guarda nota; ✅ como práctica | Reformular como **ejercicio de práctica privado**: sin puntuar, sin guardar resultado, avisando y pidiendo consentimiento antes (no vale «sorpresa»). No entra al CV salvo que ella lo redacte como logro |
| 6 | **Pasaporte de sellos** | 🔴 como está | Es una puntuación de hecho. Sin aportar nada distinto de la 2: **borrar** |
| 7 | **Preguntas de profundidad variable** en la entrevista | ✅ con condiciones | La profundidad depende de la complejidad del dato, no de la sospecha. Nunca se infiere sinceridad por lo dicho ni cómo se dice. Un dato sin detalle se pregunta; si no lo aporta, no se escribe |
| 8 | **Abogada del diablo** | ✅ con condiciones | Opcional, sobre el contenido del CV, sin juzgar a la persona, sin guardar. **Fusionar con la 1** |
| 9 | **Credenciales digitales oficiales** (Europass, cartera digital europea) | ✅ con condiciones | Importación voluntaria y mínima, una fuente más de la escalera; no tener credencial no penaliza. **Por verificar** si hay API o cartera usable por terceros. Coste alto: para después |
| 10 | **Sello «verificado» para empresas** | 🔴 | Ordena y filtra de facto (Anexo III.4) y Horma no puede verificar, así que sería afirmar algo falso. **Alternativa:** la candidata adjunta ella el documento original; Horma no emite ni evalúa nada |

### Descartadas desde el principio

- Detector de mentiras o análisis de voz: prohibido por el AI Act en el ámbito laboral y sin base científica.
- Puntuación o lista negra de «honestidad» compartida con empresas: Horma acabaría ordenando candidatas, con riesgo RGPD y de difamación.
- Cruzar el CV con LinkedIn por scraping: incumple condiciones de uso y RGPD.

### Orden de interés (propuesta)

1. Huecos y experiencia no formal (4): la que más honestidad produce quitando el miedo.
2. Prueba del entrevistador + abogada del diablo, fusionadas (1+8).
3. Escalera de evidencia privada (2) y profundidad variable (7), que ya encajan con la entrevista.
4. Después: referencia (3, rediseñada) y credenciales oficiales (9).

## 3. Pendiente

- Voz: solo consta «consentimiento explícito» en la propuesta. Decidir y documentar que se transcribe y solo se usa el texto (paso 4, legal).
- Verificar el estado real de Europass / EUDI antes de planificar la 9.
- Decidir si estas ideas entran en el MVP o quedan como mejoras futuras (con el profesor).

## 4. Prompt para el brainstorming (corregido tras la auditoría)

Pegar en una conversación nueva de Claude.

```
Eres una compañera de brainstorming para mí, Mar, creadora de Horma jobs. Combinas cuatro miradas: tecnóloga creativa, economista del comportamiento, diseñadora de producto y especialista en confianza y seguridad (trust & safety). Soy principiante en informática: define cada término técnico en una línea y ponle un ejemplo. Háblame en español, claro y cercano.

CONTEXTO
Horma jobs es un metabuscador europeo de empleo, multiusuaria. Entrevista por voz de hasta 20 min (solo preguntas sobre hechos), perfil, y un CV y carta nuevos para cada oferta, pensados para ATS. Las empresas solo ven lo que la candidata decide enviar.

EL PROBLEMA
Quiero que las candidaturas de mis usuarias sean honestas y transparentes. Horma no puede comprobar la experiencia ni la formación de nadie, y no debe intentarlo. El objetivo es AYUDAR a que lo que ella cuenta esté bien respaldado y bien contado, no verificar a la usuaria. Busco ideas originales para que la honestidad sea la opción natural, sin que Horma parezca una policía ni agobie.

CÓMO DEBE SER LA SOLUCIÓN
- Sutil, poco predecible y, si se puede, divertida.
- Ayuda a la usuaria (le conviene ser honesta); no la vigila.
- Opcional siempre que sea posible. Nada de acusar ni de «detectar mentirosas».

LÍNEAS ROJAS (filtro de entrada: si una idea cruza una, se descarta; no se compensa con diversión)
- Ningún dato inventado ni exagerado: cada frase del CV y la carta es rastreable a algo que dijo la usuaria. Si falta un dato, se pregunta; si no lo aporta, no se escribe.
- Nunca se analiza la voz, ni emociones, ni mentiras (AI Act). Solo el contenido; si hay voz, solo se usa el texto transcrito. No se infiere sinceridad por lo que se dice ni cómo se dice.
- Sin puntuar personalidad ni preguntar categorías especiales (RGPD art. 9: salud, religión, política, embarazo, discapacidad…).
- Horma nunca ordena, puntúa ni filtra candidatas para empresas. NINGUNA señal calculada por Horma sobre una persona llega a una empresa; solo lo que la candidata envía. Nada de sellos, niveles, listas negras ni «puntuación de honestidad».
- El perfil humano solo aparece en el CV si la usuaria lo activa (apagado por defecto) y como evidencias redactadas como logros, nunca etiquetas ni notas.
- Envío de candidaturas: por defecto la usuaria aprueba y el agente envía; autónomo solo si ella lo configura y donde esté permitido (nunca LinkedIn ni Indeed). Ninguna idea debe bloquear ese flujo.
- Datos personales: mínimo necesario, con consentimiento, nunca en logs, ejemplos, tests ni mensajes de commit. Los datos de prueba son inventados. Si una idea implica datos de terceras personas, dilo.
- Nada de scraping de sitios que lo prohíban.

YA HEMOS PENSADO EN (no repitas; mejora o combina)
Ayudar a explicar huecos y traducir experiencia no formal sin inferir competencias; prueba del entrevistador / abogada del diablo (opcional, sin guardar ni puntuar); escalera de evidencia privada (solo para redactar); preguntas de profundidad variable según la complejidad del dato; referencia de una excompañera con consentimiento; ejercicios de práctica privados; credenciales digitales oficiales.
Descartado: firmar una declaración al principio (el estudio original está retractado; no lo cites como prueba), sellos «verificados» para empresas, pasaporte de sellos, detector de mentiras.

MÉTODO
1. Ronda 1: 10-12 ideas, 4 de ellas disparatadas. Inspírate en otros campos: videojuegos, bancos, Wikipedia, Duolingo, Airbnb, Strava, ciencia ciudadana, magia, teatro de improvisación.
2. Agrúpalas en 3-4 familias.
3. Pasa cada idea por las líneas rojas (descarta las que crucen) y señala si toca el AI Act o el RGPD. Después puntúa 0-3: ¿ayuda a la usuaria?, ¿es simple de construir?, ¿es divertida?, ¿se puede hacer trampa?
4. Elige 3 finalistas: cómo la vería la usuaria, cómo se construiría a grandes rasgos y cómo podría salir mal.

REGLAS DEL JUEGO
- Dime con franqueza si una idea mía es mala y propón una mejor.
- Marca cada afirmación legal o técnica como «lo sé» o «lo supongo». Si dudas de un dato, dilo.
- Una ronda cada vez. Cierra con 2 o 3 preguntas para que yo elija.
```

## 5. Ideas elegidas por Mar (2.ª ronda, 29-oct-2026)

> Auditadas con `auditor-lineas-rojas` el 29-oct-2026: **ninguna en rojo; todas ✅ con condiciones.** `revisor-seguridad` revisó la 17 el mismo día: **apto con cambios** (ver «Informe de seguridad de la 17»). **Mar la deja anotada, sin más trabajo por ahora.** Siguen siendo ideas, no decisiones.
> Mar descartó en esta ronda: «ensayo general con marcas ámbar» y «diario de logros con capital de evidencia».

| # | Idea | Qué hace | Condición para no cruzar líneas rojas |
|---|---|---|---|
| 11 | **Simulacro con abogada del diablo que ayuda a mejorar** (mejora la 1+8) | Simula la entrevista y, si una respuesta sale floja, ayuda a reforzarla | ✅ con condiciones. Reforzar = sacar más hechos de ella (qué, cuándo, cuánto, resultado); nunca inventar ni redondear. Opcional, sin guardar ni puntuar; «floja» es una sugerencia sobre el texto, no una nota. Con voz, solo la transcripción. **Pasa a 🔴 si** compara sesiones, mide mejoría, detecta «dudas» o «titubeos», o mide tiempos de respuesta |
| 12 | **Equivalencias ESCO** | Traduce experiencia no formal a competencias con nombre estándar (ESCO = catálogo oficial de la UE) | ✅ con condiciones. Horma propone y ella confirma una a una, solo si el hecho que dijo lo respalda **literalmente** (verbo, cantidad, resultado), sin saltos de nivel. El término ESCO va dentro de una frase-logro con el hecho al lado, nunca como etiqueta. Por verificar: licencia y API de ESCO, y si hay español |
| 13 | **Traductor de logros cotidianos**, con **elección forzada** (preguntas de dos opciones en que las dos respuestas son honestas) | Saca los logros del día a día que pasan desapercibidos. Horma guarda el hecho tal cual; en CV y carta se **redacta como hecho** y la cualidad (constancia, determinación…) se lee en él. La palabra suelta solo entraría si la propone ella con sus palabras | ✅ solo si se aplican los puntos 1, 2 y 4 del aviso ⚠. Ejemplos y preguntas de dos opciones sin carga de salud ni de situación familiar. Frase aprobada por ella antes de entrar al CV |
| 14 | **Valor marginal** | Muestra cuánto sube la compatibilidad con la oferta cada logro **real** que ella ya contó | Solo para ella. Es el rango de compatibilidad que ya existe, sin simular «si añadieras X» |
| 15 | **Historial de revisiones** | Versiones de su CV y perfil; ve cómo evolucionó y puede volver atrás | ✅ con condiciones. Solo para ella, número mínimo de versiones, **borrado total** (también en versiones antiguas, donde puede quedar texto que quiso quitar). **Pasa a 🔴 si** algo analiza, cuenta o resume los cambios («borró un dato», «cambió una cifra»). Por decidir: ¿es el mismo sistema que el registro de correcciones del perfil humano (RGPD art. 16, propuesta línea 92)? Mejor uno solo |
| 16 | **Espejo** | Al acabar la entrevista, resumen de 3 frases que ella corrige | Solo contiene lo que dijo; su corrección manda |
| 17 | **Confesionario efímero** | Cuenta lo que no se atreve a poner (hueco, despido, título sin acabar) y Horma le devuelve cómo contarlo con verdad | ✅ con condiciones estrictas; **no construir sin informe de `revisor-seguridad`.** (1) Aviso específico antes de empezar, con texto aprobado, que cubra todo el art. 9. (2) Texto original sin guardar en ningún sitio (logs, trazas de n8n, historial de la 15). (3) Proveedor de IA sin entrenamiento con sus datos y retención mínima, comprobado. (4) Devuelve solo cómo contar un hecho; lo que ella use pasa como hecho y el resto se borra de verdad. (5) Filtro de términos del art. 9. (6) Nada de terceras personas guardado. (7) Nunca obligatorio ni condiciona nada. Alternativa barata: modo de la pantalla «explicar huecos» (idea 4) |

### ⚠ Puntos por decidir (Mar)

1. **Peso = dato de salud (RGPD art. 9).** Aunque lo cuente ella, guardarlo exige consentimiento explícito y trato de dato especial. Recomendación de la Copiloto: ejemplos no sanitarios («preparé una oposición», «aprendí inglés sola», «corrí 10 km»); si ella menciona peso o salud, Horma no lo pregunta; un **filtro de entrada** detecta esos términos, no los guarda por defecto, le avisa y le deja elegir (sin filtro, el dato ya habría pasado por la transcripción y el proveedor de IA antes del aviso); al CV iría sin el dato de salud («mantuve un plan de entrenamiento 8 meses»).
2. **Cualidad en el CV.** La decisión del 27-oct dice «evidencias redactadas como logros, nunca etiquetas». Para respetarla, la frase lleva el hecho y la cualidad se lee en él («Mantuve un plan durante 8 meses» mejor que «Constancia»). Decidir si se admite la palabra explícita.
3. **Confesionario.** Ampliar el aviso a todo el art. 9 (también política, sindicato, orientación sexual, origen, discapacidad, embarazo). Y «efímero» debe ser verdad de punta a punta: si el texto pasa por un proveedor de IA, sale de Horma; revisar retención y uso para entrenar (`revisor-seguridad`).
4. **Frase de la 13 aprobada por ella** antes de entrar al CV; Horma nunca la añade sola.

### Informe de seguridad de la 17 (`revisor-seguridad`, 29-oct-2026)

**Veredicto: apto con cambios.** Las 7 condiciones no bastan tal como están. Todo lo que dice sobre proveedores es suposición: no se ha verificado ninguna condición real.

| Gravedad | Hallazgo | Corrección y coste |
|---|---|---|
| Alta | «Efímero» no es verdad hoy: faltan transcripción, copias de seguridad, caché, informes de errores y ejecuciones guardadas de n8n | Decir «no se guarda por diseño» y listar cada sitio por el que pasa el texto. Texto solo en memoria, endpoint sin log del cuerpo, sin n8n (FastAPI llama al modelo), sin caché. Bajo si se decide antes de construir |
| Alta | Proveedor de IA: falta comprobar retención, entrenamiento, subencargados, región UE y DPA (acuerdo de tratamiento de datos). El de voz es otro proveedor | Documentarlo por escrito antes de construir. Sin retención cero o sin DPA: no se activa, o se usa la alternativa barata. Horas de lectura legal; posible plan empresarial (no verificado) |
| Alta | El filtro del art. 9 actúa tarde y se esquiva con rodeos («llevo la kipá y me lo notaron») | Es una ayuda, no una garantía, y el aviso lo dice. Si duda, no continúa y le deja elegir. Pruebas con frases inventadas. Bajo |
| Alta | Con voz, el texto sale al proveedor antes de poder filtrarlo | **Solo texto escrito** en el confesionario. Bajo, y reduce mucho el riesgo |
| Media | «Se borra de verdad» no es comprobable (copias, versiones de la 15) | Guardar solo el hecho aprobado; nunca escribe en el historial de la 15; decir en el aviso el plazo real de las copias |
| Media | Terceras personas (jefe, pareja, hijo) | Pedirle que quite nombres y revisar el texto en pantalla antes de guardar |
| Media | Prompt injection e inferencias del modelo («probablemente por maternidad») | Modelo sin herramientas ni escritura, salida validada, aprobada frase a frase, y con prohibición de inferir |
| Media | Faltan base legal y texto del aviso | Consentimiento explícito (art. 9.2.a) con casilla propia sin premarcar, retirable y no ligada al resto de Horma. Revisión legal en el paso 4 |

**Cambios mínimos para pasar a «apto para construir»:** solo texto escrito; FastAPI directo sin n8n ni logs ni caché; proveedor verificado por escrito; filtro previo que avisa y deja elegir; nunca escribe en el historial de la 15; aviso redactado con consentimiento propio; salida validada y aprobada frase a frase.

**Recomendación del revisor:** empezar por «explicar huecos» (idea 4) con campos guiados en el MVP, y dejar el confesionario de texto libre para una fase posterior. Pierde la conversación abierta, que es lo que da valor al confesionario.

**Por decidir (Mar), cuando se retome:** ¿solo texto escrito, sin voz? ¿«Modo de huecos» en el MVP o confesionario en fase posterior? (Hoy: anotada, sin decidir.)

### Pendiente

- Verificar en el paso 4 (legal): peso como dato de salud, retención del proveedor.
- Decidir si el historial (15) y el registro del art. 16 son un solo sistema.
- Verificar ESCO (licencia, API, idiomas).
- Redactar el texto exacto del aviso del confesionario.
- Decidir con el profesor cuáles entran en el MVP.

## 6. Idea de Mar (29-oct-2026, 3.ª ronda)

> **Idea, no decisión.** Auditada con `auditor-lineas-rojas` el 29-oct-2026: **🟡, sin rojo.** Condiciones añadidas por el auditor: (a) en modo autónomo solo se adjunta si ella la marcó como «adjuntar siempre»; (b) llamarla «cómo trabajo mejor» y que la IA solo redacte condiciones y hechos; un rasgo que ella escriba se convierte en evidencia o se descarta; (c) consentimiento específico y borrado (RGPD).

| # | Idea | Qué hace | Condición para no cruzar líneas rojas |
|---|---|---|---|
| 18 | **Carta «cómo trabajo»** | Documento aparte (o carta única) donde la candidata cuenta cómo es como trabajadora, además de la carta de cada oferta | 🟡 Encaja con la decisión del 27-oct si: (1) opcional y apagada por defecto; (2) hechos y logros suyos y condiciones de trabajo («trabajo mejor con objetivos claros»), **nunca rasgos de personalidad** ni puntuaciones; (3) cada frase rastreable a lo que ella dijo en la entrevista o el perfil, y aprobada por ella; (4) la envía ella, Horma no la manda ni la destaca a empresas. **Pasa a 🔴 si** Horma deduce rasgos de su voz o su texto, o la compara con otras candidatas |

**Por qué conviene:** da un sitio a lo que no cabe en un CV y reduce el miedo a «no encajar en el papel». **Por decidir:** ¿documento fijo que se adjunta cuando ella quiera, o párrafo que la agente redactora adapta a cada oferta?
