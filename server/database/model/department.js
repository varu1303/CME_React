const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = require('./event');

const departmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  emailId: {
    type: String,
  },
  phoneNumber: [{
    type: String
  }],
  orgId: {
    type: String,
    required: true
  },
  organisationName: {
    type: String
    // required: true
  },
  events: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'event'
  }], // when a ref gets added, need to notify subscribed users!
  subscribed: [{
    type: String
  }] // for now embedding email Ids
})

const Department = mongoose.model('departments', departmentSchema);

module.exports = Department;
