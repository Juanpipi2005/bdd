import { Page } from "playwright";

export class DashboardPage {
  constructor(private page: Page) {}

  async obtenerTitulo() {
    await this.page.waitForSelector("h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
    return this.page.textContent("h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module");
  }

  async clickMenuUsuario() {
    await this.page.click('img[alt="profile picture"]');
  }

  async clickLogout() {
    await this.page.click('a[href="/web/index.php/auth/logout"]');
  }

  async navegarAModulo(modulo: string) {
    await this.page.click(`//span[contains(text(),"${modulo}")]`);
  }
}