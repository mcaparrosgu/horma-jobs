# Decisiones pendientes de Horma (27 oct 2026)

> **Respuestas de Mar (27 oct):** 1A (perfeccionar la función, es importante) · 2A más la opción de
> añadir puestos para cambiar de carrera · 3A (minijuegos como mejora si da tiempo antes del 24-nov) ·
> 4A · 5A · 6 → 6.1C, 6.2A, 6.3B (compatibilidad en tres capas) · 7A · 8C ·
> 9A · 10A · 11B con filtros de fiabilidad y encaje · 12C · 13A (contenedor propio) · 14A · 15A · 16A · 17C · 18A · 19A · 20B · 21B · 22: se espera · 23B (entrega el 24 de noviembre; antes era 23C, corregido).
> Aplicadas en `propuesta-horma.md`, `tareas-pendientes.md` y el WB de Horma (las dos páginas).

**Cómo responder:** en la terminal, número y letra: `1A, 2B, 3C…`. Si añades un matiz, ponlo detrás:
`5A pero solo en España`. **A = recomendada** por la Copiloto (salvo que diga otra cosa). Si no lo
tienes claro, sáltala: sigue pendiente.

---

## Bloque 1 · Producto

**1. Evidencias del perfil humano: ¿qué puede hacer la usuaria con ellas?** (punto 1)
- **A. No reescribirlas; sí ocultarlas y pedir que se corrijan si son erróneas.** El RGPD (art. 16) da derecho a rectificar; ocultar no es mentir.
- B. Solo ocultarlas, nunca pedir corrección. Choca con el derecho de rectificación.
- C. Nada: ni ocultar ni corregir. Choca con el RGPD y con «apagado por defecto».
- D. Editarlas libremente. Rompe tu regla de «no hacer trampa».

**2. ¿Cuándo elige la usuaria qué ofertas quiere?** (punto 13)
- **A. Después de subir el CV: Horma rellena las preferencias a partir del CV y ella las corrige. Editables en configuración.** Menos trabajo para ella.
- B. Antes de subir el CV, todo a mano.
- C. Puede elegir: antes o después.

**3. ¿Cómo conoce la entrevista el perfil humano?** (punto 14)
- **A. Preguntas sobre hechos («cuéntame una vez que…»): una base común más preguntas adaptadas al sector y a la trayectoria. Sin minijuegos.** Es la técnica que mejor predice y no puntúa la personalidad.
- B. Lo mismo más minijuegos que midan **habilidades prácticas**, nunca rasgos. Más atractivo; más coste y revisión legal de cada juego.
- C. Solo la base común, igual para todas. Más simple; menos personal.

**4. Defensa contra *prompt injection*** (punto 18)
- **A. Por capas (separar datos de instrucciones, mínimo privilegio, tu aprobación antes de enviar, pruebas de ataque). El detalle se escribe en los pasos 15-16.**
- B. Diseñarla ya en detalle, antes del paso 5.

**5. P1 · Salario a la vista** (cada oferta dice si publica salario; filtro «solo con salario»; tu salario mínimo; frase para pedirlo)
- **A. Sí, en el MVP.**
- B. Sí, pero después del MVP.
- C. No.

**6. P2 · Condiciones primero en la compatibilidad** (salario, conciliación y estabilidad pesan más que «encajar con la empresa»)
- **A. Sí, en el MVP.**
- B. Después del MVP.
- C. No.

**7. P3 · Cada frase del CV con su origen** (ves qué dato tuyo respalda cada logro)
- **A. Sí, en el MVP.** Es tu línea roja de honestidad hecha visible y da material para los evals.
- B. Después del MVP. Coste medio: hay que guardar el origen de cada frase.
- C. No.

**8. Sección de empresas: ¿qué quitas exactamente?**
- **A. Fuera la sección de información de empresas y fuera el portal donde publican ofertas. Solo una marca en la oferta: premios con listado público (con fuente y año).** Lo más seguro y barato.
- B. Como A, más valoraciones de empleados. Riesgo: copiar notas de webs de opiniones puede ir contra sus condiciones de uso.
- C. Fuera la sección de información, pero **se mantiene** el portal donde las empresas publican ofertas (apartados 8-9 de la propuesta).
- D. Ninguna marca de empresas.

**9. ¿Uno o varios perfiles por usuaria?** (punto 15)
- **A. Uno por persona; si hace falta, «búsquedas guardadas» con filtros distintos.**
- B. Varios perfiles (cara al público, administrativo…).

## Bloque 2 · Ofertas y fuentes

**10. ¿De dónde salen las ofertas?** (puntos 3 y 4; lo ibas a ver con el profesor)
- **A. Esperar al profesor** (sigue en pausa).
- B. Híbrido: APIs, feeds, ATS públicos y `JobPosting` como base; Apify solo como excepción con tope de gasto; nunca LinkedIn ni Indeed. *(Recomendación técnica de la Copiloto.)*
- C. Apify como base.
- D. Sin Apify.

**11. ¿Un agente de IA para añadir portales?** (punto 3)
- **A. No: un conector por fuente o por ATS, sin IA. La IA entra después, al puntuar la compatibilidad.**
- B. Sí, un agente que descubra y lea webs nuevas. Más coste y más errores.

**12. Indeed en Jobs** (paga 100 ofertas por pasada y aporta 0; ver C4.4)
- **A. Desconectarlo en Jobs** (solo con tu permiso; Jobs no se toca sin él).
- B. Revisar antes su búsqueda (quizá no pide teletrabajo).
- C. Dejarlo como está.

## Bloque 3 · Infraestructura y taller

**13. n8n propio para Horma** (punto 16; sin investigar el coste)
- **A. Sí, separado del tuyo. El coste se investiga antes de montarlo.**
- B. Usar tu n8n actual. Choca con la regla de no tocar tu n8n.
- C. Decidirlo más tarde.

**14. Seguimiento por correo** (punto 17; sin investigar)
- **A. Investigar primero las dos vías: leer Gmail (Google exige una revisión de seguridad) o una dirección de reenvío de Horma.**
- B. Directamente la dirección de reenvío. Más simple; la usuaria tiene que reenviar o crear un filtro.
- C. Directamente leer Gmail.
- D. Sin seguimiento automático en el MVP: la usuaria marca los estados a mano.

**15. Subagentes de la Copiloto** (punto 5)
- **A. Mantener los dos actuales. Añadir un revisor de evals en el paso 14.**
- B. Añadir alguno ya.
- C. Quitar alguno.

**16. Hooks que obligan a cumplir las reglas** (punto 10, tarea 3)
- **A. Bloquear la lectura de `.env` ya; los de git (`git add .`, push a `main`, tests antes de commit) al llegar al paso 9.**
- B. Todos al llegar al paso 9.
- C. Todos ya, incluido lanzar `auditor-lineas-rojas` antes de cada commit.
- D. Ninguno.

**17. Servidor MCP «Horma»** (tarea 4)
- **A. Sí, en la fase 5, solo lectura, 3-4 herramientas, ninguna que envíe.**
- B. No.
- C. Decidirlo más tarde.

**18. App en las tiendas** (punto 7)
- **A. Primero web instalable en el móvil (PWA); las tiendas, sin fecha.** Las tiendas cobran cuotas y revisan cada versión.
- B. Tiendas desde el principio.

## Bloque 4 · Organización y entrega

**19. ¿Qué pasa al WB de Horma (el tuyo y el del profesor)?**
- **A. Todo lo que decidas hoy, de una vez y tras pasar el `auditor-lineas-rojas`.**
- B. Solo lo de producto (bloque 1).
- C. Nada hasta que el profesor dé el ok.

**20. Fallo de los diagramas en pantalla completa** (punto 9)
- **A. Reproducirlo y arreglarlo ahora** (15-30 min).
- B. Después de la reunión con el profesor.
- C. Dejarlo; no molesta.

**21. Siguiente paso del método**
- **A. Cerrar esto y empezar `/paso-01-problema` sin esperar al profesor** (es documentación, no construcción).
- B. Esperar al ok del profesor también para la definición.

**22. Nombre del repositorio en GitHub**
- **A. `horma-jobs`**
- B. `horma`
- C. Otro: escríbelo.

**23. Fecha de entrega**
- A. 20 de noviembre.
- B. 24 de noviembre.
- C. Aún no lo sé (lo preguntas en Neoland). *(La Copiloto no puede recomendar: es un dato, no una decisión.)*
