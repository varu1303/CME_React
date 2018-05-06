const responseObj = require('./../config/response');
const { loginUser, signUpUser } = require('./../controller/userCtrl');
const { allCities, allStates, allCountries } = require('./../controller/demoCtrl');
const { getOrg, getAllOrgs, getOrgName } = require('./../controller/orgCtrl');
const { getDep, getDepName } = require('./../controller/depCtrl');
const { getEventsOfOrg, getAllEvents, getCityEvents, getStateEvents, getCountryEvents, getEvent } = require('./../controller/eventCtrl');

module.exports = app => {
  
// (1) LOG IN and GET THE JWT | data -  token

  app.post('/cme/login', (req, res) => {
    const SA = req.body;
    const emailId = SA.emailId;
    const password = SA.password;

    loginUser(emailId, password)
      .then(token => {
        res.json(responseObj(false, 'Logged in', token));
      })
      .catch(error => {
        if (error === 404) {
          res.status(404).json(responseObj(true, 'Email Id not registered', null));
        }else if (error === 401) {
          res.status(401).json(responseObj(true, 'Incorrect Password', null));
        }else {
          res.status(500).json(responseObj(true, 'Error in logging in', error));
        }
      })
  })

  
  app.post('/cme/signUp', (req, res) => {
    const USER = req.body;
    const firstName = USER.firstName;
    const lastName = USER.lastName;
    const emailId = USER.emailId;
    const password = USER.password;

    signUpUser(emailId, password, firstName, lastName)
      .then(user => {
        res.json(responseObj(false, 'User registered', user));
      })
      .catch(error => {
        res.status(500).json(responseObj(true, 'Server error while registering User', error));
      })
  })

  app.get('/cme/getCities', (req, res) => {
    allCities()
      .then(data => {
        res.json(responseObj(false, 'All cities', data));
      })
      .catch(error => {
          res.status(500).json(responseObj(true, 'Error in getting cities', null));
      })
  })

  app.get('/cme/getStates', (req, res) => {
    allStates()
      .then(data => {
        res.json(responseObj(false, 'All states', data));
      })
      .catch(error => {
          res.status(500).json(responseObj(true, 'Error in getting states', null));
      })
  })

  app.get('/cme/getCountries', (req, res) => {
    allCountries()
      .then(data => {
        res.json(responseObj(false, 'All countries', data));
      })
      .catch(error => {
          res.status(500).json(responseObj(true, 'Error in getting countries', null));
      })
  })



// Get all Organisations
// Get one organisation -> Populated deps already + 1 extra route to get its all events
// get one department specific details -> events already populated
// get all events
// get events based on city, state and country
// get details of one event
// get name of org and dep using their _id

app.get('/cme/allOrgs', (req, res) => {

  getAllOrgs()
    .then(data => {
      res.json(responseObj(false, 'All Organisations', data));
    })
    .catch(error => {
        res.status(500).json(responseObj(true, 'Error in getting all organisations', null));
    })
})


app.get('/cme/oneOrg/:id', (req, res) => {
  const orgId = req.params.id;

  getOrg(orgId)
    .then(data => {
      if (data) {
        res.json(responseObj(false, 'Organisation found', data));
      }else {
        res.status(404).json(responseObj(true, 'Organisation not in DB', null))
      }
    })
    .catch(error => {
        res.status(500).json(responseObj(true, 'Error in getting Organisation', null));
    })
})

app.get('/cme/oneDep/:id', (req, res) => {
  const depId = req.params.id;

  getDep(depId)
    .then(data => {
      if (data) {
        res.json(responseObj(false, 'Department found', data));
      }else {
        res.status(404).json(responseObj(true, 'Department not in DB', null))
      }
    })
    .catch(error => {
        res.status(500).json(responseObj(true, 'Error in getting Department', null));
    })
})

app.get('/cme/getOrgsEvents/:id', (req, res) => {
  const orgId = req.params.id;

  getEventsOfOrg(orgId)
    .then(data => {
      res.json(responseObj(false, 'Events of an Organisation fetched', data));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Events get error', error));
    })
})

app.get('/cme/allEvents', (req, res) => {
  getAllEvents()
    .then(data => {
      res.json(responseObj(false, 'all Events', data));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Events get error', error));
    })   
})

app.get('/cme/cityEvents/:city', (req, res) => {
  let city = req.params.city;
  getCityEvents(city)
    .then(data => {
      res.json(responseObj(false, 'all Events', data));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Events get error', error));
    })   
})

app.get('/cme/stateEvents/:state', (req, res) => {
  let state = req.params.state;
  getStateEvents(state)
    .then(data => {
      res.json(responseObj(false, 'all Events', data));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Events get error', error));
    })   
})

app.get('/cme/countryEvents/:cntry', (req, res) => {
  let country = req.params.cntry;
  getCountryEvents(country)
    .then(data => {
      res.json(responseObj(false, 'all Events', data));
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Events get error', error));
    })   
})

app.get('/cme/event/:eventId', (req, res) => {
  let eventId = req.params.eventId;
  getEvent(eventId)
    .then(data => {
      res.json(responseObj(false, 'Event Fetched', data))
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Error in getting event', error));
    }) 
})

app.get('/cme/nameDep/:id', (req, res) => {
  let depId = req.params.id;
  getDepName(depId)
    .then(data => {
      res.json(responseObj(false, 'Name fetched', data.name))
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Error in getting event', error));
    }) 
})

app.get('/cme/nameOrg/:id', (req, res) => {
  let orgId = req.params.id;
  getOrgName(orgId)
    .then(data => {
      res.json(responseObj(false, 'Name fetched', data.name))
    })
    .catch(error => {
      res.status(500).json(responseObj(true, 'Error in getting event', error));
    }) 
})

}