const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Organisation = require('./organisation');
const Department = require('./department');
// SA - Super admin, will register and monitor organisations
// OA - Admin for an Organisation, responsible for managing departments and appointing Admins
// DA - Will manage a particular Department
// US - User, will VIEW the events

const userSchema = new Schema({
  firstName: {  // first and last name will be cumpolsary for a US's registeration. Taken care in api.
    type: String
  },
  lastName: {
    type: String
  },
  fromORG: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'organisation'
  },
  fromDEP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'departments'
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {  // role - SA (for CA only), OA (for Organisation's Admin), DA (Department Admin), US (user)
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    minlength: 2,
    maxlength: 2
  }
});

userSchema.methods.tokenFields = function () {
  return ({ emailId: this.emailId, role: this.role, lastName: this.lastName, fromORG: this.fromORG, fromDEP: this.fromDEP });
};

const User = mongoose.model('user', userSchema);

module.exports = User;
