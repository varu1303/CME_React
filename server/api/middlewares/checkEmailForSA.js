const responseObj = require('./../../config/response');

module.exports = (req, res, next) => {
  let emailId = req.body.emailId;

  let SAList = ['varunrana13@gmail.com'];

  if ( SAList.indexOf(emailId) > -1) {
    next();
  } else {
    res.status(403).json(responseObj(true, 'EmailId Not present in SuperAdmin Array', null));
  }
}