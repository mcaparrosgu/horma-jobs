# Estado de la construcción autónoma
Inicio: 2026-11-06T22:54:49+01:00 · Límite: 2026-11-07T08:54:49+01:00 (+10 h) · Rama de integración: autonomo/2026-11-06
Línea base: web 127 tests · evals 41 · build ok (ninguna ruta estática) · copia de la base: datos/copias/pre-autonomo-2026-11-06.sql (restaurar: `docker exec -i horma-db psql -U horma horma < datos/copias/pre-autonomo-2026-11-06.sql`, tras recrear la base vacía)

| Bloque | Estado | Rama | Hora | Tests (web/evals) | Revisores |
|---|---|---|---|---|---|
| B0 | hecho | autonomo/2026-11-06 | 22:54–23:05 | 127/41 (línea base) | — |
| B1 | hecho | auto/b1-cuenta-rgpd | 23:05–00:15 | 136/41 | aplazado a B5 (con B2) |
| B2 | hecho | auto/b2-seguimiento | 00:15–01:10 | 139/41 | auditor-lineas-rojas pendiente de lanzar |
| B3 | pendiente | — | — | — | — |
| B4 | pendiente | — | — | — | — |
| B5 | pendiente | — | — | — | — |

## Decisiones técnicas (porqué en 1–2 líneas)
- **B1, borrado con función en vez de GRANT DELETE:** `borrar_cuenta_propia(id)` (SECURITY DEFINER) en vez de dar DELETE directo a `horma_web` sobre `usuarias`. Así un fallo en el código de la web no puede borrar un id ajeno, y la base bloquea sola cualquier intento de borrar una cuenta `admin` (defensa también fuera del código de la página).
- **B1, descargar datos sin tocar disco:** la ruta web solo usa `SQL_EXPORTAR` (JSON al momento, sin hash); no reutiliza la parte de `scripts/exportar.ts` que copia carpetas de disco (pensada para la exportación completa que hace Mar por terminal, no para el autoservicio de la usuaria). Más simple y sin dejar archivos con datos personales en el servidor.
- **B1, cambiar contraseña en cuenta solo-Google:** no se ofrece (no hay hash que verificar); la página lo explica en una frase. Decisión técnica, reversible si Mar prefiere otra cosa.
- **B2, mismo bloqueo por rol para los estados nuevos que para aprobada/enviada:** aunque el importador nunca intenta escribir `entrevista`/`rechazada`/`sin_respuesta`/`descartada` (su UPDATE solo corre en `borrador`/`pendiente_de_ti`), añadí el mismo `current_user = 'horma_web'` que ya protegía `aprobada`/`enviada`: defensa en la base, no solo en el código de hoy.
- **B2, «Portada: contadores propios por estado»:** lo interpreté como la cabecera de `/seguimiento` (no la portada `/`, que es solo de administración y a la que la usuaria no llega). Es la lectura más simple; si Mar quería los contadores en otro sitio, se mueve fácil.

## Preguntas para Mar (opciones, recomendada marcada)
(ninguna todavía — se repasa en el cierre, B5)

## Hallazgos de revisores aplazados (con solución propuesta)
(revisor-seguridad sobre B1 y B2 se aplica en el cierre, B5, según el modo ahorro del plan)

## Migraciones aplicadas (número, qué hace, rollback)
- **016_borrar_cuenta_propia.sql:** función `borrar_cuenta_propia(id)` para que `horma_web` pueda borrar su propia cuenta sin `GRANT DELETE`; nunca borra una cuenta `admin`. Rollback: `REVOKE EXECUTE ON FUNCTION borrar_cuenta_propia(text) FROM horma_web; DROP FUNCTION borrar_cuenta_propia(text);`
- **017_seguimiento.sql:** `CREATE OR REPLACE FUNCTION candidaturas_transicion()` con los pares nuevos (ver bitácora). Rollback: recrear la función con el cuerpo de la migración 015 (solo `borrador→aprobada`, `aprobada→enviada` y el vaivén `borrador/pendiente_de_ti`).

## Siguiente paso exacto
Lanzar `auditor-lineas-rojas` sobre el diff de B1+B2; si no hay hallazgos abiertos, empezar B3 (portal de empresas I).
