import { Locator, Page } from '@playwright/test';

/**
 * Page Object for interacting with the Todo page.
 */
export class TodoPage {
    private readonly page: Page;
    private readonly headerPage: Locator;
    private readonly addNewTask: Locator;
    public readonly footerText: Locator;
    private readonly allTasks: Locator;
    private readonly completedTasks: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.headerPage = this.page.locator('.header');
        this.addNewTask = this.page.locator('.new-todo');
        this.footerText = this.page.locator('[data-testid="todo-count"]');
        this.allTasks = this.page.locator('[data-testid="todo-item"]');
        this.completedTasks = this.page.locator('[data-testid="todo-item"].completed');
    }

    /**
     * Navigate to the home page.
     */
    async openHomePage(): Promise<void> {
        await this.page.goto('#');
    }

    /**
     * Get header of the page.
     *
     * @returns - A promise resolving to the string of header of the page.
     */
    async getHeader(): Promise<string> {
        return await this.headerPage.innerText();
    }

    /**
     * Add a new task.
     *
     * @param nameTask - name of a new task.
     */
    async addNewTaskInTodo(nameTask: string): Promise<void> {
        await this.addNewTask.fill(nameTask);
        await this.addNewTask.press('Enter');
    }

    /**
     * Wait for element to be visible.
     *
     * @param nameElement - target name of the element.
     */
    async waitForElement(nameElement: string): Promise<void> {
        await this.page.waitForSelector(`[data-testid="todo-title"]:has-text("${nameElement}")`);
    }

    /**
     * Update existing task to complete state.
     *
     * @param nameTask - name of existing task to be updated.
     */
    async updateTaskToCompleted(nameTask: string): Promise<void> {
        await this.page.locator(`//label[contains(text(), '${nameTask}')]/ancestor::div/input`).click();
    }

    /**
     * Delete existing task.
     *
     * @param nameTask - name of existing task to be deleted.
     */
    async deleteTask(nameTask: string): Promise<void> {
        await this.page
            .locator(`//label[@data-testid="todo-title" and text()='${nameTask}']/ancestor::div/button`)
            .click();
    }

    /**
     * Get the number of the completed tasks.
     *
     * @returns - A promise resolving to the number of the completed tasks.
     */
    async getCompletedTasksCount(): Promise<number> {
        return await this.completedTasks.count();
    }

    /**
     * Get the number of all existing tasks.
     *
     * @returns - A promise resolving to the number of all existing tasks.
     */
    async getAllTasksCount(): Promise<number> {
        return await this.allTasks.count();
    }

    /**
     * Get all text in footer.
     *
     * @returns - A promise resolving to the string of all text in footer.
     */
    async getTextInFooter(): Promise<string> {
        return await this.footerText.innerText();
    }
}
