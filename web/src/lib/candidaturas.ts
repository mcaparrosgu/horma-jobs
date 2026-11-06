// Candidaturas (Flujos D y E): consultas de las páginas /candidaturas/[id]. Solo lectura.
// Aprobar y enviar se hacen en Claude Code (/aprobar, /marcar-enviada): la web no escribe, porque aún no hay login.

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
