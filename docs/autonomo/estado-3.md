# Estado de la construcción autónoma III
Inicio: 2026-11-07T13:52:22+01:00 · Límite: 2026-11-07T17:52 · A4 empieza a las 17:22 pase lo que pase · Rama de integración: autonomo/2026-11-07 (sale de autonomo/2026-11-06)
Línea base: web 164 tests · evals 42 · build ok · lint ok · tsc ok · copia de la base: datos/copias/pre-autonomo3-2026-11-07.sql (ignorada por git; restaurar: `docker exec -i horma-db psql -U horma horma < datos/copias/pre-autonomo3-2026-11-07.sql`, tras recrear la base vacía)

| Bloque | Estado | Rama | Hora | Tests (web/evals) | Revisores |
|---|---|---|---|---|---|
| A0 | hecho | autonomo/2026-11-07 | 13:55 | 164/42 | — |
| A1 | hecho (por fundir) | auto/a1-calidad-ofertas | 14:10 | 180/43 | auditor-lineas-rojas en A4 |
| A2 | pendiente | auto/a2-csp | | | |
| A3 | pendiente | auto/a3-rls | | | |
| A4 | pendiente | — | | | |

## Decisiones técnicas (porqué en 1–2 líneas)
- A1: columna extra `huella_base` (sin semana) para poder calcular «oferta recurrente»; el agrupado se decide solo en SQL; `npm test` carga web/.env si existe; fechas `date` también como texto (toISOString las corría un día).
- Puerto 3000 ocupado por un proceso ajeno (no es mío, no se toca): mis pruebas de navegador van en 127.0.0.1:3100.
## Preguntas para Mar (opciones, recomendada marcada)
1. Regla «desaparece del feed en dos lecturas»: no implementada (ingestas parciales con `--limite`). Opciones: (a) no hacerla [recomendada]; (b) hacerla solo para fuentes con ingesta completa marcadas así en `endpoints.json`.
2. `veces_vista` cuenta también las reimportaciones de archivos locales, no solo lecturas reales del feed. Recomendada: dejarlo y rotularlo «vista N veces por Horma».
3. Ofertas de empresa: su `ultima_vista` no se refresca al editarlas, así que a los 45 días saldrían «puede no estar vigente». Recomendada: refrescarla al editar/mantener (requiere un GRANT en una migración futura).
## Hallazgos de revisores aplazados (con solución propuesta)
## Migraciones aplicadas (número, qué hace, rollback)
- 021 calidad de ofertas (columnas url_canonica, huella_base, huella, grupo_dedup, primera_vista, ultima_vista, veces_vista, fecha_cierre + 3 índices). Rollback en su cabecera. Tras aplicarla: `npm run dedup -- --aplicar` (hecho, idempotente).
## Cambios de esquema que afectan a la pista A
- `oferta.fecha_cierre` (esquema 0.9, opcional, solo aditivo): afecta a la pista A; `buscar.py` la lee (`--hoy` para pruebas) y hay eval `fecha_cierre`.
## Siguiente paso exacto
A1: leer `web/src/lib/importar.ts`, `consultas.ts` y la página `/ofertas`; escribir primero los tests de canonicalización y huella.
