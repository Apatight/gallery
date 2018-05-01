const mongoose = require('mongoose');
const mongoUri = 'mongodb://database/apateez-gallery';

const db = mongoose.connect(mongoUri);

module.exports = db;
