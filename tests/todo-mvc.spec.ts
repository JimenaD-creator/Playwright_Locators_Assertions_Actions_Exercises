import { test, expect } from '@playwright/test';

// getByAltText locator was not implemented because
// the TodoMVC demo page does not contain
// image elements with accessible alt text.
test.describe("Todo MVC App", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  test("should add new item", async ({ page }) => {

    // Built-in annotation: test.slow()
    test.slow();

    // Recommended locator: getByPlaceholder()
    const todoInput = page.getByPlaceholder('What needs to be done?');

    // Auto-waiting actions: fill() and press()
    await todoInput.fill('Buy milk');
    await todoInput.press('Enter');

    // Recommended locator: getByTestId()
    const todoItem = page.getByTestId('todo-item').filter({ hasText: 'Buy milk' });

    // Auto-retrying assertions
    await expect(todoItem).toBeVisible();
    await expect(todoItem).toContainText('Buy milk');

    // Recommended locator: getByText()
    await expect(page.getByText('Buy milk')).toBeVisible();

    // Soft assertion
    await expect.soft(todoItem).toHaveCount(1);

  });

  test("should mark a todo item as completed", async ({ page }) => {

    // Recommended locator: getByPlaceholder()
    await page.getByPlaceholder('What needs to be done?').fill('Do the Playwright homework');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Recommended locator: getByRole()
    const todoCheckbox = page.getByTestId('todo-item')
      .filter({ hasText: 'Do the Playwright homework' })
      .getByRole('checkbox');

    // Recommended locator: getByLabel()
    const toggleLabel = page.getByLabel('Toggle Todo');

    // Auto-retrying assertion
    await expect(toggleLabel).toBeVisible();

    // Auto-waiting action: check()
    await todoCheckbox.check();

    const completeTodo = page.getByTestId('todo-item')
      .filter({ hasText: 'Do the Playwright homework' });

    // Auto-retrying assertion
    await expect(completeTodo).toHaveClass(/completed/);

    // Non-retrying assertion
    expect(await todoCheckbox.isChecked()).toBeTruthy();

  });

  test("should delete a todo item", async ({ page }) => {

    // Recommended locator: getByPlaceholder()
    await page.getByPlaceholder('What needs to be done?').fill('Deleted item');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.screenshot({ path: "./screenshots/add_item_to_be_deleted.png" });

    // Recommended locator: getByTestId()
    const todo = page.getByTestId('todo-item').filter({ hasText: 'Deleted item' });

    // Auto-waiting action: hover()
    await todo.hover();

    // Recommended locator: getByRole()
    await page.getByRole('button', { name: 'Delete' }).click();

    await page.screenshot({ path: "./screenshots/deleted_item.png" });

    // Negative assertion
    await expect(todo).not.toBeVisible();

  });

  // Built-in annotation: test.fail()
  test.fail("should filter completed todo tasks", async ({ page }) => {

    // Recommended locator: getByPlaceholder()
    await page.getByPlaceholder('What needs to be done?').fill('Task 1');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Task 2');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Recommended locators: getByTestId() and getByRole()
    await page.getByTestId('todo-item')
      .filter({ hasText: 'Task 2' })
      .getByRole('checkbox')
      .check();

    // Recommended locator: getByRole()
    await page.getByRole('link', { name: 'Completed' }).click();

    // Auto-retrying assertion
    await expect(page.getByTestId('todo-item')).toHaveCount(5);

    // Recommended locator: getByTitle()
    await expect(page.getByTitle('Double-click to edit a todo')).toBeVisible();

  });

  // Built-in annotation: test.fixme()
  test.fixme("should clear completed tasks", async ({ page }) => {

    // Recommended locator: getByPlaceholder()
    await page.getByPlaceholder('What needs to be done?').fill('Complete 1');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    await page.getByPlaceholder('What needs to be done?').fill('Complete 2');
    await page.getByPlaceholder('What needs to be done?').press('Enter');

    // Recommended locators: getByTestId() and getByRole()
    await page.getByTestId('todo-item')
      .filter({ hasText: 'Complete 1' })
      .getByRole('checkbox')
      .check();

    await page.getByTestId('todo-item')
      .filter({ hasText: 'Complete 2' })
      .getByRole('checkbox')
      .check();

    // Recommended locator: getByRole()
    await page.getByRole('button', { name: 'Clear completed' }).click();

    // Auto-retrying assertion
    await expect(page.getByTestId('todo-item')).toHaveCount(0);

  });

});