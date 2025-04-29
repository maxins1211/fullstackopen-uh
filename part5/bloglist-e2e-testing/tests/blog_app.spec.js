const { test, describe, expect, beforeEach } = require('@playwright/test')


describe('Blog app', () => {

    beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })
    test('displays the login form by default', async ({ page }) => {
        const pageHeader = page.getByText('Log in to application')
        await expect(pageHeader).toBeVisible()
        const usernameInput = page.getByTestId('username')
        await expect(usernameInput).toBeVisible()
        const passwordInput = page.getByTestId('password')
        await expect(passwordInput).toBeVisible()
    })
})