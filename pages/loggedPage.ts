import { expect, Locator, Page } from '@playwright/test';
import { NavigationMenuComponent } from './loggedPageComponents/navigationMenuComponent';
import { TasksComponent } from './loggedPageComponents/tasksComponent';

export class loggedPage {
   
  
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly logo: Locator;




    readonly navigationMenuComponent: NavigationMenuComponent;
    readonly tasksComponent: TasksComponent;






    readonly errorMessageText: Locator;
    readonly logoutText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('#logo');
        this.errorMessageText = page.locator('#ErrorMessageText');
        this.logoutText = page.getByText('Logout')
        this.navigationMenuComponent = new NavigationMenuComponent(page);
        this.tasksComponent = new TasksComponent(page);
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnLogout() {
        await this.logoutText.waitFor({ state: 'visible' });
        await this.logoutText.click();
    }

    async clickOnLogo() {
        await this.logo.waitFor({ state: 'visible' });
        await this.logo.click();
    }

    async clickOnNewProject() {
        await this.navigationMenuComponent.clickOnNewProject();
    }

    async fillNewProjectName(newProjectName: string) {
        await this.navigationMenuComponent.fillNewProjectName(newProjectName);
    }

    async clickOnAddProject() {
        return await this.navigationMenuComponent.clickOnAddProject();

    }

    async checkIfProjectExistsByName(projectName: string) {
        return await this.navigationMenuComponent.checkIfProjectExistsByName(projectName);
    }

    async checkIfProjectExistsById(id: string) {
        return await this.navigationMenuComponent.checkIfProjectExistsById(id);
    }

    async clickOnProjectOptions(id: string) {
        await this.navigationMenuComponent.clickOnProjectOptions(id);
    }

    async changeProjectIconRandom() {
        await this.navigationMenuComponent.changeProjectIconRandom();
    }

    async checkIfProjectIconIsNotDefault(id: string) {
        return await this.navigationMenuComponent.checkIfProjectIconIsNotDefault(id);
    }

    async deleteProject(id: string) {      
        await this.navigationMenuComponent.deleteProject(id);
    }

    async  selectLastProject() {
        await this.navigationMenuComponent.selectLastProject();
    }




    //task methods
    async fillTaskName(taskName: string) {
        await this.tasksComponent.fillTaskName(taskName);
    }

    async clickOnAddTask(taskName: string) {
       return await this.tasksComponent.clickOnAddTask(taskName);
    }

    async clickOnTaskOptions(taskName: string) {
        await this.tasksComponent.clickOnTaskOptions(taskName);
    }

    async clickOnTaskRandomPriority() {
        await this.tasksComponent.clickOnTaskRandomPriority();
    }

    

}
