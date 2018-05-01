const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const citySchema = new Schema({
  name: {  
    type: String,
    trim: true,
    required: true,
    unique: true
  }
});

const City = mongoose.model('city', citySchema);

module.exports = City;
