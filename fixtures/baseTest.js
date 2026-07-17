import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { UserCreationPage } from '../pages/UserCreationPage.js';
import { EditUserPage } from '../pages/EditUserPage.js';
import { DeleteUserPage } from '../pages/DeleteUserPage.js';

export const test = baseTest.extend({
  // Override the default page fixture to include automatic login
  page: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    // Assuming process.env.APP_USERNAME and APP_PASSWORD are set in playwright.config.js
    await loginPage.login(process.env.APP_USERNAME, process.env.APP_PASSWORD);

    // Wait for the dashboard to load so tests don't fail trying to click elements too early
    await page.waitForURL(/dashboard/);

    // Pass the authenticated page to the tests
    await use(page);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  userCreationPage: async ({ page }, use) => {
    await use(new UserCreationPage(page));
  },
  editUserPage: async ({ page }, use) => {
    await use(new EditUserPage(page));
  },
  deleteUserPage: async ({ page }, use) => {
    await use(new DeleteUserPage(page));
  },
});
export { expect } from '@playwright/test';
