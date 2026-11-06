import { test } from "node:test";
import assert from "node:assert/strict";
import { camposDistintos, cruzar, filaEsperada, hayFallos } from "./verificar.ts";

// Datos inventados: ni la base real ni ofertas reales.
const oferta = (extra = {}) => ({
  id: "f-1-aaaa", titulo: "Desarrolladora", empresa: "Empresa Ficticia", url: "https://ejemplo.test/1",
  fecha: "2026-01-02", requisitos: [{ texto: "Python" }], taxonomia: { sector: "tecnologia", familia: "backend", stack: ["python"] },
  ...extra,
});
const fila = (o: any, extra = {}) => ({ ...filaEsperada(o), ...extra }); // eslint-disable-line @typescript-eslint/no-explicit-any

test("una fila idéntica al archivo no tiene diferencias", () => {
  const o = oferta();
  assert.deepEqual(camposDistintos(o, fila(o)), []);
});

test("avisos, familia y stack ausentes en el archivo equivalen a null y lista vacía en la base", () => {
  const o = oferta({ taxonomia: { sector: "tecnologia" } });
  assert.deepEqual(camposDistintos(o, { ...fila(o), familia: null, stack: [], avisos: [] }), []);
});

test("el orden de las claves dentro de un JSON no cuenta, el contenido sí", () => {
  const o = oferta();
  assert.deepEqual(camposDistintos(o, fila(o, { requisitos: [{ texto: "Python" }] })), []);
  assert.deepEqual(camposDistintos(o, fila(o, { requisitos: [{ texto: "Java" }] })), ["requisitos"]);
});

test("avisa de todos los campos distintos y solo de esos", () => {
  const o = oferta();
  assert.deepEqual(camposDistintos(o, fila(o, { titulo: "Otra", fecha: null, avisos: [{ tipo: "otro" }] })), ["titulo", "fecha", "avisos"]);
});

test("cruzar: coinciden, distintas, sin fila, sin procesada y solo en base", () => {
  const a = oferta({ id: "a" }), b = oferta({ id: "b" }), c = oferta({ id: "c" });
  const procesadas = new Map([["a", a], ["b", b], ["c", c]]);
  const filas = new Map<string, any>([ // eslint-disable-line @typescript-eslint/no-explicit-any
    ["a", fila(a)], ["b", fila(b, { empresa: "X" })], ["of-prueba-1", {}], ["of-prueba-2", {}], ["huerfana", {}],
  ]);
  const inf = cruzar(["a", "b", "c", "d"], procesadas, filas);
  assert.equal(inf.coinciden, 1);
  assert.deepEqual(inf.distintas, [{ id: "b", campos: ["empresa"] }]);
  assert.deepEqual(inf.sinFila, ["c"]);
  assert.deepEqual(inf.sinProcesada, ["d"]);
  assert.deepEqual(inf.soloEnBase, ["huerfana"]);
  assert.equal(inf.deClavePrueba, 2);
  assert.equal(hayFallos(inf), true);
});

test("las filas de prueba o sin archivo solo avisan: no son un fallo", () => {
  const a = oferta({ id: "a" });
  const inf = cruzar(["a"], new Map([["a", a]]), new Map<string, any>([["a", fila(a)], ["of-prueba-1", {}], ["huerfana", {}]])); // eslint-disable-line @typescript-eslint/no-explicit-any
  assert.equal(hayFallos(inf), false);
  assert.equal(inf.soloEnBase.length, 1);
});

test("una procesada inválida es un fallo", () => {
  const inf = cruzar([], new Map(), new Map());
  inf.invalidas.push("x");
  assert.equal(hayFallos(inf), true);
});

test("el informe no contiene valores de campos, solo ids y nombres de campo", () => {
  const o = oferta({ id: "a", empresa: "Nombre Personal Inventado" });
  const inf = cruzar(["a"], new Map([["a", o]]), new Map<string, any>([["a", fila(o, { empresa: "Otro" })]])); // eslint-disable-line @typescript-eslint/no-explicit-any
  assert.ok(!JSON.stringify(inf).includes("Nombre Personal"));
});
