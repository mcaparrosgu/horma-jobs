// Recomendaciones (Flujo C): consulta de la página /recomendaciones/[id]. Solo lectura.
// La nota es solo experiencia y formación; nivel_condiciones, solo condiciones de trabajo (esquema match).

export type FilaMatch = {
  oferta_id: string; version_perfil: string; fecha: Date; nota: number | null;
  nivel_condiciones: "encaja" | "parcial" | "no"; explicacion: string; sin_sueldo: boolean; correccion: string | null;
  titulo: string; empresa: string; ubicacion: string; pais: string | null; remoto: string; url: string;
  avisos: { tipo: string; texto: string }[];
};

// Solo la versión de perfil más reciente de la usuaria; ordenadas por nota (las «sin nota» al final). Siempre filtrada por usuaria ($1).
export const SQL_MATCHES = `
  SELECT m.oferta_id, m.version_perfil, m.fecha, m.nota, m.nivel_condiciones, m.explicacion, m.sin_sueldo, m.correccion,
         o.titulo, o.empresa, o.ubicacion, o.pais, o.remoto, o.url, o.avisos
  FROM matches m JOIN ofertas o ON o.id = m.oferta_id
  WHERE m.usuaria_id = $1
    AND m.version_perfil = (SELECT version_perfil FROM matches WHERE usuaria_id = $1 ORDER BY fecha DESC, char_length(version_perfil) DESC, version_perfil DESC LIMIT 1)
  ORDER BY m.nota DESC NULLS LAST, o.titulo, o.id`;

export const ETIQUETA_CONDICIONES: Record<FilaMatch["nivel_condiciones"], string> = {
  encaja: "las condiciones encajan", parcial: "condiciones a revisar", no: "las condiciones no encajan",
};

/** Un enlace solo se pinta si es http(s); lo demás se muestra como texto plano. */
export const enlaceSeguro = (u: string) => /^https?:\/\//i.test(u);
