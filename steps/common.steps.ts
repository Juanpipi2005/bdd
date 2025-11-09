import { Given, When, Then, After, Status, ITestCaseHookParameter } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import assert from "assert";

export let browser: Browser;
export let page: Page;

// Paso común: abrir la página de login
Given("que estoy en la página de inicio de sesión de OrangeHRM", async function () {
  browser = await chromium.launch({ headless: false, slowMo: 150 });
  const context = await browser.newContext({
    recordVideo: { dir: "reports/videos", size: { width: 1280, height: 720 } }
  });
  page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "networkidle" });
});

// Paso común: iniciar sesión automáticamente
Given("que he iniciado sesión correctamente en OrangeHRM", async function () {
  browser = await chromium.launch({ headless: false, slowMo: 150 });
  const context = await browser.newContext({
    recordVideo: { dir: "reports/videos", size: { width: 1280, height: 720 } }
  });
  page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  await page.fill('input[name="username"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForSelector('img[alt="profile picture"]');
});

// Paso común para hacer clic en el botón
When('hago clic en el botón {string}', async function (textoBoton: string) {
  // Busca el botón por texto visible si es necesario, pero aquí se asume que es el botón de submit
  await page.click('button[type="submit"]');
});

// Paso común para ingresar usuario y contraseña
When('ingreso el usuario {string} y la contraseña {string}', async function (usuario: string, contrasena: string) {
  await page.fill('input[name="username"]', usuario);
  await page.fill('input[name="password"]', contrasena);
});

// Paso común para verificar mensaje de error
Then('debería ver el mensaje de error {string}', { timeout: 10000 }, async function (mensajeEsperado: string) {
  // Espera el mensaje de error en ambos posibles selectores
  let mensaje: string | null = null;
  try {
    await page.waitForSelector("p.oxd-text.oxd-text--p.oxd-alert-content-text", { timeout: 5000 });
    mensaje = await page.textContent("p.oxd-text.oxd-text--p.oxd-alert-content-text");
  } catch {
    await page.waitForSelector("span.oxd-input-field-error-message", { timeout: 5000 });
    mensaje = await page.textContent("span.oxd-input-field-error-message");
  }
  assert.strictEqual(mensaje?.trim(), mensajeEsperado);
});

After(async function (this: any, { result }: ITestCaseHookParameter) {
  if (page) {
    try {
      const screenshot = await page.screenshot({ fullPage: true });
      await this.attach(screenshot, "image/png");
      // Adjuntar URL final
      await this.attach(`URL final: ${page.url()}`, "text/plain");
    } catch {}
  }
  try {
    if (browser) await browser.close();
  } catch {}
});
