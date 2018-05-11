const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// var requestImg = require('request').defaults({ encoding: null });

// const db = require('../database/mongo_db.js');
const db = require('../database/postgres.js');

const app = express();
const PORT = 3002;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  db.findOne(parseInt(req.params.id, 10))
    .then((place) => {
      const s3String = 'https://s3-us-west-2.amazonaws.com/apateez-photos/';
      const restaurantPhotosArray = [];
      for (let i = 0; i < place[0].photos.length; i += 1) {
        restaurantPhotosArray.push(`${s3String}${place[0].photos[i]}.png`);
      }
      res.send({ photoArray: restaurantPhotosArray, restaurantName: place[0].name, place_id: place[0].place_id });
    })
    .catch(err => console.log(err));

  // query.exec((err, photos) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     const s3String = 'https://s3-us-west-2.amazonaws.com/apateez-photos/';

  // 		const restaurantPhotosArray = [];
  //     for (let i = 0; i < photos.photos.length; i += 1) {
  //       // var s3String = `//s3-us-west-1.amazonaws.com/apateezgallery93/${photos.photos[i].photo_reference}.png`;
  //       // console.log(s3String);
  //       restaurantPhotosArray.push(`${s3String}${photos.photos[i]}.png`);
  //     }
  //     res.send({ photoArray: restaurantPhotosArray, restaurantName: photos.name, place_id: photos.place_id });
  //   }
  // });
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
  console.log(`listening on port ${PORT}`);
});
