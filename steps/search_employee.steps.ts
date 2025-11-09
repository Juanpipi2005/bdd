import { When, Then } from "@cucumber/cucumber";
import { browser, page } from "./common.steps";
import assert from "assert";
import { PIMPage } from "../pages/PIMPage";

let pimPage: PIMPage;

When("navego al módulo {string}", async function (modulo: string) {
  pimPage = new PIMPage(page);
  await page.click('a[href="/web/index.php/pim/viewPimModule"]');
});

When("busco el empleado {string}", async function (nombre: string) {
  await pimPage.buscarEmpleado(nombre);
});

Then("debería ver resultados que contengan el nombre {string}", { timeout: 20000 }, async function (nombre: string) {
  const resultados = await pimPage.obtenerResultados();
  const contieneNombre = resultados.some(r => r.toLowerCase().includes(nombre.toLowerCase()));
  assert.strictEqual(contieneNombre, true, `No se encontró el nombre "${nombre}" en los resultados: ${JSON.stringify(resultados)}`);
});
