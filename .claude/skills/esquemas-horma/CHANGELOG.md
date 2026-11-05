# Cambios de esquema

Un cambio de esquema es un cambio de contrato entre agentes y web. Se anota aquí antes de tocarlo.

## 0.2 · 2026-11-05

- `preferencias.horario` (opcional): lista de `manana`, `tarde`, `noche`, `flexible`. Decisión de Mar (5-nov): la usuaria dice «solo mañanas» y el matcher lo compara con el horario de la oferta solo si la oferta lo dice. No se deduce del CV. Opcional para que los archivos anteriores sigan validando; en la base de datos, migración `005`.

## 0.1 · 2026-11-03

- Versión inicial a partir del documento del profesor «Horma: flujo agéntico en Claude Code».
- Añadidos sobre el documento (todos opcionales, para que el filtro duro funcione): `preferencias.ciudades`, `preferencias.sectores`, `preferencias.niveles`, `oferta.pais`, `oferta.salario.periodo` y `candidatura.huecos[].relleno_aviso` (aviso de dónde se rellenó cada hueco; comentario del profesor del 3-nov).
- `perfil.instrucciones_embebidas` (opcional): un CV puede traer órdenes a un agente, igual que una oferta (prueba con CV de prueba, 3-nov).
- `oferta.idioma`: formato canónico (nombre en español, minúsculas) documentado; el stack de la taxonomía ya no admite idiomas (prueba con ofertas de prueba, 3-nov).
- Nuevo `clasificacion-respuesta.json` (8.º esquema): salida de `clasificador-respuesta`, con `avisos` (phishing, fecha ambigua). Faltaba en el documento del profesor; lo detectó el propio agente en la prueba (3-nov).
- `endpoints.json`: añadidos `clave_en` y `clave_nombre` (dónde pone la clave el script) y `mapeo_campos.lista` (dónde está el array en la respuesta). El archivo de datos está en `.claude/skills/fuentes-ofertas/endpoints.json`; este es su esquema.
