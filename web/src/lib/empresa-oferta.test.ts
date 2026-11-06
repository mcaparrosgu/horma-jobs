import { test } from "node:test";
import assert from "node:assert/strict";
import {
  validarOfertaEmpresa, listaDeLineas, ID_EMPRESA, SQL_PUBLICAR_OFERTA, SQL_EDITAR_OFERTA, SQL_CERRAR_OFERTA,
  SQL_MODERAR_OFERTA, SQL_OFERTAS_PENDIENTES, moderacionValida, type DatosOfertaEmpresa,
} from "./empresa-oferta.ts";

const base: DatosOfertaEmpresa = {
  titulo: "Analista de datos junior", descripcion: "Buscamos a alguien con ganas de aprender.",
  ubicacion: "Madrid", remoto: "hibrido", contrato: "indefinido", idioma: "español", nivel: "junior",
  sectorFamilia: "datos::analisis de datos", requisitos: "SQL\nExcel avanzado", salarioPublicado: false,
  salarioMin: "", salarioMax: "", salarioPeriodo: "", avisos: [],
};
const empresa = { id: "auto-test-empresa", nombre: "Empresa de Prueba S.L." };

test("listaDeLineas: separa por líneas, recorta, quita vacíos y duplicados", () => {
  assert.deepEqual(listaDeLineas("SQL\n\nSQL\n  Excel  \n"), ["SQL", "Excel"]);
  assert.deepEqual(listaDeLineas(undefined), []);
  assert.equal(listaDeLineas(Array.from({ length: 40 }, (_, i) => `req${i}`).join("\n"), 30).length, 30);
});

test("validarOfertaEmpresa: unos datos correctos pasan y validan contra el esquema oferta", () => {
  const r = validarOfertaEmpresa(base, empresa, "oe0000000000000001");
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.oferta.titulo, "Analista de datos junior");
    assert.equal(r.oferta.pais, "ES");
    assert.deepEqual((r.oferta as { origen: unknown }).origen, { licencia: "empresa", atribucion: "Empresa de Prueba S.L." });
    assert.deepEqual((r.oferta as { taxonomia: unknown }).taxonomia, { sector: "datos", familia: "analisis de datos", stack: [] });
    assert.ok(!("descripcion" in r.oferta) === false); // tiene descripción (no vacía)
  }
});

test("validarOfertaEmpresa: descripción y avisos vacíos no dejan una clave a medias (undefined)", () => {
  const r = validarOfertaEmpresa({ ...base, descripcion: "   ", avisos: [] }, empresa, "oe0000000000000002");
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.ok(!("descripcion" in r.oferta), "descripcion vacía no debe quedar como clave con undefined");
    assert.ok(!("avisos" in r.oferta));
  }
});

test("validarOfertaEmpresa: rechaza modalidad, contrato, idioma o nivel fuera de la lista cerrada", () => {
  for (const mal of [{ remoto: "a-distancia" }, { contrato: "becario" }, { idioma: "klingon" }, { nivel: "ceo" }]) {
    const r = validarOfertaEmpresa({ ...base, ...mal }, empresa, "oe1");
    assert.equal(r.ok, false, JSON.stringify(mal));
  }
});

test("validarOfertaEmpresa: sector y familia tienen que ir juntos y de la taxonomía común", () => {
  for (const malo of ["", "datos::familia-inventada", "sector-inventado::analisis de datos", "desarrollo de software::analisis de datos"]) {
    assert.equal(validarOfertaEmpresa({ ...base, sectorFamilia: malo }, empresa, "oe2").ok, false, malo);
  }
  assert.equal(validarOfertaEmpresa({ ...base, sectorFamilia: "legal::asesoria juridica" }, empresa, "oe3").ok, true);
});

test("validarOfertaEmpresa: sin título ni ciudad, no pasa", () => {
  assert.equal(validarOfertaEmpresa({ ...base, titulo: "   " }, empresa, "oe4").ok, false);
  assert.equal(validarOfertaEmpresa({ ...base, ubicacion: "" }, empresa, "oe5").ok, false);
});

test("validarOfertaEmpresa: sueldo publicado exige mínimo y máximo numéricos y coherentes, y periodo válido", () => {
  assert.equal(validarOfertaEmpresa({ ...base, salarioPublicado: true, salarioMin: "x", salarioMax: "30000", salarioPeriodo: "anual" }, empresa, "oe6").ok, false);
  assert.equal(validarOfertaEmpresa({ ...base, salarioPublicado: true, salarioMin: "30000", salarioMax: "20000", salarioPeriodo: "anual" }, empresa, "oe7").ok, false);
  assert.equal(validarOfertaEmpresa({ ...base, salarioPublicado: true, salarioMin: "20000", salarioMax: "30000", salarioPeriodo: "" }, empresa, "oe8").ok, false);
  const r = validarOfertaEmpresa({ ...base, salarioPublicado: true, salarioMin: "20000", salarioMax: "30000", salarioPeriodo: "anual" }, empresa, "oe9");
  assert.equal(r.ok, true);
  if (r.ok) assert.deepEqual(r.oferta.salario, { publicado: true, min: 20000, max: 30000, moneda: "EUR", periodo: "anual" });
});

test("validarOfertaEmpresa: avisos solo con tipo de la lista cerrada y texto no vacío", () => {
  const r = validarOfertaEmpresa({ ...base, avisos: [{ tipo: "ciudadania", texto: "Se requiere ciudadanía UE" }, { tipo: "inventado", texto: "x" }, { tipo: "otro", texto: "  " }] }, empresa, "oe10");
  assert.equal(r.ok, true);
  if (r.ok) assert.deepEqual(r.oferta.avisos, [{ tipo: "ciudadania", texto: "Se requiere ciudadanía UE" }]);
});

test("el id de empresa solo admite minúsculas, números, guion y guion bajo", () => {
  assert.ok(ID_EMPRESA.test("empresa-demo"));
  for (const mal of ["", "Empresa-Demo", "empresa demo", "empresa.demo", "a".repeat(81)]) assert.equal(ID_EMPRESA.test(mal), false, mal);
});

test("las consultas de empresa siempre van filtradas por empresa_id (nunca una lista de empresas ajenas)", () => {
  assert.match(SQL_EDITAR_OFERTA, /WHERE id = \$1 AND empresa_id = \$2/);
  assert.match(SQL_CERRAR_OFERTA, /WHERE id = \$1 AND empresa_id = \$2 AND estado_publicacion = 'aprobada'/);
  assert.doesNotMatch(SQL_PUBLICAR_OFERTA, /empresa_id\s*=\s*\$(?!18)/);
});

test("moderar: solo mueve pendiente_de_revision -> aprobada o rechazada, nunca otra cosa", () => {
  assert.match(SQL_MODERAR_OFERTA, /estado_publicacion = 'pendiente_de_revision'/);
  assert.match(SQL_OFERTAS_PENDIENTES, /WHERE o\.estado_publicacion = 'pendiente_de_revision'/);
  assert.ok(!/ORDER BY[^`]*(nota|score|puntu|ranking|compat)/i.test(SQL_OFERTAS_PENDIENTES), "la bandeja de moderación no ordena por una nota");
  assert.equal(moderacionValida("aprobada"), true);
  assert.equal(moderacionValida("rechazada"), true);
  assert.equal(moderacionValida("cerrada"), false);
  assert.equal(moderacionValida("pendiente_de_revision"), false);
  assert.equal(moderacionValida("algo"), false);
});
