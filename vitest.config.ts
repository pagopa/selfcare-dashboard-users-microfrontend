// vitest.config.ts
import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default mergeConfig(
  // Vite's defineConfig handles plugins — no type conflict
  defineViteConfig({
    plugins: [react(), svgr(), tsconfigPaths()],
  }),
  // Vitest's defineConfig handles only test config — no plugins
  defineVitestConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      pool: 'forks',
      maxWorkers: 4,
      fileParallelism: true,
      testTimeout: 15000,
      hookTimeout: 15000,
      restoreMocks: true,
      clearMocks: true,
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        'coverage/*',
        'e2e/**',
        '**/*.spec.ts',
        '**/__mf__temp/**',
      ],
      coverage: {
        provider: 'v8',
        exclude: ['src/index.js', 'src/reportWebVitals.ts', 'src/api/generated/**'],
      },
    },
  })
);
