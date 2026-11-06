// Se ejecuta antes de cada petición (en Next 16 «proxy» sustituye a «middleware»).
// 1) La web solo contesta si se la llama como localhost o 127.0.0.1 (contra DNS rebinding).
// 2) Sin cookie de sesión, todo lo que no sea /entrar o /auth lleva a /entrar. Es solo un filtro «optimista»: la cookie
//    puede estar caducada o inventada. La comprobación de verdad (sesión válida, rol, dueña) la hace cada página y cada acción.
// 3) El portal de empresas (bloque 3) es OTRA identidad, con su propia cookie (`horma_sesion_empresa`, nunca
//    `horma_sesion`): sin ella, todo /empresa/* que no sea /empresa/entrar lleva a /empresa/entrar (no a /entrar).
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hostPermitido } from "./lib/host.ts";
import { rutaPublica } from "./lib/rutas.ts";

export function proxy(request: NextRequest) {
  if (!hostPermitido(request.headers.get("host"))) {
    return new NextResponse("Host no permitido", { status: 403 });
  }
  const ruta = request.nextUrl.pathname;
  if (ruta.startsWith("/empresa")) {
    if (ruta !== "/empresa/entrar" && !request.cookies.get("horma_sesion_empresa")?.value) {
      return NextResponse.redirect(new URL("/empresa/entrar", request.url));
    }
    return NextResponse.next();
  }
  if (!rutaPublica(ruta) && !request.cookies.get("horma_sesion")?.value) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }
  return NextResponse.next();
}

// No se ejecuta sobre los archivos estáticos de Next.
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
