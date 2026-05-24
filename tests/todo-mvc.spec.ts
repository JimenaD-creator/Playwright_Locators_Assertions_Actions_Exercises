import { test, expect } from '@playwright/test';

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
    const todoCheckbox = page.getByTestId('todo-item')
    .filter({ hasText: 'Do the Playwright homework' })
    .getByRole('checkbox');

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

    await page.screenshot({ path: "./screenshots/add_item_to_be_deleted.png" });

    const todo = page.getByTestId('todo-item').filter({ hasText: 'Deleted item' });

    await todo.hover();
    await page.getByRole('button', { name: 'Delete' }).click();
    await page.screenshot({ path: "./screenshots/deleted_item.png" });

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