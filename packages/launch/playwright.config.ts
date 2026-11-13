import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  testMatch: 'preview.spec.ts',
  fullyParallel: true,
  use: {
    baseURL: process.env.PREVIEW_BASE_URL || 'http://localhost:3201',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: process.env.PREVIEW_BASE_URL
    ? undefined
    : {
        command: 'npm run dev -- --port 3201',
        url: 'http://localhost:3201',
        reuseExistingServer: !process.env.CI,
      },
});
