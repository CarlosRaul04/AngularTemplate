import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  retries: 1,

  use: {
    headless: true,
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry', // Guarda trazas si falla una vez
    screenshot: 'on', // Siempre guarda screenshots
    video: 'on', // Siempre guarda videos
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
