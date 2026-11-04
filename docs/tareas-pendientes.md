# Estado y tareas pendientes de Horma jobs

Actualizado el 2026-11-04. Única fuente de estado y próximos pasos (mapa de documentos: `docs/indice.md`). Orden = prioridad.

## Estado en tres líneas
- **Fase 0, versión del profesor** (`docs/flujo-agentico-claude-code.md`): **pista A hecha** (agentes, skills, comandos, esquemas, scripts y evals en `.claude/` y `evals/`); **pista B** (web FastAPI + PostgreSQL en `web/`) **pendiente: la monta Mar**.
- **Pruebas:** resultados, fallos y límites en `docs/informe-pruebas.md`.
- **Repositorio:** `mcaparrosgu/horma-jobs`, rama `main`, hasta el commit `db0ddba`.

## Reglas permanentes (Mar)
- En la sección Proyectos del Cuaderno nunca se hacen ejercicios ni examen.
- La Copiloto es la agente predeterminada.
- Cerrar frentes antes de abrir otros.
- Sin presión de fechas: si hay que recortar, ramas pequeñas, nunca troncos.

## 1. Pendiente de Mar (no lo decide la Copiloto)
- **`settings.json`:** pegar el bloque de `docs/ajustes-pendientes-settings.md` (hook del verificador, permisos y bloqueo de lectura de `.env` y `docs/privado/`). Riesgo: el permiso sobre `.claude/skills/*` es amplio, aunque los scripts son del repositorio.
- **Preferencias deducidas del CV** (puesto = último cargo, ciudad = residencia): ¿vacías hasta que la usuaria confirme? Recomendado: sí.
- **Campo de horario** («solo mañanas») en `preferencias`, y si el redactor vuelve a preguntar por el horario híbrido de la oferta. Recomendado: sí.
- **Versionar o no** `evals/resultados/*.json` (hoy sin seguir).
- **`pypdf`:** sin ella `/perfilar` no lee PDF. Librería libre, gratuita, mantenimiento bajo. Recomendado instalar.
- **Calificar fuentes:** ok para que `/calificar-fuentes` lea condiciones de uso y `robots.txt` de EURES, Adzuna, Arbeitnow, The Hub e InfoJobs. Las claves de API van en `.env`, que no se lee.
- **Artefactos:** compartir con el profesor su página y «Horma por fases» desde *Share* (su email, solo en `docs/privado/contactos.md`); abrir el Cuaderno (nunca se ha visto renderizado); decidir si el Cuaderno deja de ser «cualquiera con el enlace»; borrar `Rz3…` cuando el profesor haya visto la página nueva (irreversible; al borrarlo, quitarlo de `ARTEFACTOS_HORMA`); limpiar los artefactos ajenos a Horma (con la lista delante).
- **Entorno:** `/mcp disable` de `n8n-mcp`, `semantic-scholar` y `google-sheets` en este proyecto; reactivar si hacen falta las skills apagadas (`paso-11` a `paso-18`, `paso-20`, `auditoria-diseno`, `design-taste-frontend`).
- **Pista B:** instalar Docker, PostgreSQL y FastAPI son costes de mantenimiento; se pregunta uno a uno.

## 2. Para el profesor (guion completo: `docs/preguntas-profesor.md`)
1. Tope de 4 CV base frente a «sin topes»: ¿por qué 4? Propuesta: limitar CV generados al mes.
2. Cartas base: en su versión no existen (la carta sale del CV base). ¿Confirmado?
3. «Subagente ATS» del PRD frente a `medir-ats` (código): ¿le vale? (14 bis). El PRD no se cambia hasta su respuesta.
4. Qué cubre la Fase 4; ok de LangGraph (14); reformular la pregunta 4 (usa «RAG» y él dijo «No vamos a hacer RAG»).
5. Enseñarle lo hecho (informe de pruebas y bitácora del 3 y 4-nov).

## 3. Plan de la Copiloto (siguiente sesión)
1. Pasar los comentarios del profesor a los artefactos y verificar que estén aplicados (ver sección 5).
2. Ampliar casos de prueba de los 12 agentes probados: ofertas raras o sin salario, perfiles sin experiencia o con huecos largos, más errores sembrados para el juez.
3. Recortar las preguntas pendientes de `extractor-perfil` (máximo 5, solo las que cambian el resultado).
4. Aplicar las decisiones de Mar de la sección 1 en prompts y esquemas; crear el esquema de la salida de `juez-carta`.
5. Flujo D completo sobre Ana y la oferta 1, con un error sembrado, midiendo las vueltas.
6. Con el ok de Mar, `/calificar-fuentes` y llenar `endpoints.json`.
7. Antes de la pista B y de cada commit: `revisor-seguridad` y `auditor-lineas-rojas` sobre lo nuevo (y sobre `analisis-tecnico.md`, apartado 9).
8. Specs por flujo en `specs/` y umbral de cobertura ATS (con corridas reales).

**Mensaje para abrir sesión:** «Lee `docs/tareas-pendientes.md` y las últimas tres entradas de `docs/bitacora.md`. Empieza por el punto 1 del plan y no toques nada sin avisarme».

## 4. Abiertas, por prioridad
**Media**
- **Comprobar «sin RAG»:** buscar «RAG» en el PRD, `analisis-tecnico.md` y el Cuaderno y decidir caso a caso.
- **Aviso de huecos:** pasar a US-002 del PRD y a `analisis-tecnico.md` lo que el profesor pidió (Horma avisa de dónde rellenó cada hueco).
- **Multiagente para construir Horma:** en pequeño y sin framework; falta definir roles y el ok del profesor. LangGraph solo dentro de Horma; si dice que no, Python plano sin cambiar agentes ni flujos. Cada agente, una función independiente del framework.
- **Por confirmar (Mar):** ingesta como proceso aparte; agente de relleno LLM frente a adaptadores por ATS (lo decide el eval de ablación).
- **Investigaciones:** seguimiento por correo (Gmail frente a reenvío); coste del servidor; condiciones de InfoJobs y EURES, SmartRecruiters, Ashby, Workable y la sentencia C-30/14.
- **Pregunta sobre fuentes al profesor:** ¿Apify para portales que prohíben el scraping o base en APIs y ATS públicos? Datos en `docs/investigacion-fuentes-y-costes.md`. Recomendación: híbrido.
- **Rúbrica y fecha exacta de entrega** (20 o 24 de noviembre) en Neoland; si el repositorio es público en la entrega.
- **Obligación RGPD:** exportar y borrar datos, antes de tener usuarias reales.

**Baja (ramas)**
- Minijuegos (miden una habilidad del puesto, nunca rasgos; el resultado no llega a ninguna empresa); voz del entrenador; tiendas de apps; **servidor MCP «Horma»** (recomendado: solo lectura, 3-4 herramientas, ninguna que envíe).
- **Evidencias del perfil humano:** perfeccionar la función (no reescribir; ocultar; pedir corrección). Mar la considera importante.
- **Ideas de honestidad** (`docs/ideas/honestidad.md`, ideas 11-18; auditadas, ninguna en rojo): por decidir con el profesor cuáles entran; por decidir (Mar) confesionario solo por texto, peso y salud (art. 9) en la idea 13, y si historial y registro de correcciones son un solo sistema; verificar licencia y API de ESCO.
- **Condiciones del auditor (29-oct)** en `propuesta-horma.md`, apartado 4: carta «cómo trabajo», entrenador, asistente de edición, modo autónomo y lema.
- **Topes:** sin tope de ofertas ni candidaturas; los demás se perfilan más adelante. Diseñar el supervisor del modo autónomo; elegir transcripción en la UE.
- **Seguridad previa al código:** los 20 puntos de `analisis-tecnico.md`, apartado 8, pasan a ADR; los de mejor relación coste/beneficio: roles de BD con RLS forzada, máquina de estados del envío y reglas duras del supervisor en código.
- **Diagramas en pantalla completa:** abrir una página del artefacto en pestaña nueva da error (`claude.ai/code/frame/…`). Decidir: quitar el botón u otra forma.
- **PRD:** mantenerlo al día y cerrar los «por fijar» con mediciones.
- **Ideas de Michael Page** (seguimiento hasta la incorporación, proceso visible en pasos, transparencia de datos como mensaje, modo «escucho ofertas»): ideas, no decisiones.
- Pulido final: revisar con Mar cómo queda todo junto.

## 5. Artefactos pendientes de actualizar
Los comentarios del profesor y el estado de la fase 0 llevan a: Cuaderno personal, «Horma por fases», «Construcción de Horma», «Horma por dentro» (solo si cambia) y la página del profesor. Tabla y reglas en `docs/indice.md`.
