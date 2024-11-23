import { expect, Locator, Page } from '@playwright/test';

export class NavigationMenuComponent {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    



    readonly errorMessageText: Locator;
    readonly logoutText: Locator;
    readonly newProjectButton: Locator;
    readonly newProjectNameInput: Locator;
    readonly addProjectButton: Locator;
    readonly projectOptions: Locator;


    constructor(page: Page) {
        this.page = page;
        


        this.newProjectButton = page.getByRole('cell', { name: 'Add New Project', exact: true })
        this.newProjectNameInput = page.locator('#NewProjNameInput');
        this.addProjectButton = page.locator('#NewProjNameButton');


        this.projectOptions = page.locator('#projectContextMenu');

        





        this.errorMessageText = page.locator('#ErrorMessageText');
        this.logoutText = page.getByText('Logout')
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async clickOnNewProject() {
        await this.newProjectButton.waitFor({ state: 'visible' });
        await this.newProjectButton.click();
    }

    async fillNewProjectName(newProjectName: string) {
        await this.newProjectNameInput.waitFor({ state: 'visible' });
        await this.newProjectNameInput.fill(newProjectName);
    }

    async clickOnAddProject() {
        await this.addProjectButton.waitFor({ state: 'visible' });
        await this.addProjectButton.click();
        await this.page.waitForResponse(response => response.url().includes('Projects'));
        const id = await this.page.locator('#mainProjectList > :last-child').getAttribute('itemid');
        console.log("id", id);
        return id;
    }

    async checkIfProjectExistsByName(projectName: string) {

        try {
            await expect( this.page.locator(`.BaseProjectLi:has-text("${projectName}")`)).toBeVisible();
            return true;
        }catch(e){
            return false;
        }
    }

    async checkIfProjectExistsById(id: string) {
        try {
            await this.page.locator(`#ItemId_${id}`).first().isVisible();
            return true;
        }catch(e){
            return false;
        }
    }


    async clickOnProjectOptions(id: string) {
        const project = this.page.locator(`#ItemId_${id}`).nth(1);
        await project.hover();
        await project.locator('.ProjItemMenu').click();
    }

    async changeProjectIconRandom() {

        await this.projectOptions.waitFor({ state: 'visible' });
        const indiceRandom = Math.floor(Math.random() * 15) + 2;
        await this.projectOptions.locator(`#IconFrameOuter > span:nth-child(${indiceRandom})`).click();

    }

    async checkIfProjectIconIsNotDefault(id: string) {
        try {
             if(await this.page.locator(`#ItemId_${id}`).first().locator("#ListIcon").getAttribute("style") == "background: url(Images/icons/page2.png) no-repeat;"){
                throw new Error("Icono no ha cambiado");
            }

            return true;
        }catch(e){
            return false;
        }
    }

    async deleteProject(id: string) {
        this.page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept().catch(() => {});
        });

        await this.clickOnProjectOptions(id);
        await this.projectOptions.waitFor({ state: 'visible' });
        await this.projectOptions.locator('#ProjShareMenuDel').click();
   
      
          //await this.page.getByRole('link', { name: 'Delete', exact: true }).click();
        await this.page.waitForResponse(response => response.url().includes('Projects'));
        console.log("Project deleted");
    }


    selectLastProject() {
        return this.page.locator('#mainProjectList > :last-child').click();
    }

        



    
}
