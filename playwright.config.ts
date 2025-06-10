import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    retries: 1,
    use: {
        viewport: { width: 1920, height: 1080 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        baseURL: process.env.BASE_URL
    },
    globalSetup: require.resolve('./src/global-setup'),
    reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium'
            }
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox'
            }
        }
    ]
});
