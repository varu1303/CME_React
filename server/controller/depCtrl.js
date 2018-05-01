const Department = require('./../database/model/department');
const Organisation = require('./../database/model/organisation');

const { newDep, pushSub } = require('./../database/queries/depQuery');
const { insertDepRefInOrg } = require('./../database/queries/orgQuery');
const { removeDA } = require('./../database/queries/userQuery');
const { findAndRemoveEvent } = require('./../database/queries/eventQuery');

module.exports = {
  addDepartment: (name, emailId, phoneNumber, orgId, orgName) => {
    return new Promise((resolve, reject) => {
      newDep(name, emailId, phoneNumber, orgId, orgName)
        .then(department => {
          return insertDepRefInOrg(department._id, orgId);
        })
        .then(organisation => {
          resolve(organisation);
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  getAllDeps: () => {
    return Department.find();
  }, 
  getDep: id => {
    return Department.findById(id).populate('events');
  },

  addEventToDepartment: event => {
    return new Promise((resolve, reject) => {
      console.log(event);
      Department.findById(event.depId)
        .then(dep => {
          if (dep) {
            dep.events.push(event._id);
            return dep.save();
          }else {
            throw {};
          }
        })
        .then(updatedDep => {
          resolve(event);
          updatedDep.subscribed.forEach(emailId => {
            // console.log('Notify emailId ' + emailId + ' about ', event);

          })
        })
        .catch(error => {
          console.log('error', error);
          reject(error);
        })
    })
  },

  removeDep: (orgId, depId) => {
    return new Promise((resolve, reject) => {
      let eventsRemoved = [];
      let department;
      Department.findById(depId)
        .then(dep => {
          department = dep;
          if (dep) {
            dep.events.forEach(eventId => {
              eventsRemoved.push(findAndRemoveEvent(eventId));
            })
            return Promise.all(eventsRemoved);
          }else {
            throw {};
          }
        })
        .then(data => {
          return Organisation.update({_id: orgId}, { $pull: {departments: depId }})
        })
        .then(data => {
          return removeDA(depId);
        })
        .then(data => {
          return department.remove();
        })
        .then(data => {
          resolve(department);
        })
        .catch(error => {
          console.log('Error', error);
          reject(error);
        })
    })
  },

  addSub: (emailId, depId) => {
    return pushSub(depId, emailId)
  }
}