const production = require('./webpack.prod.config');
const development = require('./webpack.dev.config');

if (process.env.NODE_ENV === 'production') {
  module.exports = production;
} else {
  module.exports = development;
}
