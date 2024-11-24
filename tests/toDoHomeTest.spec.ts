import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHomePage.ts';

test.beforeEach(async ({ page }) => {
    await page.goto('https://todo.ly/');
});

const randomName = Math.random().toString(36).substring(7);
const randomEmail = randomName + '@example.com';
const insecurePassword = 'password123';

const constantUserName = 'daniel.aldazosa@ucb.edu.bo';
const constantPassword = 'daniel123';

test('Registrar nuevo usuario', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    await homePage.clickOnSignUpFree();

    await homePage.llenarDatosNuevoUsuario(randomName, randomEmail, insecurePassword);
    await homePage.guardarNuevoUsuario();
});


test('Iniciar sesión con usuario registrado', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    await homePage.clickOnLogin();

    await homePage.fillDataLogin(constantUserName, constantPassword);
    await homePage.clickOnLoginSubmit();

    //see if user is logged in
    await expect(homePage.logoutText).toBeVisible();

});

test('Iniciar sesión con usuario incorrecto', async ({ page }) => {
    const homePage = new ToDoHomePage(page);
    await homePage.clickOnLogin();

    await homePage.fillDataLogin(randomEmail, 'incorrectPassword');
    await homePage.clickOnLoginSubmit();
    await expect(homePage.errorMessageText).toBeVisible();

});