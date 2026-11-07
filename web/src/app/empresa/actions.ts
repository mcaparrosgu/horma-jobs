"use server";
// Entrar y salir del portal de empresas (bloque 3). Sin registro aquí: el alta es solo por terminal.
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { entrarConContrasenaEmpresa } from "@/lib/empresa-acceso";
import { crearSesionEmpresa, cerrarSesionEmpresa } from "@/lib/sesion-empresa";
import { registrarEvento } from "@/lib/importar";

export type EstadoAccesoEmpresa = { error: string | null; email?: string };
const txt = (f: FormData, k: string) => { const v = f.get(k); return typeof v === "string" ? v.slice(0, 300) : ""; };

export async function entrarEmpresa(_previo: EstadoAccesoEmpresa, f: FormData): Promise<EstadoAccesoEmpresa> {
  const t0 = Date.now();
  const email = txt(f, "email");
  const r = await entrarConContrasenaEmpresa(db(), email, txt(f, "contrasena"));
  await registrarEvento(db(), { componente: "web-empresa", accion: "entrar-empresa", resultado: r.ok ? "ok" : "error", duracion_ms: Date.now() - t0 }).catch(() => {});
  if (!r.ok) return { error: r.error, email };
  await crearSesionEmpresa(r.empresa_id);
  redirect("/empresa");
}

export async function salirEmpresa(): Promise<void> {
  await cerrarSesionEmpresa();
  redirect("/empresa/entrar");
}
