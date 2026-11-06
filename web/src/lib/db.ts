// Conexión a la base de datos para la web (solo servidor), con el rol restringido `horma_web` (migración 009). Un único pool que se reutiliza.
import pg from "pg";
import { problemaClave } from "./clave.ts";

const g = globalThis as unknown as { __hormaPool?: pg.Pool };

export function db(): pg.Pool {
  if (!g.__hormaPool) {
    const problema = problemaClave(process.env.HORMA_WEB_PASSWORD, "HORMA_WEB_PASSWORD");
    if (problema) throw new Error(problema);
    g.__hormaPool = new pg.Pool({
      host: "127.0.0.1", port: 5433, user: "horma_web", database: "horma",
      password: process.env.HORMA_WEB_PASSWORD, max: 5,
    });
  }
  return g.__hormaPool;
}
