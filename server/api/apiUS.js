const express = require('express');
const router = express.Router();

const { isLoggedIn, isUS } = require('./middlewares/tokenVerification');
const { addSub } = require('./../controller/depCtrl');
const { signUpUser } = require('./../controller/userCtrl');
const responseObj = require('./../config/response');

router.post('/signup', (req, res) => {
  const SA = req.body;
  const emailId = SA.emailId;
  const password = SA.password;
  const firstName = SA.firstName;
  const lastName = SA.lastName;

  signUpUser(emailId, password, firstName, lastName)
    .then(user => {
      res.json(responseObj(false, 'User Registered', null));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'User could not be Registered', error));
    })

})

router.post('/sub', isLoggedIn, isUS, (req, res) => {
  addSub(req.token.emailId, req.body.depId)
    .then(data => {
      res.json(responseObj(false, 'Subscribed', null));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Could not be subscribed', error));
    })
})

module.exports = router;
