import { When, Then } from "@cucumber/cucumber";
import { browser, page } from "./common.steps";
import assert from "assert";

When("hago clic en el enlace {string}", { timeout: 20000 }, async function (texto: string) {
  try {
    await page.waitForSelector('form.oxd-form', { timeout: 8000 });
    // Intento 1: por texto directo
    const locator = page.locator(`text=${texto}`);
    if (await locator.first().isVisible()) {
      await locator.first().click();
      return;
    }
    // Intento 2: selector original
    if (await page.locator('p.orangehrm-login-forgot a, p.orangehrm-login-forgot-header a').first().isVisible()) {
      await page.click('p.orangehrm-login-forgot a, p.orangehrm-login-forgot-header a');
      return;
    }
    // Intento 3: cualquier enlace con el texto parcial
    const link = page.locator('a');
    const count = await link.count();
    for (let i = 0; i < count; i++) {
      const t = (await link.nth(i).textContent())?.trim();
      if (t === texto) {
        await link.nth(i).click();
        return;
      }
    }
    throw new Error(`No se encontró el enlace con el texto "${texto}"`);
  } catch (e) {
    const html = await page.content();
    console.error("DEBUG Forgot Password - HTML parcial:", html.slice(0, 1200));
    throw e;
  }
});

Then("debería ver la página con el texto {string}", async function (textoEsperado: string) {
  await page.waitForSelector("h6.oxd-text.oxd-text--h6.orangehrm-forgot-password-title", { timeout: 15000 });
  const texto = await page.textContent("h6.oxd-text.oxd-text--h6.orangehrm-forgot-password-title");
  assert.strictEqual(texto?.trim(), textoEsperado);
});

