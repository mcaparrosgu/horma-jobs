// Consultas de lectura de la web de ingesta. Todo con parámetros ($1, $2…): el dato nunca se pega al SQL.
export type FiltrosOfertas = {
  q?: string; pais?: string; nivel?: string; remoto?: string; sector?: string; familia?: string;
};

export const NIVELES = ["practicas", "junior", "medio", "senior", "direccion", "no_indicado"] as const;
export const REMOTOS = ["presencial", "hibrido", "remoto", "no_indicado"] as const;
export const LIMITE_OFERTAS = 50;

const escapaLike = (s: string) => s.replace(/[\\%_]/g, (c) => `\\${c}`);

/** Convierte los filtros de la URL en un WHERE seguro. Lo que no encaja con la lista permitida se ignora. */
export function construirFiltro(f: FiltrosOfertas): { where: string; params: unknown[] } {
  const cond: string[] = [];
  const params: unknown[] = [];
  const add = (sql: string, v: unknown) => { params.push(v); cond.push(sql.replace("?", `$${params.length}`)); };

  const q = f.q?.trim().slice(0, 80);
  if (q) {
    params.push(`%${escapaLike(q)}%`);
    cond.push(`(titulo ILIKE $${params.length} OR empresa ILIKE $${params.length})`);
  }
  if (f.pais && /^[A-Z]{2}$/.test(f.pais)) add("pais = ?", f.pais);
  if (f.nivel && (NIVELES as readonly string[]).includes(f.nivel)) add("nivel = ?", f.nivel);
  if (f.remoto && (REMOTOS as readonly string[]).includes(f.remoto)) add("remoto = ?", f.remoto);
  if (f.sector) add("sector = ?", f.sector.slice(0, 80));
  if (f.familia) add("familia = ?", f.familia.slice(0, 80));
  return { where: cond.length ? `WHERE ${cond.join(" AND ")}` : "", params };
}

// Toda oferta de empresa nace pendiente_de_revision (migración 018) y no aparece aquí hasta que administración
// la aprueba: por eso esta condición va SIEMPRE, se filtre o no por lo demás.
const APROBADA = "estado_publicacion = 'aprobada'";

export function sqlOfertas(f: FiltrosOfertas): { sql: string; params: unknown[] } {
  const { where, params } = construirFiltro(f);
  const whereFinal = where ? `${where} AND ${APROBADA}` : `WHERE ${APROBADA}`;
  return {
    sql: `SELECT id, fuente, url, fecha, titulo, empresa, ubicacion, pais, remoto, nivel, sector, familia,
                 salario, stack, auditoria, licencia, atribucion, avisos
          FROM ofertas ${whereFinal} ORDER BY fecha DESC NULLS LAST, creada_en DESC LIMIT ${LIMITE_OFERTAS}`,
    params,
  };
}

export const SQL_TOTAL_OFERTAS = `SELECT count(*)::int AS n FROM ofertas WHERE ${APROBADA}`;
export const SQL_OPCIONES = `
  SELECT 'pais' AS campo, pais AS valor FROM ofertas WHERE pais IS NOT NULL AND ${APROBADA} GROUP BY pais
  UNION ALL SELECT 'sector', sector FROM ofertas WHERE sector IS NOT NULL AND ${APROBADA} GROUP BY sector
  UNION ALL SELECT 'familia', familia FROM ofertas WHERE familia IS NOT NULL AND ${APROBADA} GROUP BY familia
  ORDER BY 1, 2`;
export const SQL_FUENTES = `SELECT nombre, url, parametros, cabeceras, clave_env, clave_en, clave_nombre, mapeo_campos, activa
                            FROM fuentes ORDER BY nombre`;
export const SQL_EJECUCIONES = `SELECT id, fuente, inicio, fin, entraron, descartadas, errores
                             FROM ejecuciones_ingesta ORDER BY inicio DESC LIMIT 50`;
