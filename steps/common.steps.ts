import { Given, When, Then, After, Status, ITestCaseHookParameter } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import assert from "assert";

export let browser: Browser;
export let page: Page;

// Paso común: abrir la página de login
Given("que estoy en la página de inicio de sesión de OrangeHRM", { timeout: 30000 }, async function () {
  browser = await chromium.launch({ 
    headless: false, 
    slowMo: 500  // Aumentado de 150 a 500ms para ver mejor las acciones
  });
  const context = await browser.newContext({
    recordVideo: { dir: "reports/videos", size: { width: 1280, height: 720 } },
    locale: 'en-US',  // Forzar idioma inglés
    timezoneId: 'America/New_York'  // Zona horaria de USA
  });
  page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "domcontentloaded", timeout: 30000 });
  // Esperar a que el formulario esté visible
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });
});

// Paso común: iniciar sesión automáticamente
Given("que he iniciado sesión correctamente en OrangeHRM", { timeout: 30000 }, async function () {
  browser = await chromium.launch({ 
    headless: false, 
    slowMo: 500  // Aumentado de 150 a 500ms para ver mejor las acciones
  });
  const context = await browser.newContext({
    recordVideo: { dir: "reports/videos", size: { width: 1280, height: 720 } },
    locale: 'en-US',  // Forzar idioma inglés
    timezoneId: 'America/New_York'  // Zona horaria de USA
  });
  page = await context.newPage();
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.waitForSelector('input[name="username"]', { timeout: 10000 });
  await page.fill('input[name="username"]', "Admin");
  await page.fill('input[name="password"]', "admin123");
  await page.click('button[type="submit"]');
  await page.waitForSelector('img[alt="profile picture"]', { timeout: 15000 });
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
  
  // Aceptar español, inglés y otros idiomas
  const mensajesValidos = [
    mensajeEsperado, 
    "Requerido",      // Español
    "Required",       // Inglés
    "需要",           // Chino
    "Obligatorio"     // Español alternativo
  ];
  const mensajeEncontrado = mensaje?.trim();
  assert.ok(mensajesValidos.includes(mensajeEncontrado || ""), 
    `Se esperaba uno de ${mensajesValidos.join(', ')} pero se encontró: ${mensajeEncontrado}`);
});

After(async function (this: any, { result }: ITestCaseHookParameter) {
  if (page) {
    try {
      // Pausar 2 segundos antes de cerrar para poder ver el resultado
      await page.waitForTimeout(2000);
      
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
