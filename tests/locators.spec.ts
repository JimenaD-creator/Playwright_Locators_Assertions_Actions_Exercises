import { test, expect } from '@playwright/test';

// Some locators are validated on different Mercado Libre pages
// because certain elements are only available in login/product flows.
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
    await page.goto('https://www.mercadolibre.com.mx/')
     const carritoTitle = page.getByTitle('Carrito');
     await expect(carritoTitle).toBeVisible();

  });

});