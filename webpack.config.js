const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const SRC_DIR = path.join(__dirname, './client/src');
const DIST_DIR = path.join(__dirname, './client/dist');

const common = {
  plugins: [
    new webpack.DefinePlugin({
      // BASE_URL: '52.53.148.145',
      BASE_URL: 'localhost',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};

const client = {
  entry: `${SRC_DIR}/client.js`,
  output: {
    path: DIST_DIR,
    filename: 'app.js',
  },
};

const server = {
  entry: `${SRC_DIR}/server.js`,
  target: 'node',
  output: {
    path: DIST_DIR,
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module',
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];
