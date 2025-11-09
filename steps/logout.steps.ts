import { When, Then } from "@cucumber/cucumber";
import { browser, page } from "./common.steps";
import assert from "assert";

When("hago clic en el menú de usuario", async function () {
  await page.click('img[alt="profile picture"]');
});

When("selecciono la opción {string}", async function (opcion: string) {
  await page.click('a[href="/web/index.php/auth/logout"]');
});

Then("debería volver a la página de inicio de sesión", async function () {
  await page.waitForSelector('button[type="submit"]');
  const url = page.url();
  assert.ok(url.includes("/auth/login"));
});
