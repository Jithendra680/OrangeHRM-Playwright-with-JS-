import { BasePage } from './BasePage.js';

export class EditUserPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators based on user actions
    this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
    this.searchUsernameInput = page.getByRole('textbox').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Edit button on the search results. 
    this.editButton = page.getByRole('button').filter({ hasText: /^$/ }).nth(4);

    // Change password checkbox (use first() to avoid strict mode violation in WebKit)
    this.changePasswordCheckbox = page.locator('.oxd-icon.bi-check').first();
    this.passwordInput = page.getByRole('textbox').nth(3);
    this.confirmPasswordInput = page.getByRole('textbox').nth(4);
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  // Action Methods
  async navigateToAdmin() {
    await this.adminMenuLink.click();
  }

  async searchUser(username) {
    await this.searchUsernameInput.click();
    await this.searchUsernameInput.fill(username);
    await this.searchButton.click();
  }

  async clickEditUser() {
    await this.editButton.scrollIntoViewIfNeeded();
    await this.editButton.click();
  }

  async changePassword(newPassword) {
    await this.changePasswordCheckbox.click();
    await this.passwordInput.click();
    await this.passwordInput.fill(newPassword);
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(newPassword);
    await this.saveButton.click();
  }
}
