import { test as base, PageScreenshotOptions, TestInfo } from '@playwright/test';
import { TodoPage } from '../page-objects/todo-page';
import path from 'path';

export type PageFixture = {
    todoPage: TodoPage;
    takeScreenShot: (name: string, testInfo: TestInfo, options?: PageScreenshotOptions) => Promise<Buffer>;
};

export const test = base.extend<PageFixture>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await use(todoPage);
    },
    takeScreenShot: async ({ page }, use) => {
        const takeScreenShot = async (
            name: string,
            testInfo: TestInfo,
            options?: PageScreenshotOptions
        ): Promise<Buffer> => {
            const screenshotsDir = path.resolve(__dirname, '../screenshots');
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = path.join(screenshotsDir, `${name}-${timestamp}.png`);

            const buffer = await page.screenshot({
                ...options,
                path: screenshotPath
            });

            await testInfo.attach(`${name}-${timestamp}`, {
                body: buffer,
                contentType: 'image/png'
            });

            return buffer;
        };

        await use(takeScreenShot);
    }
});
