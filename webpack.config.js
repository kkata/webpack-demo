const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const PATHES = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

// 共通設定
const common = {
  entry: {
    app: PATHES.app
  },
  output: {
    path: PATHES.build,
    filename: '[name].js'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common, {});
    break;
  default:
    config = merge(common, {});
}

module.exports = validate(config);