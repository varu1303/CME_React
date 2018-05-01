const express = require('express')
const router = express.Router();

const responseObj = require('./../config/response');

const { isLoggedIn, isOAorSA, ifSAandDEP } = require('./middlewares/tokenVerification');
const { addDepartment, getAllDeps, getDep } = require('./../controller/depCtrl');
const { signUpDepAdmin } = require('./../controller/userCtrl');

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('HITTING OA related api');
//   next();
// });

// (1) Add new Department to an organinsation
// (2) Delete a department - deletes DA as well.

router.post('/newDep', isLoggedIn, isOAorSA, ifSAandDEP, (req, res) => {
  const DEP = req.body;
  const name = DEP.name;
  const emailId = DEP.emailId;
  const phoneNumber = DEP.phoneNumber;
  const orgName = DEP.orgName;
  let orgId;
  if (req.token.fromORG) {
    // if OA - it will be available in token
    orgId = req.token.fromORG;
  }else {
    // if SA, we will include it in request body
    orgId = DEP.orgId;
  }
  addDepartment(name, emailId, phoneNumber, orgId, orgName)
    .then(dep => {
      res.json(responseObj(false, 'Departement added to DB and ORG', dep));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Error while adding new Dep', error));
    })
})

router.post('/aDA', isLoggedIn, isOAorSA, ifSAandDEP, (req, res) => {
  const USER = req.body;
  const firstName = USER.firstName;
  const lastName = USER.lastName;
  const emailId = USER.emailId;
  const password = USER.password;
  let fromORG;
  if (req.token.fromORG) {
    fromORG = req.token.fromORG;
  }else {
    fromORG = USER.orgId;
  }
  const fromDEP = USER.fromDEP;

  signUpDepAdmin(emailId, password, firstName, lastName, fromORG, fromDEP)
    .then(user => {
      res.json(responseObj(false, 'Department Admin registered', user));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Server error while saving OA', error));
    })
})

// router.get('/oneOrg/:id', isLoggedIn, isOAorSA, (req, res) => {
//   const orgId = req.params.id;

//   getOrg(orgId)
//     .then(data => {
//       if (data) {
//         res.json(responseObj(false, 'Organisation found', data));
//       }else {
//         res.status(404).json(responseObj(true, 'Organisation not in DB', null))
//       }
//     })
//     .catch(error => {
//         res.status(500).json(responseObj(true, 'Error in getting Organisation', null));
//     })
// })

// router.get('/allDeps', isLoggedIn, isOAorSA, (req, res) => {

//   getAllDeps()
//     .then(data => {
//       res.json(responseObj(false, 'All Departments', data));
//     })
//     .catch(error => {
//         res.status(500).json(responseObj(true, 'Error in getting all Departments', null));
//     })
// })


module.exports = router;