/* const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const { dependencies } = require('./package.json');
const commonPackageJson = require('@pagopa/selfcare-common-frontend/package.json');*/

const cracoModuleFederation = require('craco-module-federation');

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.m?js/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
      ignoreWarnings: [/Failed to parse source map/],
    },
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
      options: { useNamedChunkIds: true }, //THIS LINE IS OPTIONAL
    },
  ],
  /*plugins: [
    {
      plugin: new ModuleFederationPlugin({
        name: 'SelfcareUsersMicrofrontend',
        filename: 'remoteEntry.js',
        exposes: {
          './RoutingUsers': './src/index',
        },
        shared: {
          ...commonPackageJson.dependencies,
          ...dependencies,
          '@pagopa/selfcare-common-frontend': {
            singleton: true,
            requiredVersion: dependencies['@pagopa/selfcare-common-frontend'],
          },
          react: {
            singleton: true,
            requiredVersion: dependencies['react'],
          },
          'react-dom': {
            singleton: true,
            requiredVersion: dependencies['react-dom'],
          },
        },
      }),
    },
  ],*/
};
