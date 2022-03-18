const { dependencies } = require('./package.json');
const commonDependencies = require('@pagopa/selfcare-common-frontend/package.json').dependencies;

module.exports = {
  name: 'selfcareUsers',
  exposes: {
    './RoutingUsers': './src/RoutingUsers',
    './RoutingProductUsers': './src/RoutingProductUsers',
  },
  filename: 'remoteEntry.js',
  shared: {
    ...commonDependencies,
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
};
