# Glosario de Horma jobs

Términos que descolocaron a Mar, en orden alfabético. Tres líneas por término: definición, analogía y dónde se usa en Horma.

## Búsqueda híbrida
- **Qué es:** buscar a la vez por palabras exactas y por significado, y fusionar los dos resultados (técnica RRF, *Reciprocal Rank Fusion*).
- **Analogía:** preguntar a dos bibliotecarias, una que mira el índice de títulos y otra que entiende de qué va cada libro, y quedarte con los libros que ambas ponen arriba.
- **En Horma:** recomienda ofertas combinando palabras clave (`tsvector`) y vectores (pgvector) sobre las que pasan el filtro duro.

## Cola de tareas
- **Qué es:** lista de trabajos pendientes que un proceso va cogiendo uno a uno.
- **Analogía:** el tablón de comandas de una cocina: los camareros apuntan, el cocinero las coge por orden.
- **En Horma:** la API apunta «enviar esta candidatura» en una tabla de PostgreSQL y el worker la recoge (propuesto, paso 6).

## Contenedor
- **Qué es:** caja cerrada de Docker con un programa y todo lo que necesita para funcionar.
- **Analogía:** un táper con el menú completo: lo abres en cualquier casa y sabe igual.
- **En Horma:** la API, la base de datos, el worker, el script de ingesta y el navegador aislado van cada uno en el suyo, y `docker compose up` los enciende juntos.

## Denegar por defecto
- **Qué es:** regla de seguridad por la que todo lo que no está expresamente permitido queda prohibido.
- **Analogía:** el portero con lista: si tu nombre no está, no entras, aunque tengas buena cara.
- **En Horma:** el supervisor del modo autónomo no envía un campo que no esté en su lista conocida: queda «pendiente de ti».

## Grafo (en un agente)
- **Qué es:** lista de pasos con flechas entre ellos que el agente recorre; cada paso es un nodo.
- **Analogía:** el mapa de una gincana: de cada prueba salen las flechas a las siguientes.
- **En Horma:** el agente de envío (LangGraph): leer el formulario, rellenar, verificar, pausa para aprobar, enviar.

## Hook
- **Qué es:** regla que Claude Code ejecuta automáticamente en un momento dado (por ejemplo, antes de un comando), aunque el agente se olvide de ella.
- **Analogía:** un cartel de «prohibido el paso» es una instrucción en `CLAUDE.md`; el hook es la puerta cerrada con llave.
- **En Horma:** propuestos para bloquear `git add .`, el push a `main` y la lectura de `.env`. Aún sin decidir (`docs/tareas-pendientes.md`, tarea 3).

## Humano en el bucle
- **Qué es:** el proceso se detiene en un punto y espera a que una persona decida antes de seguir.
- **Analogía:** el cajero que no pasa la compra por caja hasta que le das el visto bueno.
- **En Horma:** el agente de envío no envía nada hasta que la usuaria pulsa «Aprobar y enviar».

## Idempotente
- **Qué es:** operación que, repetida varias veces, deja el mismo resultado que hecha una sola vez.
- **Analogía:** el botón de un ascensor: pulsarlo cinco veces no llama a cinco ascensores.
- **En Horma:** el envío de una candidatura y los webhooks de Stripe: si hay un reintento, no se envía ni se cobra dos veces.

## Monolito modular
- **Qué es:** un solo programa dividido en módulos con fronteras claras, frente a los microservicios (varios programas que se hablan por red).
- **Analogía:** un edificio con pisos bien separados, frente a varias casas sueltas con sus propias llaves.
- **En Horma:** API y worker comparten código base y se arrancan por separado; no se montan microservicios (propuesta, paso 6).

## Proxy inverso
- **Qué es:** servidor que recibe lo que llega de internet, pone el HTTPS y lo reparte hacia los servidores de dentro.
- **Analogía:** el portero de un edificio: recibe a todos en la entrada y los manda a su piso.
- **En Horma:** sin proxy propio desde el 1-nov (se quitó Caddy). El HTTPS y los límites los asume el alojamiento o la API; se decide en el paso 6.

## RLS (row-level security)
- **Qué es:** regla de la propia base de datos que decide qué filas puede ver cada usuaria.
- **Analogía:** una taquilla de gimnasio: aunque el pasillo sea común, tu llave solo abre la tuya.
- **En Horma:** aunque un fallo de la API pidiera todas las filas, PostgreSQL solo devolvería las de esa usuaria.

## SSRF
- **Qué es:** ataque que engaña a un servidor para que haga peticiones a direcciones internas que solo él puede alcanzar.
- **Analogía:** pedirle a la recepcionista que te abra la puerta de la sala de servidores diciéndole que es un encargo del jefe.
- **En Horma:** una oferta maliciosa podría hacer que el navegador de envío llame a la base de datos o a otros servicios internos; por eso va aislado y con rangos privados bloqueados.

## Volumen
- **Qué es:** disco que conserva los datos de un contenedor aunque el contenedor se borre.
- **Analogía:** el disco duro externo: puedes cambiar de ordenador y los archivos siguen ahí.
- **En Horma:** la base de datos PostgreSQL guarda en un volumen; sin él, apagar y borrar el contenedor sería perderlo todo.

## Worker
- **Qué es:** proceso aparte, con el mismo código que la API, que hace los trabajos lentos.
- **Analogía:** el repartidor que sale a entregar mientras el dependiente sigue atendiendo en la tienda.
- **En Horma:** ejecuta el agente de envío con Playwright, genera PDF y calcula embeddings en lote, para que la web no se quede colgada.
