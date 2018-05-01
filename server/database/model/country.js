const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const countrySchema = new Schema({
  name: {  
    type: String,
    trim: true,
    required: true,
    unique: true
  }
});

const Country = mongoose.model('country', countrySchema);

module.exports = Country;
