const promise = require('bluebird');

const initOptions = {
  promiseLib: promise,
};

const pgp = require('pg-promise')(initOptions);

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'apateez',
  // user: 'myUser',
  // password: 'myPassword',
};

const db = pgp(cn);

db.any('SELECT * FROM gallery WHERE place_id = $1', [true])
  .then(data => console.log('DATA:', data))
  .catch(error => console.log('ERROR:', error))
  .finally(db.$pool.end);
