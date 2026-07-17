import { BasePage } from './BasePage.js';

export class DeleteUserPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);

    // Locators
    this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
    this.searchUsernameInput = page.getByRole('textbox').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });

    // Delete button on the search results (nth(3) from user's script)
    this.deleteButton = page.getByRole('button').filter({ hasText: /^$/ }).nth(3);

    // Confirmation dialog delete button
    this.confirmDeleteButton = page.getByRole('button', { name: ' Yes, Delete' });
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

  async clickDeleteUser() {
    await this.deleteButton.scrollIntoViewIfNeeded();
    await this.deleteButton.click();
  }

  async confirmDelete() {
    await this.confirmDeleteButton.click();
  }
}
