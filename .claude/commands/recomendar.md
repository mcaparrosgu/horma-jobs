---
description: Ofertas recomendadas para una usuaria, con nota y explicación (Flujo C)
argument-hint: <usuaria> [--rango 60-100]
---

Usuaria: $1 · Argumentos: $ARGUMENTS
**Antes de nada:** comprueba que cada identificador recibido (usuaria, oferta, fuente) cumple `^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$`; si no, para y dilo. Pon siempre las rutas entre comillas.


1. Ejecuta `python -I .claude/skills/buscar-ofertas/scripts/buscar.py --preferencias datos/usuarias/$1/preferencias.json --perfil datos/usuarias/$1/perfil.json --ofertas datos/ofertas/procesadas --salida datos/matches/$1/orden.json`. El rango por defecto es el de `preferencias.json`; si pasan `--rango`, úsalo.
2. Calcula la versión del perfil (fecha de modificación de `perfil.json` + `preferencias.json`). Lee las notas ya guardadas en `datos/matches/$1/` y no vuelvas a puntuar una oferta si (usuaria, oferta, versión) no ha cambiado.
3. En el orden del paso 1, lanza `matcher` por tandas de 30 ofertas hasta cubrir el rango pedido o agotar la lista. **Pásale cada oferta SIN la clave `avisos`** (ciudadanía, habilitación, permiso): no puntúan ni restan; la web los enseña aparte, y lo que no se le da no puede influir en la nota. Valida cada tanda con `python -I .claude/skills/esquemas-horma/scripts/validar.py match <archivo>`.
4. Escribe `datos/matches/$1/<fecha>.json` con las ofertas dentro del rango, ordenadas, con nota, nivel y explicación.
5. Comprueba que ninguna explicación menciona edad, género, nacionalidad, salud ni rasgos personales; si alguna lo hace, vuelve a lanzar el matcher solo para esa oferta.
6. Si la usuaria corrige una explicación, guarda la corrección en `correccion` y cópiala como caso en `evals/recomendacion/`.
