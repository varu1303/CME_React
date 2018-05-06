const Organisation = require('./../database/model/organisation');
const { newOrganisation, removeOrganisation } = require('./../database/queries/orgQuery');
const { removeDepartments, removeEventOfEachDepartment } = require('./../database/queries/depQuery');
const { removeOA, removeDA } = require('./../database/queries/userQuery');

module.exports = {
  saveOrg: org => {
    return newOrganisation(org);
  },

  getAllOrgs: () => {
    return Organisation.find();
  },

  getOrg: id => {
    return Organisation.findById(id).populate('departments');
  },

  getOrgName: id => {
    return Organisation.findById(id)
  },

  removeOrg: orgId => {
    return new Promise((resolve, reject) => {
      let depToDelete = [];
      removeOrganisation(orgId)
        .then(org => {
          let DAdeletes = [];
          let eventDeletes = [];
          org.departments.forEach(depId => {
            eventDeletes.push(removeEventOfEachDepartment(depId));
            DAdeletes.push(removeDA(depId));
            depToDelete.push(depId);
          })
          let cleanUp = DAdeletes.concat(eventDeletes);
          return Promise.all(cleanUp);
        })
        .then(data => {
          console.log('Going for department deletion');
          let depDelete = [];
          depToDelete.forEach(id => {
            console.log('ID of DEP', id);
            depDelete.push(removeDepartments(id));
          })
          return Promise.all(depDelete);
        })
        .then(data => {
          return removeOA(orgId);
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          console.log('ERROR', error);
          reject(error);
        })
    })

  }
}