const mongoose = require('mongoose');

const mongoUrlDocker = 'mongodb://database/apateez-gallery';
const mongoUrl = 'mongodb://localhost/apateez-gallery';

mongoose.connect(mongoUrl);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection open');
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
  mongoose.connect(mongoUrlDocker);
});

const Places = new mongoose.Schema({
  place_id: { unique: true, type: Number },
  name: String,
  photos: Array,
});

const ApateezPhotos = mongoose.model('place', Places);

const findOne = (id, cb) => ApateezPhotos.findOne({ place_id: id });

const insertOne = (place, cb) => ApateezPhotos.create(place);

module.exports = {
  ApateezPhotos,
  findOne,
  insertOne,
};
