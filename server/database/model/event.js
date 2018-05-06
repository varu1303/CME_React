const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  orgId: {
    type: String,
    required: true
  },
  depId: {
    type: String,
    required: true
  },
  organisationName: {
    type: String,
    required: true
  },
  address: {
    institute: {
      type: String
    },
    area: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  departmentName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  poc: [{
    name: {
      type: String
    },
    phoneNumber: [{
      type: String
    }],
    emailId: [{
      type: String
    }]
  }],
  credits: {
    type: Number,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  limitedSeats: {
    type: Boolean,
    default: true
  },
  seatCount: {
    type: Number
  },
  timeTable: [{
    startTime: {
      type: String,
      minlength: 4,
      maxlength: 4
    },
    endTime: {
      type: String,
      minlength: 4,
      maxlength: 4
    },
    topic: {
      type: String
    },
    speaker: {
      type: String
    },
    break: {
      type: Boolean
    }
  }],
  }, {
  timestamps: true
  })

const Event = mongoose.model('event', eventSchema);

module.exports = Event;
