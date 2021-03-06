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
const redis = require('redis');

const { REDIS_PORT } = process.env;
console.log('REDIS PORT: ', process.env.DEV_REDIS_PORT);
const client = redis.createClient(6379);

const getFromDB = (req, res) => {
  db.any('SELECT * FROM gallery WHERE place_id = $1', req.params.id)
    .then((place) => {
      const s3String = 'https://s3-us-west-2.amazonaws.com/apateez-photos/';
      const photoUrls = [];
      const restaurant = place[0];
      for (let i = 0; i < restaurant.photos.length; i += 1) {
        photoUrls.push(`${s3String}${restaurant.photos[i]}.png`);
      }
      const obj = {
        photoArray: photoUrls,
        restaurantName: restaurant.name,
        place_id: restaurant.place_id,
      };
      client.setex(req.params.id, 60 * 60, JSON.stringify(obj));
      res.status(200);
      res.send(obj);
    })
    .catch(err => console.log(err));
};

const getFromCache = (req, res) => {
  client.get(req.params.id, (err, place) => {
    if (place) {
      res.status(200);
      res.send(JSON.parse(place));
    } else {
      getFromDB(req, res);
    }
  });
};

const search = (req, res) => {
  const recursefindPlaceId = (q) => {
    db.any('SELECT * FROM gallery WHERE gallery.name=$1', q)
      .then((place) => {
        if (place) {
          res.send({ place_id: place.place_id });
        } else {
          recursefindPlaceId(q.slice(0, -1));
        }
      })
      .catch(err => console.log(err));
  };
  recursefindPlaceId(req.params.searchValue);
};


module.exports = {
  search,
  getFromDB,
  getFromCache,
};
