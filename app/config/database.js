var mongoose = require('mongoose');

var db = mongoose.connection;

var env = require('./environment.js');

var SAFE_TITLE = env.localEnvVars.SAFE_TITLE;

var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost/' + SAFE_TITLE;


// connect to db
mongoose.connect(dbUri);


// export the connection
module.exports = mongoose;
