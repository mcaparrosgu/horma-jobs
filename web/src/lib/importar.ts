// Piezas puras del importador de datos: pasan un JSON ya validado a los parámetros de cada INSERT.
// Sin acceso a disco ni a red, para poder probarlas con `npm test`.

type Json = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

// Las columnas jsonb se pasan como texto: si no, `pg` convierte los arrays de JS en arrays de Postgres.
const j = (v: unknown) => JSON.stringify(v);

export const SQL_OFERTA = `
  INSERT INTO ofertas (id, fuente, url, fecha, titulo, empresa, ubicacion, pais, remoto, contrato,
                       idioma, nivel, sector, familia, requisitos, salario, stack, auditoria, avisos, licencia, atribucion, ejecucion_id)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15::jsonb,$16::jsonb,$17::jsonb,$18::jsonb,$19::jsonb,$20,$21,$22)
  ON CONFLICT (id) DO UPDATE SET
    fuente=EXCLUDED.fuente, url=EXCLUDED.url, fecha=EXCLUDED.fecha, titulo=EXCLUDED.titulo,
    empresa=EXCLUDED.empresa, ubicacion=EXCLUDED.ubicacion, pais=EXCLUDED.pais,
    remoto=EXCLUDED.remoto, contrato=EXCLUDED.contrato, idioma=EXCLUDED.idioma, nivel=EXCLUDED.nivel,
    sector=EXCLUDED.sector, familia=EXCLUDED.familia, requisitos=EXCLUDED.requisitos,
    salario=EXCLUDED.salario, stack=EXCLUDED.stack, auditoria=EXCLUDED.auditoria,
    avisos=EXCLUDED.avisos, licencia=EXCLUDED.licencia, atribucion=EXCLUDED.atribucion,
    ejecucion_id=COALESCE(EXCLUDED.ejecucion_id, ofertas.ejecucion_id)`;

/** `ejecucionId`: la ejecución de ingesta que la trae (null si su fuente no está en endpoints.json, p. ej. las de prueba). */
export function paramsOferta(o: Json, ejecucionId: number | string | null = null): unknown[] {
  const t = o.taxonomia ?? {};
  return [
    o.id, o.fuente, o.url, o.fecha ?? null, o.titulo, o.empresa, o.ubicacion, o.pais ?? null,
    o.remoto, o.contrato, o.idioma, o.nivel, t.sector ?? null, t.familia ?? null,
    j(o.requisitos ?? []), j(o.salario), j(t.stack ?? []), j(o.auditoria), j(o.avisos ?? []),
    o.origen?.licencia ?? null, o.origen?.atribucion ?? null, ejecucionId,
  ];
}

export const SQL_USUARIA = `INSERT INTO usuarias (id) VALUES ($1) ON CONFLICT (id) DO NOTHING`;

// Perfil y preferencias las edita la usuaria en la web: por defecto NO se pisan (DO NOTHING).
// Solo con --forzar se sobrescriben con lo que haya en disco (hallazgo A del revisor).
export const sqlPerfil = (forzar: boolean) => `
  INSERT INTO perfiles (usuaria_id, experiencias, formacion, skills, idiomas, taxonomia,
                        preguntas_pendientes, instrucciones_embebidas, cv_texto)
  VALUES ($1,$2::jsonb,$3::jsonb,$4::jsonb,$5::jsonb,$6::jsonb,$7::jsonb,$8::jsonb,$9)
  ON CONFLICT (usuaria_id) ${forzar ? `DO UPDATE SET
    cv_texto=EXCLUDED.cv_texto,
    experiencias=EXCLUDED.experiencias, formacion=EXCLUDED.formacion, skills=EXCLUDED.skills,
    idiomas=EXCLUDED.idiomas, taxonomia=EXCLUDED.taxonomia,
    preguntas_pendientes=EXCLUDED.preguntas_pendientes,
    instrucciones_embebidas=EXCLUDED.instrucciones_embebidas, actualizado_en=now()`
    // Sin --forzar solo se rellena el texto del CV si aún no lo había: nunca se pisa lo que ella editó.
    : `DO UPDATE SET cv_texto=EXCLUDED.cv_texto WHERE perfiles.cv_texto IS NULL AND EXCLUDED.cv_texto IS NOT NULL`}`;

export function paramsPerfil(p: Json, cvTexto: string | null = null): unknown[] {
  return [
    p.usuaria_id, j(p.experiencias), j(p.formacion), j(p.skills), j(p.idiomas), j(p.taxonomia),
    j(p.preguntas_pendientes), j(p.instrucciones_embebidas ?? []), cvTexto,
  ];
}

export const sqlPreferencias = (forzar: boolean) => `
  INSERT INTO preferencias (usuaria_id, puestos, ciudades, paises, remoto, contrato, idiomas,
                            sectores, niveles, horario, sueldo_min, rango_compatibilidad)
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
  ON CONFLICT (usuaria_id) ${forzar ? `DO UPDATE SET
    puestos=EXCLUDED.puestos, ciudades=EXCLUDED.ciudades, paises=EXCLUDED.paises,
    remoto=EXCLUDED.remoto, contrato=EXCLUDED.contrato, idiomas=EXCLUDED.idiomas,
    sectores=EXCLUDED.sectores, niveles=EXCLUDED.niveles, horario=EXCLUDED.horario, sueldo_min=EXCLUDED.sueldo_min,
    rango_compatibilidad=EXCLUDED.rango_compatibilidad, actualizado_en=now()` : "DO NOTHING"}`;

/** preferencias.json no trae el id de la usuaria: viene del nombre de su carpeta. */
export function paramsPreferencias(usuariaId: string, p: Json): unknown[] {
  return [
    usuariaId, p.puestos ?? [], p.ciudades ?? [], p.paises ?? [], p.remoto ?? [], p.contrato ?? [],
    p.idiomas ?? [], p.sectores ?? [], p.niveles ?? [], p.horario ?? [], p.sueldo_min ?? null, p.rango_compatibilidad,
  ];
}

// --- Observabilidad -------------------------------------------------------------------------
// `eventos.detalle` NUNCA lleva datos personales: solo estas claves, y solo números.
export const CLAVES_DETALLE = ["archivos", "importadas", "omitidas", "rechazadas"] as const;

// Componentes y acciones permitidos: cada uno nuevo se añade aquí, a propósito (hallazgo C).
export const COMPONENTES = ["importador", "web-ingesta", "web-candidatos"] as const;
export const ACCIONES = ["importar-datos", "guardar-fuente", "guardar-preferencias"] as const;

export type EventoEntrada = {
  componente: (typeof COMPONENTES)[number];
  accion: (typeof ACCIONES)[number];
  resultado: "ok" | "error";
  duracion_ms?: number;
  detalle?: Record<string, number>;
};

/** Deja pasar solo las claves de la lista cerrada y solo si el valor es un número. */
export function detalleSeguro(detalle: Record<string, unknown> = {}): Record<string, number> {
  const limpio: Record<string, number> = {};
  for (const k of CLAVES_DETALLE) {
    const v = detalle[k];
    if (typeof v === "number" && Number.isFinite(v)) limpio[k] = v;
  }
  return limpio;
}

/** Texto de un error de la base de datos SIN el mensaje: puede repetir el valor que falló (hallazgo B). */
export function errorSeguro(e: unknown): string {
  const { code, constraint } = (e ?? {}) as { code?: unknown; constraint?: unknown };
  const partes = [typeof code === "string" ? `código ${code}` : "error inesperado"];
  if (typeof constraint === "string") partes.push(`restricción ${constraint}`);
  return partes.join(", ");
}

export async function registrarEvento(
  db: { query: (sql: string, params: unknown[]) => Promise<unknown> },
  e: EventoEntrada,
): Promise<void> {
  // Los tipos de TypeScript desaparecen al ejecutar: se vuelve a comprobar en tiempo de ejecución.
  if (!(COMPONENTES as readonly string[]).includes(e.componente)) throw new Error("componente no permitido");
  if (!(ACCIONES as readonly string[]).includes(e.accion)) throw new Error("acción no permitida");
  if (e.resultado !== "ok" && e.resultado !== "error") throw new Error("resultado no permitido");
  const ms = e.duracion_ms === undefined || !Number.isFinite(e.duracion_ms) ? null : Math.max(0, Math.trunc(e.duracion_ms));
  await db.query(
    `INSERT INTO eventos (componente, accion, resultado, duracion_ms, detalle) VALUES ($1,$2,$3,$4,$5::jsonb)`,
    [e.componente, e.accion, e.resultado, ms, JSON.stringify(detalleSeguro(e.detalle))],
  );
}
