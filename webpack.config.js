/* eslint-disable */
 const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

// 👉 Primero, crea la configuración del plugin
const mfConfig = withModuleFederationPlugin({
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
});

// 👉 Luego, extiende la configuración global de Webpack
module.exports = {
  ...mfConfig,
  output: {
    uniqueName: 'neosTemplate',
    publicPath: 'auto',
    scriptType: 'text/javascript', // ⚡ evita modo ESM
  },
};
