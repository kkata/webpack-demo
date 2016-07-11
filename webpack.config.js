const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');

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
    config = merge(
      common,
      {
        devtool: 'source-map'
      },
      parts.minify(),
      parts.setupCSS(PATHES.app)
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map'
      },
      parts.setupCSS(PATHES.app),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config);