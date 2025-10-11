// /* eslint-disable */
// const { merge } = require('webpack-merge');
// const prodConfig = require('./webpack.config');
// module.exports = merge(prodConfig, {
//   mode: 'production',
// });

/* eslint-disable */
const { merge } = require("webpack-merge");
const path = require("path");
const deps = require("./package.json").dependencies;
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    uniqueName: "neosTemplate",
    publicPath: "auto",
    clean: true, // limpia la carpeta dist antes de cada build
  },
  optimization: {
    runtimeChunk: false,
    minimize: true,
  },
  plugins: [
    // 🔁 Reemplazamos el plugin del baseConfig con una versión limpia para prod
    new ModuleFederationPlugin({
      name: "neosTemplate",
      filename: "remoteEntry.js",
      exposes: {
        "./public-api": "./src/public-api.ts",
      },
      shared: {
        ...deps,
        "@angular/core": {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps["@angular/core"],
        },
        "@angular/common": {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps["@angular/common"],
        },
        "@angular/router": {
          singleton: true,
          strictVersion: true,
          requiredVersion: deps["@angular/router"],
        },
      },
    }),
  ],
});
