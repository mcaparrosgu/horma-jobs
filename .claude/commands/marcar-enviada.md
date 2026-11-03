---
description: Anota que la usuaria ha enviado una candidatura aprobada
argument-hint: <usuaria> <oferta-id> <canal>
---

Usuaria: $1 · Oferta: $2 · Canal: $3
**Antes de nada:** comprueba que cada identificador recibido (usuaria, oferta, fuente) cumple `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$`; si no, para y dilo. Pon siempre las rutas entre comillas.


Si `estado.json` no está en `aprobada`, o la entrada `aprobada` del `historial` no tiene `por: usuaria`, para y explica por qué. Si lo está, pasa a `enviada` con fecha y canal en `historial`.
