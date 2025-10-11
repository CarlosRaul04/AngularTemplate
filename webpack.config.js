/* eslint-disable */
const {
  withModuleFederationPlugin,
  shareAll,
} = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'neosTemplate',
  filename: 'remoteEntry.js',
  exposes: {
    // './App': './src/bootstrap.ts',
    //  './public-api': './src/public-api.ts', // Exponemos todos los componentes
    './RemoteWrapper': './src/app/presentation/features/remote-wrapper/remote-wrapper.component.ts',
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
    '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/forms': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
    '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  },
});
