import { When, Then } from "@cucumber/cucumber";
import { browser, page } from "./common.steps";
import assert from "assert";

When("hago clic en el enlace {string}", { timeout: 30000 }, async function (texto: string) {
  // Esperar a que la página esté completamente cargada
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  await page.waitForSelector('form.oxd-form', { timeout: 10000 });
  
  try {
    // Basado en el HTML inspeccionado, el enlace está dentro de p.orangehrm-login-forgot-header
    const selectores = [
      'p.orangehrm-login-forgot-header',           // El párrafo que contiene el enlace
      '.orangehrm-login-forgot-header',            // Por clase
      'div.orangehrm-login-forgot p',              // Dentro del div padre
      'div.orangehrm-login-forgot',                // El div completo
      'p.orangehrm-login-forgot-header a',         // Si tiene un enlace hijo
      '.orangehrm-login-forgot a',                 // Enlace dentro del contenedor
      'a:has-text("忘了密码")',                    // Por texto en chino
      'a:has-text("Forgot your password")',        // Por texto en inglés
      'a:has-text("¿Olvidó su contraseña")'        // Por texto en español
    ];
    
    let clicked = false;
    for (const selector of selectores) {
      const count = await page.locator(selector).count();
      if (count > 0) {
        // Intentar hacer clic
        await page.locator(selector).first().click();
        clicked = true;
        console.log(`✓ Enlace "Forgot password" encontrado y clickeado con selector: ${selector}`);
        break;
      }
    }
    
    if (!clicked) {
      // Debug: listar todos los elementos con clase orangehrm-login-forgot
      const forgotElements = await page.$$eval('.orangehrm-login-forgot *', elements => 
        elements.map(el => ({ tag: el.tagName, class: el.className, text: el.textContent?.trim() }))
      );
      console.error("DEBUG - Elementos dentro de .orangehrm-login-forgot:", JSON.stringify(forgotElements, null, 2));
      throw new Error(`No se encontró el enlace "Forgot password".`);
    }
  } catch (error) {
    await page.screenshot({ path: 'reports/debug-forgot-password-error.png' });
    throw new Error(`Error al buscar enlace "Forgot your password?": ${error}`);
  }
});

Then("debería ver la página con el texto {string}", async function (textoEsperado: string) {
  await page.waitForSelector("h6.oxd-text.oxd-text--h6.orangehrm-forgot-password-title", { timeout: 15000 });
  const texto = await page.textContent("h6.oxd-text.oxd-text--h6.orangehrm-forgot-password-title");
  
  // Aceptar español, inglés y otros idiomas
  const textosValidos = [
    "Reset Password",           // Inglés
    "Restablecer contraseña",   // Español
    "Recuperar contraseña",     // Español alternativo
    "重设密码"                  // Chino
  ];
  const textoEncontrado = texto?.trim();
  assert.ok(textosValidos.includes(textoEncontrado || ""), 
    `Se esperaba uno de ${textosValidos.join(', ')} pero se encontró: ${textoEncontrado}`);
});

