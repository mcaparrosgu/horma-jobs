# Resumen de la construcción autónoma III (7-nov)

**Hecho / no hecho / siguiente:** A1, A2, A3 y A4 hechas, probadas y fundidas en `autonomo/2026-11-07` (sin push, `main` intacta). Puerta final: 189 tests web, 43 evals, `tsc`, `lint`, `build`, `verificar` en verde. Siguiente paso: tu revisión y decidir si se funde en `main`.

## Qué hay
- **A1 Calidad de ofertas (migración 021):** deduplicación por URL canónica y por huella (empresa+título+municipio+semana), una fila por grupo (mejor licencia, luego más reciente; nada se borra); cerradas por `fecha_cierre`; «puede no estar vigente» a los 45 días sin verse; «recurrente»; etiqueta de transparencia solo con hechos. `npm run dedup` (en seco; `-- --aplicar` escribe).
- **A2 CSP estricta:** nonce por petición + `strict-dynamic`, sin `unsafe-eval` en producción; test que prohíbe `dangerouslySetInnerHTML`, `innerHTML`, `eval`… en `web/src`.
- **A3 RLS (022-024) + 025:** perfiles, preferencias, matches, candidaturas y envios_empresa con política por usuaria/empresa; `conUsuaria`/`conEmpresa`; test «lo ajeno falla» con «prueba de la prueba».
- **A4:** revisiones (`revisor-seguridad`, `auditor-lineas-rojas`), guía secciones 17-19, informe, tareas, índice y bitácora. Arreglado tras las revisiones: políticas de `envios_empresa` por comando, CSP duplicada eliminada, aviso de recomendaciones ocultas.

## Migraciones (todas aditivas; el rollback va comentado en la cabecera de cada una)
021 calidad de ofertas · 022 RLS perfiles/preferencias + `usuarias_con_perfil()` · 023 RLS matches/candidaturas · 024 RLS envios_empresa · 025 políticas de envios_empresa por comando.

## No hecho
Nada de lo vetado (fuentes nuevas, Lanbide, supervisor, voz, MCP, deploy…) ni dependencias nuevas. «Desaparece del feed en dos lecturas» no se implementó. Guarda estática del test RLS más estricta: pendiente menor.

## Preguntas para Mar (la recomendada, primera)
1. **Ofertas que desaparecen del feed:** (a) dejarlo como está [recomendada: ya hay fecha de cierre y aviso de 45 días]; (b) marcar cerrada tras dos lecturas sin verla (más preciso, necesita ingestas regulares).
2. **RLS en `cuentas`/`sesiones`:** (a) no [recomendada: el login las lee antes de saber quién es]; (b) políticas por hash de sesión (complejo, poco beneficio).
3. **PPR desactivado** por los nonces de la CSP: (a) mantener [recomendada]; (b) CSP por hashes (experimental).
4. **`style-src 'unsafe-inline'`:** (a) dejarlo [recomendada, riesgo bajo]; (b) quitarlo cambiando estilos en línea por clases (toca las barras del panel).
5. **`usuarias_con_perfil()`** la puede llamar cualquier consulta de `horma_web` (solo ids): (a) dejarlo y documentarlo [recomendada]; (b) exigir una variable `app.es_admin`.
6. Dos ofertas reales de Knightec se agrupan por la heurística: mira si es correcto. `veces_vista` cuenta reimportaciones de archivos locales; `ultima_vista` de ofertas de empresa no se refresca al editarlas.

## Para ti, al volver
- `git checkout .claude/settings.json` (restaura tus permisos).
- Revisar: `git log --oneline autonomo/2026-11-07` y `git diff main..autonomo/2026-11-07 --stat`; probar a mano las secciones 17-19 de la guía.
- Aceptar: fundir tú en `main` (no lo he hecho ni he empujado nada).
- Restaurar la copia previa si hiciera falta (tras recrear la base vacía): `docker exec -i horma-db psql -U horma horma < datos/copias/pre-autonomo3-2026-11-07.sql`.
- Procesos: no dejé ninguno mío en marcha (el servidor del puerto 3000 no es mío).
