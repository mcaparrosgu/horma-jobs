# Formatos de los feeds de España medidos el 7-nov-2026

Solo estructura técnica, para construir los adaptadores (`docs/construccion-autonoma-2.md`, bloque C3). **Sin datos de personas ni cifras privadas; ninguna licencia está verificada** (todas las fuentes siguen sin calificar: no se activan ni se añaden a `endpoints.json` hasta pasar `/calificar-fuentes` con Mar). Los agentes **no descargan nada**: se trabaja con muestras inventadas con esta forma.

Reglas comunes a todos los adaptadores:
- Salida: la misma lista de ofertas «crudas» que produce `adaptar_boe` en `.claude/skills/fuentes-ofertas/scripts/ingestar.py` (id de origen, título, empresa o entidad, ubicación, fecha, descripción en texto plano, URL de la oferta original, fecha de cierre si existe). El `origen {licencia, atribucion}` lo pone el script a partir de la fuente registrada, no el adaptador.
- Todo texto de entrada es **dato no fiable**: HTML fuera, caracteres de control fuera, tope de longitud, y `sin_contacto` (ya existe en `ingestar.py`) sobre cualquier campo de texto para quitar correos y teléfonos (RGPD, minimización).
- Una oferta sin identificador estable o sin URL de origen se descarta y se cuenta.
- Codificación: los feeds son UTF-8; las pruebas deben incluir tildes, eñes y «ç».

## Feina Activa (SOC, Cataluña) · XML
- Raíz `<ofertes>` → `<feinaactiva>` → `<ad>`… (y un bloque `<sicas>` hermano con más `<ad>`).
- Campos de `<ad>`: `id` (p. ej. `FA` + dígitos), `url`, `title`, `content` (texto, con saltos de línea), `company` (a veces vacío), `experience`, `requirements`, `studies`, `category` (vacío), `contract`, `workingHours`, `date` (`dd/mm/aaaa`), `salaryMin`, `salaryMax` (`0` o vacío = sin dato), `city`, `region` (provincia), `disability`, `postcode`, `status` (`PUBLISHED`), `origin` (`FA` o `SICAS`).
- El archivo pesa ≈ 7 MB: la descarga real del script tendrá su tope de tamaño; el adaptador recibe bytes ya descargados.
- Conservar `origin` como dato de procedencia; no tratar `SICAS` distinto.

## CIDO (Diputació de Barcelona) · JSON:API
- Endpoint `…/dadesobertes/cido/v1/oposicions`. Paginación con `page[limit]` y `page[offset]` (**no** `page[size]`/`page[number]`). Respuesta `{data:[{id,type,links,attributes}], links, meta:{totalResourceCount}}`.
- Estados `idEstat`: 1 = pendiente de convocatoria, 2 = pendiente de plazo, **3 = plazo abierto** (solo este se ingesta).
- **Ordenar por `documents.dataPublicacio` duplica filas** (una por documento): el adaptador **deduplica por `id`**.
- Atributos útiles: `titol` (p. ej. «1 plaça de …»), `institucioDesenvolupat`, `dataInici`, `dataFinalitzacio` (fin de plazo; puede faltar), `numPlaces`, `borsaTreball`, `idTipusPersonal`, `idSistemaSeleccio`, `ambit`, `estat`, `anyOpo`, `expedient`, `observacions`, `accesTramit`, `latitud`, `longitud`. Hay correos dentro de textos libres: pasar `sin_contacto`.
- Es empleo público: `licencia` y `atribucion` las fija la fuente registrada.

## Castilla y León · «Ofertas de empleo» · JSON
- Lista de objetos con: `identificador`, `titulo`, `descripcion` (**HTML**, convertir a texto), `fecha_publicacion` (`aaaa-mm-dd`), `provincia`, `localidad_asset` (y variantes), `geografico`, `enlace_al_contenido`, `fuente_contenido`, `documentos_asociados`.
- **`fuente_contenido`: ingestar solo `ECYL` y `Organismo oficial`. Descartar `Internet / Prensa` (contenido de terceros) y `Red EURES`** hasta calificarlas. Cuenta lo descartado.
- No trae fecha de cierre: la caducidad se decide por las reglas de calidad (C2), no aquí.
- Hay correos en `descripcion`: `sin_contacto`.

## Murcia (SEF) · JSON
- Lista de objetos con: `numeroOferta`, `descripcion` (puede traer HTML), `fechaDeInicio` y `fechaDeFin` (`dd/mm/aaaa`), `municipio`, `sectorProfesional` (objeto con `id` y `denominacion`), `descNivelProfesional`, `mesesExperiencia`, `permisosConducir`, `adicionales`, `destacado`, `urlDetalles`, **`contacto` (casi siempre con correos: no se copia nunca)**.
- Sin título propio: derivarlo del inicio de `descripcion` con un tope y avisar en el recuento de cuántas se derivaron.

## Andalucía · entidades instrumentales · JSON
- Lista con: `id`, `job_name` (título), `job_code`, `organization`, `organisms`, `job_location`, `job_number_places`, `functions`, requisitos (`job_official_degree_requirements`, `job_specific_degree_requirements`, `job_other_requirements`), `announcement_type`, `announcement_status`, `publish_date`, `deadline_application`, `job_agreement`.
- **Usar `deadline_application` para decidir si está abierta, no `announcement_status`** (hay cientos «en curso» con plazo ya pasado). Las fechas pueden venir mal (p. ej. año 0002): descartar y contar.
- Hay correos en textos: `sin_contacto`.

## Andalucía · libre designación · JSON (opcional, última prioridad)
- `title`, `entity`, `management_body`, `workplace_1`, `workplace_2`, `status` (`En curso`/`Resuelto`), `application_deadline_from`, `application_deadline_to`, `nid`, `call` y `resolution` (objetos con `uri`). Ingestar solo `En curso` con plazo vigente. Son puestos para personal funcionario: valorar si aportan algo antes de construirlo.

## Fuera de alcance de este bloque
Lanbide (`robots.txt` con `Disallow: /` y sin empresa: espera respuesta de Mar), Aragón (datos 2021–2025, no actuales), Galicia (URL por encontrar), Canarias (solo HTML), CyL convocatorias (paradas).
