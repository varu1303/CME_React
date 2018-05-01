// Models
const { saveUser, findUserByEmail } = require('./../database/queries/userQuery');

// Utils
const { hash, verifyPassword } = require('./utils/bcrypt');
const { signToken, verifyToken } = require('./utils/jwt');


module.exports = {

  signUpSuperAdmin: (emailId, password, firstName, lastName) => {
    return new Promise((resolve, reject) => {
      hash(password)
        .then(function(hash) {
          saveUser(emailId, hash, firstName, lastName, 'SA')
              .then(user => {
                // delete user.password;
                resolve(user.tokenFields());
              })
              .catch(error => {
                reject(error);
              })
        })
        .catch(error => {
          reject(error);
        })
    });
  },

  loginUser: (emailId, password) => {
    return new Promise((resolve, reject) => {
      findUserByEmail(emailId)
        .then(user => {
          if (!user) {
            reject(404);
          }else {
            verifyPassword(password, user.password)
              .then(function(res) {
                if (res) {
                  resolve(signToken(user.tokenFields()));
                }else {
                  reject(401);
                }
              })
              .catch(error => {
                reject(error);
              })
          }
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  signUpOrgAdmin: (emailId, password, firstName, lastName, fromORG) => {
    return new Promise((resolve, reject) => {
      hash(password)
        .then(function(hash) {
          saveUser(emailId, hash, firstName, lastName, 'OA', fromORG)
              .then(user => {
                // delete user.password;
                resolve(user.tokenFields());
              })
              .catch(error => {
                reject(error);
              })
        })
        .catch(error => {
          reject(error);
        })
    })
  },

  signUpDepAdmin: (emailId, password, firstName, lastName, fromORG, fromDEP) => {
    return new Promise((resolve, reject) => {
      hash(password)
        .then(function(hash) {
          saveUser(emailId, hash, firstName, lastName, 'DA', fromORG, fromDEP)
              .then(user => {
                // delete user.password;
                resolve(user.tokenFields());
              })
              .catch(error => {
                reject(error);
              })
        })
        .catch(error => {
          reject(error);
        })
    })   
  },

  signUpUser: (emailId, password, firstName, lastName) => {
    return new Promise((resolve, reject) => {
      hash(password)
        .then(function(hash) {
          saveUser(emailId, hash, firstName, lastName, 'US')
              .then(user => {
                // delete user.password;
                resolve(user.tokenFields());
              })
              .catch(error => {
                reject(error);
              })
        })
        .catch(error => {
          reject(error);
        })
    })   
  }
}