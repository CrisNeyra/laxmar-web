import { expect, test } from "@playwright/test";

test.describe("Laxmar home", () => {
  test("carga la página principal con el título y secciones clave", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Laxmar/i);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#contacto")).toBeVisible();
    await expect(page.locator("#flota")).toBeVisible();
  });

  test("navega por anchors desde el navbar desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await page.getByRole("navigation", { name: "Principal" }).getByRole("link", { name: "Flota" }).click();
    await expect(page.locator("#flota")).toBeInViewport();
  });

  test("muestra el formulario de contacto", async ({ page }) => {
    await page.goto("/#contacto");

    await expect(page.getByLabel("Nombre y apellido")).toBeVisible();
    await expect(page.getByLabel("Correo electrónico")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Enviar consulta/i }),
    ).toBeVisible();
  });

  test("muestra el botón flotante de WhatsApp", async ({ page }) => {
    await page.goto("/");

    const whatsappFab = page.locator("a.fixed.bottom-6.right-6");
    await expect(whatsappFab).toBeVisible();
    await expect(whatsappFab).toHaveAttribute("href", /wa\.me/);
  });
});
