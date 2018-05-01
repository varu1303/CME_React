const City = require('./../database/model/city');
const State = require('./../database/model/state');
const Country = require('./../database/model/country');
module.exports = {

  addCityIfNeeded: city => {
    return new Promise((resolve, reject) => {
      City.findOne({name: city})
        .then(ci=> {
          if (!ci) {
            const c = new City({
              name: city
            });
            return c.save()
          }else {
            return(ci);
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })  
    })

  }, 
  addStateIfNeeded: state => {
    return new Promise((resolve, reject) => {
      State.findOne({name: state})
        .then(st=> {
          if (!st) {
            const s = new State({
              name: state
            });
            return s.save();
          }else {
            return(st);
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        })      
    }) 
  }, 
  addCountryIfNeeded:  cntry => {
    return new Promise((resolve, reject) => {
      Country.findOne({name: cntry})
        .then(cnt => {
          if (!cnt) {
            const cn = new Country({
              name: cntry
            });
            return cn.save();
          }else {
            return(cnt);
          }
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          reject(error);
        }) 
    })

  },

  allCities: () => {
    return City.find();
  }, 
  allStates: () => {
    return State.find();
  }, 
  allCountries: () => {
    return Country.find();
  }
}