# Cambios de esquema

Un cambio de esquema es un cambio de contrato entre agentes y web. Se anota aquí antes de tocarlo.

## 0.1 · 2026-11-03

- Versión inicial a partir del documento del profesor «Horma: flujo agéntico en Claude Code».
- Añadidos sobre el documento (todos opcionales, para que el filtro duro funcione): `preferencias.ciudades`, `preferencias.sectores`, `preferencias.niveles`, `oferta.pais`, `oferta.salario.periodo` y `candidatura.huecos[].relleno_aviso` (aviso de dónde se rellenó cada hueco; comentario del profesor del 3-nov).
- `endpoints.json`: añadidos `clave_en` y `clave_nombre` (dónde pone la clave el script) y `mapeo_campos.lista` (dónde está el array en la respuesta). El archivo de datos está en `.claude/skills/fuentes-ofertas/endpoints.json`; este es su esquema.
