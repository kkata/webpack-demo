const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const PATHES = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
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