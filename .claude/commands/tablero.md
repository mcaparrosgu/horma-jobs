---
description: Lista las candidaturas de una usuaria por estado
argument-hint: <usuaria>
---

Usuaria: $1
**Antes de nada:** comprueba que cada identificador recibido (usuaria, oferta, fuente) cumple `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$`; si no, para y dilo. Pon siempre las rutas entre comillas.


Lee los `estado.json` de `datos/candidaturas/$1/*/` y muestra una tabla: oferta, empresa, estado y fecha del último cambio, agrupada por estado (borrador, aprobada, enviada, entrevista, rechazada, sin respuesta, pendiente de ti, descartada). Solo lectura.
