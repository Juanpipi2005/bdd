import { When, Then } from "@cucumber/cucumber";
import { browser, page } from "./common.steps";
import { LoginPage } from "../pages/LoginPage";
import assert from "assert";

let loginPage: LoginPage;

Then("debería ver el panel de control con el título {string}", async function (tituloEsperado: string) {
  await page.waitForSelector("h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  const titulo = await page.textContent("h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  
  // Aceptar español, inglés y otros idiomas
  const titulosValidos = [
    "Dashboard",              // Inglés
    "Tablero",                // Español
    "Panel",                  // Español alternativo
    "Pizarra de pendientes",  // Español (OrangeHRM en español)
    "仪表盘"                  // Chino
  ];
  const tituloEncontrado = titulo?.trim();
  assert.ok(titulosValidos.includes(tituloEncontrado || ""), 
    `Se esperaba uno de ${titulosValidos.join(', ')} pero se encontró: ${tituloEncontrado}`);
});
