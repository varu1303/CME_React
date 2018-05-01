const responseObj = require('./../../config/response');
const { verifyToken } = require('./../../controller/utils/jwt');

module.exports = {
  isLoggedIn: (req, res, next) => {
    const userAgent = req.headers['x-auth'];
     if (userAgent) {
       const tokenData = verifyToken(userAgent);
       if (tokenData) {
        req.token = tokenData.data;
        next();
       }else {
        res.status(403).json(responseObj(true, 'Invaid token', null));
       }

     }else {
       res.status(403).json(responseObj(true, 'Not logged in', null));
     }
  },

  isSA: (req, res, next) => {
    if (req.token.role === 'SA') {
      next();
    }else {
      res.status(403).json(responseObj(true, 'Not authorised, role has to be SA', null));
    }
  },

  isOAorSA: (req, res, next) => {
    if (req.token.role === 'SA' || req.token.role === 'OA') {
      next();
    }else {
      res.status(403).json(responseObj(true, 'Not authorised, role has to be OA or above', null));
    }
  },

  ifSAandDEP: (req, res, next) => {
    if (req.token.role === 'SA') {
      if (!req.body.orgId) {
        res.status(400).json(responseObj(true, 'No Organisation provided for new Department', null));
      }else {
        next();
      }
    }else {
      next();
    }
  },

  isDAorOAorSA: (req, res, next) => {
    if (req.token.role === 'SA' || req.token.role === 'OA' || req.token.role === 'DA') {
      next();
    }else {
      res.status(403).json(responseObj(true, 'Not authorised, role has to be DA or above', null));
    }
  },

  ifSAorOAandEVENT: (req, res, next) => {
    if (req.token.role === 'SA') {
      if (!req.body.depId || !req.body.orgId) {
        res.status(400).json(responseObj(true, 'No Department and Organisation provided', null));
      }else {
        next();
      }
    }else if (req.token.role === 'OA') {
      if (!req.body.depId) {
        res.status(400).json(responseObj(true, 'No Department provided', null));
      }else {
        next();
      }
    }else {
      next();
    }
  },

  isUS: (req, res, next) => {
    if (req.token.role === 'US') {
      next();
    }else {
      res.status(403).json(responseObj(true, 'Not authorised, role has to be US', null));
    }
  }
}