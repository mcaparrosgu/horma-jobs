// Lógica de «Mi cuenta» (bloque 1 de la construcción autónoma, RGPD): cambiar contraseña y comprobar si se puede
// borrar la cuenta propia. Funciones puras sobre una `Bd` (como acceso.ts), sin cookies ni Next: se prueban con una
// base falsa. El id de la usuaria siempre lo pone quien llama a partir de la SESIÓN, nunca de un formulario.
import { problemaContrasena, verificarContrasena, hashContrasena } from "./auth.ts";
import type { Bd } from "./acceso.ts";

export type Resultado = { ok: true } | { ok: false; error: string };

const SQL_CUENTA = "SELECT hash, rol, email FROM cuentas WHERE usuaria_id = $1";

/** Cambia la contraseña tras comprobar la actual. No vale para cuentas solo-Google (no tienen hash). */
export async function cambiarContrasenaPropia(bd: Bd, usuariaId: string, actual: unknown, nueva: unknown): Promise<Resultado> {
  const fila = (await bd.query(SQL_CUENTA, [usuariaId])).rows[0];
  if (!fila) return { ok: false, error: "No se encuentra tu cuenta." };
  const hash = typeof fila.hash === "string" ? fila.hash : null;
  if (!hash) return { ok: false, error: "Entras con Google: no tienes contraseña que cambiar." };
  const buena = await verificarContrasena(typeof actual === "string" ? actual : "", hash);
  if (!buena) return { ok: false, error: "La contraseña actual no es correcta." };
  const problema = problemaContrasena(nueva, typeof fila.email === "string" ? fila.email : null);
  if (problema) return { ok: false, error: problema };
  await bd.query(
    "UPDATE cuentas SET hash = $2, fallos = 0, bloqueada_hasta = NULL WHERE usuaria_id = $1",
    [usuariaId, await hashContrasena(nueva as string)],
  );
  return { ok: true };
}

/**
 * ¿Puede borrarse esta cuenta? Nunca si es de administración. Si tiene contraseña, hay que escribirla; si solo
 * entra con Google (sin hash), hay que escribir su correo exactamente, para que borrar no sea un solo clic.
 */
export async function puedeBorrarCuenta(bd: Bd, usuariaId: string, confirmacion: unknown): Promise<Resultado> {
  const fila = (await bd.query(SQL_CUENTA, [usuariaId])).rows[0];
  if (!fila) return { ok: false, error: "No se encuentra tu cuenta." };
  if (fila.rol === "admin") return { ok: false, error: "La cuenta de administración no se borra desde la web." };
  const hash = typeof fila.hash === "string" ? fila.hash : null;
  const texto = typeof confirmacion === "string" ? confirmacion : "";
  if (hash) {
    if (!(await verificarContrasena(texto, hash))) return { ok: false, error: "La contraseña no es correcta." };
  } else if (texto.trim().toLowerCase() !== String(fila.email).toLowerCase()) {
    return { ok: false, error: "Escribe tu correo exactamente para confirmar." };
  }
  return { ok: true };
}
