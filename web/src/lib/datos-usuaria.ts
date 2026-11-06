// Datos de UNA usuaria en disco, para exportarlos y borrarlos (RGPD: acceso y supresión).
// Solo toca estas tres carpetas dentro de la carpeta de datos; nunca sigue enlaces simbólicos.
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

export const ID_USUARIA = /^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$/;
export const CARPETAS = ["usuarias", "candidaturas", "matches"] as const;

export interface Hallazgo { carpeta: string; archivos: number; bytes: number }

/** Rutas absolutas de las carpetas de la usuaria que EXISTEN. Lanza si el id no es válido. */
export function carpetasDe(raizDatos: string, id: string): { carpeta: string; ruta: string }[] {
  if (!ID_USUARIA.test(id)) throw new Error("identificador de usuaria no válido");
  return CARPETAS.map((c) => ({ carpeta: c, ruta: join(raizDatos, c, id) })).filter((x) => existsSync(x.ruta) || enlace(x.ruta));
}

function enlace(ruta: string): boolean {
  try { return lstatSync(ruta).isSymbolicLink(); } catch { return false; }
}

/** Cuenta archivos y bytes; lanza si encuentra un enlace simbólico (no se sigue ni se copia ni se borra). */
function medir(ruta: string): { archivos: number; bytes: number } {
  const st = lstatSync(ruta);
  if (st.isSymbolicLink()) throw new Error("hay un enlace simbólico dentro de los datos: revísalo a mano");
  if (st.isFile()) return { archivos: 1, bytes: st.size };
  if (!st.isDirectory()) throw new Error("hay un archivo especial dentro de los datos: revísalo a mano");
  let archivos = 0, bytes = 0;
  for (const nombre of readdirSync(ruta)) {
    const m = medir(join(ruta, nombre));
    archivos += m.archivos; bytes += m.bytes;
  }
  return { archivos, bytes };
}

export function inspeccionar(raizDatos: string, id: string): Hallazgo[] {
  return carpetasDe(raizDatos, id).map(({ carpeta, ruta }) => ({ carpeta, ...medir(ruta) }));
}

/** Copia las carpetas de la usuaria a `destino/<carpeta>`. Devuelve lo copiado. */
export function copiarA(raizDatos: string, id: string, destino: string): Hallazgo[] {
  const hallado = inspeccionar(raizDatos, id); // también comprueba que no hay enlaces
  mkdirSync(destino, { recursive: true });
  for (const { carpeta, ruta } of carpetasDe(raizDatos, id)) cpSync(ruta, join(destino, carpeta), { recursive: true });
  return hallado;
}

/** Borra las carpetas de la usuaria. Devuelve cuántos archivos se borraron. */
export function borrarCarpetas(raizDatos: string, id: string): number {
  const hallado = inspeccionar(raizDatos, id); // si hay un enlace, aborta antes de borrar nada
  for (const { ruta } of carpetasDe(raizDatos, id)) rmSync(ruta, { recursive: true, force: false });
  return hallado.reduce((n, h) => n + h.archivos, 0);
}

export const SQL_EXPORTAR = {
  usuaria: "SELECT to_jsonb(u) AS dato FROM usuarias u WHERE id = $1",
  perfil: "SELECT to_jsonb(p) AS dato FROM perfiles p WHERE usuaria_id = $1",
  preferencias: "SELECT to_jsonb(p) AS dato FROM preferencias p WHERE usuaria_id = $1",
} as const;

// Las tablas hijas (perfiles, preferencias) se borran solas por ON DELETE CASCADE.
export const SQL_BORRAR_USUARIA = "DELETE FROM usuarias WHERE id = $1";
