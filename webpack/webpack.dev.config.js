const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base.config');

console.log('In Development mode');

module.exports = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify(process.env.DEV_BASE_URL),
        REDIS_PORT: JSON.stringify(process.env.DEV_REDIS_PORT),
        REDIS_HOST: JSON.stringify(process.env.DEV_REDIS_HOST),
        PGRES_PORT: JSON.stringify(process.env.DEV_PGRES_PORT),
        PGRES_HOST: JSON.stringify(process.env.DEV_PGRES_HOST),
      },
    }),
  ],
});
