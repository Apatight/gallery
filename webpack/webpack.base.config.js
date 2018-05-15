const { join } = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');

const SRC_DIR = join(__dirname, '../client/src');
const DIST_DIR = join(__dirname, '../client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PORT: JSON.stringify(process.env.PORT),
        NEW_RELIC_LICENSE_KEY: JSON.stringify(process.env.NEW_RELIC_LICENSE_KEY),
      },
    }),
    new MinifyPlugin({
      mangle: { topLevel: true },
    }),
  ],
};

