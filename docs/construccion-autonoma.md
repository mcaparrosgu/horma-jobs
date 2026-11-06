# Construcción autónoma de Horma (≈ 10 h, sin Mar)

Prompt y estructura para que Sonnet 5.5 construya lo que falta mientras Mar está ausente. Sustituye al «Prompt de construcción optimizada» de `tareas-pendientes.md` solo para esta sesión. Estado de la ejecución: `docs/autonomo/estado.md` (lo crea el paso B0).

## 1. Qué se construye y qué no

| # | Bloque | Tronco/rama | Estimado |
|---|---|---|---|
| B0 | Preparación, copia de la base y línea base | — | 30 min |
| B1 | Cuenta: «Descargar mis datos», «Borrar mi cuenta» y cambiar contraseña (RGPD) | obligación | 90 min |
| B2 | Seguimiento: `/seguimiento` con estados y registro | tronco | 100 min |
| B3 | Portal de empresas I: cuentas de empresa, publicar oferta, moderación | tronco | 120 min |
| B4 | Portal de empresas II: «Enviar a la empresa» y bandeja de la empresa | tronco | 100 min |
| B5 | Cierre: revisores, guía de pruebas, informe, bitácora, resumen | siempre | 45 min |

Total ≈ 8 h. **Si falta tiempo o crédito se recorta B4** (B3 queda hecho). Nunca el cierre ni los revisores. B4 no se empieza sin B2 ni B3. **Si acaba antes, para:** nada de trabajo extra.

**Descartado definitivamente (Mar, 6-nov):** ofertas que trae la usuaria (pegar texto o enlace). **Para mañana, con Mar:** supervisor del envío automático, calidad de ofertas (duplicados y caducadas) y fuentes nuevas.

**No se toca (necesitan decisión de Mar, dinero o dependencias):** Google OAuth real, correo (verificación, recuperar contraseña, reenvío de respuestas), despliegue, PWA, Stripe, entrevista/voz/minijuegos, servidor MCP, ejecutor de formularios (Playwright), ampliar fuentes, embeddings, LangGraph, límites por IP (no hay despliegue aún), `"type": "module"`.

## 2. Antes de irte (Mar)

1. ~~Suspensión del ordenador~~ hecho. Docker ya está abierto y `horma-db` sana (comprobado).
2. **Pega el bloque de `settings.json`** de `docs/ajustes-pendientes-settings.md` (pasos en ese documento). Bloquea `.env`, `docs/privado/`, `git push`, `main` y borrados.
3. **Lánzala** en una terminal nueva, en la carpeta del proyecto: `claude --model sonnet` (el modo «aceptar ediciones» lo pone el propio `settings.json`). Comprueba que se niega a leer `web/.env` y pega el prompt de la sección 3.
4. **Crédito: 20 €.** No sé cuánto gastarán 8 h de Sonnet; puede no llegar. Por eso va en modo ahorro y con el bloque más prescindible al final. Si se agota, se para y `estado.md` permite retomar sin perder nada.
5. Si te da tiempo, mira el gasto tras el primer bloque (unos 30-60 min): si B0 y B1 ya se comen mucho más de 5 €, quita B4 del prompt.

## 3. El prompt (se pega tal cual al abrir la sesión de Sonnet 5.5)

````text
Actúa como la Copiloto de Horma jobs (CLAUDE.md del proyecto: síguelo al pie de la letra). Esta sesión es en MODO AUTÓNOMO: Mar estará ausente unas 10 horas y no puedes preguntarle nada. Esta orden sustituye a la regla «plan y espera su ok»: el plan ya está escrito en `docs/construccion-autonoma.md`. Tu objetivo único es que Horma FUNCIONE de punta a punta con lo que falta, probado y mostrado; funcionar de verdad vale más que cualquier cosa bonita o a medias.

## Empieza así
1. Lee `docs/construccion-autonoma.md` entero. Después `docs/tareas-pendientes.md` («Retomar: empieza aquí»), las tres últimas entradas de `docs/bitacora.md` y `git status`.
2. Si existe `docs/autonomo/estado.md`, es una sesión retomada: sigue por donde dice, no rehagas nada. Si no existe, ejecuta B0.
3. Anota en `estado.md` la hora de inicio con `date -Iseconds` y la hora límite (inicio + 10 h). Mira `date` antes de cada bloque y cada hora.

## Modo ahorro (presupuesto: 20 € de crédito; cada token cuenta)
- Lee solo lo que necesitas: `Grep` antes que `Read`, y `Read` con offset/limit. No releas lo que acabas de escribir.
- Filtra la salida de los comandos (`tail`, recuentos): nunca logs enteros.
- Sin búsquedas web, sin `Explore` y sin ningún agente de Horma (`/candidatura`, `/ingestar-ofertas`, `/recomendar`…): solo código y tests.
- Revisores, solo tres pasadas en toda la noche: `auditor-lineas-rojas` tras B2; `revisor-seguridad` + `auditor-lineas-rojas` sobre B3 y B4 juntos; `revisor-seguridad` sobre B1 y B2 en el cierre.
- Mientras construyes, `npx tsc --noEmit` y `npm test`; `build`, `lint` y evals, una sola vez por bloque, en la puerta.
- Navegador: una pasada por bloque, con `browser_snapshot` (texto); capturas de pantalla solo si algo falla.
- Bitácora y estado: lo esencial, sin repetir.

## Cómo trabajas
- Bloques en el orden de la sección 1. Cada bloque en su rama `auto/bN-nombre` salida de `autonomo/<fecha>`; solo se funde (`git merge --no-ff`, en local) si pasa TODA su puerta de calidad (sección 5). Si no pasa, la rama queda sin fundir, la marcas «BLOQUEADO» con el motivo y sigues con el siguiente bloque que no dependa de ella.
- Un solo hilo de implementación. Subagentes solo los revisores del modo ahorro (contexto limpio, solo lectura). Los hallazgos de un revisor que no pudo ejecutar código son hipótesis: las compruebas antes de arreglar.
- Cada paso con prueba real: muestra la salida del comando (recuentos de tests, errores incluidos). No des nada por hecho sin ver la salida.
- Al acabar cada bloque: actualiza `estado.md`, `docs/bitacora.md` (prosa y párrafo «En llano», con el tema del bootcamp que practica), `docs/tareas-pendientes.md` y commit por archivo con nombre (`git diff` antes; nunca `git add .` ni `-A`).
- Tu contexto se compacta en diez horas: tras cualquier compactación, relee `docs/construccion-autonoma.md` (secciones 3 a 6) y `estado.md` antes de seguir.
- Si te atascas (el mismo error 3 veces): cambia de enfoque una vez; si sigue, aparca el bloque y pasa al siguiente. No gastes más del 150 % del tiempo estimado en un bloque.
- Tiempo: no empieces un bloque si quedan menos de (estimado del bloque + 60 min) hasta la hora límite. A inicio + 9 h empieza el cierre (B5) pase lo que pase.

## Dudas (nadie te contesta: decide tú con este orden)
1. Duda técnica → decide la opción más simple y reversible; anótala en `estado.md` («Decisiones», 1–2 líneas con el porqué).
2. Duda sobre lo que Mar quiere (objetivo, producto) → elige la opción más conservadora y reversible que no exponga datos ni fije contratos; anótala en «Preguntas para Mar» con 2–4 opciones y tu recomendada, y sigue.
3. Duda sobre una línea roja, RGPD o AI Act → NO construyas esa parte. Anótala y sigue con lo demás.
4. Algo irreversible, de pago o que pida una dependencia/servicio nuevo → no lo hagas; anótalo.

## Prohibido (además de lo del CLAUDE.md)
- `git push` de cualquier tipo, tocar `main` (ni commit, ni merge, ni checkout), `reset --hard`, `clean`, `rebase`, `--force`, saltarse hooks.
- Leer o imprimir `.env`, `docs/privado/` o credenciales. Los datos reales de Mar (`datos/usuarias/mar/`, su cuenta, su CV) no se leen para tests, ejemplos, logs ni commits: todo con datos INVENTADOS (ids con prefijo `auto-`). Borra al final las cuentas de prueba que tú crees, solo las tuyas.
- Cualquier herramienta MCP (Gmail, Drive, Notion, Vercel, Lovable, v0, n8n, GitHub, Obsidian, Sheets…) y publicar artefactos. Solo Playwright MCP para probar la web local en 127.0.0.1.
- Instalar dependencias o servicios, enviar correos, llamar a webs externas desde el código, tocar Jobs, n8n o Docker aparte de `horma-db`.
- Cambios de base de datos que no sean aditivos (nada de `DROP`, `TRUNCATE`, cambiar o borrar columnas o datos existentes; el rollback de cada migración va comentado en su cabecera).
- Dejar procesos en segundo plano: el servidor web de prueba se arranca en 127.0.0.1 y se mata al terminar; para `npm run build` no debe haber otro servidor usando `.next`.

Empieza por B0. Cuando acabes (o llegue la hora límite), haz el cierre (B5) y deja `docs/autonomo/resumen-para-mar.md`.
````

## 4. Estructura de trabajo

**Ramas.** `autonomo/<fecha>` (integración, sale de `main`) y una `auto/bN-nombre` por bloque. `main` no se toca. Mañana Mar decide: aceptar todo (`git merge --no-ff autonomo/<fecha>` en `main`, con su orden), aceptar por bloques, o descartar (`git branch -D`). **Ojo:** descartar la rama no deshace las migraciones ya aplicadas a la base local; por eso B0 hace una copia y cada migración lleva su rollback.

**Hilos de estado.** `docs/autonomo/estado.md` es el único punto de retoma (plantilla en la sección 7). `resumen-para-mar.md` es lo único que Mar tiene que leer por la mañana.

**Un bloque, un ciclo:** leer lo que toca → escribir primero el test del riesgo → código mínimo → puerta de calidad → revisores → bitácora y commits → fundir.

## 5. Puerta de calidad (todo en verde, con salida real, para fundir un bloque)

1. `cd web && npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` (leer la tabla del build: ninguna ruta con datos o sesión debe salir «estática») y `python -I evals/correr_evals.py`. Deben pasar, y no puede bajar el número de tests de la línea base (127 web, 41 evals).
2. Tests deterministas con datos inventados, sin LLM. Los del riesgo (acceso ajeno, línea roja, transición ilegal) se comprueban **rompiendo el código a propósito** para ver que fallan.
3. Migración: aditiva, cabecera con su rollback, aplicada con `npm run migrar`, segunda pasada sin cambios, probada con el rol `horma_web` y con `horma`; `npm run verificar` sigue limpio.
4. Una pasada en el navegador (Playwright MCP, 127.0.0.1, snapshots de texto) con dos cuentas inventadas: camino bueno, camino malo, id ajeno → 404.
5. `revisor-seguridad` siempre. Las pasadas que marca el modo ahorro. Críticos y altos se arreglan antes de fundir; el resto se anota con su solución en `estado.md`.
6. Cada ruta y acción comprueba sesión, rol y dueña por su cuenta (el `proxy.ts` es solo un primer filtro). Cada consulta SQL con parámetros, nunca texto pegado. Texto externo nunca como HTML.

## 6. Bloques

### B0 · Preparación (≤ 30 min)
- Lee el estado, comprueba `horma-db` (`docker ps`) y corre la línea base (puerta de calidad 1). Si algo está rojo y la causa no se arregla en 20 min, **para** y escribe el resumen: no se construye sobre rojo.
- Copia de seguridad: `docker exec horma-db pg_dump` de la base a `datos/copias/pre-autonomo-<fecha>.sql` (descubre usuario y nombre de base con `docker exec horma-db psql -U horma -l`; no leas `.env`). Antes, comprueba con `git check-ignore` que esa ruta está ignorada. Anota en `estado.md` cómo restaurarla.
- Rama `autonomo/<fecha>` desde `main`; primer commit con `docs/construccion-autonoma.md`, `docs/tareas-pendientes.md` e `docs/indice.md` (por nombre). Los archivos `evals/…` modificados que ya venían en `git status` son resultados regenerados: no los añadas a ningún commit.
- Crea `docs/autonomo/estado.md` con la plantilla de la sección 7.

### B1 · Cuenta y RGPD (≈ 90 min)
- Página `/cuenta` (sesión obligatoria): **Descargar mis datos** (reutiliza `SQL_EXPORTAR` y `datos-usuaria.ts`; solo los de la sesión), **Borrar mi cuenta** (pide la contraseña, o escribir el correo si solo entra con Google, y borra base + archivos con el mecanismo de cuarentena de `scripts/borrar.ts`) y **Cambiar contraseña** (pide la actual, aplica `problemaContrasena`, cierra las demás sesiones).
- La cuenta de administración **no** puede borrarse desde la web (solo por terminal) para no perder el acceso.
- Decide tú cómo dar el permiso mínimo de borrado al rol `horma_web` (p. ej. función en la base que borra solo el id que recibe de la sesión, o `GRANT DELETE`); migración aditiva y razonada en `estado.md`.
- **Hecho cuando:** tests de las reglas (sin sesión, otra usuaria, admin, contraseña mala); en el navegador, una cuenta inventada descarga su JSON (sin hash de contraseña), cambia la contraseña y se borra, y `npm run exportar -- --usuaria <id>` ya no encuentra nada.

### B2 · Seguimiento (≈ 100 min)
- Los estados ya están en el esquema `candidatura` (`entrevista`, `rechazada`, `sin_respuesta`, `descartada`). Migración que **amplía el trigger** `candidaturas_transicion`: desde `enviada` a `entrevista`/`rechazada`/`sin_respuesta`; desde `entrevista` a `rechazada`; descartar desde `borrador`, `aprobada` o `pendiente_de_ti`. `aprobada` y `enviada` siguen siendo solo del rol `horma_web`; los estados nuevos los escribe la usuaria con su sesión.
- Página `/seguimiento`: candidaturas de la usuaria agrupadas por estado, con fecha del último cambio y registro (historial) de cada una. Formulario «Registrar respuesta» (estado nuevo + nota opcional de ≤ 300 caracteres, sin datos de terceros; aviso bajo el campo). Aviso informativo «sin respuesta tras 21 días» **calculado al mostrar**, que la usuaria confirma con un botón; no hay tareas programadas.
- Portada: contadores propios por estado. `/tablero` y `/respuesta` (comandos de Claude Code) pasan a decir que el estado se cambia en la web; `/respuesta` solo clasifica el correo y propone la transición, **no la aplica**.
- **Hecho cuando:** tests de transiciones válidas e inválidas (también contra la base con ambos roles); el importador no degrada estados; en el navegador, enviada → entrevista → rechazada con su historial; una usuaria no ve ni toca las de otra; `auditor-lineas-rojas` sin hallazgos abiertos.

### B3 · Portal de empresas I: cuentas y publicar (≈ 120 min)
Decisiones ya tomadas (cámbialas solo con motivo):
- **Identidad aparte.** Tablas propias (`empresas`, `cuentas_empresa`, sesión de empresa con su propia cookie) y rutas bajo `/empresa/*`. Una sesión de empresa nunca vale para páginas de candidata ni al revés. Así ninguna consulta de candidatas puede mezclar empresas.
- **Alta de empresa solo por terminal** (`npm run cuenta-empresa`, modo piloto): sin verificación de correo no se abre el registro público. Reversible.
- **Moderación.** Toda oferta de empresa nace `pendiente_de_revision` y no aparece a nadie hasta que administración la aprueba en una página `/admin/ofertas-empresas` (solo rol admin). Es la defensa contra ofertas falsas o estafas.
- Formulario de oferta con campos cerrados y listas de la taxonomía (sin LLM): título, descripción (≤ 8000 caracteres, texto plano), ciudad, `pais: ES`, modalidad, contrato, nivel, salario opcional (publicado o no), requisitos, avisos (`ciudadania`, etc., declarados por la empresa). Validada con el esquema `oferta` (`origen {licencia: "empresa", atribucion: nombre de la empresa}`). Si el esquema necesita un campo nuevo, solo aditivo y opcional, con entrada en `CHANGELOG.md` de `esquemas-horma` y nota en `estado.md` (afecta a la pista A).
- Panel de empresa: sus ofertas, editar, cerrar. **Ninguna página de empresa lee perfiles, preferencias, matches ni candidaturas** (B4 añade la única excepción, la bandeja). Amplía la prueba de «lista blanca de lectores» de `preferencias.test.ts` para que lo vigile.
- **Hecho cuando:** tests; en el navegador, empresa inventada publica → oferta pendiente → administración aprueba → aparece en `/ofertas` con «Publicada en Horma por la empresa»; empresa A no toca ofertas de B (404); candidata no entra en `/empresa/*`; se revisa junto con B4.

### B4 · Portal de empresas II: enviar y bandeja (≈ 100 min)
- En `/candidaturas/[id]`, si la oferta es de empresa y la candidatura está `aprobada`: **«Enviar a la empresa»**. Pantalla de consentimiento que muestra **exactamente** lo que verá la empresa: CV y carta aprobados y, solo si ella marca la casilla, nombre y correo de contacto. Se guarda una **copia congelada** (`envios_empresa`) de la versión aprobada y se anota la candidatura como `enviada`, canal «portal de Horma».
- **No se comparte nunca:** nota de recomendación, ATS, traza, huecos, perfil humano, preferencias, otras candidaturas ni nada del perfil fuera del CV aprobado.
- Bandeja de la empresa por oferta: **orden fijo por fecha de recepción, sin ordenar, filtrar, buscar, puntuar ni contar por calidad** (AI Act Anexo III.4). Acciones: marcar «recibida / vista / en proceso / no seleccionada» (valores cerrados, sin texto libre). Ese estado lo ve la candidata en `/seguimiento` como información; no cambia por sí solo el estado de su candidatura.
- La candidata puede **retirar** su envío (borra la copia). Borrar cuenta de candidata o de empresa los borra en cascada; exportar incluye los envíos propios.
- **Hecho cuando:** tests, incluida una prueba que falla si aparece un `ORDER BY` distinto de la fecha, un filtro o una nota en la consulta de la bandeja; en el navegador, enviar, ver en la bandeja, cambiar estado, retirar, y empresa B no ve envíos a A; **`auditor-lineas-rojas` sin ningún hallazgo abierto: si no, la rama no se funde** y queda para Mar.

### B5 · Cierre (≥ 45 min, siempre)
1. Puerta de calidad completa sobre `autonomo/<fecha>`.
2. `revisor-seguridad` sobre el diff de B1 y B2 (B3 y B4 ya se revisaron juntos; si B4 se recortó, B3 entra aquí con ambos revisores); arreglos.
3. `docs/artefactos/guia-pruebas-manuales.md`: secciones nuevas (13 en adelante) con pasos claros para una principiante. Informe de resultados en `docs/informe-pruebas.md`. `docs/tareas-pendientes.md`, `docs/indice.md` y bitácora al día. No se publica ningún artefacto (se anota como pendiente).
4. Borra las cuentas de prueba creadas por ti (solo las de prefijo `auto-`); comprueba que el servidor de prueba ya no corre.
5. Escribe `docs/autonomo/resumen-para-mar.md`: hecho / no hecho / bloqueado, migraciones aplicadas con su rollback, decisiones, preguntas para ella con tu recomendada, cómo restaurar la copia y los tres comandos para revisar y aceptar.

## 7. Plantillas

**`docs/autonomo/estado.md`**
```
# Estado de la construcción autónoma
Inicio: <date -Iseconds> · Límite: <+10 h> · Rama de integración: autonomo/<fecha>
Línea base: web <n> tests · evals <n> · build <ok/fallo> · copia de la base: <ruta> (restaurar: <comando>)

| Bloque | Estado (pendiente/en curso/hecho/parcial/BLOQUEADO) | Rama | Hora | Tests (web/evals) | Revisores |
|---|---|---|---|---|---|

## Decisiones técnicas (porqué en 1–2 líneas)
## Preguntas para Mar (opciones, recomendada marcada)
## Hallazgos de revisores aplazados (con solución propuesta)
## Migraciones aplicadas (número, qué hace, rollback)
## Siguiente paso exacto
```

## 8. Qué mirar mañana (Mar, en orden)
1. `docs/autonomo/resumen-para-mar.md` (3 minutos).
2. `git log --oneline main..autonomo/<fecha>` y `git diff --stat main..autonomo/<fecha>`.
3. Las «Preguntas para Mar» y los bloques BLOQUEADOS.
4. Pruebas a mano con las secciones nuevas de la guía. Solo entonces: aceptar (con tu orden a la Copiloto), aceptar por bloques o descartar.
