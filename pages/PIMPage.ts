import { Page } from "playwright";

export class PIMPage {
  constructor(private page: Page) {}

  async buscarEmpleado(nombre: string) {
    await this.page.waitForSelector('input[placeholder="Type for hints..."]');
    await this.page.fill('input[placeholder="Type for hints..."]', nombre);
    const dropdown = this.page.locator('.oxd-autocomplete-dropdown');
    try {
      await dropdown.waitFor({ state: 'visible', timeout: 3000 });
      const opcionExacta = dropdown.locator(`.oxd-autocomplete-option:has-text("${nombre}")`);
      if (await opcionExacta.first().isVisible()) {
        await opcionExacta.first().click();
      } else {
        // Coincidencia parcial (primer token del nombre)
        const primerToken = nombre.split(/\s+/)[0];
        const opcionParcial = dropdown.locator(`.oxd-autocomplete-option:has-text("${primerToken}")`);
        if (await opcionParcial.first().isVisible()) {
          await opcionParcial.first().click();
        } else {
          await dropdown.locator('.oxd-autocomplete-option').first().click();
        }
      }
    } catch {
      // Sin sugerencias: presionar Enter como fallback
      await this.page.keyboard.press('Enter');
    }
    await this.page.click('button[type="submit"]');
    await this.page.waitForSelector('.oxd-table-body', { timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  async obtenerResultados() {
    await this.page.waitForSelector('.oxd-table-body', { timeout: 10000 });
    const noRecords = await this.page.locator('.oxd-table-body:has-text("No Records Found")').first().isVisible();
    if (noRecords) return [];
    const filas = this.page.locator('.oxd-table-card');
    try {
      await filas.first().waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      return [];
    }
    const resultados = await this.page.$$eval('.oxd-table-card', els => els.map(el => el.textContent?.trim() || ""));
    return resultados;
  }
}