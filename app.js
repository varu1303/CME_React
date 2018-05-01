const express = require('express');
const app = express();

var bodyParser = require('body-parser');

// Mongo Setup!
const mongoConnect = require('./server/database/mongoConnect');

//API endpoints
const common = require('./server/api/base');
const sa = require('./server/api/apiSA');
const oa = require('./server/api/apiOA');
const da = require('./server/api/apiDA');
const us = require('./server/api/apiUS');

// All the static files to be used at client side will be looked up relative to below path
app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json());
// using routes
common(app);
app.use('/sa', sa);
app.use('/oa', oa);
app.use('/da', da);
app.use('/us', us);


// Sending Index.html to client side on every route - React will take care of the routing at the client end
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

mongoConnect
  .then(
    () => { 
      app.listen(3000, () => {
        console.log('Listening to port 3000');
      })
    },
    err => { 
      console.log('ERROR_IN_CONNECTING_TO_MONGO', err);
    }
  );
