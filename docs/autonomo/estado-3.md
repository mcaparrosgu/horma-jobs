# Estado de la construcción autónoma III
Inicio: 2026-11-07T13:52:22+01:00 · Límite: 2026-11-07T17:52 · A4 empieza a las 17:22 pase lo que pase · Rama de integración: autonomo/2026-11-07 (sale de autonomo/2026-11-06)
Línea base: web 164 tests · evals 42 · build ok · lint ok · tsc ok · copia de la base: datos/copias/pre-autonomo3-2026-11-07.sql (ignorada por git; restaurar: `docker exec -i horma-db psql -U horma horma < datos/copias/pre-autonomo3-2026-11-07.sql`, tras recrear la base vacía)

| Bloque | Estado | Rama | Hora | Tests (web/evals) | Revisores |
|---|---|---|---|---|---|
| A0 | hecho | autonomo/2026-11-07 | 13:55 | 164/42 | — |
| A1 | pendiente | auto/a1-calidad-ofertas | | | |
| A2 | pendiente | auto/a2-csp | | | |
| A3 | pendiente | auto/a3-rls | | | |
| A4 | pendiente | — | | | |

## Decisiones técnicas (porqué en 1–2 líneas)
## Preguntas para Mar (opciones, recomendada marcada)
## Hallazgos de revisores aplazados (con solución propuesta)
## Migraciones aplicadas (número, qué hace, rollback)
## Cambios de esquema que afectan a la pista A
## Siguiente paso exacto
A1: leer `web/src/lib/importar.ts`, `consultas.ts` y la página `/ofertas`; escribir primero los tests de canonicalización y huella.
