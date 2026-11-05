// Carga en Postgres las ofertas, perfiles y preferencias de datos/ (por defecto, solo datos/fixtures/).
// Repetible: ejecutarlo dos veces no duplica nada.
//   - Ofertas: se actualizan (son comunes y nadie las edita a mano).
//   - Perfiles y preferencias: NO se pisan si ya existen (las edita la usuaria); --forzar los sobrescribe.
// Uso (desde web/): npm run importar                 ->  datos/fixtures
//                   npm run importar -- --dir ../datos/otra-carpeta
//                   npm run importar -- --forzar
import { readdirSync, readFileSync, existsSync, lstatSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import pg from "pg";
import { validar } from "../src/lib/esquemas.ts";
import { problemaClave } from "../src/lib/clave.ts";
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

/** Texto de cv.md (el que citan los «origen» del perfil), o null si falta o no se debe leer. */
function leerCv(carpeta: string): string | null {
  const ruta = join(carpeta, "cv.md");
  if (!existsSync(ruta)) return null;
  const m = motivoRechazo(ruta, "archivo");
  if (m) {
    console.log(`aviso     ${relative(RAIZ, ruta)}: no se importa (${m})`);
    return null;
  }
  const texto = readFileSync(ruta, "utf8");
  if (texto.includes("\u0000")) { // Postgres no admite el carácter NUL en un texto
    console.log(`aviso     ${relative(RAIZ, ruta)}: contiene caracteres nulos, no se importa`);
    return null;
  }
  if (texto.length > 200_000) { // tope de la columna cv_texto (migración 003)
    console.log(`aviso     ${relative(RAIZ, ruta)}: supera 200000 caracteres, no se importa`);
    return null;
  }
  return texto;
}

const db = new pg.Client({ host: "127.0.0.1", port: 5433, user: "horma", database: "horma", password });
await db.connect();

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
  const nombre = relative(RAIZ, archivo);
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
  const dirOfertas = join(RAIZ, "ofertas");
  if (existsSync(dirOfertas)) {
    const m = motivoRechazo(dirOfertas, "carpeta");
    if (m) {
      cuenta.omitidas++;
      console.log(`omitida   ofertas: ${m}`);
    }
    else {
      for (const f of readdirSync(dirOfertas).filter((f) => f.endsWith(".json")).sort()) {
        await importar(join(dirOfertas, f), "oferta", async (o) => (await db.query(SQL_OFERTA, paramsOferta(o))).rowCount ?? 0);
      }
    }
  }

  // Perfiles: …/perfiles/<usuaria>/perfil.json y preferencias.json
  const dirPerfiles = join(RAIZ, "perfiles");
  const mp = existsSync(dirPerfiles) ? motivoRechazo(dirPerfiles, "carpeta") : null;
  if (mp) {
    cuenta.omitidas++;
    console.log(`omitida   perfiles: ${mp}`);
  } else if (existsSync(dirPerfiles)) {
    for (const u of readdirSync(dirPerfiles).sort()) {
      const carpeta = join(dirPerfiles, u);
      const m = motivoRechazo(carpeta, "carpeta");
      if (m) {
        cuenta.omitidas++;
        console.log(`omitida   perfiles/${u}: ${m}`);
        continue;
      }
      const perfil = join(carpeta, "perfil.json");
      const prefs = join(carpeta, "preferencias.json");
      if (!existsSync(perfil)) {
        cuenta.omitidas++;
        console.log(`omitida   perfiles/${u}: aún no tiene perfil.json`);
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
        console.log(`omitida   perfiles/${u}/preferencias.json: su perfil.json fue rechazado`);
        continue;
      }
      await importar(prefs, "preferencias", async (p) => {
        await db.query(SQL_USUARIA, [u]);
        return (await db.query(sqlPreferencias(forzar), paramsPreferencias(u, p))).rowCount ?? 0;
      });
    }
  }

  await registrarEvento(db, {
    componente: "importador", accion: "importar-datos",
    resultado: cuenta.rechazadas > 0 ? "error" : "ok",
    duracion_ms: Date.now() - inicio, detalle: cuenta,
  });
  console.log(`\nResumen: ${cuenta.importadas} importados, ${cuenta.omitidas} omitidos, ${cuenta.rechazadas} rechazados (de ${cuenta.archivos} archivos).`);
} catch (e) {
  // Caída a medias: se deja un evento de error (sin datos) y se sale con código 1.
  console.error("Importación interrumpida:", errorSeguro(e));
  try {
    await registrarEvento(db, { componente: "importador", accion: "importar-datos", resultado: "error", duracion_ms: Date.now() - inicio, detalle: cuenta });
  } catch { /* si ni siquiera se puede registrar, ya hemos avisado por consola */ }
  process.exitCode = 1;
} finally {
  await db.end();
}
if (cuenta.rechazadas > 0) process.exitCode = 1;
