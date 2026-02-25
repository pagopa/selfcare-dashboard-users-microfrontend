import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import { loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import { defineConfig, mergeConfig } from 'vitest/config';

const env = loadEnv('test', process.cwd(), '');

export default defineConfig(
    mergeConfig(
        defineConfig({
            plugins: [
                react(),
                svgr(),
            ],
            resolve: {
                dedupe: ['react', 'react-dom', 'react-redux'],
                alias: [
                    {
                        find: /^@pagopa\/selfcare-common-frontend$/,
                        replacement: path.resolve(
                            './node_modules/@pagopa/selfcare-common-frontend/lib/index.js'
                        ),
                    },
                    {
                        // Intercept federation's virtual env.mjs before it can execute
                        find: /.*env\.mjs$/,
                        replacement: resolve('src/__mocks__/federation-env.ts'),
                    },
                ],
            },
            define: {
                // Safely inject only VITE_ prefixed env vars, not the whole process.env
                'process.env': JSON.stringify(
                    Object.fromEntries(
                        Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
                    )
                ),
            },
        }),
        defineConfig({
            test: {
                environment: 'jsdom',
                globals: true,
                setupFiles: ['./src/setupTests.ts'],
                include: ['src/**/*.{test,spec}.{ts,tsx}'],
                exclude: ['e2e/**'],
                coverage: {
                    provider: 'v8',
                    reporter: ['text', 'json', 'html'],
                    exclude: [
                        'src/reportWebVitals.ts',
                        'src/setupTests.ts',
                        '**/*.spec.{ts,tsx}',
                        '**/*.e2e.{ts,tsx}',
                    ],
                },
                reporters: ['verbose'],
                maxWorkers: 3,
                server: {
                    deps: {
                        inline: ['@pagopa/selfcare-common-frontend'],
                    },
                },
            },
        })
    )
);