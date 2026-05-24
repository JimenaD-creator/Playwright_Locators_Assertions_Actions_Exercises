import { test, expect } from '@playwright/test';
import { create } from 'node:domain';
import { execArgv } from 'node:process';

test.describe('Locators', () => {

  
  test.beforeEach(async ({ page }) => {
    await page.goto(
      'https://www.mercadolibre.com.mx/',
    );
  });

  // Locator getByRole
  test('should test getByRole locator', async ({ page }) => {
    const createAccountLink = page.getByRole('link', { name: 'Crea tu cuenta' })
    await expect(createAccountLink).toBeVisible();

    const searchButton = page.getByRole('button', { name: 'Buscar' });
    await expect(searchButton).toBeVisible();

  });

  // Locator getByTestId
  test('should test getByTestId locator', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VRXW_CMAz8L5H2RigtH0WVpml7Hr8hMq1bDE4TkkBBiP8-h2kPe3POd7bv8lDsBhpNuntUjRpxgERXNClA31OrZsozpN4Fa6gTgmWBIiX8e9pMgQAWE4aomkceOGD3hSLKI3vgiEKCSzqYnt0k2GunYBQN3kQ3ApsJ91fC3P2nCHi-YBSONGi8AlNnXvtEPjgBDyn52BTFNE1zi6GFzjHtA85bZ-f2VkRMukNt4XwhZjjmstWju4IeGKwGZh0ThKhPlLQPrsdITi7Se9mrIzKLMR1cTMFpd3RR3zXDnlwsfLH73m2qclWv6uWH77zpiXMO7x0Cvy0_pV2uN-VisdWlHBxwoOwFc5QpXFA9Z2I3ppx3e1LNy7pk5T1TKz_hxt-cN9V2sairupZiva626vkD7tHpvLkBAAA/user')
    const emailInput = page.getByTestId('user_id');
    await expect(emailInput).toBeVisible();

  });

  // Locator getByAltText
  test('should test getByAltText locator', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.mx/gz/account-verification?go=https%3A%2F%2Fwww.mercadolibre.com.mx%2Fset-de-maquillaje-mac-nova-glam-all-stars-kit-profesional-best-sellers-rostro-ojos-y-labios%2Fp%2FMLM62147473%3Fpdp_filters%3Ddeal%253AMLM1561008-1&tid=0f5cd77d-55d3-4f5a-b0da-e63268571f5a')
    const logo = page.getByAltText('Mercado Libre');
    await expect(logo).toBeVisible();
    
    

  });

  // Locator getByText
  test('should test getByText locator', async ({ page }) => {
    const cuponesLink = page.getByText('Cupones');
    await expect(cuponesLink).toBeVisible();
    

  });

  // Locator getByLabel
  test('should test getByLabel locator', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com/jms/mlm/lgz/msl/login/H4sIAAAAAAAEA1VPzW7CMAx-F59RiypBUY97kci0brHmNFnikk6Id58D4rCb_f3aD5Cw8Or0NxIMQHsUHlnhAFFQ55C848kILwZlVvqsvkowoSellGF41KCFpi8yU42aUTKZCDe9uVlCMezVZRhnR7v5VhRX6Hpnquw_R6KfjbJpjOD1jsKTe_WZfQkG3lRjHtq2lNJ4SiNOQfiaqBmDb_zewvNgiVmdJhy_YdC0kV0T64OoHNb3J-fucjz2Xd_bcDp1F3j-ASYpPp4TAQAA/user')
    const emailLabel = page.getByLabel('E-mail o teléfono');
    await expect(emailLabel).toBeVisible();
    

  });

  // Locator getByPlaceHolder
  test('should test getByPlaceholder locator', async ({ page }) => {
    const searchHolder = page.getByPlaceholder('Buscar productos, marcas y más…');
    await expect(searchHolder).toBeVisible();

  });

  // Locator getByTitle
  test('should test getByTitle locator', async ({ page }) => {
    const title = page.getByText('Grandes marcas, precios más bajos');
    await expect(title).toBeVisible();

  });

});

// getByAltText locator was not implemented because
// the TodoMVC demo page does not contain
// image elements with accessible alt text.
test.describe("Todo MVC App", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  test("should add new item", async ({ page }) => {
    test.slow();
    const todoInput = page.getByPlaceholder('What needs to be done?');

    await todoInput.fill('Buy milk');
    await todoInput.press('Enter');

    // Assertion: Todo appears in the list
    const todoItem = page.getByTestId('todo-item').filter({ hasText: 'Buy milk' });

    await expect(todoItem).toBeVisible();
    await expect(todoItem).toContainText('Buy milk');

    await expect(page.getByText('Buy milk')).toBeVisible();

    // Soft assertion
    await expect.soft(todoItem).toHaveCount(1);

  });

  test("should mark a todo item as completed", async ({ page }) => {

    await page.getByPlaceholder('What needs to be done?').fill('Do the Playwright homework');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // getByRole
    const todoCheckbox = page.getByRole('checkbox').first();

    // getByLabel
    const toggleLabel = page.getByLabel('Toggle Todo');

    await expect(toggleLabel).toBeVisible();
    await todoCheckbox.check();
    const completeTodo = page.getByTestId('todo-item').filter({ hasText: 'Do the Playwright homework' });

    await expect(completeTodo).toHaveClass(/completed/);
    expect(await todoCheckbox.isChecked()).toBeTruthy();

  });

  test("should delete a todo item", async ({ page }) => {

    await page.getByPlaceholder('What needs to be done?').fill('Deleted item');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.screenshot({ path: "add_item_to_be_deleted.png" });

    const todo = page.getByTestId('todo-item').filter({ hasText: 'Deleted item' });

    await todo.hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.screenshot({ path: "deleted_item.png" });

    // Negative assertion
    await expect(todo).not.toBeVisible();

  });

  test("should filter completed todo tasks", async ({ page }) => {

    test.fail();

    await page.getByPlaceholder('What needs to be done?').fill('Task 1');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Task 2');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByTestId('todo-item')
      .filter({ hasText: 'Task 2' })
      .getByRole('checkbox')
      .check();

    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(5);
    await expect(page.getByTitle('Double-click to edit a todo')).toBeVisible();

  });

  test.fixme("should clear completed tasks", async ({ page }) => {

    await page.getByPlaceholder('What needs to be done?').fill('Complete 1');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Complete 2');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByTestId('todo-item')
      .filter({ hasText: 'Complete 1' })
      .getByRole('checkbox')
      .check();

    await page.getByTestId('todo-item')
      .filter({ hasText: 'Complete 2' })
      .getByRole('checkbox')
      .check();

    await page.getByRole('button', { name: 'Clear completed' }).click();

    await expect(page.getByTestId('todo-item')).toHaveCount(0);

  });

});