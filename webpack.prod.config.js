// /* eslint-disable */
// const { merge } = require('webpack-merge');
// const prodConfig = require('./webpack.config');
// module.exports = merge(prodConfig, {
//   mode: 'production',
// });

/* eslint-disable */
/* eslint-disable */
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.config");

module.exports = merge(baseConfig, {
  mode: "production",
  output: {
    uniqueName: "neosTemplate",
    publicPath: "auto",
    clean: true,
  },
  optimization: {
    runtimeChunk: false,
    minimize: true,
  },
});

