const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const uri = require('./../config/mongoUri');
const options = {
  // useMongoClient: true,
  // autoIndex: false,
  // reconnectTries: Number.MAX_VALUE, 
  // reconnectInterval: 500,
  // poolSize: 10,
  // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0
};

module.exports = mongoose.connect(uri, options);