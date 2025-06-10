# 🎭 E2E Playwright Test Framework


## Installation

* Please follow these steps to download and install Node.js v22.x.x (or the latest recommended version). You can perform a graphical user interface (UI) installation on Windows, MacOS, or Linux.

* To access the repository, please clone the following repository: https://github.com/valerii-bahno/project-test-todomvc

* Go inside the cloned repository 

* Execute the following command to install npm:\
  `npm install`\
  This will install all other dependencies for your project.

* To install Playwright with browsers, use the following command:\
  `npm playwright install`

  With the installation completed, you can now move on to the configuration steps outlined below.


## Configuration

To configure the framework, follow these important steps related to the creation and population of the .env file in the root folder of your project:

* Create an empty .env file in the root folder of your project.
* Reach out to any team member to obtain their version of the .env file. Due to security concerns involving sensitive information such as secrets, UUIDs, and passwords, these details cannot be provided here.
* Ensure that your .env file includes the following crucial variables:
  * BASE_URL - This is the URL of the application.


## Execution

There are several scenarios for running tests:\
1. To run a single spec, use the following command:\
`npx playwright test ${TESTCASE} --project={PROJECT_NAME}`.\
Example: \
`npx playwright test crud-test-todomvc.spec.ts --project=chromium` to run test on Chromium browser
2. To run all tests on specific browser, use the following command:\
`npx playwright test --project={PROJECT_NAME}`\
Example: \
`npx playwright test --project=chromium` to run tests on Chromium browser

## GitHub Actions

* Automatic Daily Executions:
  - `pw-run-regression.yml` - Executes all enabled tests on Windows OS.

All test results can be accessed through:
* GitHub Actions (https://github.com/valerii-bahno/project-todomvc/actions)