/* eslint-disable */
 const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

 module.exports = withModuleFederationPlugin({
   name: 'neosTemplate',
   filename: 'remoteEntry.js',
   exposes: {
     // './App': './src/bootstrap.ts',
    //  './public-api': './src/public-api.ts', // Exponemos todos los componentes
    // './RemoteWrapper': './src/app/presentation/features/remote-wrapper/remote-wrapper.component.ts',
    // './Routes': './src/app/app.routes.ts',
    './RoutesModule': './src/app/remote-routes.module.ts',
   },
   shared: shareAll({
     singleton: true,
     strictVersion: true,
     requiredVersion: 'auto',
   })
   ,
 });

