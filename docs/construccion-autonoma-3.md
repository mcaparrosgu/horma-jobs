# Construcción autónoma III (≈ 4 h, sin Mar) · 7-nov-2026

Tercera sesión autónoma, **corta y con solo estructuras que tienen el ok del profesor y de la Copiloto**. Sustituye a `docs/construccion-autonoma-2.md`, que queda aplazado (sus bloques de adaptadores de fuentes, «buscar también en…» y supervisor del envío esperan licencias, URL a comprobar y la respuesta del profesor a las preguntas 10 y 17). **Hereda las reglas de `docs/construccion-autonoma.md`** (sección 3: «Modo ahorro», «Cómo trabajas», «Dudas» y «Prohibido»; sección 5: «Puerta de calidad»; sección 7: plantillas). Aquí solo se dice lo que cambia. Estado de la ejecución: `docs/autonomo/estado-3.md`. Resumen para Mar: `docs/autonomo/resumen-para-mar-3.md`.

## 1. Bloques

| # | Bloque | Por qué tiene ok | Estimado |
|---|---|---|---|
| A0 | Retoma, línea base, copia de la base | — | 15 min |
| A1 | **Calidad de ofertas:** deduplicación capas 1-2, cierre de caducadas por reglas, etiqueta de transparencia | Profesor 5-nov: «ingesta como antes» (fuentes, filtros, deduplicación) | 75 min |
| A2 | **CSP estricta y escapado de texto** | Su documento (pista B: «texto siempre escapado y CSP estricta») | 35 min |
| A3 | **Seguridad por filas (RLS) con su test «leer datos de otra usuaria falla»** | Su documento (pista B, base de datos) | 100 min |
| A4 | Cierre: revisores, guía de pruebas, informe, bitácora, resumen | siempre | 30 min |

Total ≈ 4 h 15. **Si falta tiempo se recorta A3** (se queda lo hecho si pasa su puerta, el resto se anota); nunca A4. A4 empieza a inicio + 3 h 30 pase lo que pase.

**No se toca:** `endpoints.json` y cualquier fuente nueva, Lanbide, supervisor del envío, Playwright, voz, minijuegos, MCP, PWA, cola y worker (pregunta 29 sin respuesta), Google OAuth real, correo, despliegue, Stripe, `pg_trgm` y cualquier dependencia o servicio nuevos. **Descartado al 100 % (Mar):** que la candidata aporte ofertas.

## 2. Antes de lanzar (Mar)

1. Aplica el `settings.json` de la noche (26 reglas `deny`: `.env`, `docs/privado/`, `git push`, `main`, borrados). En PowerShell, desde la carpeta del proyecto:
   `Copy-Item docs\autonomo\settings-autonomo.json .claude\settings.json -Force`
   Por la mañana lo deshaces con `git checkout .claude/settings.json` (el commit tiene el `deny` reducido que usas contigo). Este `deny` ya no bloquea `git add` de rutas que empiezan por punto (`.claude/…`) y sigue bloqueando `git add .`, `git add -A` y `git commit -a`.
2. Docker abierto con `horma-db` sana.
3. Terminal nueva en la carpeta del proyecto: `claude --model sonnet`. Pide «lee web/.env»: tiene que negarse. Pega el prompt de la sección 3.
4. Crédito: si se agota, `estado-3.md` permite retomar sin perder nada.

## 3. El prompt (se pega tal cual)

````text
Actúa como la Copiloto de Horma jobs (CLAUDE.md del proyecto: síguelo al pie de la letra). Esta sesión es en MODO AUTÓNOMO: Mar estará ausente unas 4 horas y no puedes preguntarle nada. Esta orden sustituye a la regla «plan y espera su ok»: el plan está escrito. Tu objetivo único es que lo construido FUNCIONE de punta a punta, probado y mostrado; funcionar de verdad vale más que cualquier cosa bonita o a medias.

## Empieza así
1. Lee `docs/construccion-autonoma-3.md` entero y, de `docs/construccion-autonoma.md`, las secciones 3 (el prompt antiguo: sus reglas «Modo ahorro», «Cómo trabajas», «Dudas» y «Prohibido» siguen vigentes; B0 a B4 ya NO se hacen), 5 y 7. Después `docs/tareas-pendientes.md`, `docs/autonomo/resumen-para-mar.md`, las tres últimas entradas de `docs/bitacora.md` y `git status`.
2. Si existe `docs/autonomo/estado-3.md`, es una sesión retomada: sigue por donde dice, no rehagas nada. Si no existe, ejecuta A0.
3. Anota en `estado-3.md` la hora de inicio con `date -Iseconds` y la hora límite (inicio + 4 h). Mira `date` antes de cada bloque. A inicio + 3 h 30 empieza A4 pase lo que pase.

## Qué cambia respecto a las sesiones anteriores
- Estado: `docs/autonomo/estado-3.md` y `docs/autonomo/resumen-para-mar-3.md`. Rama de integración `autonomo/<fecha de hoy>` salida de la rama actual (no de `main`). Ramas de bloque `auto/aN-nombre`.
- Línea base: la que midas en A0 (no puede bajar). Esperado: ≥ 164 tests web y ≥ 42 evals, `build`, `lint` y `tsc` limpios.
- No hay red ni búsquedas web. Datos de prueba INVENTADOS (ids con prefijo `auto-`). Nunca leas `datos/usuarias/` ni `docs/privado/`.
- No instales nada ni añadas servicios. Si un bloque lo necesita, no lo hagas y anótalo en «Preguntas para Mar» con tu recomendada.
- Los commits son por nombre de archivo, con `git diff` antes. Los `evals/…` que ya vengan modificados en `git status` son resultados regenerados: no entran en ningún commit.

Empieza por A0. Cuando acabes (o llegue la hora límite), haz A4 y deja `docs/autonomo/resumen-para-mar-3.md`.
````

## 4. Bloques en detalle

### A0 · Retoma (≤ 15 min)
- Lee el estado anterior; `docker ps` (`horma-db`); línea base completa (`cd web && npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build`, `python -I evals/correr_evals.py`). Si algo está rojo y no se arregla en 15 min, **para** y escribe el resumen.
- Copia nueva: `docker exec horma-db pg_dump …` a `datos/copias/pre-autonomo3-<fecha>.sql` (comprueba antes con `git check-ignore`; usuario y base como en `docs/autonomo/estado.md`; no leas `.env`). Anota cómo restaurarla.
- Rama `autonomo/<fecha>` desde la actual y `docs/autonomo/estado-3.md` con la plantilla de la sección 7 de `construccion-autonoma.md`.

### A1 · Calidad de ofertas (≈ 75 min)
Todo en código y tests, sin LLM y sin red. **Nunca un modelo decide si una oferta es «fantasma»; solo hechos.**
- **Migración 021 aditiva** (la 020 ya la usó el cierre de seguridad del 7-nov; rollback comentado en la cabecera), sobre `ofertas` (hoy: `id`, `fuente`, `url`, `fecha`, `titulo`, `empresa`, `ubicacion`, `ejecucion_id`, `creada_en`…): `url_canonica`, `huella`, `grupo_dedup`, `primera_vista`, `ultima_vista`, `veces_vista` (empieza en 1) y `fecha_cierre date` (opcional). Índices en `url_canonica` y `huella`; **sin restricción UNIQUE nueva** (podría romper datos existentes). Rellena las filas existentes en la propia migración con valores neutros.
- **Esquema `oferta`** (`.claude/skills/esquemas-horma/schemas/oferta.json`): campo opcional `fecha_cierre` (AAAA-MM-DD o null), versión menor con entrada en `CHANGELOG.md`, y una línea en `docs/autonomo/estado-3.md` («afecta a la pista A»). Solo aditivo.
- **Capa 1 (identidad exacta):** `(fuente, id)` ya es la clave; añade la URL canónica (sin parámetros de seguimiento `utm_*`/`fbclid`/`gclid`, minúsculas en esquema y host, sin barra final ni fragmento). Función pura en `web/src/lib/` con tests.
- **Capa 2 (huella determinista):** hash de empresa normalizada + título normalizado + municipio + semana de `fecha`. Normalizar: minúsculas, sin tildes, sin «(m/f)», «h/m», «(h/m/d)», sin formas jurídicas (SL, SA, SLU…), espacios colapsados. Misma huella → mismo `grupo_dedup`. **Al agrupar no se borra nada:** se conservan todas las filas con su licencia y atribución, y en las listas se muestra una por grupo, la de mejor licencia (`empresa` > `socio` > `abierto`) y, a igualdad, la más reciente. Un test debe demostrar que no se pierde ninguna fila.
- **Importador** (`web/src/lib/importar.ts`): al re-importar una oferta, `ultima_vista = now()`, `veces_vista += 1`; al crearla, `primera_vista = now()`. Calcula `url_canonica`, `huella` y `grupo_dedup`.
- **Reglas de caducidad, calculadas al mostrar (sin tareas programadas), en una función pura con tests:**
  1. `fecha_cierre` anterior a hoy → «cerrada» (no sale en `/ofertas` por defecto ni se recomienda).
  2. Más de 45 días desde `ultima_vista` (o desde `fecha` si no hay otra cosa) → «puede no estar vigente» (baja en el orden, sigue visible).
  3. Misma huella en dos o más ofertas con semanas de `fecha` distintas → «oferta recurrente».
  La regla «desaparece del feed en dos lecturas» **no se implementa**: las ingestas son parciales (`--limite`) y no se puede saber qué falta. Anótalo en «Preguntas para Mar».
- **Etiqueta de transparencia** en `/ofertas` y en las recomendaciones: antigüedad en días, nº de veces vista, fuente, licencia y las marcas de arriba. **Solo hechos, ningún juicio sobre la empresa.** El matcher y la nota no cambian.
- Puerta especial: migración probada con `horma_web` y `horma`, segunda pasada sin cambios, `npm run verificar` limpio, y una pasada en el navegador con dos ofertas casi iguales de dos fuentes inventadas y una cerrada.
- `auditor-lineas-rojas` sobre A1 al final de la sesión (modo ahorro).

### A2 · CSP estricta y escapado (≈ 35 min)
- Hoy `web/next.config.ts` solo envía `frame-ancestors 'none'`. Añade una CSP con nonce por petición generada en `web/src/proxy.ts` (Next 15/16): `default-src 'self'`, `script-src 'self' 'nonce-…' 'strict-dynamic'` (más `'unsafe-eval'` solo en desarrollo), `style-src 'self' 'unsafe-inline'`, `img-src 'self' data:`, `connect-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, `frame-ancestors 'none'`. Si algo exige abrir más, abre lo mínimo y anótalo con el motivo.
- Comprueba con `npm run build` + arranque de producción en 127.0.0.1 y Playwright (`browser_console_messages`) que ninguna página (candidata, empresa, admin, entrar) lanza violaciones de CSP. Mata el servidor al terminar.
- Auditoría de escapado: busca `dangerouslySetInnerHTML`, `innerHTML` y `eval`; si alguno existe, justifícalo o quítalo. Añade un test que **falle si aparece** en `web/src` (lista blanca vacía).
- Hecho cuando: build en verde, cabecera presente en todas las rutas, navegador sin violaciones, test del escapado en verde.

### A3 · Seguridad por filas (RLS) (≈ 100 min)
Objetivo: aunque una consulta de la web se equivoque de `usuaria_id`, la base no entrega filas ajenas. Defensa en profundidad; no sustituye a las comprobaciones de las páginas.
- **Diseño** (decídelo y anótalo en `estado-3.md`): `horma_web` entra por un único pool (`web/src/lib/db.ts`, usado en ≈ 32 archivos). Añade un ayudante `conUsuaria(usuariaId, fn)` que abre cliente, `BEGIN`, `SELECT set_config('app.usuaria_id', $1, true)`, ejecuta `fn(client)` y hace `COMMIT`/`ROLLBACK`. Las políticas usan `current_setting('app.usuaria_id', true)`. Sin la variable, **no hay filas** (falla cerrado).
- **Alcance, por tablas y de más a menos sensible; para cuando se acabe el tiempo, no antes:** `perfiles`, `preferencias`, `matches`, `candidaturas`, `envios_empresa` (la política de empresa va por su propia variable y solo ve lo suyo), y el resto de tablas con `usuaria_id` que existan. `ofertas`, `fuentes` y `ejecuciones_ingesta` no llevan RLS (son comunes). El dueño `horma` (importador, migraciones, terminal) no está sujeto a RLS: no pongas `FORCE` salvo que el diseño lo pida y lo pruebes.
- **Migración 022 aditiva por tabla** (`ENABLE ROW LEVEL SECURITY` + política `USING`/`WITH CHECK`), con rollback comentado (`DISABLE` y `DROP POLICY`). Aplícala tabla a tabla y corre los tests tras cada una.
- **Migra las consultas de esas tablas a `conUsuaria`** (sesión → id). Las rutas de administración que hoy no leen datos personales no cambian. Las consultas que rompan por falta de variable se arreglan, no se apagan políticas.
- **Test que manda** (nuevo, contra la base real con `horma_web`, con dos usuarias inventadas `auto-a` y `auto-b`): (1) con `app.usuaria_id = auto-a`, leer o actualizar filas de `auto-b` devuelve 0 filas / 0 actualizadas; (2) sin la variable no se ve nada; (3) insertar una fila con otro `usuaria_id` falla; (4) rompiendo la política a propósito, el test falla. Más una prueba de que la bandeja de empresa sigue sin ver nada de candidatas fuera de lo enviado.
- **Hecho cuando:** los tests del riesgo pasan y fallan al romperlos; `npm test`, `tsc`, `lint`, `build` y evals en verde; en el navegador, dos usuarias inventadas ven solo lo suyo en recomendaciones, candidaturas y seguimiento; `npm run verificar`, `npm run exportar` y `npm run borrar` (en seco) siguen funcionando; `revisor-seguridad` sin críticos ni altos abiertos.
- **Si no da tiempo:** deja la rama sin fundir con lo que pase su puerta y anota las tablas pendientes y el motivo. Es preferible 2 tablas bien probadas a 8 a medias.

### A4 · Cierre (≥ 30 min, siempre)
1. Puerta de calidad completa sobre la rama de integración.
2. Revisores (modo ahorro): `revisor-seguridad` sobre A2+A3 y `auditor-lineas-rojas` sobre A1+A3. Los hallazgos de un revisor que no ejecuta código son hipótesis: compruébalos antes de arreglar.
3. `docs/artefactos/guia-pruebas-manuales.md`: secciones nuevas (17 en adelante, para una principiante) de calidad de ofertas, CSP y RLS. `docs/informe-pruebas.md`, `docs/tareas-pendientes.md`, `docs/indice.md` y bitácora (prosa y «En llano», con el tema del bootcamp). No se publica ningún artefacto.
4. Borra solo tus cuentas de prueba (`auto-`) y comprueba que no queda ningún proceso corriendo.
5. Escribe `docs/autonomo/resumen-para-mar-3.md`: hecho / no hecho / bloqueado, migraciones con su rollback, decisiones, preguntas para ella (con tu recomendada), cómo restaurar la copia y los comandos para revisar y aceptar.

## 5. Qué mirar después (Mar)
1. Deshacer el `settings.json` de la noche: `git checkout .claude/settings.json`.
2. `docs/autonomo/resumen-para-mar-3.md` (3 minutos).
3. `git log --oneline` y `git diff --stat` de la rama de integración frente a la actual.
4. Probar a mano las secciones nuevas de la guía. Solo entonces: aceptar (con tu orden a la Copiloto), aceptar por bloques o descartar.
