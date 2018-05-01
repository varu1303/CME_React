var bcrypt = require('bcryptjs');
const saltRounds = 13;

module.exports = {
  hash: (password) => {
    return bcrypt.hash(password, saltRounds)
  },

  verifyPassword: (myPlaintextPassword, hash) => {
    return bcrypt.compare(myPlaintextPassword, hash);
  }
}
