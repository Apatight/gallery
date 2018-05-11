const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'apateez',
};

const db = pgp(cn);

const findOne = id => db.any('SELECT * FROM gallery WHERE place_id = $1', id);

module.exports = {
  findOne,
};
