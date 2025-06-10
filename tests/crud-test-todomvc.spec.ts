import { expect } from '@playwright/test';
import { test } from '../src/fixtures/base';

/**
 * User flow:
 *  1) Open home page
    2) Add two tasks: "Buy milk" and "Read book".
    Verify the following:
        - There are 2 tasks in the list.
        - There are no tasks marked as completed.
    3) Mark the task "Buy milk" as completed.
    Verify the following:
        - There are exactly 2 tasks in the list.
        - Only one task is marked as completed.
        - The footer displays "1 item left".
    4) Delete the task "Buy milk" (deletion is triggered by hovering over the task to reveal the delete button).
    Verify the following:
        - Only the task "Read book" remains in the list.
        - There are no tasks marked as completed.
 */
test('Add two new tasks, complete and delete one of them', async ({ todoPage, takeScreenShot }, testInfo) => {
    await test.step('Step 1. Open Hame page.', async () => {
        await todoPage.openHomePage();
        expect(await todoPage.getHeader(), 'Expected header "todos" is displayed.').toEqual('todos');
    });

    await test.step('Step 2. Add two task "Buy milk".', async () => {
        await todoPage.addNewTaskInTodo('Buy milk');
        await todoPage.waitForElement('Buy milk');
        await todoPage.addNewTaskInTodo('Read book');
        await todoPage.waitForElement('Read book');

        expect(await todoPage.getAllTasksCount(), 'Expected two tasks are displayed.').toEqual(2);
        await takeScreenShot('Added_2_tasks', testInfo);
    });

    await test.step('Step 3. Update task "Buy milk".', async () => {
        await todoPage.updateTaskToCompleted('Buy milk');

        expect(await todoPage.getAllTasksCount(), 'Expected two tasks are displayed.').toEqual(2);
        expect(await todoPage.getCompletedTasksCount(), 'Expected only one task is completed.').toEqual(1);
        await takeScreenShot('Updated_1st_task', testInfo);

        await expect(todoPage.footerText, 'Expected footer is displayed.').toBeVisible();
        expect(await todoPage.getTextInFooter(), 'Expected footer contains label "1 item left".').toContain(
            '1 item left'
        );
    });

    await test.step('Step 4. Delete task "Buy milk".', async () => {
        await todoPage.deleteTask('Buy milk');

        expect(await todoPage.getAllTasksCount(), 'Expected one task is displayed.').toEqual(1);
        expect(await todoPage.getCompletedTasksCount(), 'Expected no tasks to be completed.').toEqual(0);
        await takeScreenShot('Deleted_1st_task', testInfo);
    });
});
