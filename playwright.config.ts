import { defineConfig, devices } from '@playwright/test';
import { automatedBrowserProjects } from './tests/e2e/browser-matrix.mjs';

const port = 4175;
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  outputDir: '.playwright-artifacts',
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: automatedBrowserProjects.map((project) => ({
    name: project.name,
    use: {
      ...devices[project.device],
    },
  })),
  webServer: {
    command: `CONTEXT=production npm run build && npx http-server _site -p ${port} --silent`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
