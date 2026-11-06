// Datos de UNA usuaria en disco, para exportarlos y borrarlos (RGPD: acceso y supresión).
// Solo toca estas tres carpetas dentro de la carpeta de datos; nunca sigue enlaces simbólicos.
import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, realpathSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

// Más estricto que el de la base (que admite mayúsculas y puntos): en Windows «Ana» y «ana» son la MISMA carpeta
// y «ana.» también, pero en la base son usuarias distintas. Aquí solo ids que significan lo mismo en disco y en base.
export const ID_USUARIA = /^[a-z0-9_][a-z0-9_-]{0,79}$/;
const RESERVADOS = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/;
export function idValido(id: string): boolean {
  return ID_USUARIA.test(id) && !RESERVADOS.test(id);
}
export const CARPETAS = ["usuarias", "candidaturas", "matches"] as const;

export interface Hallazgo { carpeta: string; archivos: number; bytes: number }

/** Rutas absolutas de las carpetas de la usuaria que EXISTEN. Lanza si el id no es válido. */
export function carpetasDe(raizDatos: string, id: string): { carpeta: string; ruta: string }[] {
  if (!idValido(id)) throw new Error("identificador de usuaria no válido");
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

/** La carpeta padre (datos/usuarias…) no puede ser un enlace ni sacar la ruta de la carpeta de datos. */
function comprobarDentro(raizDatos: string, carpeta: string, ruta: string): void {
  const padre = join(raizDatos, carpeta);
  if (existsSync(padre) && lstatSync(padre).isSymbolicLink()) throw new Error("una carpeta de datos es un enlace simbólico: revísalo a mano");
  const base = realpathSync(raizDatos);
  if (existsSync(ruta) && !realpathSync(ruta).startsWith(base)) throw new Error("la ruta sale de la carpeta de datos");
}

export function inspeccionar(raizDatos: string, id: string): Hallazgo[] {
  return carpetasDe(raizDatos, id).map(({ carpeta, ruta }) => { comprobarDentro(raizDatos, carpeta, ruta); return { carpeta, ...medir(ruta) }; });
}

/** Copia las carpetas de la usuaria a `destino/<carpeta>`. Devuelve lo copiado. */
export function copiarA(raizDatos: string, id: string, destino: string): Hallazgo[] {
  const hallado = inspeccionar(raizDatos, id); // también comprueba que no hay enlaces
  mkdirSync(destino, { recursive: true });
  for (const { carpeta, ruta } of carpetasDe(raizDatos, id)) cpSync(ruta, join(destino, carpeta), { recursive: true });
  return hallado;
}

/**
 * Borrado en dos tiempos, para que base y disco no queden a medias:
 * 1) `aCuarentena` RENOMBRA las carpetas a datos/.borrando-<id>/ (un rename casi nunca falla a medias);
 * 2) se borra la fila y se confirma; 3) `purgarCuarentena` borra de verdad. Si algo falla antes, `restaurar` lo deshace.
 */
export function aCuarentena(raizDatos: string, id: string): number {
  const hallado = inspeccionar(raizDatos, id); // si hay un enlace, aborta antes de mover nada
  const q = join(raizDatos, `.borrando-${id}`);
  mkdirSync(q, { recursive: true });
  const movidas: { carpeta: string; ruta: string }[] = [];
  try {
    for (const c of carpetasDe(raizDatos, id)) { renameSync(c.ruta, join(q, c.carpeta)); movidas.push(c); }
  } catch (e) { restaurar(raizDatos, id, movidas); throw e; }
  return hallado.reduce((n, h) => n + h.archivos, 0);
}

export function restaurar(raizDatos: string, id: string, movidas?: { carpeta: string; ruta: string }[]): void {
  const q = join(raizDatos, `.borrando-${id}`);
  for (const c of movidas ?? CARPETAS.map((k) => ({ carpeta: k, ruta: join(raizDatos, k, id) }))) {
    if (existsSync(join(q, c.carpeta))) renameSync(join(q, c.carpeta), c.ruta);
  }
  if (existsSync(q)) rmSync(q, { recursive: true });
}

export function purgarCuarentena(raizDatos: string, id: string): void {
  rmSync(join(raizDatos, `.borrando-${id}`), { recursive: true, force: true });
}

export const SQL_EXPORTAR = {
  usuaria: "SELECT to_jsonb(u) AS dato FROM usuarias u WHERE id = $1",
  perfil: "SELECT to_jsonb(p) AS dato FROM perfiles p WHERE usuaria_id = $1",
  preferencias: "SELECT to_jsonb(p) AS dato FROM preferencias p WHERE usuaria_id = $1",
  matches: "SELECT jsonb_agg(to_jsonb(m)) AS dato FROM matches m WHERE usuaria_id = $1",
} as const;

// Las tablas hijas (perfiles, preferencias, matches) se borran solas por ON DELETE CASCADE.
export const SQL_BORRAR_USUARIA = "DELETE FROM usuarias WHERE id = $1";
