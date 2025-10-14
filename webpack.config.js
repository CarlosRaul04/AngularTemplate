/* eslint-disable */
 const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = {
  output: {
    uniqueName: 'neosTemplate',
    publicPath: 'auto',
    scriptType: 'text/javascript', // ⚡ Fuerza modo clásico (no ESM)
  },

  plugins: [
    withModuleFederationPlugin({
      name: 'neosTemplate',
      filename: 'remoteEntry.js',
      exposes: {
        './Routes': './src/app/app.routes.ts',
      },
      library: { type: 'var', name: 'neosTemplate' }, // ⚡ Expone window.neosTemplate
      shared: shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      }),
    }),
  ],
};
