import fs from 'fs';
import path from 'path';

async function globalSetup() {
    const screenshotsDir = path.resolve(__dirname, 'screenshots');

    if (fs.existsSync(screenshotsDir)) {
        fs.rmSync(screenshotsDir, { recursive: true, force: true });
    }

    fs.mkdirSync(screenshotsDir);
}

export default globalSetup;
