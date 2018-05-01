const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = require('./department');

const organisationSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    unique: true,
    required: true
  },
  phoneNumber: [{
    type: String
  }],
  departments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'departments'
  }]
})

const Organisation = mongoose.model('organisation', organisationSchema);

module.exports = Organisation;
