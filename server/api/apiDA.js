const express = require('express')
const router = express.Router()

const { isLoggedIn, isDAorOAorSA, ifSAorOAandEVENT } = require('./middlewares/tokenVerification');
const { saveEvent } = require('./../controller/eventCtrl');
const { addCityIfNeeded, addStateIfNeeded, addCountryIfNeeded } = require('./../controller/demoCtrl');
const responseObj = require('./../config/response');

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('HITTING DA related api');
//   next();
// });

router.post('/newEvent', isLoggedIn, isDAorOAorSA, ifSAorOAandEVENT, (req, res) => {
  const Event = req.body;
  const organisationName = Event.organisationName;
  const address = Event.address;
  //
  const city = address.city;
  const state = address.state;
  const country = address.country;
  //
  const departmentName = Event.departmentName;
  const title = Event.title;
  const fromDate = Event.fromDate;
  const toDate = Event.toDate;
  let orgId;
  let depId;
  if (req.token.fromORG) {
    orgId = req.token.fromORG;
  }else {
    orgId = Event.orgId;
  }
  if (req.token.fromDEP) {
    depId = req.token.fromDEP;
  }else {
    depId = Event.depId;
  }
  const poc = Event.poc;
  const credits = Event.credits;
  const fees = Event.fees;
  const limitedSeats = Event.limitedSeats;
  const seatCount = Event.seatCount;
  const timeTable = Event.timeTable;

  console.log('HERE WE ARE');

  let E;

  saveEvent(orgId, depId, organisationName, address, departmentName, title, fromDate, toDate, poc, credits, fees,
            limitedSeats, seatCount, timeTable)
      .then(event => {
        E = event;
        console.log('Event made it, going for cities');
        return Promise.all([addCityIfNeeded(city), addStateIfNeeded(state), addCountryIfNeeded(country)]);
      })
      .then(data => {
        res.json(responseObj(false, 'Event saved', E));
      })
      .catch(error => {
        res.status(500).json(responseObj(true, 'Error while saving Event', error));
      })
})

// router.get('/oneDep/:id', isLoggedIn, isDAorOAorSA, (req, res) => {
//   const depId = req.params.id;

//   getDep(depId)
//     .then(data => {
//       if (data) {
//         res.json(responseObj(false, 'Department found', data));
//       }else {
//         res.status(404).json(responseObj(true, 'Department not in DB', null))
//       }
//     })
//     .catch(error => {
//         res.status(500).json(responseObj(true, 'Error in getting Department', null));
//     })
// })


module.exports = router;