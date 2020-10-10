const mongoose = require('mongoose');
const util = require('util');

// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

const debug = require('debug')('accenture-backend-test:index');

// connect to mongo db
const mongoUri = config.env === 'test' ? config.mongo.hostTest : config.mongo.host;

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true },
);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

module.exports = app;
