const mongoose = require('mongoose');
const db = require('./index.js');
mongoose.Promise = global.Promise;

const listSchema = new mongoose.Schema({
  place_id: {unique: true, type:String},
  name: String,
  photos: Array
});

const list = mongoose.model('list', listSchema);

module.exports = list;
