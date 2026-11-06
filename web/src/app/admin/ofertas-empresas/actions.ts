"use server";
// Moderación de ofertas de empresa (bloque 3): solo administración. Toda oferta de empresa nace
// pendiente_de_revision y no aparece en /ofertas hasta pasar por aquí (también lo hace cumplir el disparador
// `ofertas_moderacion`, migración 018: esto no es la única defensa).
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requerirAdmin } from "@/lib/sesion";
import { SQL_MODERAR_OFERTA, moderacionValida } from "@/lib/empresa-oferta";
import { registrarEvento } from "@/lib/importar";

export async function moderarOferta(formData: FormData): Promise<void> {
  await requerirAdmin();
  const id = typeof formData.get("oferta_id") === "string" ? (formData.get("oferta_id") as string).slice(0, 80) : "";
  const destino = formData.get("estado");
  const t0 = Date.now();
  if (!moderacionValida(destino)) return;
  const res = await db().query(SQL_MODERAR_OFERTA, [id, destino]).catch(() => null);
  await registrarEvento(db(), {
    componente: "web-empresa", accion: "moderar-oferta", resultado: !!res && (res.rowCount ?? 0) === 1 ? "ok" : "error",
    duracion_ms: Date.now() - t0,
  }).catch(() => {});
  revalidatePath("/admin/ofertas-empresas");
  revalidatePath("/ofertas");
}
