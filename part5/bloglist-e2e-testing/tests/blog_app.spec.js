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
            const messageDiv = page.locator('.message')
            await expect(messageDiv).toContainText('Login successfully')
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('blogtest')
            await page.getByTestId('password').fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()
            const messageDiv = page.locator('.error')
            await expect(messageDiv).toContainText('Wrong username or password')
        })
    })

    describe.only('When logged in', () => {
        beforeEach(async ({ page }) => {
            await page.getByTestId('username').fill('blogtest')
            await page.getByTestId('password').fill('12345')
            await page.getByRole('button', { name: 'login' }).click()
        })
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'new blog' }).click()
            await page.getByTestId('blog-title').fill('not a real title')
            await page.getByTestId('blog-author').fill('not a real author')
            await page.getByTestId('blog-url').fill('not a real url')
            await page.getByRole('button', { name: 'create' }).click()
            const messageDiv = page.locator('.message')
            await expect(messageDiv).toContainText('a new blog not a real title added')
        })

        describe('When there is a blog in blog list', () => {
            beforeEach(async ({ page }) => {
                await page.getByRole('button', { name: 'new blog' }).click()
                await page.getByTestId('blog-title').fill('not a real title')
                await page.getByTestId('blog-author').fill('not a real author')
                await page.getByTestId('blog-url').fill('not a real url')
                await page.getByRole('button', { name: 'create' }).click()
            })

            test('a blog can be liked', async ({ page }) => {
                await page.getByRole('button', { name: 'view' }).click()
                const numOfLike = page.getByTestId('number-of-like')
                await expect(numOfLike).toContainText('likes 0')
                await page.getByRole('button', { name: 'like' }).click()
                await expect(numOfLike).toContainText('likes 1')
            })
        })
    })
})