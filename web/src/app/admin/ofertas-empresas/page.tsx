import { Suspense } from "react";
import { db } from "@/lib/db";
import { requerirAdmin } from "@/lib/sesion";
import { SQL_OFERTAS_PENDIENTES } from "@/lib/empresa-oferta";
import { moderarOferta } from "./actions";

type Fila = {
  id: string; titulo: string; descripcion: string | null; ubicacion: string; remoto: string; contrato: string;
  nivel: string; requisitos: string[]; avisos: { tipo: string; texto: string }[]; creada_en: Date; empresa_nombre: string;
};

export default function Pagina() {
  return <Suspense fallback={<p className="text-sm">Cargando…</p>}><Moderacion /></Suspense>;
}

async function Moderacion() {
  await requerirAdmin();
  const filas = (await db().query<Fila>(SQL_OFERTAS_PENDIENTES)).rows;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Ofertas de empresas pendientes de revisión</h1>
        <p className="text-sm text-zinc-600">Ninguna aparece en «Ofertas» hasta aprobarla aquí: es la defensa contra ofertas falsas o estafas.</p>
      </div>

      {filas.length === 0 ? (
        <p className="rounded border border-dashed border-zinc-300 p-6 text-center text-sm">No hay ninguna pendiente.</p>
      ) : (
        <ul className="space-y-3">
          {filas.map((o) => (
            <li key={o.id} className="space-y-2 rounded border border-zinc-200 bg-white p-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-medium">{o.titulo} <span className="font-normal text-zinc-600">· {o.empresa_nombre}</span></h2>
                <span className="text-xs text-zinc-500">enviada el {new Date(o.creada_en).toISOString().slice(0, 10)}</span>
              </div>
              <p className="text-zinc-700">{o.ubicacion} · {o.remoto} · {o.contrato} · {o.nivel}</p>
              {o.descripcion && <p className="whitespace-pre-wrap text-zinc-700">{o.descripcion}</p>}
              {o.requisitos.length > 0 && (
                <ul className="list-disc pl-5 text-xs text-zinc-600">{o.requisitos.map((req, i) => <li key={i}>{req}</li>)}</ul>
              )}
              {o.avisos.length > 0 && (
                <ul className="space-y-1">{o.avisos.map((a, i) => <li key={i} className="rounded bg-amber-50 px-2 py-1 text-xs text-amber-900">Aviso ({a.tipo}): {a.texto}</li>)}</ul>
              )}
              <div className="flex gap-3">
                <form action={moderarOferta}>
                  <input type="hidden" name="oferta_id" value={o.id} />
                  <input type="hidden" name="estado" value="aprobada" />
                  <button className="rounded bg-green-700 px-3 py-1.5 text-xs font-medium text-white">Aprobar</button>
                </form>
                <form action={moderarOferta}>
                  <input type="hidden" name="oferta_id" value={o.id} />
                  <input type="hidden" name="estado" value="rechazada" />
                  <button className="rounded bg-red-700 px-3 py-1.5 text-xs font-medium text-white">Rechazar</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
