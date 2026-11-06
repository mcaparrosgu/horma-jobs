import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, symlinkSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { carpetasDe, inspeccionar, copiarA, borrarCarpetas } from "./datos-usuaria.ts";

function raizDePrueba() {
  const raiz = mkdtempSync(join(tmpdir(), "horma-datos-"));
  for (const c of ["usuarias", "candidaturas", "matches"]) {
    for (const id of ["ana-prueba", "leo-prueba"]) {
      mkdirSync(join(raiz, c, id, "sub"), { recursive: true });
      writeFileSync(join(raiz, c, id, "a.txt"), `${c}/${id}`);
      writeFileSync(join(raiz, c, id, "sub", "b.txt"), "x");
    }
  }
  return raiz;
}

test("rechaza identificadores con rutas o raros", () => {
  const raiz = raizDePrueba();
  for (const id of ["../x", "a/b", "a\b", "..", ".oculto", "", "x".repeat(81), "a b"]) {
    assert.throws(() => carpetasDe(raiz, id), /no válido/, id);
  }
});

test("inspeccionar cuenta archivos solo de esa usuaria", () => {
  const raiz = raizDePrueba();
  const h = inspeccionar(raiz, "ana-prueba");
  assert.equal(h.length, 3);
  assert.ok(h.every((x) => x.archivos === 2));
});

test("una usuaria sin datos en disco da lista vacía", () => {
  assert.deepEqual(inspeccionar(raizDePrueba(), "nadie"), []);
});

test("copiarA copia las tres carpetas y deja el origen intacto", () => {
  const raiz = raizDePrueba();
  const destino = join(mkdtempSync(join(tmpdir(), "horma-exp-")), "salida");
  copiarA(raiz, "ana-prueba", destino);
  assert.equal(readFileSync(join(destino, "usuarias", "a.txt"), "utf8"), "usuarias/ana-prueba");
  assert.ok(existsSync(join(raiz, "usuarias", "ana-prueba", "a.txt")));
  assert.ok(!existsSync(join(destino, "..", "leo-prueba")));
});

test("borrarCarpetas borra solo a esa usuaria", () => {
  const raiz = raizDePrueba();
  assert.equal(borrarCarpetas(raiz, "ana-prueba"), 6);
  for (const c of ["usuarias", "candidaturas", "matches"]) {
    assert.ok(!existsSync(join(raiz, c, "ana-prueba")));
    assert.ok(existsSync(join(raiz, c, "leo-prueba", "a.txt")));
  }
});

test("un enlace simbólico aborta antes de borrar o copiar nada", (t) => {
  const raiz = raizDePrueba();
  const fuera = mkdtempSync(join(tmpdir(), "horma-fuera-"));
  writeFileSync(join(fuera, "secreto.txt"), "no tocar");
  try { symlinkSync(fuera, join(raiz, "matches", "ana-prueba", "enlace"), "junction"); }
  catch { t.skip("este sistema no permite crear enlaces"); return; }
  assert.throws(() => borrarCarpetas(raiz, "ana-prueba"), /enlace simbólico/);
  assert.ok(existsSync(join(raiz, "usuarias", "ana-prueba", "a.txt")), "no se borró nada");
  assert.ok(existsSync(join(fuera, "secreto.txt")));
  assert.throws(() => copiarA(raiz, "ana-prueba", join(fuera, "dest")), /enlace simbólico/);
  rmSync(join(raiz, "matches", "ana-prueba", "enlace"));
});
