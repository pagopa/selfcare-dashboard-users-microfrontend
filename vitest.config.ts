import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    exclude: ['**/node_modules/**'],
    coverage: {
      provider: 'v8',
      exclude: [
        'src/index.js',
        'src/reportWebVitals.ts',
        'src/api/generated/**',
      ],
    },
  },
});
