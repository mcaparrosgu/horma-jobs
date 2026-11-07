# Resumen de la noche — para leer en 3 minutos

**No se cumplieron las 10 horas: volviste antes y pediste asegurar el trabajo.** Esto no es un fallo de Horma: la cuenta se quedó sin cuota (primero un límite de tasa, luego el límite de 5 h) justo cuando lanzaba la última tanda de revisores. Nada se ha perdido: todo está en commits, en la rama `autonomo/2026-11-06` y sus cuatro ramas de bloque, **ya subidas a GitHub** (`origin`), y `main` no se ha tocado ni se ha empujado.

## Hecho (B0 a B4, en orden)

1. **B0 — preparación:** línea base verificada (127 tests, 41 evals), copia de seguridad de `horma-db` en `datos/copias/pre-autonomo-2026-11-06.sql`, rama `autonomo/2026-11-06` desde `main`.
2. **B1 — cuenta y RGPD:** página `/cuenta`: descargar tus datos (JSON al momento, sin tu contraseña), cambiar contraseña (cierra las demás sesiones) y borrar tu cuenta (nunca una cuenta de administración — bloqueado en la página **y** en la base de datos, por dos sitios distintos).
3. **B2 — seguimiento:** página `/seguimiento`: registras tú misma la respuesta de una empresa (entrevista, rechazada, sin respuesta, descartada), con un aviso de «21 días sin respuesta» que tú confirmas (nada automático).
4. **B3 — portal de empresas I:** una empresa entra en `/empresa/entrar` (alta solo por terminal, de momento) y publica una oferta con un formulario de listas cerradas, sin ningún LLM. La oferta queda «en revisión» y no la ve ninguna candidata hasta que la apruebas en `/admin/ofertas-empresas`.
5. **B4 — portal de empresas II:** desde una candidatura ya aprobada por la candidata, puede «Enviar a la empresa»: ve exactamente el CV y la carta que la empresa va a recibir, y solo si quiere comparte también su nombre y correo. La empresa ve lo recibido en una bandeja (`/empresa/ofertas/<id>/bandeja`) ordenada solo por fecha, sin ningún filtro ni puntuación (es la línea roja del AI Act: Horma nunca ordena ni filtra candidatas para una empresa).

**Todo probado de dos formas:** 159 tests automáticos + 41 evals (ninguno llama a un LLM de pago), y a mano en el navegador con cuentas inventadas: dos empresas, dos candidatas y una administradora, comprobando en cada bloque el camino bueno, el camino malo, y que nadie entra en lo que no es suyo (siempre 404, nunca un error raro). Build, lint y tipos, limpios.

**Un fallo real que encontré y arreglé probando en el navegador** (no lo habría pillado ningún test): el filtro que decide quién puede ver cada página (`proxy.ts`) no conocía la sesión de empresa, así que mandaba todo el portal de empresas a la pantalla de entrar de las candidatas. Ya arreglado y probado.

**`auditor-lineas-rojas` revisó los cuatro bloques (dos pases) y no encontró ningún incumplimiento.** Dos arreglos menores de documentación que señaló (un comentario de un script no mencionaba que también borra los envíos a empresas) ya están aplicados.

## No hecho

- **Los dos pases de `revisor-seguridad`** (sobre B1+B2 y sobre B3+B4) se lanzaron a la vez que los de líneas rojas y **los dos se cortaron a mitad de revisión por quedarse sin cuota** — no encontraron ningún hallazgo, simplemente no llegaron a terminar. Hay que relanzarlos enteros.
- La sección nueva de `docs/informe-pruebas.md` con el resumen de esta noche.
- Decidir si `autonomo/2026-11-06` se funde en `main`, se acepta por bloques o se descarta.

## Preguntas para ti (con mi recomendada)

1. **¿Repito los dos revisores de seguridad ahora, en esta sesión, antes de que decidas nada más?** — Recomendada: sí; son la única pieza que falta y el código ya está quieto, así que no hay prisa por tocar nada más mientras corren.
2. **Si los revisores no encuentran nada:** ¿fundo `autonomo/2026-11-06` en `main`, o prefieres revisarlo tú primero con la guía de pruebas (secciones 13 a 16, nuevas)? — Recomendada: pruébalo tú primero; son datos inventados y una tarde de pruebas, pero es tu criterio el que decide qué entra en `main`.

## Cómo revisar y aceptar

```
git log --oneline main..autonomo/2026-11-06      # todos los commits de la noche
git diff --stat main..autonomo/2026-11-06        # qué archivos cambiaron
```

También puedes verlo en GitHub: las cinco ramas ya están en `origin` (repositorio `mcaparrosgu/horma-jobs`), así que puedes abrir `autonomo/2026-11-06` en la web de GitHub y comparar con `main` desde ahí, sin terminal.

- **Aceptar todo:** `git merge --no-ff autonomo/2026-11-06` en `main`, con tu orden.
- **Aceptar por bloques:** cada bloque tiene su rama (`auto/b1-cuenta-rgpd`, `auto/b2-seguimiento`, `auto/b3-empresas-i`, `auto/b4-enviar-bandeja`), ya fundida en `autonomo/2026-11-06`; se puede fundir una a una en `main` si lo prefieres.
- **Descartar:** `git branch -D autonomo/2026-11-06 auto/b1-cuenta-rgpd auto/b2-seguimiento auto/b3-empresas-i auto/b4-enviar-bandeja`. **Ojo:** esto no deshace las migraciones 016 a 019 ya aplicadas a tu base de datos local; si quieres volver atrás también en la base, restaura la copia: `docker exec -i horma-db psql -U horma horma < datos/copias/pre-autonomo-2026-11-06.sql` (primero hay que vaciar la base).

## Pruebas a mano

Guía con los pasos nuevos: `docs/artefactos/guia-pruebas-manuales.md`, secciones 13 a 16. (El artefacto HTML en claude.ai todavía no se ha actualizado con estas secciones: pendiente, no se publicó nada esta noche.)

## Nada que limpiar

Todas las cuentas y datos de prueba de esta noche (prefijo `auto-`) se borraron al cerrar cada bloque; la base solo tiene tus 25 ofertas de siempre y ninguna empresa ni usuaria de prueba.
