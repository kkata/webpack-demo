const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');

const pkg = require('./package.json');

const PATHES = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

// 共通設定
const common = {
  entry: {
    app: PATHES.app,
    vendor: Object.keys(pkg.dependencies)
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
        devtool: 'source-map',
        output: {
          path: PATHES.build,
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractbundle({
        name: 'vendor',
        entries: ['react']
      }),
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