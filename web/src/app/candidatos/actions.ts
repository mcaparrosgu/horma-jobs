"use server";
// Guardar las preferencias de una usuaria. Pasa por validarPreferencias (esquema preferencias.json) y el apunte
// de observabilidad solo lleva números. El id sale de la SESIÓN, nunca del formulario: nadie puede editar las de otra.
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { validarPreferencias } from "@/lib/preferencias";
import { requerirSesion } from "@/lib/sesion";
import { registrarEvento, errorSeguro, sqlPreferencias, paramsPreferencias } from "@/lib/importar";

export type EstadoPrefs = { ok: boolean; errores: string[]; enviado?: Record<string, string | string[]> };

const t = (f: FormData, k: string) => { const v = f.get(k); return typeof v === "string" ? v.slice(0, 2000) : ""; };

export async function guardarPreferencias(_previo: EstadoPrefs, f: FormData): Promise<EstadoPrefs> {
  const id = (await requerirSesion()).usuaria_id; // el campo «usuaria_id» del formulario se ignora
  const enviado: Record<string, string | string[]> = {
    puestos: t(f, "puestos"), ciudades: t(f, "ciudades"), paises: t(f, "paises"), contrato: t(f, "contrato"),
    idiomas: t(f, "idiomas"), sectores: t(f, "sectores"), niveles: t(f, "niveles"), sueldo_min: t(f, "sueldo_min"),
    rango_min: t(f, "rango_min"), rango_max: t(f, "rango_max"),
    remoto: f.getAll("remoto").filter((v): v is string => typeof v === "string"),
    horario: f.getAll("horario").filter((v): v is string => typeof v === "string"),
  };
  const r = validarPreferencias(enviado as Parameters<typeof validarPreferencias>[0]);
  if (!r.ok) return { ok: false, errores: r.errores, enviado };

  const t0 = Date.now();
  const apunte = (resultado: "ok" | "error") =>
    registrarEvento(db(), { componente: "web-candidatos", accion: "guardar-preferencias", resultado, duracion_ms: Date.now() - t0 }).catch(() => {});
  try {
    // Solo se actualiza a una usuaria que ya existe: el UPSERT falla por clave foránea si no existe.
    await db().query(sqlPreferencias(true), paramsPreferencias(id, r.prefs));
  } catch (e) {
    await apunte("error");
    return { ok: false, errores: [`No se pudo guardar (${errorSeguro(e)})`], enviado };
  }
  await apunte("ok");
  revalidatePath("/candidatos/[id]", "page");
  return { ok: true, errores: [] };
}
