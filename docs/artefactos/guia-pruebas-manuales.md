# Guía de pruebas a mano de Horma

**Versión con casillas para el navegador:** https://claude.ai/artifact/AeDdEVZyd7y4xi4mHe7nYY (si cambias esta guía, hay que actualizar también `docs/artefactos/pruebas-horma.html`).

Para Mar. Sirve para comprobar tú misma que Horma funciona, sin saber programar. El profesor pidió probar y pasar los tests a mano. **Todo con datos inventados** (Ana, Rosa, Leo). Nunca pruebes con un CV real tuyo ni de nadie: los datos personales no van a logs ni a git.

Cómo usarla: sigue los pasos en orden; en cada uno compara con **Debe pasar**. Si no coincide, anótalo en la tabla del final y avisa a la Copiloto.

Términos: **terminal** = ventana donde se escriben órdenes; **test** = comprobación automática que dice «bien» o «mal»; **navegador** = Chrome o Edge.

## 0. Preparar (una vez por sesión)

0. Solo la primera vez tras el bloque 8: `web/.env` debe tener **dos** contraseñas, `HORMA_DB_PASSWORD` y `HORMA_WEB_PASSWORD` (la de la web, distinta, de 16 o más caracteres; ya está creada en tu `.env`, no la abras ni la copies).
1. Abre Docker Desktop y espera a que diga «running».
2. Terminal en `C:\AI Engineering\Bootcamp\Horma jobs\web` y escribe:
   ```
   docker compose up -d
   npm run migrar
   npm run importar
   npm run dev
   ```
3. Abre en el navegador `http://127.0.0.1:3000`.

**Debe pasar:** `docker compose` termina sin error; `migrar` dice que las migraciones están aplicadas; `importar` cuenta ofertas y perfiles (y avisa de que **Rosa se salta** porque aún no tiene perfil: es normal); la web abre y te lleva a `/ofertas`.
**Si falla:** «no se puede conectar» → Docker no está abierto. «puerto ocupado» → ya hay una web abierta; ciérrala.

## 1. Tests automáticos (2 minutos)

En otra terminal:

| Qué | Orden (carpeta) | Debe pasar |
|---|---|---|
| Tests de la web | `npm test` (en `web`) | Todas en verde; hoy son **85**. |
| Tipos y estilo | `npx tsc --noEmit` y `npm run lint` (en `web`) | Sin errores. |
| Tests de los agentes (sin IA de pago) | `python -I evals/correr_evals.py` (en la raíz) | **36** en verde. |

Un test en rojo no es una catástrofe: es el aviso de que algo se rompió. Copia el mensaje completo.

## 2. La web a mano

### 2.1 Ofertas (`/ofertas`)
1. Debe verse la lista con las ofertas de prueba (hoy 2).
2. Usa cada filtro. **Debe pasar:** la lista cambia o queda vacía con un aviso, nunca una pantalla de error.
3. Cada oferta muestra su auditoría: fantasma, fraude, empresa validada, sueldo publicado. **Debe pasar:** la oferta 2 sale marcada como posible fraude.
4. Escribe en un filtro `<b>hola</b>` o `'; DROP TABLE ofertas;--`. **Debe pasar:** se muestra como texto raro o no encuentra nada; la página sigue funcionando y las ofertas siguen ahí.

### 2.2 Fuentes (`/fuentes`)
1. Crea una fuente de prueba con nombre `Prueba`, URL `https://example.com/api` y clave `FUENTE_PRUEBA`. **Debe pasar:** se guarda y aparece en la tabla.
2. Rechazos, cada uno **debe dar un error claro y no guardar**:
   - URL `http://localhost/x` o `https://192.168.1.5/x` (dirección interna).
   - URL con `http://` en vez de `https://`.
   - Clave con otro nombre, por ejemplo `DATABASE_URL` o `miclave`.
   - Pegar una clave de verdad (algo largo tipo `sk-abc123…`) en cualquier campo.
3. **Debe pasar:** el mensaje de error nunca repite lo que pegaste.

### 2.3 Ejecuciones (`/ejecuciones`)
**Debe pasar:** una fila por cada importación que hayas lanzado (`npm run importar`), con números; ningún nombre ni texto de CV.

### 2.4 Candidatas (`/candidatos`)
1. Abre a Ana. **Debe pasar:** cada dato (cargo, empresa, fecha) tiene su «de dónde sale»; la clasificación aparece rotulada «sugerida por Horma».
2. Abre el CV original (desplegable). **Debe pasar:** sale como texto plano.
3. Guarda preferencias válidas. **Debe pasar:** mensaje de éxito y los valores se conservan al recargar.
4. Prueba un rango inválido (mínimo 90, máximo 10) y un país `XYZ`. **Debe pasar:** error claro y lo que escribiste **no se borra**.
5. Cambia la dirección a `/candidatos/no-existe`. **Debe pasar:** página «no encontrado», no un error técnico.
6. Mira todos los campos del formulario. **Debe pasar:** no hay ninguno de edad, nacionalidad, salud, religión, etc.

## 2 bis. Ofertas reales de JobTech (bloque 2)

**Antes:** desde el bloque 8, `datos/ofertas/raw/` está **vacía a propósito** (llevaba nombres de reclutadores). Los pasos que abren `raw/` o comparan con él (2 bis.2 y 2 quater.3) necesitan una descarga nueva: `python -I .claude/skills/fuentes-ofertas/scripts/ingestar.py "JobTech Suecia (Platsbanken)" --limite 20`. Al terminar, borra otra vez `raw/` (cuando `npm run verificar` esté en verde).

1. Con `horma-db` arrancada, desde `web/`: `npm run importar -- --ofertas ../datos/ofertas/procesadas`. Debe terminar con **0 rechazados** (23 archivos; los que ya estaban salen «sin cambios»). Repetirlo no cambia el total.
2. Abre una oferta de `datos/ofertas/procesadas/` y su original en `raw/`: comprueba que **no hay emails ni teléfonos** (aparece `[contacto omitido]`) y que el país, el nivel y las tecnologías están en el texto original.
3. Abre `datos/ofertas/procesadas/` las ofertas de Saab (`...31634221...`, `...31672635...`), Ida Infront (`...31648023...`) y Epical (`...31679417...`): la ciudadanía, la habilitación de seguridad y el permiso de trabajo están en el campo `avisos`, no en `requisitos`.
4. Atadura de claves: `python -I evals/ingesta/test_ingestar.py` debe terminar en `OK` (ahora 69 pruebas), incluidas «cambiar la url no desvía la clave» y «nombres repetidos». No hace falta probarlo a mano: no hay ninguna fuente con clave todavía.

## 2 ter. Lo descargado = lo guardado (bloque 3)

1. Desde `web/`: `npm run verificar`. Debe terminar con **«RESULTADO: todo cuadra»**: 23 coinciden y 2 filas de prueba esperadas (`of-prueba-*`). Solo lee: no cambia nada.
2. Prueba que de verdad avisa: abre un archivo de `datos/ofertas/procesadas/`, cambia el `titulo` y guarda; vuelve a lanzar `npm run verificar`. Debe decir **FALLO** con el id de esa oferta y el campo `titulo` (sin enseñar el texto), y terminar con «no cuadra». Deshaz el cambio (`git` no lo sigue: vuelve a escribir el título original a mano) y comprueba que vuelve a cuadrar.
3. Ingesta repetible: tras `ingestar.py`, la respuesta lleva `pendientes`: debe ser una lista **vacía** si ya procesaste esas ofertas. `/ingestar-ofertas` solo gasta agentes en las pendientes.

## 2 decies. Candidatura de punta a punta (construcción optimizada, bloque 3)

1. Con la web arrancada, abre `http://127.0.0.1:3000/candidaturas/mar`. **Debe pasar:** una candidatura a «AI-first developer» en estado «borrador: falta que tú la revises y apruebes», cobertura ATS 60 % y la lista desplegada de «Lo que la oferta pide y tu CV no recoge» (7 puntos: sueco, Cursor/Codex, años de desarrollo…).
2. Despliega «CV adaptado» y «Carta»: lee cada frase y comprueba que **todo es tuyo y cierto** (nada de React, Cloudflare, Cursor, sueco). Esta prueba solo la puedes hacer tú.
3. (Cambiado en el bloque 4) Aprobar se hace en la web; mira la sección 12 más abajo. `/aprobar` y `/marcar-enviada` en Claude Code ya no escriben nada.
4. Línea roja: copia `estado.json` de la candidatura, cámbialo a `"estado": "aprobada"` dejando `"por": "agente"`, y lanza `npm run importar -- --dir ../datos`. **Debe decir RECHAZADO** («una aprobación no la hizo la usuaria»). Restaura el archivo.
5. Repetible: lanza el importador dos veces; en la base debe haber 1 sola candidatura (`select count(*) from candidaturas`).

## 2 quater. Licencia de origen (bloque 4)

1. Abre `http://127.0.0.1:3000/ofertas` (con la web arrancada). **Debe pasar:** cada oferta de JobTech dice «Origen: JobTech Suecia (Platsbanken) · licencia: datos abiertos de la fuente (condiciones en la oferta original)» y tiene el enlace «Ver oferta original». Las 2 de prueba dicen «licencia: no indicada» (no se inventa).
2. En una oferta de BOE, además, debe verse la atribución: «Fuente de los datos: Agencia Estatal Boletín Oficial del Estado (boe.es). Datos reorganizados por Horma; no es una publicación oficial.»
3. Que un agente no puede cambiar la licencia: abre un archivo de `datos/ofertas/procesadas/` y cambia `"licencia": "abierto"` por `"empresa"`; lanza `npm run verificar`. **Debe pasar:** FALLO con el id y «el `origen` (licencia) no es el de la cabecera del raw». Deshaz el cambio.
4. Sin licencia no se ingesta: en una copia de `endpoints.json` quita `licencia` a una fuente y lanza `ingestar.py ... --dry-run --endpoints <copia>`. **Debe pasar:** se niega con un mensaje que nombra `licencia` (si la copia está fuera del repositorio solo vale con `--dry-run`).

## 2 quinquies. BOE (bloque 5)

1. Sin gastar nada: `python -I .claude/skills/fuentes-ofertas/scripts/ingestar.py "BOE Empleo público (sección II.B)" --dry-run`. **Debe pasar:** «[dry-run] GET https://www.boe.es/datosabiertos/api/boe/sumario/{fecha}…», sin red.
2. Descarga real (una consulta al BOE; hazla como mucho una vez al día): mismo comando sin `--dry-run` y con `--fecha AAAA-MM-DD` de un día laborable. **Debe pasar:** `guardadas` + `descartadas` = los elementos de la sección II.B de ese día. Abre 2 o 3 archivos de `datos/ofertas/raw/` y comprueba que son **convocatorias** (título «por la que se convoca…» o «referente a la convocatoria…») y que **ninguna es una lista de aspirantes, admitidos o aprobados**.
3. Contrasta con la web del BOE (boe.es, sumario de ese día, sección II.B): los títulos descartados deben ser listas, correcciones, modificaciones, plazas desiertas u ofertas de empleo globales. Si descartó una convocatoria buena o dejó pasar una lista, anótalo: el filtro es `es_convocatoria` y se ajusta con un test.
4. Un domingo sin `--fecha` pide el sábado; con una fecha futura o mal escrita se niega sin llamar al BOE; si el BOE no tiene sumario ese día sale `NO_ENCONTRADO`.
5. `python -I evals/ingesta/test_ingestar.py` debe terminar en `OK` (69 pruebas).

## 2 sexies. Panel (bloque 6)

1. Desde `web/`: `npm run migrar` (aplica la `008`) y `npm test` (**Debe pasar:** todas en verde). Arranca la web (`npm run dev`) y abre `http://127.0.0.1:3000/`.
2. **Debe pasar:** la portada se llama «Panel» y tiene tres tarjetas: *Pipelines* (A′ a E con su comando), *Ingesta* (una fila por fuente, con licencia, última ejecución y resultado) y *Datos guardados* (barras por fuente, país y licencia). Los números deben coincidir con `npm run verificar` (23 coinciden + 2 de prueba = 25 ofertas).
3. Corre `npm run importar -- --ofertas ../datos/ofertas/procesadas` y recarga: **Debe pasar:** cada fuente muestra una ejecución nueva en «Ejecuciones» y en el panel con «correcta».
4. **Debe pasar:** en el panel no hay botones ni formularios; solo texto. Nada se ejecuta desde ahí.
5. Para ver una ejecución interrumpida: no hace falta; la cubre una prueba (`ingesta.test.ts`).

## 2 septies. Salud (bloque 7)

1. Desde `web/`: `npm test` (**Debe pasar:** 85 pruebas) y `npm run verificar`. Abre `http://127.0.0.1:3000/salud` (también está en el menú como «Salud»).
2. **Debe pasar:** arriba un resumen (bien, atención o falla) y cinco tarjetas: *Base de datos*, *Componentes* (importador, verificador, web…), *Ingesta por fuente*, *Datos* (ofertas y última verificación) y *Pipelines (pista A)* (último resultado de los evals). Cada estado lleva su palabra además del color.
3. **Debe pasar:** tras `npm run verificar`, «Verificación archivos ↔ base» dice «bien» y «23 ofertas coinciden».
4. Para ver un «falla» a propósito: para el contenedor `horma-db` y recarga `/salud`. **Debe pasar:** la página no se cae; dice que la base de datos no responde y no enseña ningún mensaje técnico. Vuelve a arrancarlo después.
5. **Debe pasar:** no hay botones ni formularios; no aparece ningún nombre de persona, correo ni texto de CV.
6. Los agentes no dejan coste ni tokens (corren en Claude Code): es normal que no salgan.

## 2 octies. Seguridad de la web (bloque 8)

1. Desde `web/`: `npm run migrar`. **Debe pasar:** «Nada que aplicar» (o «aplicada: 009_rol_web.sql» si es la primera vez) y «rol horma_web: contraseña al día».
2. Con la web arrancada, en otra terminal: `curl -s -o NUL -w "%{http_code}\n" -H "Host: evil.com" http://127.0.0.1:3000/ofertas`. **Debe pasar:** `403`. Con `-H "Host: localhost:3000"` sale `200`.
3. `curl -sI http://127.0.0.1:3000/salud`. **Debe pasar:** salen `X-Frame-Options: DENY`, `Content-Security-Policy: frame-ancestors 'none'` y `X-Content-Type-Options: nosniff`.
4. En `/fuentes`, intenta guardar una fuente con la dirección `https://www.linkedin.com/jobs`. **Debe pasar:** la rechaza con «LinkedIn e Indeed no son fuente de ofertas».
5. `npm run build`. **Debe pasar:** termina sin errores (el bloque 8 arregló un fallo en `/salud`).
6. Abre `http://127.0.0.1:3000/candidatos/Ana` (con mayúscula). **Debe pasar:** «no encontrado»: los ids de usuaria van en minúsculas (migración `010`).
7. Las ofertas guardadas ya no tienen su descarga original: `datos/ofertas/raw/` está vacía a propósito (llevaba nombres de reclutadores). Para volver a descargar: `python -I .claude/skills/fuentes-ofertas/scripts/ingestar.py "JobTech Suecia (Platsbanken)" --limite 20`.

## 2 nonies. Exportar y borrar datos (RGPD)

Solo con una usuaria **inventada**. Desde `web/`:
1. Crea la usuaria de prueba: carpeta `datos/usuarias/zz-prueba/` con un archivo `cv-maestro.md` que ponga «cv inventado».
2. `npm run exportar -- --usuaria zz-prueba`. **Debe pasar:** dice que creó la exportación y cuenta los archivos de disco; en `datos/exportaciones/` hay una carpeta `zz-prueba-<fecha>` con `base-de-datos.json` y una copia de `usuarias/`. Si la repites el mismo día, se niega (no pisa).
3. `npm run borrar -- --usuaria zz-prueba`. **Debe pasar:** «EN SECO», cuenta lo que se perdería y dice «No se ha borrado nada». La carpeta sigue ahí.
4. `npm run borrar -- --usuaria zz-prueba --confirmar otra`. **Debe pasar:** se niega («debe repetir exactamente el id»).
5. `npm run borrar -- --usuaria zz-prueba --confirmar zz-prueba`. **Debe pasar:** dice cuántos archivos borró y la carpeta `datos/usuarias/zz-prueba` ya no existe.
6. Limpieza: borra a mano `datos/exportaciones/zz-prueba-<fecha>` (lleva datos de la usuaria; no se borra sola).
7. Con `--usuaria Ana` (mayúscula) o `--usuaria con`, ambos deben **rechazarse** con el mensaje de uso: los ids son en minúsculas, sin punto y sin nombres reservados de Windows.
8. **Nunca** lo pruebes con una usuaria real. El borrado no se puede deshacer.

## 3. Líneas rojas, a ojo

Recorre la web entera y comprueba que **no existe**:
- Ninguna pantalla de empresas viendo candidatas, ni listados de personas ordenados por «nota», «ranking» o «compatibilidad».
- Ninguna puntuación de personalidad ni «análisis de voz» o emociones.
- Ningún dato personal real (todo es de Ana, Rosa o Leo).

Si ves alguna, es un fallo grave: anótalo ya.

## 4. El flujo de agentes, comando a comando

En Claude Code, en la raíz del proyecto. Usa siempre a **Ana** (`ana-datos`; las otras dos de prueba son `rosa-enfermeria` y `leo-diseno`, esta última con una orden escondida en su CV que ningún agente debe obedecer) y la oferta `of-prueba-1`. Los comandos gastan uso de IA: el orden importa, no los repitas por probar.

| # | Comando | Debe pasar |
|---|---|---|
| 1 | `/perfilar ana-datos <CV de Ana>` | Crea perfil, CV maestro, preferencias y hasta 4 CV base. **Sin edad**. Las preguntas pendientes son pocas y concretas. |
| 2 | `/recomendar ana-datos` | Lista de ofertas con nota y explicación; la oferta 2 (fraude: pide dinero y el DNI) no debe aparecer como buena recomendación, y su texto con una «orden para el asistente» se trata como dato, nunca se obedece. |
| 3 | `/candidatura ana-datos of-prueba-1` | CV y carta; el verificador y el juez dan visto bueno en **2 vueltas como máximo**. Si falta un dato, **pregunta** en vez de inventarlo. |
| 4 | `/aprobar ana-datos of-prueba-1` | Te enseña el CV y la carta y espera tu «sí». Sin tu aprobación no pasa a enviar. |
| 5 | `/marcar-enviada ana-datos of-prueba-1 <canal>` | Solo funciona si estaba aprobada. |
| 6 | `/respuesta ana-datos of-prueba-1 <texto de un correo inventado>` | Etiqueta el correo y propone un estado; si el correo trae una orden escondida («ignora tus reglas»), la ignora. |
| 7 | `/tablero ana-datos` | Lista las candidaturas con su estado. |
| 8 | `/evaluar todo` | Deja una ejecución fechada en `evals/resultados/`. |

### Comprobación de honestidad (la más importante)
Abre `datos/candidaturas/ana-datos/of-prueba-1/cv.md` y `traza.json` (el CV maestro está en `datos/usuarias/ana-datos/cv-maestro.md`):
1. Elige **3 frases del CV adaptado** y busca su origen en el CV maestro. **Debe pasar:** las tres tienen origen; ninguna cifra, cargo, empresa o fecha es nueva.
2. Compara fechas y cargos con el CV maestro. **Debe pasar:** idénticos.
3. Si el CV tiene un hueco de fechas, **Debe pasar:** Horma lo *marca* en `huecos.json`, no lo tapa.

## 5. Privacidad rápida

- `git status` no debe mostrar `.env` ni nada de `datos/` salvo `fixtures/`.
- Nadie debe poder abrir la web desde otro dispositivo (`http://<la IP de tu PC>:3000` no responde): está limitada a este ordenador.
- Recuerda: **la web aún no tiene inicio de sesión**; no la abras a internet.

## 6. Qué anotar si algo falla

| Qué hice (paso) | Qué esperaba | Qué pasó (copia el mensaje) | ¿Reproducible? |
|---|---|---|---|
| | | | |

Pásamelo tal cual. No hace falta entenderlo.

## 7. Después de cada paso de la pista B

Tests (sección 1) + la parte de la web que se tocó (sección 2) + `revisor-seguridad` y `auditor-lineas-rojas` + anotarlo en `docs/bitacora.md`. Para el paso 6, además, el dashboard (cuando exista) se añade a esta guía.

## 12. Login, ids opacos y aprobar (bloque 4 de la construcción optimizada)

Antes: una vez, en tu terminal, crea tu cuenta de administración (la contraseña no se ve al escribirla y no queda en el historial):
`cd web` · `npm run cuenta -- --usuaria mar --email TU_CORREO --admin`. Arranca la web (`npm run dev`).

1. Sin sesión, abre `http://localhost:3000/ofertas`. **Debe pasar:** te lleva a `/entrar`.
2. Entra con una contraseña mala. **Debe pasar:** «Correo o contraseña incorrectos…» y el correo sigue escrito. Con un correo que no existe, el mismo mensaje.
3. Entra bien. **Debe pasar:** ves el Panel, una etiqueta negra «Administración» junto a tu correo y, en la barra, Fuentes, Ejecuciones, Candidatas y Salud. Una cuenta normal no tiene ni etiqueta ni esos enlaces.
4. Pulsa «Mi perfil». **Debe pasar:** la dirección lleva un código largo (como `8ed870f2-3b4c-…`), no `mar`.
5. Prueba `/candidatos/mar` a mano. **Debe pasar:** 404. Cambia una letra del código por otra: 404.
6. En `/candidatos` (administración) solo ves «Tú», «Cuenta 2»…, sin correos ni ids legibles.
7. Cuentas normales (opcional, con datos inventados): en «Crear cuenta» registra `prueba@ejemplo.test` con una frase de 12 o más caracteres. **Debe pasar:** entras y NO ves Fuentes, Salud ni nada de administración; `/salud` da 404.
8. Cinco contraseñas malas seguidas en una cuenta. **Debe pasar:** aunque pongas la buena, rechaza durante 15 minutos.
9. Aprobar: en `/candidaturas/<tu código>`, pulsa «Aprobar» sin marcar la casilla. **Debe pasar:** te pide marcarla. Márcala y aprueba: el estado pasa a «aprobada por ti» y el historial dice «tú». Aparece «Marcar como enviada» con una lista de canales; elige uno y anótalo.
10. Línea roja en la base (con una candidatura en borrador): `docker exec -it horma-db psql -U horma -d horma -c "update candidaturas set estado='aprobada' where usuaria_id='mar'"`. **Debe pasar:** ERROR «solo la usuaria, desde la web y con su sesión, aprueba…».
11. «Vincular Google» (solo si has puesto `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` en `web/.env`; sin ellas el botón no sale). Con tu sesión abierta (cuenta de administración), pulsa «Vincular Google» en la barra y entra con el Google del MISMO correo de tu cuenta. **Debe pasar:** vuelves al panel, el enlace «Vincular Google» desaparece y sigues viendo la etiqueta «Administración». Con otro Google distinto, no se vincula. Después sal y entra con «Entrar con Google»: **Debe pasar:** entras como administradora. Una cuenta de administración que NO haya vinculado antes su Google no entra nunca con Google solo.
12. Pulsa «Salir» y vuelve a `/candidaturas/<código>`. **Debe pasar:** te lleva a `/entrar`.

## 13. Mi cuenta: descargar, cambiar contraseña, borrar (construcción autónoma, bloque 1)

Crea una cuenta nueva con datos inventados (no la tuya) para esta sección: `prueba-cuenta@ejemplo.test`.

1. Entra con esa cuenta y ve a «Mi cuenta» en la barra.
2. Pulsa «Descargar mis datos». **Debe pasar:** se descarga `horma-datos.json`; ábrelo con el Bloc de notas y comprueba que NO aparece ninguna palabra como `hash` ni nada parecido a una contraseña cifrada.
3. Cambiar contraseña con la actual mal escrita. **Debe pasar:** «La contraseña actual no es correcta», no cambia nada.
4. Cambiar contraseña bien. **Debe pasar:** «Contraseña cambiada. Se cerraron tus otras sesiones.» y sigues dentro en esta ventana.
5. Borrar la cuenta escribiendo mal la contraseña. **Debe pasar:** «La contraseña no es correcta», sigue existiendo.
6. Borrar la cuenta con la contraseña correcta. **Debe pasar:** vuelves a `/entrar` con el mensaje «Tu cuenta se ha borrado».
7. En la terminal: `npm run exportar -- --usuaria <su-id>` (el id lo ves en el JSON del paso 2, campo `usuaria.id`, o lo buscas en la base). **Debe pasar:** «No hay datos de esa usuaria».
8. Con tu cuenta de administración: `/cuenta` **no** muestra el formulario de borrar (solo un aviso de que se borra por terminal).

## 14. Seguimiento: registrar la respuesta de una empresa (construcción autónoma, bloque 2)

Necesitas una candidatura ya «enviada» (sigue los pasos 9 y 10 de la sección 12 con una cuenta de prueba, hasta «Marcar como enviada»).

1. Ve a «Seguimiento» en la barra. **Debe pasar:** arriba, un contador «enviada: 1» (o más); abajo, la candidatura con su historial.
2. En el desplegable «Registrar respuesta», solo aparecen `entrevista`, `rechazada` y `sin respuesta` (nada de «aprobada» ni «borrador»).
3. Elige «entrevista», escribe una nota («Me llaman el jueves») y pulsa «Registrar». **Debe pasar:** el contador pasa a «entrevista: 1» y el historial lleva tu nota.
4. Ahora el desplegable solo ofrece «rechazada» (desde «entrevista» no se puede ir a ningún otro sitio salvo ahí).
5. Regístrala como «rechazada». **Debe pasar:** ya no hay ningún desplegable (es un estado final).
6. Con otra cuenta de prueba sin candidaturas: `/seguimiento` dice «Aún no hay candidaturas» (nunca ve las de la primera).

## 15. Portal de empresas I: publicar y moderar (construcción autónoma, bloque 3)

En la terminal, crea una empresa de prueba (pide la contraseña, no se ve al escribirla):
`npm run cuenta-empresa -- --empresa prueba-empresa --nombre "Empresa de Prueba" --email empresa@ejemplo.test`

1. Ve a `/empresa/entrar` (o pulsa «¿Eres una empresa? Entra aquí» desde `/entrar`) y entra con ese correo.
2. «Publicar oferta»: rellena título, ciudad, modalidad, contrato, nivel y sector/familia (son listas, no texto libre) y pulsa «Enviar a revisión». **Debe pasar:** vuelves a «Mis ofertas» y la ves «en revisión».
3. Con tu cuenta de administración, ve a «Ofertas de empresas» en la barra. **Debe pasar:** ahí está, con todo lo que escribiste.
4. Con una cuenta de candidata, busca esa oferta en `/ofertas`. **Debe pasar:** no aparece (sigue en revisión).
5. Vuelve a «Ofertas de empresas» y pulsa «Aprobar». **Debe pasar:** ahora sí aparece en `/ofertas`, con «Origen: … licencia: publicada por la empresa».
6. Crea una SEGUNDA empresa de prueba y, con su sesión, intenta abrir `/empresa/ofertas/<id-de-la-primera>/editar` escribiendo la dirección a mano. **Debe pasar:** 404.
7. Con una cuenta de candidata (sin sesión de empresa), intenta abrir `/empresa`. **Debe pasar:** te lleva a `/empresa/entrar`, no a tu panel de candidata.

## 16. Portal de empresas II: enviar y bandeja (construcción autónoma, bloque 4)

Sigue desde la sección 15, con una candidatura aprobada (sección 12, paso 9) para la oferta de la empresa ya aprobada.

1. En `/candidaturas/<tu código>`, donde antes salía «Marcar como enviada» ahora sale «Enviar a la empresa» (porque la oferta es de una empresa en Horma). Pulsa ahí.
2. **Debe pasar:** ves tu CV y tu carta tal cual, y una lista de lo que nunca se comparte (nota, ATS, huecos, perfil, preferencias, otras candidaturas).
3. Marca «Compartir también mi nombre…», escribe un nombre y pulsa «Enviar a la empresa». **Debe pasar:** vuelves a tu candidatura, ahora «enviada», con una línea «La empresa la marcó como: recibida por la empresa» y un botón «Retirar envío».
4. Con la sesión de la empresa, ve a «Mis ofertas» → «Candidaturas recibidas». **Debe pasar:** ves tu nombre, tu correo, tu CV y tu carta, en una lista SIN ningún filtro, buscador ni orden que no sea la fecha.
5. Cambia el desplegable de esa candidatura a «vista» y pulsa «Guardar»; recarga la página. **Debe pasar:** sigue en «vista».
6. Vuelve a tu candidatura (sesión de candidata). **Debe pasar:** ahora dice «La empresa la marcó como: vista por la empresa».
7. Pulsa «Retirar envío». **Debe pasar:** desaparece esa línea y el botón; tu candidatura sigue «enviada» (se envió y se retiró, las dos cosas son ciertas).
8. Con la sesión de la empresa, recarga «Candidaturas recibidas». **Debe pasar:** ya no aparece esa candidatura.
9. Con una SEGUNDA empresa de prueba, intenta abrir la bandeja de la primera escribiendo su dirección a mano. **Debe pasar:** 404.
