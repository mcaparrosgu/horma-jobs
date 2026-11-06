import Link from "next/link";
import { sesionActual } from "@/lib/sesion";
import { salir } from "./entrar/actions";

// La barra cambia según quién entra: la administración ve todo el panel; cada usuaria, solo lo suyo.
export async function Nav() {
  const s = await sesionActual();
  return (
    <nav className="flex flex-wrap items-center gap-6 border-b border-zinc-200 bg-white px-6 py-3 text-sm font-medium">
      <span className="font-semibold">Horma</span>
      {s && (
        <>
          <Link href={s.rol === "admin" ? "/" : `/candidatos/${s.publico}`}>{s.rol === "admin" ? "Panel" : "Mi perfil"}</Link>
          <Link href="/ofertas">Ofertas</Link>
          <Link href={`/recomendaciones/${s.publico}`}>Recomendaciones</Link>
          <Link href={`/candidaturas/${s.publico}`}>Candidaturas</Link>
          {s.rol === "admin" && (
            <>
              <Link href="/fuentes">Fuentes</Link>
              <Link href="/ejecuciones">Ejecuciones</Link>
              <Link href="/candidatos">Candidatas</Link>
              <Link href="/salud">Salud</Link>
            </>
          )}
          <form action={salir} className="ml-auto flex items-center gap-3">
            <span className="font-normal text-zinc-500">{s.email}</span>
            <button className="underline">Salir</button>
          </form>
        </>
      )}
    </nav>
  );
}
