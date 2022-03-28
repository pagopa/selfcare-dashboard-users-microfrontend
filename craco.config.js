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
};
