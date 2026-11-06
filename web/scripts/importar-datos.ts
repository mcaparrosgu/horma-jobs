// Carga en Postgres las ofertas, perfiles y preferencias de datos/ (por defecto, solo datos/fixtures/).
// Repetible: ejecutarlo dos veces no duplica nada.
//   - Ofertas: se actualizan (son comunes y nadie las edita a mano).
//   - Perfiles y preferencias: NO se pisan si ya existen (las edita la usuaria); --forzar los sobrescribe.
// Uso (desde web/): npm run importar                 ->  datos/fixtures
//                   npm run importar -- --dir ../datos/otra-carpeta
//                   npm run importar -- --forzar
//                   npm run importar -- --ofertas ../datos/ofertas/procesadas   ->  solo ofertas ya procesadas
import { readdirSync, readFileSync, existsSync, lstatSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import pg from "pg";
import { validar } from "../src/lib/esquemas.ts";
import { problemaClave } from "../src/lib/clave.ts";
import {
  fuentesDeEndpoints, SQL_SINCRONIZAR_FUENTE, paramsSincronizarFuente, SQL_ABRIR_EJECUCION, SQL_CERRAR_EJECUCION,
  paramsCerrarEjecucion, cuentaVacia, anotarRechazo, anotarInterrupcion, type CuentaEjecucion,
} from "../src/lib/ingesta.ts";
import {
  SQL_OFERTA, SQL_USUARIA, sqlPerfil, sqlPreferencias,
  paramsOferta, paramsPerfil, paramsPreferencias, registrarEvento, errorSeguro,
} from "../src/lib/importar.ts";

const MAX_BYTES = 1_000_000; // tope por archivo: un JSON enorme no debe agotar la memoria

const problema = problemaClave(process.env.HORMA_DB_PASSWORD);
if (problema) {
  console.error(problema);
  process.exit(1);
}
const password = process.env.HORMA_DB_PASSWORD as string;

const args = process.argv.slice(2);
const forzar = args.includes("--forzar");
const i = args.indexOf("--dir");
if (i >= 0 && (!args[i + 1] || args[i + 1].startsWith("--"))) {
  console.error("--dir necesita una carpeta: npm run importar -- --dir ../datos/otra-carpeta");
  process.exit(1);
}
const io = args.indexOf("--ofertas");
if (io >= 0 && (!args[io + 1] || args[io + 1].startsWith("--"))) {
  console.error("--ofertas necesita una carpeta: npm run importar -- --ofertas ../datos/ofertas/procesadas");
  process.exit(1);
}
const SOLO_OFERTAS = io >= 0 ? resolve(args[io + 1]) : null; // modo «solo ofertas»: no toca perfiles
if (SOLO_OFERTAS && (!existsSync(SOLO_OFERTAS) || !statSync(SOLO_OFERTAS).isDirectory())) {
  console.error("--ofertas debe ser una carpeta que exista:", SOLO_OFERTAS);
  process.exit(1);
}
const RAIZ = resolve(i >= 0 ? args[i + 1] : join(import.meta.dirname, "..", "..", "datos", "fixtures"));
if (!existsSync(RAIZ) || !statSync(RAIZ).isDirectory()) {
  console.error("--dir debe ser una carpeta que exista:", RAIZ);
  process.exit(1);
}

/** Motivo por el que NO se debe leer una ruta (enlace simbólico, no es archivo o carpeta, demasiado grande), o null. */
function motivoRechazo(ruta: string, tipo: "archivo" | "carpeta"): string | null {
  const st = lstatSync(ruta);
  if (st.isSymbolicLink()) return "es un enlace simbólico";
  if (tipo === "carpeta" && !st.isDirectory()) return "no es una carpeta";
  if (tipo === "archivo" && !st.isFile()) return "no es un archivo";
  if (tipo === "archivo" && st.size > MAX_BYTES) return "supera 1 MB";
  return null;
}

/** Ruta relativa para la consola: el nombre de la carpeta de una usuaria (su id) se oculta. */
const rutaCorta = (ruta: string) => relative(RAIZ, ruta).replace(/^perfiles[\\/][^\\/]+/, "perfiles/(usuaria)");

/** Texto de cv.md (el que citan los «origen» del perfil), o null si falta o no se debe leer. */
function leerCv(carpeta: string): string | null {
  const ruta = join(carpeta, "cv.md");
  if (!existsSync(ruta)) return null;
  const m = motivoRechazo(ruta, "archivo");
  if (m) {
    console.log(`aviso     ${rutaCorta(ruta)}: no se importa (${m})`);
    return null;
  }
  const texto = readFileSync(ruta, "utf8");
  if (texto.includes("\u0000")) { // Postgres no admite el carácter NUL en un texto
    console.log(`aviso     ${rutaCorta(ruta)}: contiene caracteres nulos, no se importa`);
    return null;
  }
  if (texto.length > 200_000) { // tope de la columna cv_texto (migración 003)
    console.log(`aviso     ${rutaCorta(ruta)}: supera 200000 caracteres, no se importa`);
    return null;
  }
  return texto;
}

const db = new pg.Client({ host: "127.0.0.1", port: 5433, user: "horma", database: "horma", password });
await db.connect();

// Fuentes registradas (endpoints.json): solo las ofertas de estas fuentes cuentan en una ejecución de ingesta.
const RUTA_ENDPOINTS = join(import.meta.dirname, "..", "..", ".claude", "skills", "fuentes-ofertas", "endpoints.json");
let FUENTES = new Map<string, Record<string, any>>(); // eslint-disable-line @typescript-eslint/no-explicit-any
if (existsSync(RUTA_ENDPOINTS) && !motivoRechazo(RUTA_ENDPOINTS, "archivo")) {
  try { FUENTES = fuentesDeEndpoints(JSON.parse(readFileSync(RUTA_ENDPOINTS, "utf8"))); } catch { /* sin endpoints legibles: no se registran ejecuciones */ }
}
const ejecuciones = new Map<string, { id: number; cuenta: CuentaEjecucion }>();

/** Nombre de la fuente de un archivo de oferta si está registrada; null si no (o si el archivo no se puede leer). */
function fuenteRegistrada(ruta: string): string | null {
  if (motivoRechazo(ruta, "archivo")) return null;
  try {
    const f = JSON.parse(readFileSync(ruta, "utf8"))?.fuente;
    return typeof f === "string" && FUENTES.has(f) ? f : null;
  } catch { return null; }
}

/** Primera oferta de una fuente: se asegura su fila en `fuentes` y se abre su ejecución. */
async function ejecucionDe(fuente: string) {
  let e = ejecuciones.get(fuente);
  if (!e) {
    await db.query(SQL_SINCRONIZAR_FUENTE, paramsSincronizarFuente(FUENTES.get(fuente)!));
    const id = (await db.query(SQL_ABRIR_EJECUCION, [fuente])).rows[0].id as number;
    e = { id, cuenta: cuentaVacia() };
    ejecuciones.set(fuente, e);
  }
  return e;
}

async function cerrarEjecuciones() {
  for (const { id, cuenta: c } of ejecuciones.values()) await db.query(SQL_CERRAR_EJECUCION, paramsCerrarEjecucion(id, c));
  ejecuciones.clear();
}

const cuenta = { archivos: 0, importadas: 0, omitidas: 0, rechazadas: 0 };
const inicio = Date.now();

/** Valida y guarda un archivo. Devuelve true si se aceptó. `guardar` devuelve las filas tocadas. */
async function importar(
  archivo: string,
  esquema: "oferta" | "perfil" | "preferencias",
  guardar: (dato: any) => Promise<number>, // eslint-disable-line @typescript-eslint/no-explicit-any
  comprobar?: (dato: any) => string | null, // eslint-disable-line @typescript-eslint/no-explicit-any
): Promise<boolean> {
  cuenta.archivos++;
  const nombre = rutaCorta(archivo);
  const motivo = motivoRechazo(archivo, "archivo");
  if (motivo) {
    cuenta.rechazadas++;
    console.log(`RECHAZADO ${nombre}: ${motivo}`);
    return false;
  }
  let dato: unknown;
  try {
    dato = JSON.parse(readFileSync(archivo, "utf8"));
  } catch {
    cuenta.rechazadas++;
    console.log(`RECHAZADO ${nombre}: no es JSON válido`);
    return false;
  }
  const r = validar(esquema, dato);
  if (!r.ok) {
    cuenta.rechazadas++;
    console.log(`RECHAZADO ${nombre}:\n  - ${r.errores.join("\n  - ")}`);
    return false;
  }
  const incoherencia = comprobar?.(r.dato);
  if (incoherencia) {
    cuenta.rechazadas++;
    console.log(`RECHAZADO ${nombre}: ${incoherencia}`);
    return false;
  }
  await db.query("BEGIN");
  try {
    const filas = await guardar(r.dato);
    await db.query("COMMIT");
    cuenta.importadas++;
    console.log(`ok        ${nombre}${filas === 0 ? " (ya existía: sin cambios; usa --forzar para sobrescribir)" : ""}`);
    return true;
  } catch (e) {
    await db.query("ROLLBACK");
    cuenta.rechazadas++;
    // Nunca e.message: Postgres puede repetir el valor que falló (podría ser un dato personal).
    console.log(`ERROR BD  ${nombre}: ${errorSeguro(e)}`);
    return false;
  }
}

try {
  // Ofertas: …/ofertas/*.json
  const dirOfertas = SOLO_OFERTAS ?? join(RAIZ, "ofertas");
  if (existsSync(dirOfertas)) {
    const m = motivoRechazo(dirOfertas, "carpeta");
    if (m) {
      cuenta.omitidas++;
      console.log(`omitida   ofertas: ${m}`);
    }
    else {
      for (const f of readdirSync(dirOfertas).filter((f) => f.endsWith(".json")).sort()) {
        const ruta = join(dirOfertas, f);
        const fuente = fuenteRegistrada(ruta);
        const ej = fuente ? await ejecucionDe(fuente) : null;
        const ok = await importar(ruta, "oferta", async (o) => (await db.query(SQL_OFERTA, paramsOferta(o, ej?.id ?? null))).rowCount ?? 0);
        if (ej) { if (ok) ej.cuenta.entraron++; else anotarRechazo(ej.cuenta, f, "archivo rechazado"); }
      }
    }
  }

  // Perfiles: …/perfiles/<usuaria>/perfil.json y preferencias.json
  const dirPerfiles = join(RAIZ, "perfiles");
  const mp = SOLO_OFERTAS ? null : existsSync(dirPerfiles) ? motivoRechazo(dirPerfiles, "carpeta") : null;
  if (mp) {
    cuenta.omitidas++;
    console.log(`omitida   perfiles: ${mp}`);
  } else if (!SOLO_OFERTAS && existsSync(dirPerfiles)) {
    let nPerfil = 0;
    for (const u of readdirSync(dirPerfiles).sort()) {
      const etiqueta = `perfil nº ${++nPerfil}`; // el id de la usuaria no va a la consola ni a los logs
      const carpeta = join(dirPerfiles, u);
      const m = motivoRechazo(carpeta, "carpeta");
      if (m) {
        cuenta.omitidas++;
        console.log(`omitida   ${etiqueta}: ${m}`);
        continue;
      }
      const perfil = join(carpeta, "perfil.json");
      const prefs = join(carpeta, "preferencias.json");
      if (!existsSync(perfil)) {
        cuenta.omitidas++;
        console.log(`omitida   ${etiqueta}: aún no tiene perfil.json`);
        continue;
      }
      const perfilOk = await importar(
        perfil, "perfil",
        async (p) => {
          await db.query(SQL_USUARIA, [u]);
          return (await db.query(sqlPerfil(forzar), paramsPerfil(p, leerCv(carpeta)))).rowCount ?? 0;
        },
        (p) => (p.usuaria_id !== u ? "usuaria_id no coincide con el nombre de la carpeta" : null),
      );
      if (!existsSync(prefs)) continue;
      if (!perfilOk) {
        // Sin perfil aceptado no se crea la usuaria solo con preferencias (datos a medias).
        cuenta.omitidas++;
        console.log(`omitida   ${etiqueta}/preferencias.json: su perfil.json fue rechazado`);
        continue;
      }
      await importar(prefs, "preferencias", async (p) => {
        await db.query(SQL_USUARIA, [u]);
        return (await db.query(sqlPreferencias(forzar), paramsPreferencias(u, p))).rowCount ?? 0;
      });
    }
  }

  await cerrarEjecuciones();
  await registrarEvento(db, {
    componente: "importador", accion: "importar-datos",
    resultado: cuenta.rechazadas > 0 ? "error" : "ok",
    duracion_ms: Date.now() - inicio, detalle: cuenta,
  });
  console.log(`\nResumen: ${cuenta.importadas} importados, ${cuenta.omitidas} omitidos, ${cuenta.rechazadas} rechazados (de ${cuenta.archivos} archivos).`);
} catch (e) {
  // Caída a medias: se deja un evento de error (sin datos) y se sale con código 1.
  console.error("Importación interrumpida:", errorSeguro(e));
  for (const e of ejecuciones.values()) anotarInterrupcion(e.cuenta);
  try { await cerrarEjecuciones(); } catch { /* si no se puede cerrar, queda «sin terminar» en el panel */ }
  try {
    await registrarEvento(db, { componente: "importador", accion: "importar-datos", resultado: "error", duracion_ms: Date.now() - inicio, detalle: cuenta });
  } catch { /* si ni siquiera se puede registrar, ya hemos avisado por consola */ }
  process.exitCode = 1;
} finally {
  await db.end();
}
if (cuenta.rechazadas > 0) process.exitCode = 1;
