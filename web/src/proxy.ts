// Se ejecuta antes de cada petición (en Next 16 «proxy» sustituye a «middleware»).
// Mientras no haya login, la web solo contesta si se la llama como localhost o 127.0.0.1.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hostPermitido } from "./lib/host.ts";

export function proxy(request: NextRequest) {
  if (!hostPermitido(request.headers.get("host"))) {
    return new NextResponse("Host no permitido", { status: 403 });
  }
  return NextResponse.next();
}
