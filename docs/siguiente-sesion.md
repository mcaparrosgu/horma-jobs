# Siguiente sesión · pendiente de Mar y plan (escrito el 3-nov-2026, de noche)

Lo primero al abrir sesión. Tres partes: lo que te toca a ti, lo que hago yo y el mensaje para empezar.

## 1. Pendiente tuyo (por orden)

### A. Pegar un ajuste en `.claude/settings.json` (5 minutos)
El sistema no me deja escribir en ese archivo (es la configuración de Claude Code), así que lo haces tú.
1. Abre `docs/ajustes-pendientes-settings.md` y copia el bloque JSON.
2. Abre `.claude/settings.json`, borra su contenido, pega el bloque y guarda.
3. Cierra y vuelve a abrir Claude Code en este proyecto.

**Qué activa:** (1) el hook que corre el verificador cada vez que se escribe un CV; (2) permiso para que corran los scripts y los evals sin preguntarte; (3) que ningún agente pueda leer `.env` ni `docs/privado/`, aunque una oferta se lo pida. **Riesgo:** el permiso sobre `.claude/skills/*` es amplio, aunque los scripts son del repositorio. Si no te convence, avísame.

### B. Dos decisiones de producto (me bastan dos palabras)
| Decisión | Mi recomendación | Por qué |
|---|---|---|
| ¿Las preferencias que el agente deduce del CV (puesto = último cargo, ciudad = donde vive) quedan **vacías** hasta que la usuaria las confirme? | **Sí, vacías.** | Tu regla es que nada se asume. Hoy el agente las rellena y las marca como pregunta; si ella no contesta, se usan como si fueran suyas. |
| ¿`preferencias` gana un campo opcional de **horario** («solo mañanas»)? | **Sí.** | Rosa lo pone en su CV y hoy se pierde. Es un campo opcional, barato de añadir. |

### C. Para el profesor
Preguntas que solo él puede responder (guion largo: `docs/preguntas-profesor.md`):
1. **Tope de 4 CV base** frente a tu «sin topes»: ¿por qué 4? ¿Limitamos mejor los CV generados al mes?
2. **Cartas base:** en su versión no existen (la carta sale del CV base). ¿Confirmado?
3. **«Subagente ATS»** del PRD frente a `medir-ats` (código): ¿le vale?
4. **Qué cubre la Fase 4.**
5. Enseñarle lo hecho: 13 agentes, 11 comandos, 8 skills, 8 esquemas, 29 evals en verde y las pruebas con trampas (bitácora, 3-nov noche 2 y 3).

Y, si no lo has hecho: **compartir con él** la página https://claude.ai/artifact/QYapVgfjiX7QgN7X1obrNd y «Horma por fases» desde *Share*. Su email está solo en `docs/privado/contactos.md`.

### D. Cosas que dependen de ti y no de mí
- **`pypdf` (leer PDF de los CV):** sin ella `/perfilar` no lee PDF, solo DOCX, Markdown y texto. Es una librería de código abierto, gratuita, de mantenimiento bajo. Recomiendo instalarla (`pip install pypdf`), pero lo decides tú.
- **Calificar fuentes de ofertas:** hace falta que me des el ok para que `/calificar-fuentes` lea las condiciones de uso y el `robots.txt` de EURES, Adzuna, Arbeitnow, The Hub e InfoJobs. Solo lee páginas públicas. Las claves de API, si hacen falta, las pones tú en `.env` y yo nunca las veo.
- **Pista B (la web):** instalar Docker, PostgreSQL y FastAPI son costes de mantenimiento. Te preguntaré uno a uno cuando toque.
- **Mirar las páginas del Cuaderno** (nunca se han visto renderizadas) y limpiar los artefactos antiguos: tareas viejas de `docs/tareas-pendientes.md`.

## 2. Plan mío para la siguiente sesión (sin tocar nada de lo tuyo)

1. ~~Probar `redactor-carta` y `juez-carta`~~ **Hecho el 4-nov** (`docs/informe-pruebas.md`). Queda: pasar la carta v2 por `juez-carta` (traza floja) y recuperar las `preguntas_pendientes` que el redactor dejó de hacer.
2. **Ampliar los casos de prueba** de los 12 agentes ya probados: hoy hay uno por agente. Más ofertas (una con requisitos raros, otra sin salario), más perfiles (sin experiencia, con huecos largos) y más errores sembrados para el juez.
3. **Recortar las preguntas pendientes** de `extractor-perfil` (una lista de 10 en Ana): máximo 5 y solo las que cambian el resultado.
4. **Aplicar tus dos decisiones** de la parte B en el prompt y los esquemas.
5. **Flujo D de principio a fin** sobre Ana y la oferta 1: redactor, verificador, juez, ATS, carta, con un error sembrado, y medir cuántas vueltas hacen falta.
6. **Si me das el ok:** `/calificar-fuentes` sobre las cinco fuentes y llenar `endpoints.json`.
7. **Decidir contigo cuándo arrancar la pista B** (la web) y empezar por el terreno. Antes, `revisor-seguridad` y `auditor-lineas-rojas` sobre lo nuevo.

## 3. Estado en tres líneas

- **Hecho:** pista A (agentes, skills, comandos, esquemas, scripts y evals). 12 de 13 agentes probados con LLM real y datos inventados; 33 evals de código. Informe: `docs/informe-pruebas.md`.
- **No hecho:** pista B (web), `auditor-fuentes` sin probar, `settings.json` sin ajustar, `endpoints.json` vacío.
- **Riesgo conocido:** 33 evals en verde miden scripts y esquemas, no la calidad de los agentes. Un caso por agente es poco para fiarse.

## 4. Mensaje para pegar al abrir la sesión

> Lee `docs/siguiente-sesion.md` y `docs/bitacora.md` (las últimas tres entradas). Ya he hecho la parte A del documento [sí/no]. Mis decisiones de la parte B: preferencias deducidas [vacías/como están] y campo de horario [sí/no]. Empieza por el punto 1 del plan, y no toques nada sin avisarme.

Si no quieres decidir nada todavía, pega solo la primera frase: empiezo por el plan y dejo tus decisiones como preguntas.
