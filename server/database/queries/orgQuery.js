const Organisation = require('./../model/organisation');
const Department = require('./../model/department');
const User = require('./../model/user');

module.exports = {
  newOrganisation: org => {
    const organisation = new Organisation ({
      name: org.name,
      address: org.address,
      emailId: org.emailId,
      phoneNumber: org.phoneNumber
    });

    return organisation.save();
  },

  insertDepRefInOrg: (depId, orgId) => {
    return new Promise((resolve, reject) => {
      Organisation.findById(orgId)
        .then(org => {
          org.departments.push(depId);
          return org.save();
        })
        .then(updatedOrg => {
          resolve(updatedOrg);
        })
        .catch(error => {
          // delete the saved department
          Department.findByIdAndRemove(depId)
            .then(data => {
              console.log('SAVED DEP, deleted succesfully on error while referencing from ORG -', orgId);
            })
            .catch(error => {
              console.log('Junk DEP in DB, without any ORG', depId);
            })
          reject(error);
        })
    })
  },

  removeOrganisation: orgId => {
    return new Promise((resolve, reject) => {
      Organisation.findByIdAndRemove(orgId)
        .then(data => {
          console.log('removed', data);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}