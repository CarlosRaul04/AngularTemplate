/* eslint-disable */
const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'neosTemplate',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/bootstrap.ts',
  },
  shared: shareAll({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  })
});
