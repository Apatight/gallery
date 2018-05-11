require('newrelic');
const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');
const path = require('path');
const bodyParser = require('body-parser');
// var requestImg = require('request').defaults({ encoding: null });

// const db = require('../database/mongo_db.js');
const db = require('../database/postgres.js');

const app = express();
const PORT = 3002;

app.use(morgan('dev', {
  skip(req, res) {
    return res.statusCode < 400;
  },
  stream: process.stderr,
}));

app.use(morgan('dev', {
  skip(req, res) {
    return res.statusCode >= 400;
  },
  stream: process.stdout,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));
app.use((req, res, next) => {
  logger.error('404 page requested');
  res.status(404).send('This page does not exist!');
});


app.get('/restaurants/:id', (req, res) => {
  logger.debug('Debug statement');
  logger.info('Info statement');
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  db.findOne(parseInt(req.params.id, 10))
    .then((place) => {
      const s3String = 'https://s3-us-west-2.amazonaws.com/apateez-photos/';
      const restaurantPhotosArray = [];
      const restaurant = place[0];
      for (let i = 0; i < restaurant.photos.length; i += 1) {
        restaurantPhotosArray.push(`${s3String}${restaurant.photos[i]}.png`);
      }
      logger.debug('Debug statement');
      logger.info('Info statement');
      res.send({ photoArray: restaurantPhotosArray, restaurantName: restaurant.name, place_id: restaurant.place_id });
    })
    .catch(err => console.log(err));
});

app.get('/:searchValue', (req, res) => {
  const searchQuery = req.params.searchValue;
  const recursefindPlaceId = function (searchQuery) {
    const query = Places.findOne({ name: { $regex: searchQuery, $options: 'i' } });
    query.exec((err, photos) => {
      if (err) {
        console.log(err);
      } else if (photos) {
        res.send({ place_id: photos.place_id });
      } else {
        searchQuery = searchQuery.slice(0, -1);
        recursefindPlaceId(searchQuery);
      }
    });
  };
  recursefindPlaceId(searchQuery);
});


app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});
