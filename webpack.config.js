/* eslint-disable */
// const { withModuleFederationPlugin, shareAll } = require('@angular-architects/module-federation/webpack');

// module.exports = withModuleFederationPlugin({
//   name: 'neosTemplate',
//   filename: 'remoteEntry.js',
//   exposes: {
//     // './App': './src/bootstrap.ts',
//     './public-api': './src/public-api.ts', // Exponemos todos los componentes
//   },
//   shared: shareAll({
//     singleton: true,
//     strictVersion: true,
//     requiredVersion: 'auto',
//   }),

//   additionalShared:[],
// });

const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  output: {
    uniqueName: "neosTemplate",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/app/")
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "neosTemplate",
      filename: "remoteEntry.js",
      exposes: {
        "./public-api": "./src/public-api.ts"
      },
      shared: {
        ...deps,
        "@angular/core": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/core"] },
        "@angular/common": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/common"] },
        "@angular/router": { singleton: true, strictVersion: true, requiredVersion: deps["@angular/router"] }
      }
    })
  ]
};
