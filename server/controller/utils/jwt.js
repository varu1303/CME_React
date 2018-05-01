var jwt = require('jsonwebtoken');

const secret = require('./../../config/secret');


module.exports = {
  signToken: data => {
    return jwt.sign({ data: data }, secret);
  },

  verifyToken: token => {
    try {
      var decoded = jwt.verify(token, secret);
      return decoded;
    } catch(err) {
      // err
      return false;
    }
  }
}