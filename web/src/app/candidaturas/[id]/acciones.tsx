"use client";
import { useActionState } from "react";
import { aprobar, marcarEnviada, type EstadoAccion } from "./actions";
import { CANALES } from "@/lib/candidaturas";

const boton = "rounded bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50";

export function Aprobar({ ofertaId, avisos, version }: { ofertaId: string; avisos: number; version: string }) {
  const [estado, accion, enCurso] = useActionState<EstadoAccion, FormData>(aprobar, { ok: false, mensaje: null });
  return (
    <form action={accion} className="space-y-2 rounded border border-zinc-300 bg-zinc-50 p-2">
      <input type="hidden" name="oferta_id" value={ofertaId} />
      <input type="hidden" name="version" value={version} />
      <label className="flex items-start gap-2 text-xs">
        <input type="checkbox" name="revisado" className="mt-0.5" />
        <span>He leído el CV y la carta{avisos > 0 ? `, y los ${avisos} avisos de «Revisa primero»` : ""}, y apruebo esta candidatura. Entiendo que Horma no envía nada por su cuenta.</span>
      </label>
      {estado.mensaje && <p role="status" className={`text-xs ${estado.ok ? "text-green-800" : "text-red-700"}`}>{estado.mensaje}</p>}
      <button className={boton} disabled={enCurso}>{enCurso ? "Aprobando…" : "Aprobar"}</button>
    </form>
  );
}

export function MarcarEnviada({ ofertaId }: { ofertaId: string }) {
  const [estado, accion, enCurso] = useActionState<EstadoAccion, FormData>(marcarEnviada, { ok: false, mensaje: null });
  return (
    <form action={accion} className="flex flex-wrap items-end gap-2 rounded border border-zinc-300 bg-zinc-50 p-2">
      <input type="hidden" name="oferta_id" value={ofertaId} />
      <label className="text-xs">La enviaste por
        <select name="canal" defaultValue="" className="ml-2 rounded border border-zinc-300 bg-white px-1 py-0.5" required>
          <option value="" disabled>elige…</option>
          {CANALES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <button className={boton} disabled={enCurso}>{enCurso ? "Anotando…" : "Marcar como enviada"}</button>
      {estado.mensaje && <p role="status" className={`w-full text-xs ${estado.ok ? "text-green-800" : "text-red-700"}`}>{estado.mensaje}</p>}
    </form>
  );
}
