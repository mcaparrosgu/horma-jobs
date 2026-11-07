# Construcción autónoma II (≈ 10 h, sin Mar) · 7-nov-2026

> **APLAZADA (7-nov, Mar).** Sustituida por `docs/construccion-autonoma-3.md` (4 h, solo estructuras con ok del profesor). Lo que sigue queda como referencia para cuando haya licencias verificadas y respuesta del profesor a las preguntas 10 y 17.

Segunda noche autónoma. **Hereda todas las reglas de `docs/construccion-autonoma.md`** (secciones 3 «Cómo trabajas / Dudas / Prohibido», 4 «Ramas», 5 «Puerta de calidad» y 7 «Plantillas»); aquí solo se dice lo que cambia. Estado de la ejecución: `docs/autonomo/estado-2.md` (lo crea C0). Resumen para Mar por la mañana: `docs/autonomo/resumen-para-mar-2.md`.

Decidido por Mar (7-nov): entran los **cuatro** bloques nuevos (calidad de ofertas, adaptadores de fuentes, enlaces «buscar también en…», supervisor del envío automático) más el cierre pendiente de la noche anterior.

## 1. Bloques

| # | Bloque | Tronco/rama | Estimado |
|---|---|---|---|
| C0 | Retoma, línea base y copia de la base | — | 20 min |
| C1 | Cierre pendiente de la noche 1: repetir los dos `revisor-seguridad` (B1+B2 y B3+B4), arreglos e `informe-pruebas.md` | obligatorio | 60 min |
| C2 | Calidad de ofertas: deduplicación capas 1-2, cierre de caducadas por reglas, etiqueta de transparencia | tronco | 120 min |
| C3 | Adaptadores de las fuentes abiertas medidas, **desactivados** | tronco | 120 min |
| C4 | Enlaces «buscar también en…» | rama pequeña | 30 min |
| C5 | Supervisor del envío automático (solo la capa de reglas en código) | tronco | 120 min |
| C6 | Cierre: revisores, guía de pruebas, bitácora, resumen | siempre | 45 min |

Total ≈ 8,6 h, con margen. **Si falta tiempo o crédito, se recorta en este orden: C5, luego C3, luego C2 parcial.** Nunca C1 ni C6. C4 es pequeño: se hace antes de recortar nada. C5 no se empieza sin C2.

**Descartado al 100 % (Mar, 7-nov), no se diseña ni se propone:** que la candidata aporte ofertas (pegar texto o enlace, extensión, alertas reenviadas). Los enlaces «buscar también en…» **sí** entran: los pone Horma y no importan nada.

**No se toca:** Lanbide (espera la respuesta de Mar sobre su `robots.txt`), Aragón, Galicia, Canarias, EURES/Euraxess, Jooble/Careerjet, `endpoints.json` (ninguna fuente nueva se registra), Google OAuth real, correo, despliegue, PWA, Stripe, entrevista/voz/minijuegos, servidor MCP, ejecutor de formularios con Playwright, embeddings, LangGraph, `"type": "module"`.

## 2. Antes de irte (Mar)

1. `settings.json` ya tiene el bloque `deny` completo repuesto (23 reglas: `.env`, `docs/privado/`, `git push`, `main`, borrados). Comprueba que se niega a leer `web/.env`.
2. Docker abierto con `horma-db` sana (comprobado el 7-nov).
3. Terminal nueva en la carpeta del proyecto: `claude --model sonnet` y pega el prompt de la sección 3.
4. Las ramas de la noche 1 (`auto/b1…b4`) y `autonomo/2026-11-06` ya están en `origin`; `main` intacta. Esta noche trabaja en `autonomo/2026-11-07`, salida de `autonomo/2026-11-06`.
5. Crédito: si se agota, `estado-2.md` permite retomar sin perder nada.

## 3. El prompt (se pega tal cual)

````text
Actúa como la Copiloto de Horma jobs (CLAUDE.md del proyecto: síguelo al pie de la letra). Esta sesión es en MODO AUTÓNOMO: Mar estará ausente unas 10 horas y no puedes preguntarle nada. Esta orden sustituye a la regla «plan y espera su ok»: el plan está escrito. Tu objetivo único es que Horma FUNCIONE de punta a punta con lo que falta, probado y mostrado; funcionar de verdad vale más que cualquier cosa bonita o a medias.

## Empieza así
1. Lee `docs/construccion-autonoma-2.md` entero y, de `docs/construccion-autonoma.md`, las secciones 3 (el prompt anterior: sus reglas «Modo ahorro», «Cómo trabajas», «Dudas» y «Prohibido» siguen vigentes), 5 y 7. Después `docs/tareas-pendientes.md`, `docs/autonomo/estado.md` y `docs/autonomo/resumen-para-mar.md`, las tres últimas entradas de `docs/bitacora.md` y `git status`.
2. Si existe `docs/autonomo/estado-2.md`, es una sesión retomada: sigue por donde dice, no rehagas nada. Si no existe, ejecuta C0.
3. Anota en `estado-2.md` la hora de inicio con `date -Iseconds` y la hora límite (inicio + 10 h). Mira `date` antes de cada bloque y cada hora.

## Qué cambia respecto a la noche anterior
- Estado: `docs/autonomo/estado-2.md` y `docs/autonomo/resumen-para-mar-2.md`. Rama de integración: `autonomo/2026-11-07` salida de `autonomo/2026-11-06` (no de `main`: `main` no tiene B0–B4). Ramas de bloque: `auto/cN-nombre`.
- Línea base esperada: 159 tests web y 42 evals, `build`, `lint` y `tsc` limpios. No puede bajar.
- Lo que Mar descartó (ofertas que aporta la candidata) no se diseña ni se propone.
- Las fuentes nuevas NO se registran en `endpoints.json`: solo adaptadores desactivados con tests. No descargas nada de la red: trabajas con muestras INVENTADAS con la forma de `docs/fuentes-formatos-2026-11-07.md`. No hay búsquedas web.
- Reglas de la sección «Dudas» de la noche anterior, más: si una decisión de producto no está en el plan, elige la opción más conservadora y reversible y anótala en «Preguntas para Mar».

Empieza por C0. Cuando acabes (o llegue la hora límite), haz el cierre (C6) y deja `docs/autonomo/resumen-para-mar-2.md`.
````

## 4. Bloques en detalle

### C0 · Retoma (≤ 20 min)
- Lee el estado anterior, `docker ps` (`horma-db`), línea base (puerta de calidad 1). Si algo está rojo y la causa no se arregla en 20 min, **para** y escribe el resumen.
- Copia nueva: `docker exec horma-db pg_dump …` a `datos/copias/pre-autonomo2-<fecha>.sql` (comprueba antes con `git check-ignore`). Anota cómo restaurarla.
- Rama `autonomo/2026-11-07` desde `autonomo/2026-11-06`. Si esos archivos ya vienen commiteados (la Copiloto los dejó listos el 7-nov), no hay primer commit que hacer; si no, primer commit, por nombre: `docs/construccion-autonoma-2.md`, `docs/fuentes-formatos-2026-11-07.md`, `docs/tareas-pendientes.md`, `docs/indice.md`, `docs/bitacora.md`. Los `evals/…` modificados que ya vengan en `git status` son resultados regenerados: no entran en ningún commit.
- Crea `docs/autonomo/estado-2.md` con la plantilla de la sección 7 de la noche anterior.
- **Aviso de permisos:** `.claude/settings.json` aparece como modificado a propósito (el `deny` completo repuesto por Mar); no lo commitees ni lo toques. El patrón `Bash(git add .*)` del `deny` también bloquea `git add` de rutas que empiezan por punto (`.claude/…`). **No lo esquives.** Para archivos ya rastreados dentro de `.claude/` (p. ej. `ingestar.py`) usa `git commit -m "…" -- <ruta>`; un archivo NUEVO dentro de `.claude/` no lo commitees y anótalo en «Preguntas para Mar». Los tests y los adaptadores nuevos van en `evals/` y en `ingestar.py`, así que no debería hacer falta.

### C1 · Cierre pendiente de la noche 1 (≈ 60 min)
- Repite **enteros** (no reanudar) `revisor-seguridad` sobre el diff de B3+B4 y sobre el de B1+B2. Pásales las rutas de los esquemas y de `docs/autonomo/estado.md`. Sus hallazgos son hipótesis hasta que los compruebas con código; críticos y altos se arreglan en una rama `auto/c1-revision`.
- Añade a `docs/informe-pruebas.md` la sección nueva de la noche 1 (159 tests web, 42 evals; qué se probó en el navegador; revisores y qué encontraron).
- Hecho cuando: ningún crítico ni alto abierto, informe escrito, puerta de calidad en verde.

### C2 · Calidad de ofertas (≈ 120 min)
Todo en código y tests, sin LLM y sin red. Referencia: `docs/privado` no se lee; las reglas son estas.
- **Deduplicación capa 1 (identidad exacta):** (fuente, id de origen) único; URL canónica normalizada (sin parámetros de seguimiento, minúsculas, sin barra final). Ver qué hace ya `npm run importar` y no repetirlo.
- **Capa 2 (huella determinista):** hash de empresa normalizada + título normalizado + municipio + semana de publicación. Normalizar: quitar «(m/f)», «h/m», mayúsculas, tildes, formas jurídicas (SL, SA…). Al fusionar **no se borra nada**: columna `grupo_dedup`, se conservan todas las fuentes con su licencia, y se muestra la de mejor licencia y enlace. La capa 3 (`pg_trgm`) **no se construye** (es una extensión nueva): los casos dudosos solo se cuentan y se anotan en «Preguntas para Mar».
- **Cierre de caducadas por reglas (nunca un modelo para decidir «fantasma»):** fecha de cierre o plazo vencido → cerrada ese día (empleo público); desaparece del feed en dos lecturas seguidas → cerrada; más de 45 días sin cambios → baja en resultados y etiqueta «puede no estar vigente»; la misma huella republicada varias veces → etiqueta «oferta recurrente». Se calcula al importar y al mostrar; sin tareas programadas.
- **Etiqueta de transparencia por oferta** en `/ofertas` y en la recomendación: antigüedad, nº de republicaciones, fuente y licencia. **Solo hechos, nunca una acusación a la empresa.** El salario aparece como «publicado / no publicado» solo si el dato existe.
- Migración **aditiva** (columnas nuevas, sin tocar datos existentes) con su rollback comentado; segunda pasada sin cambios; probada con `horma_web` y `horma`; `npm run verificar` limpio.
- Hecho cuando: tests de las tres capas y de cada regla de caducidad (rompiéndolas a propósito); en el navegador, dos ofertas casi iguales de dos fuentes aparecen agrupadas y una caducada sale marcada; `auditor-lineas-rojas` sin hallazgos tras C2+C4.

### C3 · Adaptadores de fuentes, desactivados (≈ 120 min)
- Un adaptador por fuente en `.claude/skills/fuentes-ofertas/scripts/ingestar.py`, siguiendo el patrón de `adaptar_boe`: `feina-activa-xml`, `cido-oposiciones`, `cyl-ofertas`, `murcia-sef`, `andalucia-ei`. Formatos, trampas y filtros exactos en `docs/fuentes-formatos-2026-11-07.md`. `andalucia-pld` solo si sobra tiempo y vale la pena.
- Cada adaptador: valida estructura, filtra por estado/plazo/origen según su ficha, deduplica dentro del feed, aplica `sin_contacto` a todo texto, descarta lo que no tenga id o URL y **cuenta lo descartado por motivo**. Un cambio de formato da un error claro (código fijo, sin traceback), nunca ofertas a medias.
- Paginación y cortesía del CIDO (`page[limit]`, `page[offset]`, pausa de 1 s, tope de páginas) en el código de descarga, probada **con un servidor simulado**, sin red real.
- Tests con muestras inventadas por fuente (casos buenos y malos: correo en el texto, HTML, tildes, fecha rota, duplicado, `Internet / Prensa`, plazo vencido, id ausente). Añádelos a `evals/ingesta/` y al eval `ingesta` de `evals/correr_evals.py`.
- **No se añade ninguna entrada a `endpoints.json`**: el registro lo hace Mar tras `/calificar-fuentes`. Deja en `estado-2.md` la entrada de ejemplo (con `activa: false`, `adaptador`, `licencia: POR_VERIFICAR`, `atribucion`) lista para copiar, y los pasos exactos para activarla.
- `revisor-seguridad` sobre este bloque (texto externo no fiable, límites de tamaño, SSRF). Críticos y altos se arreglan antes de fundir.
- Hecho cuando: todos los tests verdes, ninguna petición de red en los tests, y los adaptadores no corren sin una fuente registrada.

### C4 · Enlaces «buscar también en…» (≈ 30 min)
- Componente en `/recomendaciones` (y en `/ofertas` si cabe sin ensuciar) con botones a InfoJobs, LinkedIn, Indeed, Tecnoempleo e Infoempleo, con la búsqueda rellenada **solo con puesto y ciudad** de las preferencias de la usuaria. Nunca CV, nombre, correo ni otro dato.
- `target="_blank"` con `rel="noopener noreferrer"`; texto visible «Se abrirá el portal con tu búsqueda»; sin trackers y **nada se guarda ni se importa**.
- No hay búsquedas web: construye las URL con los patrones que conoces y márcalas en `estado-2.md` como **por comprobar a mano por Mar** (los portales cambian sus URL). Si un portal no tiene patrón fiable, no pongas su botón.
- Hecho cuando: test de que la URL se construye con codificación segura y sin campos de más (también con puesto vacío o con caracteres raros), y una pasada en el navegador.

### C5 · Supervisor del envío automático (≈ 120 min)
Diseño ya decidido por Mar en `docs/analisis-tecnico.md` apartado 3.4. **Se construye solo la capa de reglas duras en código determinista; el LLM del supervisor (que solo podría endurecer) NO se construye.** Nada de enviar a ninguna web real, nada de Playwright.
- Función pura `evaluarEnvio(candidatura, oferta, configuracion)` → `{decision: permitir | pendiente_de_ti | bloquear, motivos[]}` con **denegar por defecto**:
  1. Falta un dato o una pregunta no está en la lista conocida (nombre, contacto, CV, carta) → `pendiente_de_ti`.
  2. Categorías especiales (art. 9), salario o preguntas legales → nunca se contestan solas.
  3. Sin trazabilidad verificada → no se envía.
  4. Fuera del rango elegido por la usuaria → no se envía.
  5. Canal LinkedIn o Indeed → `bloquear` siempre (lo envía la persona).
  6. Permiso único y revocable; con el permiso apagado, nunca; botón de **pausa total**.
  7. Errores repetidos pausan el modo (tope configurable, por defecto 3).
- Tabla aditiva `config_envio_auto` (permiso, pausa, rango, tope de errores) y registro de cada decisión con sus motivos (sin datos personales en el registro). Página mínima en `/cuenta` o `/seguimiento` para ver el estado, activar el permiso con aviso de «qué datos van a quién» y pausar. **Por defecto: apagado.**
- **Aprobar sigue siendo solo de la usuaria con sesión web**: el supervisor no aprueba nada.
- Si algo choca con una línea roja o con el AI Act, no lo construyas y anótalo. Las alternativas de diseño que dejes fuera van a «Preguntas para Mar» con tu recomendada.
- `auditor-lineas-rojas` y `revisor-seguridad` sobre C5 (con C2+C4 ya revisado, no se repite).
- Hecho cuando: tests de cada regla (rompiéndola a propósito para ver que falla), prueba de que LinkedIn/Indeed nunca pasan, y nada se envía fuera del servidor.

### C6 · Cierre (≥ 45 min, siempre)
1. Puerta de calidad completa sobre `autonomo/2026-11-07` (sin bajar de 159 tests web y 42 evals; sube con los nuevos).
2. Revisores que falten según el modo ahorro; arreglos.
3. `docs/artefactos/guia-pruebas-manuales.md`: secciones nuevas (17 en adelante) para una principiante. `docs/informe-pruebas.md`, `docs/tareas-pendientes.md`, `docs/indice.md` y bitácora al día. No se publica ningún artefacto.
4. Borra solo las cuentas de prueba que creaste (prefijo `auto-`); comprueba que no queda ningún proceso corriendo.
5. Escribe `docs/autonomo/resumen-para-mar-2.md`: hecho / no hecho / bloqueado, migraciones con su rollback, decisiones, preguntas para ella con tu recomendada, URLs de «buscar también en…» por comprobar, cómo restaurar la copia y los comandos para revisar y aceptar.

## 5. Qué mirar mañana (Mar)
1. `docs/autonomo/resumen-para-mar-2.md` (3 minutos).
2. `git log --oneline autonomo/2026-11-06..autonomo/2026-11-07` y `git diff --stat` de ese rango.
3. Las «Preguntas para Mar» y los bloques BLOQUEADOS.
4. Comprobar a mano los botones «buscar también en…» y las secciones nuevas de la guía.
5. Después, y solo con tu orden a la Copiloto: `/calificar-fuentes` de las cinco fuentes con las licencias leídas; escribir a Lanbide con el borrador; aceptar, aceptar por bloques o descartar.
