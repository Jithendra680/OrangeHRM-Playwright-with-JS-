import { test, expect } from '../fixtures/baseTest.js';
import loginData from '../testData/loginData.json';
import userCreationData from '../testData/userCreationData.json';

test.describe('User Management', () => {
  test('Create New Admin User', async ({ userCreationPage, page }) => {
    // 1. Navigate to Admin and add new user (Login is handled in baseTest)
    await userCreationPage.navigateToAdmin();
    await userCreationPage.clickAddButton();

    // 3. Fill details and save using test data
    const { employeeName, username, password } = userCreationData.newUser;
    await userCreationPage.createUser(employeeName, username, password);

    // Optional: wait for successful save toast message
    // await expect(page.getByText('Successfully Saved')).toBeVisible();
  });
});
