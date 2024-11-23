import { expect, Locator, Page } from '@playwright/test';

import { loggedPage } from './loggedPage';

export class ToDoHomePage {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;
    readonly signUpFreeButton: Locator;
    readonly signUpDialog: Locator;

    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly tosCheckbox: Locator;
    readonly signUpButton: Locator;
    readonly loginButton: Locator;
    readonly loginEmailInput: Locator;
    readonly loginPasswordInput: Locator;
    readonly loginSubmitButton: Locator;
    readonly errorMessageText: Locator;
    readonly logoutText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        //sign up
        this.signUpFreeButton = page.locator('.HPHeaderSignup > a:nth-child(1)');
        this.signUpDialog = page.locator('.HPsignupDiv');
        this.fullNameInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxFullName');
        this.emailInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxEmail');
        this.passwordInput = page.locator('#ctl00_MainContent_SignupControl1_TextBoxPassword');
        this.tosCheckbox = page.locator('#ctl00_MainContent_SignupControl1_CheckBoxTerms');
        this.signUpButton = page.locator('#ctl00_MainContent_SignupControl1_ButtonSignup');


        //login
        this.loginButton = page.locator('.HPHeaderLogin > a:nth-child(1)');
        this.loginEmailInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxEmail');
        this.loginPasswordInput = page.locator('#ctl00_MainContent_LoginControl1_TextBoxPassword');
        this.loginSubmitButton = page.locator('#ctl00_MainContent_LoginControl1_ButtonLogin');

       
        this.errorMessageText = page.locator('#ErrorMessageText');
        this.logoutText = page.getByText('Logout')



    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnSignUpFree() {
        await this.signUpFreeButton.waitFor({ state: 'visible' });
        await this.signUpFreeButton.click();
        await expect(this.signUpDialog).toBeVisible();
    }

    async llenarDatosNuevoUsuario(fullName: string, email: string, password :string) : Promise<void> {
        await this.fullNameInput.waitFor({ state: 'visible' });
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.tosCheckbox.check();
    }

    async guardarNuevoUsuario(){
        await this.signUpButton.click();
        await expect(this.page.getByText('Logout')).toBeVisible();
    }


    //login methods
    async clickOnLogin() {
        await this.loginButton.waitFor({ state: 'visible' });
        await this.loginButton.click();
        await expect(this.loginEmailInput).toBeVisible();
    }

    async fillDataLogin(email: string, password : string) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
    }

    async clickOnLoginSubmit() {
        await this.loginSubmitButton.click();
        
    }

    //convert to logged page
    convertToLoggedPage() {
        return new loggedPage(this.page);
    }
    

}
