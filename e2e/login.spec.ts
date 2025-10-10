import { test, expect } from '@playwright/test';

test.describe('Login Flow', () => {
  test('debe loguear con credenciales mock y navegar a /welcome', async ({ page }) => {
    // Ir a la página de login
    await page.goto('/login');

    // Completar formulario con mockCreds
    await page.fill('input[formcontrolname="username"]', 'cristian');
    await page.fill('input[formcontrolname="password"]', '123456');

    // Click en botón login
    await page.click('button[type="submit"]');

    // Esperar la navegación
    await page.waitForURL('**/welcome');

    // Verificar URL correcta
    await expect(page).toHaveURL(/\/welcome$/);

    // Verificar que se muestra el nombre del usuario mock
    await expect(page.locator('body')).toContainText('Cristian');

    // Refuerzos adicionales 🔒:
    // 1. Que no se muestre mensaje de error
    await expect(page.locator('body')).not.toContainText('Credenciales inválidas');

    // 2. Que haya un título o encabezado esperado en la página de bienvenida
    await expect(page.getByRole('heading', { name: /bienvenido/i })).toBeVisible();

    // 3. Que el botón de login ya no exista en el DOM (porque estamos fuera del login)
    await expect(page.locator('button[type="submit"]')).toHaveCount(0);
  });
});
