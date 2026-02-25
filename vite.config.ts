import path from 'path';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr(),
      federation({
        name: 'selfcareUsers',
        filename: 'remoteEntry.js',
        exposes: {
          './RoutingUsers': './src/remotes/RoutingUsers',
          './RoutingProductUsers': './src/remotes/RoutingProductUsers',
        },
        shared: [
          'react',
          'react-dom',
          'react-router-dom',
          '@emotion/react',
          '@emotion/styled',
          '@mui/material',
          '@mui/icons-material',
          '@mui/lab',
          '@mui/x-data-grid',
          '@mui/x-data-grid-generator',
          '@pagopa/mui-italia',
          '@pagopa/ts-commons',
          'i18next',
          'react-i18next',
          'mixpanel-browser',
          'core-js',
        ],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            VITE_ENV: process.env.VITE_ENV,
            VITE_URL_CDN: process.env.VITE_URL_CDN,
            // add other vars used in index.html here
          },
        },
      }),
    ],
    resolve: {
      dedupe: ['react', 'react-dom', 'react-redux'],
      alias: [
        {
          find: /^@pagopa\/selfcare-common-frontend$/,
          replacement: path.resolve('./node_modules/@pagopa/selfcare-common-frontend/lib/index.js'),
        },
      ],
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
      ),
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-redux'],
    },
    server: {
      port: 3001,
      cors: true,
    },
    preview: {
      port: 3001,
      cors: true,
    },
  };
});
