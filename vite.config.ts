import { createRequire } from 'module';
import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';

const require = createRequire(import.meta.url);

const commonDependencies = require('@pagopa/selfcare-common-frontend/package.json').dependencies;
const muiItaliaDependencies = require('@pagopa/mui-italia/package.json').dependencies;
const appDependencies = require('./package.json').dependencies;

const dependencies: Record<string, string> = {
  ...muiItaliaDependencies,
  ...commonDependencies,
  ...appDependencies,
};

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');

   const base =
    command === 'build' && env.VITE_URL_CDN
      ? `${env.VITE_URL_CDN}/microcomponents/dashboard/users/`
      : '/';

  return {
    base,
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
        shared: {
          '@pagopa/selfcare-common-frontend': {
            singleton: true,
            requiredVersion: dependencies['@pagopa/selfcare-common-frontend'],
          },
          '@pagopa/mui-italia': {
            singleton: true,
            requiredVersion: dependencies['@pagopa/mui-italia'],
          },
          '@pagopa/ts-commons': {
            singleton: true,
            strictVersion: false, // don't crash on version mismatch
            requiredVersion: '^13.1.2',
          },
          react: {
            singleton: true,
            requiredVersion: dependencies.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
          'react-redux': {
            singleton: true,
            requiredVersion: dependencies['react-redux'],
          },
          'react-router-dom': {
            singleton: true,
            requiredVersion: dependencies['react-router-dom'],
          },
          '@emotion/react': {
            singleton: true,
            requiredVersion: dependencies['@emotion/react'],
          },
          '@emotion/styled': {
            singleton: true,
            requiredVersion: dependencies['@emotion/styled'],
          },
          '@mui/icons-material': {
            singleton: true,
            requiredVersion: dependencies['@mui/icons-material'],
          },
          '@mui/material': {
            singleton: true,
            requiredVersion: dependencies['@mui/material'],
          },
          '@mui/lab': {
            singleton: true,
            requiredVersion: dependencies['@mui/lab'],
          },
          '@mui/x-data-grid': {
            singleton: true,
            requiredVersion: dependencies['@mui/x-data-grid'],
          },
          '@mui/x-data-grid-generator': {
            singleton: true,
            requiredVersion: dependencies['@mui/x-data-grid-generator'],
          },
          i18next: {
            singleton: true,
            requiredVersion: dependencies.i18next,
          },
          'react-i18next': {
            singleton: true,
            requiredVersion: dependencies['react-i18next'],
          },
          'core-js': {
            singleton: true,
            requiredVersion: dependencies['core-js'],
          },
          'mixpanel-browser': {
            singleton: true,
            requiredVersion: dependencies['mixpanel-browser'],
          },
        },
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
    build: {
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
      modulePreload: false,
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
      ),
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'react-router-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    server: {
      port: 3001,
    },
    preview: {
      port: 3001,
    },
  };
});
