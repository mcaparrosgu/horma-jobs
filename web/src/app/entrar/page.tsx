import { Suspense } from "react";
import { redirect } from "next/navigation";
import { sesionActual } from "@/lib/sesion";
import { googleActivo } from "@/lib/google";
import { FormularioEntrar, FormularioRegistro } from "./formularios";

const MENSAJES: Record<string, string> = {
  google: "No se pudo entrar con Google. Prueba otra vez o usa tu correo y contraseña.",
  cuenta: "Ya hay una cuenta con ese correo que no se puede unir a Google. Entra con tu contraseña.",
};

export default function Pagina({ searchParams }: PageProps<"/entrar">) {
  return <Suspense fallback={<p className="text-sm">Cargando…</p>}><Entrar searchParams={searchParams} /></Suspense>;
}

async function Entrar({ searchParams }: { searchParams: PageProps<"/entrar">["searchParams"] }) {
  if (await sesionActual()) redirect("/");
  const q = await searchParams;
  const aviso = typeof q.error === "string" ? MENSAJES[q.error] : undefined;
  return (
    <div className="mx-auto max-w-md space-y-4">
      <h1 className="text-2xl font-semibold">Entrar en Horma</h1>
      <p className="text-sm text-zinc-600">
        Cada persona ve solo lo suyo. Las empresas no ven nada de tu cuenta: Horma no ordena ni filtra candidatas para ellas.
      </p>
      {aviso && <p role="alert" className="rounded border border-amber-200 bg-amber-50 p-2 text-sm">{aviso}</p>}
      <FormularioEntrar />
      {googleActivo() && (
        <a href="/auth/google" className="block rounded border border-zinc-300 bg-white px-3 py-1.5 text-center text-sm font-medium">
          Entrar con Google
        </a>
      )}
      <FormularioRegistro />
    </div>
  );
}
