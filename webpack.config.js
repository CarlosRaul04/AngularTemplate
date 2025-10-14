/* eslint-disable */
 const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'neosTemplate',
  filename: 'remoteEntry.js',
  exposes: {
    './Routes': './src/app/app.routes.ts',
  },
  shared: shareAll({
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  }),
  // 👇 Ajustes clave para evitar el error de shareScope y 'init undefined'
  library: { type: 'var', name: 'neosTemplate' },
  output: {
    uniqueName: 'neosTemplate',
    publicPath: 'auto',
    scriptType: 'text/javascript', // ⚡️ fuerza modo clásico
  },
});
