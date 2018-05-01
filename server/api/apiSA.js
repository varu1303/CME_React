const express = require('express')
const router = express.Router();

const responseObj = require('./../config/response');
// Middlewares
const checkEmail = require('./middlewares/checkEmailForSA');
const { isLoggedIn, isSA } = require('./middlewares/tokenVerification');

// Controller methods
const { signUpSuperAdmin, signUpOrgAdmin } = require('./../controller/userCtrl');
const { saveOrg, removeOrg, getAllOrgs, getOrg } = require('./../controller/orgCtrl');
const { removeDep } = require('./../controller/depCtrl');
const { removeEvent } = require('./../controller/eventCtrl');


// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('HITTING SA related api');
//   next();
// });

// (1) SIGN UP | data - null
// (2) REGISTER AN ORGANIZATION | data - organisation's details
// (3) REGISTER ADMIN FOR ORGANIZATION | data - OA's details
// (4) DELETE AN ORGANIZATION - Creates domino effect and removes the OA and all the DA's as well.


router.post('/signup', checkEmail, (req, res) => {
  const SA = req.body;
  const emailId = SA.emailId;
  const password = SA.password;
  const firstName = SA.firstName;
  const lastName = SA.lastName;

  signUpSuperAdmin(emailId, password, firstName, lastName)
    .then(user => {
      res.json(responseObj(false, 'Super Admin Registered', null));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Super Admin could not be Registered', error));
    })

})


router.post('/neworg', isLoggedIn, isSA, (req, res) => {
  const ORG = req.body;
  saveOrg(ORG)
    .then(org => {
      res.json(responseObj(false, 'Organisation saved', org));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Server error while saving organisation', error));
    })
})

router.post('/newOA', isLoggedIn, isSA, (req, res) => {
  const OA = req.body;
  const emailId = OA.emailId;
  const password = OA.password;
  const firstName = OA.firstName;
  const lastName = OA.lastName;
  const fromORG = OA.fromORG;

  signUpOrgAdmin(emailId, password, firstName, lastName, fromORG)
    .then(user => {
      res.json(responseObj(false, 'Organisation Admin registered', user));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Server error while saving OA', error));
    })
})

router.delete('/remorg', isLoggedIn, isSA, (req, res) => {
  const orgId = req.body.orgId;

  removeOrg(orgId)
    .then(data => {
      res.json(responseObj(false, 'Organisation deleted', null));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Organisation could not be deleted', error));
    })
})

router.delete('/remdep', isLoggedIn, isSA, (req, res) => {
  const orgId = req.body.orgId;
  const depId = req.body.depId;

  removeDep(orgId, depId)
    .then(data => {
      res.json(responseObj(false, 'Department deleted', null));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Department could not be deleted', error));
    })
})

router.delete('/remevent', isLoggedIn, isSA, (req, res) => {
  const depId = req.body.depId;
  const eventId = req.body.eventId;

  removeEvent(eventId, depId)
    .then(data => {
      res.json(responseObj(false, 'Event deleted', null));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'event could not be deleted', error));
    })
})

// router.get('/allOrgs', isLoggedIn, isSA, (req, res) => {

//   getAllOrgs()
//     .then(data => {
//       res.json(responseObj(false, 'All Organisations', data));
//     })
//     .catch(error => {
//         res.status(500).json(responseObj(true, 'Error in getting all organisations', null));
//     })
// })


module.exports = router;