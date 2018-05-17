const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const base = require('./webpack.base.config');

module.exports = merge(base, {
  plugins: [
    // new UglifyJSPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     BASE_URL: JSON.stringify(process.env.PROD_BASE_URL),
    //     REDIS_PORT: JSON.stringify(process.env.PROD_REDIS_PORT),
    //     REDIS_HOST: JSON.stringify(process.env.PROD_REDIS_HOST),
    //     PGRES_PORT: JSON.stringify(process.env.PROD_PGRES_PORT),
    //     PGRES_HOST: JSON.stringify(process.env.PROD_PGRES_HOST),
    //   },
    // }),
  ],
});
