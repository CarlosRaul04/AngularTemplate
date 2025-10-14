/* eslint-disable */
 const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'neosTemplate',
  filename: 'remoteEntry.js',
  exposes: {
    './Routes': './src/app/app.routes.ts',
  },
  library: { type: 'var', name: 'neosTemplate' },
  shared: shareAll({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  }),
  // 👇 puedes añadir configuración global extra
  additionalShared: [],
  // 👇 esto se fusiona al nivel superior de webpack
  extraOptions: {
    output: {
      uniqueName: 'neosTemplate',
      publicPath: 'auto',
      scriptType: 'text/javascript',
    },
  },
});
