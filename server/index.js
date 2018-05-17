require('dotenv').config();
require('newrelic');
const express = require('express');

const app = express();
const compression = require('compression');

app.use(compression());
const http = require('http');
const path = require('path');

// middleware
const bodyParser = require('body-parser');
const cors = require('cors');


const db = require('./postgres_redis.js');

http.globalAgent.maxSockets = 50;

const PORT = 3002;

app.use(compression());
app.use(cors());
app.use(bodyParser.json());

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  db.getFromCache(req, res);
});

app.get('/:searchValue', (req, res) => {
  db.search(req, res);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

