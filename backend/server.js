// BASE SETUP PACKAGES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config');
var path = require('path');

// APP CONFIGURATION
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
    Authorization');
    next();
});

app.use(morgan('dev'));

mongoose.connect(config.database);

app.use(express.static(__dirname + '../frontend'))

var apiRoutes = require('./routes/api')(app, express);
app.use('/api', apiRoutes)

app.get('*', function(req, res){
  res.sendFile(path.join('/frontend/fontgen.html'))
});

// START THE SERVER
app.listen(config.port);
console.log('Listening on port ' + config.port);
