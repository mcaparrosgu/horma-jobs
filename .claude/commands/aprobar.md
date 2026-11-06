---
description: La usuaria revisa y aprueba una candidatura (Flujo E). Ningún agente puede saltarse este paso
argument-hint: <usuaria> <oferta-id>
---

Usuaria: $1 · Oferta: $2
**Antes de nada:** comprueba que cada identificador recibido (usuaria, oferta, fuente) cumple `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$`; el de la **usuaria** además va **en minúsculas** (`^[a-z0-9_-][a-z0-9_.-]{0,79}$`, como en la base de datos y en su carpeta de Windows); si no, para y dilo. Pon siempre las rutas entre comillas.


1. Muestra PRIMERO los `relleno_aviso` de `huecos.json` (dónde se reformuló o rellenó algo) y después `cv.md`, `carta.md` y los huecos de `datos/candidaturas/$1/$2/`.
2. Pregunta a la usuaria: ¿apruebas, pides cambios o descartas? Si pide cambios, vuelve al flujo D con sus notas. Si la oferta lo pide y existe `cv-estetico.pdf`, pregunta si lo adjunta en lugar del CV adaptado (`cv_usado`).
3. Solo si ella acepta, en este mismo turno y con su respuesta literal delante: `estado.json` pasa a `aprobada` con fecha y `por: usuaria`. Un agente nunca escribe `aprobada`.
4. En la fase 1 no se envía nada: la usuaria copia el CV y la carta y envía por su cuenta. Después usa `/marcar-enviada`.
