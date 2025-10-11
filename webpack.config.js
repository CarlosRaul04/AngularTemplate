/* eslint-disable */
const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

module.exports = {
  output: {
    // 👇 Aquí va fuera del plugin
    publicPath: 'auto',
  },

  plugins: [
    withModuleFederationPlugin({
      name: 'neosTemplate',
      filename: 'remoteEntry.js',
      exposes: {
        
        // './App': './src/bootstrap.ts'
        './public-api': './src/public-api.ts',
      },
      shared: shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto',
      }),
    }),
  ],
};
