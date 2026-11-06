// Pruebas del validador. Se ejecutan con: npm test  (usa el ejecutor de pruebas de Node, sin dependencias)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { validar, ESQUEMAS } from "./esquemas.ts";

const FIX = join(process.cwd(), "..", "datos", "fixtures");
const leer = (...ruta: string[]) => JSON.parse(readFileSync(join(FIX, ...ruta), "utf8"));

test("los 8 esquemas compilan", () => {
  for (const e of ESQUEMAS) validar(e, {});
});

test("las ofertas de ejemplo son válidas", () => {
  for (const f of ["of-prueba-1.json", "of-prueba-2.json"]) {
    const r = validar("oferta", leer("ofertas", f));
    assert.ok(r.ok, f + ": " + (r.ok ? "" : r.errores.join("; ")));
  }
});

test("perfiles y preferencias de ejemplo son válidos", () => {
  for (const p of ["ana-datos", "leo-diseno"]) {
    for (const [esq, arch] of [["perfil", "perfil.json"], ["preferencias", "preferencias.json"]] as const) {
      const r = validar(esq, leer("perfiles", p, arch));
      assert.ok(r.ok, `${p}/${arch}: ` + (r.ok ? "" : r.errores.join("; ")));
    }
  }
});

test("rechaza un campo que no existe en el esquema (additionalProperties)", () => {
  const r = validar("oferta", { ...leer("ofertas", "of-prueba-1.json"), edad_minima: 30 });
  assert.equal(r.ok, false);
});

test("rechaza un valor fuera de la lista (remoto)", () => {
  const r = validar("oferta", { ...leer("ofertas", "of-prueba-1.json"), remoto: "a_ratos" });
  assert.equal(r.ok, false);
});

test("rechaza un id con caracteres peligrosos", () => {
  const r = validar("oferta", { ...leer("ofertas", "of-prueba-1.json"), id: "../../etc" });
  assert.equal(r.ok, false);
});

test("rechaza un rango de compatibilidad fuera de 0-100", () => {
  const p = leer("perfiles", "ana-datos", "preferencias.json");
  assert.equal(validar("preferencias", { ...p, rango_compatibilidad: [10, 150] }).ok, false);
});

test("un dato vacío devuelve errores, no lanza excepción", () => {
  const r = validar("perfil", {});
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errores.length > 0);
});

test("un esquema desconocido lanza error", () => {
  assert.throws(() => validar("inventado" as never, {}));
});

test("oferta.avisos es opcional, solo admite tipos conocidos y no admite claves extra", () => {
  const o = leer("ofertas", "of-prueba-1.json");
  assert.ok(validar("oferta", o).ok);
  const ok = { ...o, avisos: [{ tipo: "ciudadania", texto: "x" }, { tipo: "habilitacion_seguridad", texto: "y" }] };
  assert.ok(validar("oferta", ok).ok);
  assert.ok(!validar("oferta", { ...o, avisos: [{ tipo: "nacionalidad", texto: "x" }] }).ok);
  assert.ok(!validar("oferta", { ...o, avisos: [{ tipo: "otro", texto: "x", puntos: 3 }] }).ok);
  assert.ok(!validar("oferta", { ...o, avisos: [{ tipo: "otro" }] }).ok);
});

test("línea roja: el filtro y la nota de las ofertas no leen los avisos (ciudadanía, permisos)", () => {
  const raiz = join(process.cwd(), "..", ".claude");
  for (const f of [join("skills", "buscar-ofertas", "scripts", "buscar.py")]) {
    assert.ok(!readFileSync(join(raiz, f), "utf8").includes("avisos"), f + " no debe usar `avisos`");
  }
  const matcher = readFileSync(join(raiz, "agents", "matcher.md"), "utf8");
  assert.match(matcher, /Ignora `avisos`/); // el matcher tiene la orden explícita de ignorarlos
});
