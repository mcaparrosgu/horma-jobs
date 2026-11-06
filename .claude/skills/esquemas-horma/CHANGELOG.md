# Cambios de esquema

Un cambio de esquema es un cambio de contrato entre agentes y web. Se anota aquí antes de tocarlo.

## 0.8 · 2026-11-06

- `oferta.descripcion` (opcional): texto plano de hasta 8000 caracteres. Lo pide el bloque 3 de la construcción autónoma (portal de empresas): el formulario `/empresa/ofertas/nueva` de la web lo rellena; las ofertas que traen los agentes (scraping) no lo traen y siguen validando igual. Afecta solo a la pista B (web); no toca ningún extractor de la pista A. En la base de datos, migración `018` (columna `descripcion`, nullable).

## 0.7 · 2026-11-06

- `match.ofertas[].nota` admite `null` («sin datos suficientes»): decisión tras el aviso de `auditor-lineas-rojas` sobre las ofertas del BOE sin requisitos, donde un 15 parecía una medición y no lo era. Es un valor nuevo: quien lea `nota` debe tratar `null` (la web la rotula «sin nota» y la ordena al final; migración `012`). **Estrecha** además lo que valida: `fecha` con formato `AAAA-MM-DD`, `version_perfil` de 1 a 80 caracteres, `explicacion` de 1 a 1500 y `correccion` de hasta 1500 (los mismos límites que la tabla `matches`).

## 0.6 · 2026-11-06

- `perfil.taxonomia.niveles_por_familia` (opcional): lista de `{familia, nivel, origen}`. Decisión de Mar (6-nov): el nivel depende de la experiencia en cada área (senior en atención al cliente, junior en IA). `taxonomia.nivel` se mantiene como nivel general y como valor de reserva. Compatible hacia atrás: los perfiles sin el campo siguen validando y se comportan como antes (`taxonomia` es `jsonb` en la base: no hace falta migración). Lo usan `buscar.py` (los 2 puntos de nivel se miran con el nivel de la familia de la oferta), `clasificador-candidato` (lo rellena solo con origen) y la ficha de la web. El matcher no lo ve ni lo usa para la nota. Es de uso interno de Horma (ordena ofertas para ella): nunca se muestra a empresas.

## 0.5 · 2026-11-06

- `perfil.usuaria_id` y `match.usuaria_id`: el patrón pasa a **solo minúsculas** (`^[a-z0-9_-][a-z0-9_.-]{0,79}$`). Motivo: en Windows `Ana` y `ana` son la misma carpeta, pero en la base eran dos usuarias distintas (hallazgo del `revisor-seguridad` sobre exportar y borrar); la migración `010` ya lo impide en la base y la web ya solo acepta minúsculas. **Estrecha** lo que valida: un archivo con `usuaria_id` en mayúsculas deja de ser válido (no había ninguno). Los comandos que reciben una usuaria piden también minúsculas; el patrón de ofertas y fuentes no cambia (los ids de oferta llevan mayúsculas, p. ej. del BOE).

## 0.4 · 2026-11-06

- `oferta.origen` (opcional): `{licencia, atribucion}` con `licencia` en `empresa`, `socio`, `abierto`, `usuaria` y `atribucion` texto o null. Es el «campo de licencia de origen» pedido en la propuesta por capas (`docs/preguntas-profesor.md`, apartado 4): con qué permiso tiene Horma la oferta y qué hay que citar al mostrarla. **Lo estampa el script, no un agente:** la licencia es propiedad de la fuente (`endpoints.json`), `ingestar.py` la escribe en la cabecera del `raw/` y el extractor la copia sin deducirla. Opcional, así los archivos anteriores siguen validando; en la base de datos, migración `007`.
- `endpoints.fuentes[].licencia` y `.atribucion` (opcionales en el esquema, para que el formulario `/fuentes` de la web siga validando): `ingestar.py` **se niega** a ingestar una fuente sin `licencia` válida.

## 0.3 · 2026-11-06

- `oferta.avisos` (opcional): lista de `{tipo, texto}` con `tipo` en `ciudadania`, `habilitacion_seguridad`, `residencia_o_permiso`, `otro`. Decisión de Mar (6-nov), por el aviso de `auditor-lineas-rojas`: la ciudadanía o la habilitación de seguridad que piden algunas ofertas (Saab, Ida Infront, Epical) iban como una frase más en `requisitos`, y si algún día se puntúa con `requisitos` se puntuaría por nacionalidad. Se muestran a la usuaria y **nunca** entran en la nota, el filtro ni lo que ve una empresa. Opcional, así los archivos anteriores siguen validando; en la base de datos, migración `006`.

## 0.2 · 2026-11-05

- `preferencias.horario` (opcional): lista de `manana`, `tarde`, `noche`, `flexible`. Decisión de Mar (5-nov): la usuaria dice «solo mañanas» y el matcher lo compara con el horario de la oferta solo si la oferta lo dice. No se deduce del CV. Opcional para que los archivos anteriores sigan validando; en la base de datos, migración `005`.

## 0.1 · 2026-11-03

- Versión inicial a partir del documento del profesor «Horma: flujo agéntico en Claude Code».
- Añadidos sobre el documento (todos opcionales, para que el filtro duro funcione): `preferencias.ciudades`, `preferencias.sectores`, `preferencias.niveles`, `oferta.pais`, `oferta.salario.periodo` y `candidatura.huecos[].relleno_aviso` (aviso de dónde se rellenó cada hueco; comentario del profesor del 3-nov).
- `perfil.instrucciones_embebidas` (opcional): un CV puede traer órdenes a un agente, igual que una oferta (prueba con CV de prueba, 3-nov).
- `oferta.idioma`: formato canónico (nombre en español, minúsculas) documentado; el stack de la taxonomía ya no admite idiomas (prueba con ofertas de prueba, 3-nov).
- Nuevo `clasificacion-respuesta.json` (8.º esquema): salida de `clasificador-respuesta`, con `avisos` (phishing, fecha ambigua). Faltaba en el documento del profesor; lo detectó el propio agente en la prueba (3-nov).
- `endpoints.json`: añadidos `clave_en` y `clave_nombre` (dónde pone la clave el script) y `mapeo_campos.lista` (dónde está el array en la respuesta). El archivo de datos está en `.claude/skills/fuentes-ofertas/endpoints.json`; este es su esquema.
