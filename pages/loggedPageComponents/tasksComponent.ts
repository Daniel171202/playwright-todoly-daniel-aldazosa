import { expect, Locator, Page } from '@playwright/test';
import { get } from 'http';

export class TasksComponent {
    readonly url = "https://todo.ly/";
    readonly page: Page;
    readonly inputTaskName: Locator;
    readonly addTaskButton: Locator;
    readonly task : Locator;
    readonly taskOptionsButton: Locator;
    readonly taskOptions: Locator;
    readonly taskPriorityOptions: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inputTaskName = page.locator('#NewItemContentInput');
        this.addTaskButton = page.getByRole('button', { name: 'Add' });
        this.task = page.locator('.ItemContent');
        this.taskOptionsButton = page.getByRole('img', { name: 'Options' });
        this.taskOptions = page.locator('#itemContextMenu');
        this.taskPriorityOptions = page.locator('.ItemContent .ItemPriority');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async fillTaskName(taskName: string) {
        await this.inputTaskName.waitFor({ state: 'visible' });
        await this.inputTaskName.fill(taskName);
    }

    async clickOnAddTask(taskName: string) {
        await this.addTaskButton.waitFor({ state: 'visible' });
        await this.addTaskButton.click();
    
        // Encuentra la tarea que contiene el texto especificado




    }
    

    async clickOnTaskOptions(taskName: string) {
        const lastTask = this.page.locator('#mainItemList').getByText(taskName);
        await lastTask.click();
        await this.page.getByRole('img', { name: 'Options' }).click();
    }

    async clickOnTaskRandomPriority() {

       const randomNumber = Math.floor(Math.random() * 3) + 1;
        await this.page.locator('#itemContextMenu').getByText(randomNumber.toString()).click();

    }





}