import { test, expect } from '@playwright/test';
import { ToDoHomePage } from '../pages/toDoHomePage.ts';

const username= "daniel.aldazosa@ucb.edu.bo";   
const password = "daniel123";

var randomName = Math.random().toString(36).substring(7);
var idRandomProject = "";

async function createLoggedPage(page){
    const homePage = new ToDoHomePage(page);
    await homePage.clickOnLogin();
    await homePage.fillDataLogin(username, password);
    await homePage.clickOnLoginSubmit();
    await expect(homePage.logoutText).toBeVisible();

    const loggedPage = homePage.convertToLoggedPage();

    return loggedPage;
}






test.beforeEach(async ({ page }) => {
    await page.goto('https://todo.ly/');
});

test('Adicionar un proyecto cambiandole el icono por defecto', async ({ page }) => {
    const loggedPage = await createLoggedPage(page);

    await loggedPage.clickOnNewProject();
    await loggedPage.fillNewProjectName(randomName);
    idRandomProject = await loggedPage.clickOnAddProject() ?? '';

    expect(await loggedPage.checkIfProjectExistsByName(randomName)).toBeTruthy();
    expect(await loggedPage.checkIfProjectExistsById(idRandomProject)).toBeTruthy();    

    await loggedPage.clickOnProjectOptions(idRandomProject);
    await loggedPage.changeProjectIconRandom();
    expect(await loggedPage.checkIfProjectIconIsNotDefault(idRandomProject)).toBeTruthy();

    //delete project
    await loggedPage.deleteProject(idRandomProject);

});




