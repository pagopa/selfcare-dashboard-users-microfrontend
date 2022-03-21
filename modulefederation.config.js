const { appDependencies } = require('./package.json');
const commonDependencies = require('@pagopa/selfcare-common-frontend/package.json').dependencies;
const muiItaliaDependencies = require('@pagopa/mui-italia/package.json').dependencies;

const dependencies = {
  ...muiItaliaDependencies,
  ...commonDependencies,
  ...appDependencies,
};

module.exports = {
  name: 'selfcareUsers',
  exposes: {
    './RoutingUsers': './src/RoutingUsers',
    './RoutingProductUsers': './src/RoutingProductUsers',
  },
  filename: 'remoteEntry.js',
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
      requiredVersion: dependencies['@pagopa/ts-commons'],
    },
    react: {
      singleton: true,
      requiredVersion: dependencies['react'],
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
    '@mui/icons-material': {
      singleton: true,
      requiredVersion: dependencies['@mui/icons-material'],
    },
    '@mui/material': {
      singleton: true,
      requiredVersion: dependencies['@mui/material'],
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
      requiredVersion: dependencies['i18next'],
    },
    'react-i18next': {
      singleton: true,
      requiredVersion: dependencies['react-i18next'],
    },
  },
};
