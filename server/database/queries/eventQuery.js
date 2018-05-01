const Event = require('./../model/event');

module.exports = {
  findAndRemoveEvent: eventId => {
    console.log('wtf');
    return Event.findByIdAndRemove(eventId);
  }
}