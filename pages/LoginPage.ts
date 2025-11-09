import { Page } from "playwright";

export class LoginPage {
  constructor(private page: Page) {}

  async navegar() {
    await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login", { waitUntil: "networkidle" });
  }

  async ingresarCredenciales(usuario: string, contrasena: string) {
    await this.page.fill('input[name="username"]', usuario);
    await this.page.fill('input[name="password"]', contrasena);
  }

  async clickLogin() {
    await this.page.click('button[type="submit"]');
  }

  async obtenerMensajeError() {
    await this.page.waitForSelector("p.oxd-text.oxd-text--p.oxd-alert-content-text");
    return this.page.textContent("p.oxd-text.oxd-text--p.oxd-alert-content-text");
  }

  async clickOlvideContrasena() {
    await this.page.click('p.orangehrm-login-forgot > a');
  }
}

