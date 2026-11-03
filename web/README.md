# web/ — Pista B (pendiente)

La web (FastAPI por capas + PostgreSQL, worker, PWA) se construye **sin ningún LLM dentro** y en paralelo a la pista A (`.claude/`). **Todavía no está construida**: la fase 0 de Horma es la pista A.

Orden previsto (documento del profesor, apartado «Pista B»):

1. Terreno: carpetas, secretos fuera del código, Docker Compose (API, worker, PostgreSQL), CI con pytest y escaneo de secretos.
2. Base de datos: tablas que traducen los ocho esquemas de `esquemas-horma`, migraciones, roles de mínimo privilegio, seguridad por filas y su test «leer datos de otra usuaria falla».
3. API por capas, Pydantic generado desde los esquemas, identidad (Google OAuth y email), JWT y CSRF.
4. Importador `web/scripts/importar_datos.py` (lee `datos/` y lo carga como seed).
5. Pantallas sobre el seed: tablero, ofertas recomendadas, perfil y preferencias, dashboard de ingesta, `POST /ofertas`.
6. Cola en PostgreSQL y worker con `AgentRunner` (`FileAgentRunner`).
7. Puerta única al LLM vacía (reintentos, tiempos límite, métricas, guardrails).
8. PWA, texto escapado y CSP estricta.

Instalar dependencias o servicios (Docker, PostgreSQL, FastAPI) se decide antes con Mar: qué son, cuánto cuestan y qué mantenimiento añaden.
