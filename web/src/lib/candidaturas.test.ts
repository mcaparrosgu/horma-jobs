import { test } from "node:test";
import assert from "node:assert/strict";
import { SQL_CANDIDATURAS, huecosConAviso, huecosSinCubrir, porcentaje, ETIQUETA_ESTADO } from "./candidaturas.ts";

test("la consulta siempre filtra por usuaria y no trae la traza", () => {
  assert.match(SQL_CANDIDATURAS, /WHERE c\.usuaria_id = \$1/);
  assert.doesNotMatch(SQL_CANDIDATURAS, /traza/);
});
test("los huecos con aviso de relleno van aparte de los demás", () => {
  const h = [{ requisito: "a", propuesta: "p", decision: "pendiente", relleno_aviso: "se reformuló X" }, { requisito: "b", propuesta: "q", decision: "pendiente", relleno_aviso: null }];
  assert.equal(huecosConAviso(h).length, 1);
  assert.equal(huecosSinCubrir(h)[0].requisito, "b");
});
test("el porcentaje se acota entre 0 y 100", () => {
  assert.equal(porcentaje(0.6), "60 %"); assert.equal(porcentaje(2), "100 %"); assert.equal(porcentaje(-1), "0 %");
});
test("todos los estados del esquema tienen etiqueta", () => {
  for (const e of ["borrador", "aprobada", "enviada", "entrevista", "rechazada", "sin_respuesta", "descartada", "pendiente_de_ti"]) assert.ok(ETIQUETA_ESTADO[e]);
});
