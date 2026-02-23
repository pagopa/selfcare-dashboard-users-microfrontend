import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { createHtmlPlugin } from 'vite-plugin-html';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      svgr(),
      federation({
        name: 'usersRemote',
        filename: 'remoteEntry.js',
        exposes: {
          './RoutingUsers': './src/remotes/RoutingUsers',
          './RoutingProductUsers': './src/remotes/RoutingProductUsers',
        },
        shared: {
          react: { singleton: true, requiredVersion: '^18.0.0' },
          'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
          'react-router-dom': { singleton: true },
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
      minify: false, // required for @originjs/vite-plugin-federation
      cssCodeSplit: false, // recommended for MF
    },
    define: {
      'process.env': Object.fromEntries(
        Object.entries(env).filter(([key]) => key.startsWith('VITE_'))
      ),
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
