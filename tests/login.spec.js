import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import loginData from '../testData/loginData.json';

test.describe('Login Validations', () => {
  test('Valid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Go to URL and perform login with valid credentials from JSON
    await loginPage.goto();
    // Using credentials from loginData.json as updated by user
    await loginPage.login(loginData.credentials.valid.username, loginData.credentials.valid.password);

    // Assert that we navigate to the dashboard
    await expect(page).toHaveURL(new RegExp(loginData.expectedDashboardUrlPart));
    await expect(page).toHaveTitle(loginData.expectedTitle);
  });

  test('Invalid Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Go to URL and perform login with invalid credentials from JSON
    await loginPage.goto();
    await loginPage.login(loginData.credentials.invalid.username, loginData.credentials.invalid.password);

    // Assert that an error message is visible
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Invalid credentials');
  });
});
