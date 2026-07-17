import { test, expect } from '../fixtures/baseTest.js';
import loginData from '../testData/loginData.json';
import editUserData from '../testData/editUserData.json';

test.describe('User Management - Edit User', () => {
  test('Search and Edit User Password', async ({ editUserPage, page }) => {
    // 1. Navigate to Admin (Login is handled in baseTest)
    await editUserPage.navigateToAdmin();

    // 3. Search for the user
    const { searchUsername, newPassword } = editUserData.editUser;
    await editUserPage.searchUser(searchUsername);

    // Wait for search results to load (wait for API response or visually wait)
    // We add a simple explicit wait here to ensure the grid re-renders with search results
    await page.waitForTimeout(2000); 

    // 4. Click edit and change password
    await editUserPage.clickEditUser();
    await editUserPage.changePassword(newPassword);

    // Optional: wait for successful save toast message
    // await expect(page.getByText('Successfully Saved')).toBeVisible();
  });
});
