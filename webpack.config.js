/* eslint-disable */
 const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

 module.exports = withModuleFederationPlugin({
   name: 'neosTemplate',
   filename: 'remoteEntry.js',
   exposes: {
    //  './public-api': './src/public-api.ts', // Exponemos todos los componentes
    // './Routes': './src/app/remote-entry/entry.routes.ts',
    './BootstrapRemote': './src/bootstrap-remote.ts',
   },
   shared: shareAll({
     singleton: true,
     strictVersion: true,
     requiredVersion: 'auto',
   })
   ,
 });

