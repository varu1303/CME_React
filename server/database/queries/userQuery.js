const User = require('./../model/user');

module.exports = {

  saveUser: (emailId, password, firstName, lastName, role, fromORG, fromDEP) => {
    const user = new User({
          emailId,
          password,
          firstName,
          lastName,
          role: role,
          fromORG: fromORG,
          fromDEP: fromDEP
    });

    return user.save();
  },

  findUserByEmail: emailId => {
    return User.findOne({emailId: emailId});
  },

  removeOA: orgId => {
    return new Promise((resolve, reject) => {
      User.remove({ fromORG: orgId })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  removeDA: depId => {
    return new Promise((resolve, reject) => {
      console.log('Removing user', depId);
      User.remove({ fromDEP: depId })
        .then(data => {
          console.log('USer resolved');
          resolve(data);
        })
        .catch(error => {
          console.log('USer reject');
          reject(error);
        })
    })
  }
}