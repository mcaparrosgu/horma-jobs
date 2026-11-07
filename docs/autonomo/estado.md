# Estado de la construcción autónoma
Inicio: 2026-11-06T22:54:49+01:00 · Límite: 2026-11-07T08:54:49+01:00 (+10 h) · Rama de integración: autonomo/2026-11-06
Línea base: web 127 tests · evals 41 · build ok (ninguna ruta estática) · copia de la base: datos/copias/pre-autonomo-2026-11-06.sql (restaurar: `docker exec -i horma-db psql -U horma horma < datos/copias/pre-autonomo-2026-11-06.sql`, tras recrear la base vacía)

| Bloque | Estado | Rama | Hora | Tests (web/evals) | Revisores |
|---|---|---|---|---|---|
| B0 | hecho | autonomo/2026-11-06 | 22:54–23:05 | 127/41 (línea base) | — |
| B1 | hecho | auto/b1-cuenta-rgpd | 23:05–23:16 | 136/41 | aplazado a B5 (con B2) |
| B2 | hecho | auto/b2-seguimiento | 23:16–23:27 | 139/41 | auditor-lineas-rojas pendiente de lanzar |
| B3 | hecho | auto/b3-empresas-i | 23:27–00:00 | 154/41 | revisor-seguridad + auditor-lineas-rojas sobre B3+B4 juntos |
| B4 | hecho | auto/b4-enviar-bandeja | 00:00–00:20 | 159/41 | revisor-seguridad + auditor-lineas-rojas sobre B3+B4 juntos, a continuación |
| B5 | parcial | autonomo/2026-11-06 | 00:20–(corte) | 159/41 | ver abajo: 2 de 3 revisores fallaron por límite de uso, no por hallazgos |

## Decisiones técnicas (porqué en 1–2 líneas)
- **B1, borrado con función en vez de GRANT DELETE:** `borrar_cuenta_propia(id)` (SECURITY DEFINER) en vez de dar DELETE directo a `horma_web` sobre `usuarias`. Así un fallo en el código de la web no puede borrar un id ajeno, y la base bloquea sola cualquier intento de borrar una cuenta `admin` (defensa también fuera del código de la página).
- **B1, descargar datos sin tocar disco:** la ruta web solo usa `SQL_EXPORTAR` (JSON al momento, sin hash); no reutiliza la parte de `scripts/exportar.ts` que copia carpetas de disco (pensada para la exportación completa que hace Mar por terminal, no para el autoservicio de la usuaria). Más simple y sin dejar archivos con datos personales en el servidor.
- **B1, cambiar contraseña en cuenta solo-Google:** no se ofrece (no hay hash que verificar); la página lo explica en una frase. Decisión técnica, reversible si Mar prefiere otra cosa.
- **B2, mismo bloqueo por rol para los estados nuevos que para aprobada/enviada:** aunque el importador nunca intenta escribir `entrevista`/`rechazada`/`sin_respuesta`/`descartada` (su UPDATE solo corre en `borrador`/`pendiente_de_ti`), añadí el mismo `current_user = 'horma_web'` que ya protegía `aprobada`/`enviada`: defensa en la base, no solo en el código de hoy.
- **B2, «Portada: contadores propios por estado»:** lo interpreté como la cabecera de `/seguimiento` (no la portada `/`, que es solo de administración y a la que la usuaria no llega). Es la lectura más simple; si Mar quería los contadores en otro sitio, se mueve fácil.
- **B3, identidad de empresa totalmente aparte:** tablas, cookie y módulo de sesión propios (`sesion-empresa.ts`), nunca comparten código con `sesion.ts`. Más código duplicado (login, bloqueo de intentos) que reutilizarlo, pero es justo lo que pide el plan («identidad aparte») y lo que hace imposible que una sesión cruce de mundo.
- **B3, moderación con disparador en la base, no solo en el código:** igual que `candidaturas_transicion` (B2), `ofertas_moderacion` repite la regla «nace pendiente_de_revision» y las transiciones permitidas dentro de la base. Coherente con el estilo ya usado en el proyecto (defensa en profundidad) y encontré con `docker exec` que sí hace falta: si confiara solo en el código, un fallo futuro podría publicar sin revisión.
- **B3, url de una oferta de empresa:** no hay página original externa; la columna `url` exige `http(s)` (migración 002, `revisor-seguridad`), así que apunta a `/ofertas` de la propia web en vez de un texto descriptivo. Funciona, pero el texto del enlace («Ver oferta original») queda un poco raro para una oferta que nace en Horma; cosmético, no lo toco ahora.
- **B3, editar tras aprobar vuelve a revisión:** decisión propia (el plan no lo detalla): si se deja editar una oferta ya aprobada sin pasar otra vez por moderación, una empresa podría publicar algo inocuo y cambiarlo después. «Cerrar» no pasa por revisión (solo reduce exposición, nunca la aumenta).
- **B4, retirar no revierte el estado de la candidatura:** queda en «enviada» (es cierto: se envió, y luego se retiró; no hay transición `enviada → aprobada` en el disparador de B2 y abrirla para esto solo habría complicado la máquina de estados sin que el plan lo pidiera). Si Mar prefiere que vuelva a «aprobada» para poder reenviarla, es un cambio pequeño y aislado.
- **B4, nombre de contacto escrito en el momento:** la usuaria no tiene un campo «nombre» guardado en ningún sitio (perfil no lo pide); si marca compartir contacto, lo escribe ahí mismo y se guarda solo en `envios_empresa`. El correo de contacto es siempre el de su cuenta (nunca uno que escriba ella), para que no pueda compartir, ni por error, un correo que no es suyo.

## Preguntas para Mar (opciones, recomendada marcada)
(ninguna todavía — se repasa en el cierre, B5)

## Hallazgos de revisores aplazados (con solución propuesta)
(revisor-seguridad sobre B1 y B2 se aplica en el cierre, B5, según el modo ahorro del plan)

## Migraciones aplicadas (número, qué hace, rollback)
- **016_borrar_cuenta_propia.sql:** función `borrar_cuenta_propia(id)` para que `horma_web` pueda borrar su propia cuenta sin `GRANT DELETE`; nunca borra una cuenta `admin`. Rollback: `REVOKE EXECUTE ON FUNCTION borrar_cuenta_propia(text) FROM horma_web; DROP FUNCTION borrar_cuenta_propia(text);`
- **017_seguimiento.sql:** `CREATE OR REPLACE FUNCTION candidaturas_transicion()` con los pares nuevos (ver bitácora). Rollback: recrear la función con el cuerpo de la migración 015 (solo `borrador→aprobada`, `aprobada→enviada` y el vaivén `borrador/pendiente_de_ti`).
- **018_empresas.sql:** tablas `empresas`, `cuentas_empresa`, `sesiones_empresa`; columnas `ofertas.descripcion`, `ofertas.estado_publicacion` (por defecto `aprobada`), `ofertas.empresa_id`; disparador `ofertas_moderacion`. Rollback en la cabecera del archivo.
- **019_envios_empresa.sql:** tabla `envios_empresa` (copia congelada de CV/carta, contacto opcional, estado de bandeja). Incluye `GRANT USAGE ON SEQUENCE envios_empresa_id_seq` (se me olvidó al escribirla; lo encontré probando el INSERT a mano y lo corregí en el propio archivo antes de fundir, sin dejarlo para después). Rollback: `DROP TABLE envios_empresa;`.

## Siguiente paso exacto
**Corte por límite de uso de la cuenta (no por fallo de Horma).** Mar volvió antes de las 10 h, pidió asegurar el trabajo (documentar, commit, push) y abrirá una sesión nueva. Ya hecho en el cierre del 7-nov: documentación al día, commits en local **y las cinco ramas subidas a `origin`** (`autonomo/2026-11-06`, `auto/b1-cuenta-rgpd`, `auto/b2-seguimiento`, `auto/b3-empresas-i`, `auto/b4-enviar-bandeja`); `main` sigue intacta y bloqueada en `.claude/settings.json`. Al retomar:
1. Lee este archivo y `docs/autonomo/resumen-para-mar.md`.
2. Faltan por lanzar: `revisor-seguridad` sobre B3+B4 (falló por límite de tasa, iba bien: solo había confirmado que `empresa_id` siempre sale de la sesión) y `revisor-seguridad` sobre B1+B2 (falló por el límite de 5 h, iba bien: logging limpio, sin PII). Ninguno de los dos encontró ningún hallazgo antes de cortarse: hay que repetirlos, no reanudarlos a ciegas.
3. Falta por hacer del plan de B5: `docs/informe-pruebas.md` (sección nueva con el resumen de esta noche); confirmar que no quedan procesos de prueba corriendo (ya comprobado: ninguno); decidir con Mar si se funde `autonomo/2026-11-06` en `main` o se descarta o se acepta por bloques.
4. Nada de B0 a B4 quedó roto: 159 tests web, 41 evals, build/lint/tsc limpios, probado en el navegador de punta a punta. Lo que falta es la última capa de revisión, no arreglos.
5. `git push` está otra vez en el `deny` de `.claude/settings.json` (lo levanté solo para el push de cierre del 7-nov y lo repuse al terminar). Si hay que volver a empujar, pide la misma autorización explícita a Mar antes de tocar esa línea.

## Revisores
- **auditor-lineas-rojas sobre B1+B2 (tras B2): sin hallazgos.** Cumplen todas las líneas rojas. Único punto no bloqueante: la nota libre de «Registrar respuesta» (seguimiento) confía en el aviso de la UI para que la usuaria no escriba datos de un tercero; el auditor propone, si se quiere reforzar más adelante, una confirmación suave en el cliente si el texto parece un nombre o un correo. No es línea roja incumplida (la nota es de la propia usuaria, sobre su propio proceso, protegida por el mismo borrado/exportación RGPD); lo dejo anotado para Mar, no lo construyo ahora.
- **auditor-lineas-rojas sobre B3+B4: sin hallazgos.** Cumplen todas las líneas rojas, con buena defensa en profundidad (disparador `ofertas_moderacion`, `SQL_BANDEJA` con test-guardián propio). Dos puntos menores, ya corregidos: el comentario de `scripts/borrar.ts` no mencionaba `envios_empresa` en la cascada, y el resumen en seco no los contaba (los dos arreglados en el commit `682b172`, antes de este corte).
- **revisor-seguridad sobre B3+B4: FALLÓ por límite de tasa (HTTP 429) a mitad de revisión.** Lo poco que alcanzó a confirmar: `empresa_id` siempre sale de la sesión, nunca del formulario. No encontró ningún hallazgo antes de cortarse. **Pendiente: repetirlo entero.**
- **revisor-seguridad sobre B1+B2: FALLÓ por el límite de 5 horas de la cuenta a mitad de revisión.** Lo poco que alcanzó a confirmar: la lista de observabilidad (`registrarEvento`) está bien acotada, sin datos personales. No encontró ningún hallazgo antes de cortarse. **Pendiente: repetirlo entero.**
