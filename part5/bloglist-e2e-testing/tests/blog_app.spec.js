const { test, describe, expect, beforeEach } = require('@playwright/test')


describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
            data: {
                name: 'lam test',
                username: 'blogtest',
                password: '12345'
            }
        })
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

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('blogtest')
            await page.getByTestId('password').fill('12345')
            await page.getByRole('button', { name: 'login' }).click()
            const messageDiv = await page.locator('.message')
            await expect(messageDiv).toContainText('Login successfully')
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('blogtest')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()
            const messageDiv = await page.locator('.error')
            await expect(messageDiv).toContainText('Wrong username or password')
        })
    })


})