/* eslint-disable */
const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.config');
module.exports = merge(prodConfig, {
  mode: 'production',
});


