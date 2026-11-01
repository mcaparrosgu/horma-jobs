Hecho: apliqué en el apartado 23 (PRD) de https://claude.ai/artifact/Rz3LtzSVM8yeGkMYks9SQs lo que pedía el profesor en 18 de sus 19 hilos. Los cambios del profesor salen en **azul eléctrico** y tu aclaración en **naranja**. No he abierto la página publicada para verla; solo comprobé que se publicó.

**Qué hay en el documento**
- **Fases:** MVP en Fase 1, envío automático en Fase 2 o 3, y entrevista y privacidad en Fase 3.
- **CV base:**
  - Incluye los viajes y la IA lo toma de referencia para adaptarlo a cada oferta.
  - Tu aclaración sobre omitir huecos y trabajos poco relevantes va en naranja.
  - Se organiza en hasta 5 categorías de industria y se puede regenerar para los filtros ATS.
- **Human in the loop:** si Horma completa un hueco, lo marca, te avisa y no sale nada sin tu aprobación. También se actualizaron RF-004, NFR-01 y R-01.
- **RF-005:** quedó integrado en RF-004 y US-002 («ya se habló más arriba»). Mantuve el número para no romper la trazabilidad.
- **Ingesta sin n8n:** ahora es un script propio con un dashboard en el frontend (RF-001 y RES-01).
- **LinkedIn e Indeed:** pasan a «no en las primeras fases, quizá más adelante».
- **Fecha de entrega y referencias a Jobs:** puse avisos en azul («quitar al pasar a construcción») en vez de borrarlas ya. El documento sigue siendo para el profesor y ahí esas referencias aún cuentan. Si prefieres que las borre, dímelo.

**Lo que conviene que decidas**
1. **«Que invente un poco»:** choca con tu línea roja de no inventar. Lo escribí como «propone, marca y avisa; tú apruebas», que cumple los comentarios de «avísame» y «human in the loop». Si querías algo más permisivo, es una decisión de producto tuya.
2. **LinkedIn e Indeed:** tu CLAUDE.md dice «nunca». Cambiarlo afecta a las condiciones de uso de esos portales (riesgo de perder cuentas). Para ese cambio no he tocado CLAUDE.md ni `docs/`.
3. **Sin n8n:** reemplaza una decisión tuya del 27-oct. No he actualizado `docs/propuesta-horma.md`, `docs/analisis-tecnico.md` ni CLAUDE.md. Tampoco las secciones 5, 6, 8, 12 y 21 del documento, que aún nombran n8n.
4. **«No hay CVs base»:** el apartado 14 y el 21 siguen diciéndolo. Quedan en contradicción con el nuevo CV base.
5. **Hilo «Fase 4»:** no sé qué elemento señala (apunta a un botón, no a un texto). Dime a qué se refiere y lo coloco.
6. **«Que no sea tan relevante» (NFR-01):** lo interpreté como flexibilizar el 100 %. Revísalo.

Los hilos de comentarios no están activados para mí, así que siguen abiertos. Si quieres que los resuelva, hay que enviármelos con «Send to Claude».

---

## Registro: del borrador a la v1 (decisiones de Mar tras hablar con el profesor)

**Dónde está cada cosa**
- Borrador del 29-oct (archivado, con sus 19 hilos): https://claude.ai/artifact/Rz3LtzSVM8yeGkMYks9SQs · copia en `docs/archivo/horma-jobs-borrador-29oct.html`
- Vigente, «PRD de Horma jobs» v1: https://claude.ai/artifact/SC6HJfJZAWy1BkwQQoYiYR · copia en `docs/prd-horma-v1.html`

**Decisiones de Mar**
1. **CV base por sector:** hasta 5 CV base y 2 cartas base, generados una vez del CV completo para ahorrar tokens. Cada oferta se adapta desde el base que le toca. Un subagente ATS adapta el base a las palabras clave de la oferta.
2. **Honestidad con los huecos:** Horma cambia qué se muestra y cómo se cuenta, nunca fechas, cargos, empresas ni titulaciones. Lo poco relevante se condensa en una línea («Otras experiencias»), puede mostrarse solo el año y decide la usuaria. Lo que Horma propone, lo marca y lo aprueba ella.
3. **LinkedIn e Indeed:** Horma prepara y lo envía la persona. Sin «quizá más adelante».
4. **Envío automático:** tronco (no se recorta). La fase solo ordena el trabajo.
5. **Estructura de construcción:** la del profesor, no los 20 pasos. Fase 4: por definir con él.
6. **Sin n8n** en la ingesta: script propio con dashboard.

**Quitado de la v1 (por petición del profesor):** fecha de entrega, referencias a Jobs, marcas azul y naranja, RES-06 y la columna «Línea base».

**Pendiente**
- Pasar al documento nuevo los otros 22 apartados, ya corregidos (n8n, «sin CVs base», LinkedIn).
- Actualizar `CLAUDE.md`, `docs/propuesta-horma.md`, `docs/analisis-tecnico.md` y las skills `paso-01…20` (siguen con n8n, 20 pasos y «nunca LinkedIn»).
- Confirmar con el profesor qué cubre la Fase 4 y si «envío con aprobación» entra en la Fase 1 o en la 2 o 3.
- Decidir si se unifica la numeración de fases (de momento no).
