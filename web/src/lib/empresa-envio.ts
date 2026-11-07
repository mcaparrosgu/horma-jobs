// Enviar una candidatura aprobada a la empresa, y su bandeja (bloque 4). Nunca se comparte nota de recomendación,
// ATS, traza, huecos, perfil humano, preferencias ni otras candidaturas: solo el CV y la carta aprobados (y el
// nombre/correo de contacto, solo si la usuaria lo marca). Horma nunca ordena, filtra ni puntúa para la empresa
// (AI Act, Anexo III.4): por eso la bandeja solo admite orden por fecha de recepción, sin filtros ni notas.

export const NOMBRE_CONTACTO_MAX = 200;

export const ESTADOS_BANDEJA = ["recibida", "vista", "en_proceso", "no_seleccionada"] as const;
export const estadoBandejaValido = (v: unknown): v is (typeof ESTADOS_BANDEJA)[number] =>
  typeof v === "string" && (ESTADOS_BANDEJA as readonly string[]).includes(v);

/** Candidatura aprobada de una oferta de empresa: lo que se necesita para poder enviarla. */
export const SQL_CANDIDATURA_PARA_ENVIAR = `
  SELECT c.cv_md, c.carta_md, c.estado, o.empresa_id, o.titulo, o.empresa AS empresa_nombre
  FROM candidaturas c JOIN ofertas o ON o.id = c.oferta_id
  WHERE c.usuaria_id = $1 AND c.oferta_id = $2 AND o.estado_publicacion = 'aprobada'`;

// Copia CONGELADA: cv_md/carta_md se copian aquí tal cual estaban aprobados, y no se vuelven a leer de
// `candidaturas` después (si la candidatura cambiara más adelante, lo que la empresa ya vio no cambia).
export const SQL_ENVIAR_A_EMPRESA = `
  INSERT INTO envios_empresa (usuaria_id, oferta_id, empresa_id, cv_md, carta_md, contacto_nombre, contacto_email)
  VALUES ($1, $2, $3, $4, $5, $6, $7)`;

export const SQL_RETIRAR_ENVIO = `DELETE FROM envios_empresa WHERE usuaria_id = $1 AND oferta_id = $2`;

// La bandeja de la empresa: SOLO estas columnas (nunca el porcentaje de ajuste, ATS, traza, huecos ni nada de
// perfiles/preferencias/candidaturas de otras ofertas) y SOLO por fecha de recepción; sin filtrar por contenido.
// empresa-envio.test.ts rompe esta regla a propósito para comprobar que se detecta.
export const SQL_BANDEJA = `
  SELECT id, cv_md, carta_md, contacto_nombre, contacto_email, estado_bandeja, enviado_en
  FROM envios_empresa WHERE oferta_id = $1 AND empresa_id = $2
  ORDER BY enviado_en`;

export const SQL_CAMBIAR_ESTADO_BANDEJA = `
  UPDATE envios_empresa SET estado_bandeja = $3 WHERE id = $1 AND empresa_id = $2`;

/** Para comprobar que la oferta de la bandeja es de la empresa de la sesión, y mostrar su título. */
export const SQL_OFERTA_TITULO = `SELECT titulo, empresa_id FROM ofertas WHERE id = $1`;
