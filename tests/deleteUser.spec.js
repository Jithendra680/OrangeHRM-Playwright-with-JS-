import { test, expect } from '../fixtures/baseTest.js';
import deleteUserData from '../testData/deleteUserData.json';

test.describe('User Management - Delete User', () => {
  test('Search and Delete User', async ({ deleteUserPage, page }) => {
    // 1. Navigate to Admin (Login is handled automatically via baseTest)
    await deleteUserPage.navigateToAdmin();

    // 2. Search for the user using test data
    const { searchUsername } = deleteUserData.deleteUser;
    await deleteUserPage.searchUser(searchUsername);

    // Wait for the search results grid to load
    await page.waitForTimeout(2000);

    // 3. Click the delete button on the row and confirm deletion
    await deleteUserPage.clickDeleteUser();
    await deleteUserPage.confirmDelete();

    // Optional: wait for successful delete toast message
    // await expect(page.getByText('Successfully Deleted')).toBeVisible();
  });
});
