require('newrelic');
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('./postgres_redis.js');

const app = express();
const PORT = process.env.EXP_PORT || 3002;

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

app.use(cors());
app.use(compression());
app.use(bodyParser.json());

const logStats = () => {
  logger.debug('Debug statement');
  logger.info('Info statement');
};

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  logStats();
  db.getFromCache(req, res);
});

app.get('/:searchValue', (req, res) => {
  logStats();
  db.search(req, res);
});

app.use((req, res) => {
  logger.error('404 page requested');
  res.status(404).send('This page does not exist!');
});

app.listen(PORT, () => {
  logger.info(`listening on port ${PORT}`);
});

