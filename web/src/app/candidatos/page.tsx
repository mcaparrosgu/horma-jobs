import { Suspense } from "react";
import Link from "next/link";
import { db } from "@/lib/db";
import { SQL_USUARIAS } from "@/lib/preferencias";

export default function Pagina() {
  return <Suspense fallback={<p className="text-sm">Cargando candidatas…</p>}><Candidatas /></Suspense>;
}

async function Candidatas() {
  const { rows } = await db().query<{ id: string; tiene_perfil: boolean }>(SQL_USUARIAS);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Candidatas</h1>
      <p className="text-sm text-zinc-600">
        Esta lista es solo para pruebas en local y no tiene login: cualquiera que llegue aquí ve y edita todos los perfiles. Cuando haya cuentas, cada persona verá y editará solo lo suyo. Las empresas no ven nada de esta sección: Horma no ordena ni filtra candidatas para ellas.
      </p>
      {rows.length === 0 ? (
        <p className="rounded border border-dashed border-zinc-300 p-6 text-center text-sm">No hay candidatas. Importa los datos de ejemplo con <code>npm run importar</code>.</p>
      ) : (
        <ul className="divide-y divide-zinc-200 rounded border border-zinc-200 bg-white">
          {rows.map((u) => (
            <li key={u.id} className="flex items-center justify-between p-3 text-sm">
              <span>{u.id}</span>
              {u.tiene_perfil
                ? <Link href={`/candidatos/${encodeURIComponent(u.id)}`} className="underline">Ver perfil</Link>
                : <span className="text-zinc-500">sin perfil todavía</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
