import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
//import 'tsconfig-paths/register';

const resolveEnvFile = (): string | undefined => {
  const testEnv = process.env.TEST_ENV ?? 'qa';
  const candidateFiles = [
    path.resolve(__dirname, `.env.${testEnv}`),
    path.resolve(__dirname, '.env'),
  ];

  return candidateFiles.find((filePath) => fs.existsSync(filePath));
};

const envFile = resolveEnvFile();
if (envFile) {
  dotenv.config({ path: envFile });
}

const baseURL =
  process.env.PLAYWRIGHT_TEST_BASE_URL ||
  process.env.BASE_URL ||
  'https://qa.ateneaconocimientos.com';
const isCI = !!process.env.CI;
const screenshotMode = isCI ? 'only-on-failure' : 'on';
const videoMode = isCI ? 'retain-on-failure' : 'on';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /*workers: process.env.CI ? 1 : undefined,*/
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    baseURL: baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: videoMode,
    screenshot: screenshotMode,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
