"use server";
// Aprobar y marcar como enviada (Flujo E). Son las dos únicas escrituras sobre una candidatura desde la web.
// El id de la usuaria sale de la SESIÓN: aunque alguien cambie el formulario, solo puede tocar lo suyo.
// Un agente no puede llegar aquí: no tiene sesión de la usuaria.
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requerirSesion } from "@/lib/sesion";
import { SQL_APROBAR, SQL_MARCAR_ENVIADA, ID_OFERTA, canalValido } from "@/lib/candidaturas";
import { registrarEvento } from "@/lib/importar";

export type EstadoAccion = { mensaje: string | null; ok: boolean };

const txt = (f: FormData, k: string) => { const v = f.get(k); return typeof v === "string" ? v.slice(0, 200) : ""; };

async function apunte(accion: "aprobar" | "marcar-enviada", ok: boolean, t0: number) {
  await registrarEvento(db(), { componente: "web-candidatos", accion, resultado: ok ? "ok" : "error", duracion_ms: Date.now() - t0 }).catch(() => {});
}

export async function aprobar(_previo: EstadoAccion, f: FormData): Promise<EstadoAccion> {
  const t0 = Date.now();
  const s = await requerirSesion();
  const oferta = txt(f, "oferta_id"), version = txt(f, "version");
  if (!ID_OFERTA.test(oferta) || Number.isNaN(Date.parse(version))) return { ok: false, mensaje: "Oferta no válida." };
  if (f.get("revisado") !== "on") return { ok: false, mensaje: "Marca que has revisado el CV, la carta y los avisos antes de aprobar." };
  const r = await db().query(SQL_APROBAR, [s.usuaria_id, oferta, version]).catch(() => null);
  const hecho = !!r && (r.rowCount ?? 0) === 1;
  await apunte("aprobar", hecho, t0);
  if (!hecho) return { ok: false, mensaje: "No se pudo aprobar: solo se aprueban borradores, y puede que haya cambiado desde que la abriste: recarga la página, léela de nuevo y vuelve a aprobar." };
  revalidatePath("/candidaturas/[id]", "page");
  return { ok: true, mensaje: "Aprobada. Horma no envía nada por su cuenta: envíala tú y anótalo aquí." };
}

export async function marcarEnviada(_previo: EstadoAccion, f: FormData): Promise<EstadoAccion> {
  const t0 = Date.now();
  const s = await requerirSesion();
  const oferta = txt(f, "oferta_id"), canal = txt(f, "canal");
  if (!ID_OFERTA.test(oferta)) return { ok: false, mensaje: "Oferta no válida." };
  if (!canalValido(canal)) return { ok: false, mensaje: "Elige por dónde la enviaste." };
  const r = await db().query(SQL_MARCAR_ENVIADA, [s.usuaria_id, oferta, canal]).catch(() => null);
  const hecho = !!r && (r.rowCount ?? 0) === 1;
  await apunte("marcar-enviada", hecho, t0);
  if (!hecho) return { ok: false, mensaje: "No se pudo anotar: la candidatura tiene que estar aprobada por ti." };
  revalidatePath("/candidaturas/[id]", "page");
  return { ok: true, mensaje: "Anotada como enviada." };
}
