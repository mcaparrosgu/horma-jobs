// Piezas puras de `npm run verificar`: comparan lo descargado (datos/ofertas) con lo guardado (tabla ofertas).
// Sin disco ni red, para probarlas con `npm test`. Nunca devuelven valores de campos: solo ids y nombres de campo,
// para que la salida no pueda arrastrar texto de una oferta (ni datos personales) a la pantalla o a los logs.
import { isDeepStrictEqual } from "node:util";

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

/** Campos que se comparan entre el archivo procesado y la fila de la base. */
export const CAMPOS_COMPARADOS = ["titulo", "empresa", "url", "fecha", "sector", "familia", "requisitos", "stack", "avisos"] as const;

/** Columnas que hay que pedir a la base de datos: `fecha` en texto, para que la zona horaria no la desplace. */
export const SQL_FILAS = `
  SELECT id, titulo, empresa, url, fecha::text AS fecha, sector, familia, requisitos, stack, avisos
  FROM ofertas ORDER BY id`;

/** Lo que debería haber en la fila según el archivo (mismas reglas que `paramsOferta`: ausente = null o lista vacía). */
export function filaEsperada(o: Json): Record<(typeof CAMPOS_COMPARADOS)[number], unknown> {
  const t = o.taxonomia ?? {};
  return {
    titulo: o.titulo, empresa: o.empresa, url: o.url, fecha: o.fecha ?? null,
    sector: t.sector ?? null, familia: t.familia ?? null,
    requisitos: o.requisitos ?? [], stack: t.stack ?? [], avisos: o.avisos ?? [],
  };
}

/** Nombres de los campos que no coinciden entre el archivo y la fila (lista vacía = coinciden). */
export function camposDistintos(o: Json, fila: Json): string[] {
  const esperada = filaEsperada(o);
  return CAMPOS_COMPARADOS.filter((c) => !isDeepStrictEqual(esperada[c], fila[c] ?? null));
}

export type Informe = {
  coinciden: number;
  distintas: { id: string; campos: string[] }[];
  invalidas: string[]; // procesada que no es JSON válido o no cumple el esquema (la rellena el script, que lee el disco)
  sinFila: string[]; // procesada sin fila en la base
  sinProcesada: string[]; // raw sin procesada (tanda a medias)
  soloEnBase: string[]; // fila sin archivo que no es de prueba
  deClavePrueba: number; // filas de prueba esperadas (`of-prueba-*`)
};

/**
 * Cruza las tres fuentes por id (el nombre del archivo sin extensión).
 * `procesadas`: id → oferta ya validada. `filas`: id → fila de la base.
 */
export function cruzar(raw: string[], procesadas: Map<string, Json>, filas: Map<string, Json>): Informe {
  const inf: Informe = { coinciden: 0, distintas: [], invalidas: [], sinFila: [], sinProcesada: [], soloEnBase: [], deClavePrueba: 0 };
  for (const [id, o] of [...procesadas].sort(([a], [b]) => a.localeCompare(b))) {
    const fila = filas.get(id);
    if (!fila) { inf.sinFila.push(id); continue; }
    const campos = camposDistintos(o, fila);
    if (campos.length) inf.distintas.push({ id, campos });
    else inf.coinciden++;
  }
  inf.sinProcesada = raw.filter((id) => !procesadas.has(id)).sort();
  for (const id of [...filas.keys()].sort()) {
    if (procesadas.has(id)) continue;
    if (id.startsWith("of-prueba-")) inf.deClavePrueba++;
    else inf.soloEnBase.push(id);
  }
  return inf;
}

/** Solo estos cuatro fallos hacen que el comando termine con error; las filas sin archivo son un aviso. */
export function hayFallos(i: Informe): boolean {
  return i.invalidas.length > 0 || i.distintas.length > 0 || i.sinFila.length > 0 || i.sinProcesada.length > 0;
}
