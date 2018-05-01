const Department = require('./../model/department');

const { findAndRemoveEvent } = require('./eventQuery');

module.exports = {
  newDep: (name, emailId, phoneNumber, orgId, organisationName) => {
    const dep = new Department({
      name,
      emailId,
      phoneNumber,
      orgId,
      organisationName
    })

    return dep.save();
  },

  removeEventOfEachDepartment: depId => {
    return new Promise((resolve, reject) => {
      let eventCleanup = [];
      Department.findById(depId)
        .then(dep => {
          if (dep) {
            dep.events.forEach(eventId => {
              eventCleanup.push(findAndRemoveEvent(eventId));
            })
          }

          return Promise.all(eventCleanup);
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  removeDepartments: depId => {
    return Department.findByIdAndRemove(depId);
  },

  pushSub: (id, emailId) => {
    return Department.update(
      { _id: id }, 
      { $push: { subscribed: emailId } });
  }
}