import { defineConfig } from '@playwright/test';

declare const process: { env: { CI?: string } };

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,

  expect: {
    timeout: 10_000,
  },

  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],

  use: {
    trace: 'retain-on-failure',
  },
});