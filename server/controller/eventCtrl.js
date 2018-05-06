const Event = require('./../database/model/event');
const Departement = require('./../database/model/department');
const { addEventToDepartment } = require('./depCtrl');
const { findAndRemoveEvent } = require('./../database/queries/eventQuery');

module.exports = {
  saveEvent: (orgId, depId, organisationName, address, departmentName, title, fromDate, toDate, poc, credits, fees,
              limitedSeats, seatCount, timeTable) => {
    return new Promise((resolve, reject) => {
      const event = new Event({
        orgId,
        depId,
        organisationName,
        address,
        departmentName,
        title,
        fromDate,
        toDate,
        poc,
        credits,
        fees,
        limitedSeats,
        seatCount,
        timeTable
      });
      event.save()
        .then(event => {
          console.log('Event Saved');
          return addEventToDepartment(event);
        })
        .then(data => {
          resolve(event);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
    })
  },

  removeEvent: (eventId, depId) => {
    return new Promise((resolve, reject) => {
      console.log(eventId);
      findAndRemoveEvent(eventId)
        .then(data => {
          resolve(data);
          return Departement.update({_id: depId}, { $pull: {events: eventId }})
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  getEventsOfOrg: orgId => {
    return Event.find({orgId: orgId});
  },

  getAllEvents: () => {
    return Event.find();
  },

  getCityEvents: city => {
    return Event.find({'address.city': city});
  },

  getStateEvents: state => {
    return Event.find({'address.state': state});
  }, 

  getCountryEvents: country => {
    return Event.find({'address.country': country})
  },

  getEvent: id => {
    return Event.findById(id)
  }
}