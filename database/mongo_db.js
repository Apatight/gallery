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
  place_id: { unique: true, type: String },
  name: String,
  photos: Array,
});

const ApateezPhotos = mongoose.model('Places', Places);

const findbyId = id => ApateezPhotos.findOne({ place_id: id });

const insertOne = place => ApateezPhotos.create(place);

exports.ApateezPhotos = ApateezPhotos;
