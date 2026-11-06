// Candidaturas (Flujos D y E): consultas de las páginas /candidaturas/[id] y las dos escrituras que hace la usuaria
// con sesión: aprobar y marcar como enviada. Un agente nunca escribe «aprobada»: solo esta acción, con la sesión de ella.

export type FilaCandidatura = {
  oferta_id: string; estado: string; cv_usado: string; cv_md: string; carta_md: string | null;
  historial: { estado: string; fecha: string; por: string; canal?: string | null; motivo?: string | null }[];
  huecos: { requisito: string; propuesta: string; decision: string; relleno_aviso?: string | null }[];
  ats: { cobertura: number; faltantes_con_origen: string[]; faltantes_sin_origen: string[] };
  actualizado_en: Date; titulo: string; empresa: string; url: string;
};

// Siempre filtrada por usuaria ($1). Sin traza: es para auditar en Claude Code, no para leer.
export const SQL_CANDIDATURAS = `
  SELECT c.oferta_id, c.estado, c.cv_usado, c.cv_md, c.carta_md, c.historial, c.huecos, c.ats, c.actualizado_en,
         o.titulo, o.empresa, o.url
  FROM candidaturas c JOIN ofertas o ON o.id = c.oferta_id
  WHERE c.usuaria_id = $1
  ORDER BY c.actualizado_en DESC, c.oferta_id`;

export const ETIQUETA_ESTADO: Record<string, string> = {
  borrador: "borrador: falta que tú la revises y apruebes",
  pendiente_de_ti: "pendiente de ti: no pasó el control y necesita tu decisión",
  aprobada: "aprobada por ti",
  enviada: "enviada",
  entrevista: "entrevista",
  rechazada: "rechazada",
  sin_respuesta: "sin respuesta",
  descartada: "descartada",
};

/** Huecos a enseñar PRIMERO: los que Horma reformuló o rellenó (regla de los huecos). */
export const huecosConAviso = (h: FilaCandidatura["huecos"]) => h.filter((x) => x.relleno_aviso);
export const huecosSinCubrir = (h: FilaCandidatura["huecos"]) => h.filter((x) => !x.relleno_aviso);
export const porcentaje = (c: number) => `${Math.round(Math.min(1, Math.max(0, c)) * 100)} %`;

// --- Escrituras de la usuaria (bloque 4). El estado solo avanza en orden: borrador → aprobada → enviada. ---
// Todo va filtrado por la usuaria de la SESIÓN ($1), nunca por un dato del formulario.
const HOY = "to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD')";

export const SQL_APROBAR = `
  UPDATE candidaturas SET estado = 'aprobada',
    historial = historial || jsonb_build_array(jsonb_build_object('estado', 'aprobada', 'fecha', ${HOY}, 'por', 'usuaria')),
    actualizado_en = now()
  -- $3 = la versión que ella estaba leyendo: si el borrador cambió entre medias, no se aprueba un texto que no vio.
  WHERE usuaria_id = $1 AND oferta_id = $2 AND estado = 'borrador' AND date_trunc('milliseconds', actualizado_en) = $3::timestamptz`;

export const SQL_MARCAR_ENVIADA = `
  UPDATE candidaturas SET estado = 'enviada',
    historial = historial || jsonb_build_array(jsonb_build_object('estado', 'enviada', 'fecha', ${HOY}, 'por', 'usuaria', 'canal', $3::text)),
    actualizado_en = now()
  WHERE usuaria_id = $1 AND oferta_id = $2 AND estado = 'aprobada'
    AND EXISTS (SELECT 1 FROM jsonb_array_elements(historial) e WHERE e->>'estado' = 'aprobada' AND e->>'por' = 'usuaria')`;

/** Lista cerrada: el canal no es texto libre. */
export const CANALES = ["web de la empresa", "correo", "LinkedIn", "Indeed", "otro"] as const;
export const canalValido = (c: unknown): c is (typeof CANALES)[number] => typeof c === "string" && (CANALES as readonly string[]).includes(c);
export const ID_OFERTA = /^[A-Za-z0-9_-][A-Za-z0-9_.-]{0,79}$/;
