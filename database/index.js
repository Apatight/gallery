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
  name: String,
  place_id: { unique: true, type: String },
  photos: Array,
});

const ApateezPhotos = mongoose.model('Places', Places);

exports.ApateezPhotos = ApateezPhotos;
