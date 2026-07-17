import { BasePage } from './BasePage.js';

export class UserCreationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    
    // Locators based on user actions
    this.adminMenuLink = page.getByRole('link', { name: 'Admin' });
    this.addButton = page.getByRole('button', { name: ' Add' });
    
    this.userRoleDropdown = page.locator('.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
    this.userRoleAdminOption = page.getByRole('option', { name: 'Admin' });
    
    this.employeeNameInput = page.getByRole('textbox', { name: 'Type for hints...' });
    this.statusDropdown = page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon');
    this.statusEnabledOption = page.getByRole('option', { name: 'Enabled' });
    
    // Note: index for textboxes might be flaky if UI changes, keeping them as provided
    this.usernameInput = page.getByRole('textbox').nth(2);
    this.passwordInput = page.getByRole('textbox').nth(3);
    this.confirmPasswordInput = page.getByRole('textbox').nth(4);
    
    this.saveButton = page.getByRole('button', { name: 'Save' });
  }

  /**
   * Locator for the dynamic employee name in autocomplete dropdown
   */
  employeeNameOption(name) {
    return this.page.getByText(name);
  }

  // Action Methods
  async navigateToAdmin() {
    await this.adminMenuLink.click();
  }

  async clickAddButton() {
    await this.addButton.click();
  }

  async createUser(employeeName, newUsername, newPassword) {
    // Select User Role
    await this.userRoleDropdown.click();
    await this.userRoleAdminOption.click();

    // Enter Employee Name
    await this.employeeNameInput.click();
    await this.employeeNameInput.fill(employeeName);
    await this.employeeNameOption(employeeName).click();

    // Select Status
    await this.statusDropdown.click();
    await this.statusEnabledOption.click();

    // Enter User Credentials
    await this.usernameInput.click();
    await this.usernameInput.fill(newUsername);
    await this.passwordInput.click();
    await this.passwordInput.fill(newPassword);
    await this.confirmPasswordInput.click();
    await this.confirmPasswordInput.fill(newPassword);

    // Save
    await this.saveButton.click();
  }
}
