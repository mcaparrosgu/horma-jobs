// Conexión a la base de datos para la web (solo servidor). Un único pool que se reutiliza.
import pg from "pg";
import { problemaClave } from "./clave.ts";

const g = globalThis as unknown as { __hormaPool?: pg.Pool };

export function db(): pg.Pool {
  if (!g.__hormaPool) {
    const problema = problemaClave(process.env.HORMA_DB_PASSWORD);
    if (problema) throw new Error(problema);
    g.__hormaPool = new pg.Pool({
      host: "127.0.0.1", port: 5433, user: "horma", database: "horma",
      password: process.env.HORMA_DB_PASSWORD, max: 5,
    });
  }
  return g.__hormaPool;
}
