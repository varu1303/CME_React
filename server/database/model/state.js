const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const stateSchema = new Schema({
  name: {  
    type: String,
    trim: true,
    required: true,
    unique: true
  }
});

const State = mongoose.model('state', stateSchema);

module.exports = State;
