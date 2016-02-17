// BASE SETUP PACKAGES
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var port = process.env.PORT || 8000; // set the port for our app
var User = require('./models/user');
var jwt = require('jsonwebtoken');
var secret = 'secretsonsecrets'

mongoose.connect('mongodb://localhost:27017/fontgen');
// APP CONFIGURATION ---------------------
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

// ROUTES FOR OUR API
// basic route for the home page
  app.get('/', function(req, res) {
    res.send('Welcome to the home page!');
  });

  var apiRouter = express.Router();

  apiRouter.post('/authenticate', function(req, res){
    User.findOne({
      username: req.body.username
    }).select('name username email password').exec(function(err, user){
      if (err) throw err;
      if(!user) {
        res.json({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else if (user) {

        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword) {
          res.json({
            success: false,
            message: 'Authentication failed. Incorrect password.'
          });
        } else {
          var token = jwt.sign({
            name: user.name,
            email: user.email,
            username: user.username
          }, secret, {
            expiresInMinutes: 1440
          });

          res.json({
            sucess: true,
            message: 'Yay a token!',
            token: token
          });
        }
      }
    });
  });

  apiRouter.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token']
  })

  apiRouter.use(function(req, res, next) {
    console.log('Somebody just came to our app!');
    next();
  });

  apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
  });

  app.use('/api', apiRouter);

  apiRouter.route('/users')
          .post(function(req, res) {
              var user = new User();
              // set the users information (comes from the request)
              user.name = req.body.name;
              user.username = req.body.username;
              user.password = req.body.password;
              // save the user and check for errors
              user.save(function(err) {
                if (err) {
                    // duplicate entry
                    if (err.code == 11000)
                      return res.json({ success: false, message: 'A user with that username already exists. '});
                    else
                      return res.send(err);
                }
              res.json({ message: 'User created!' });
              });
          })
          .get(function(req, res) {
            User.find(function(err, users) {
              if (err) res.send(err);
              res.json(users);
            });
          });
apiRouter.route('/users/:user_id')
        .get(function(req, res){
          User.findById(req.params.user_id, function(err, user){
              if(err) res.send(err);
              res.json(user);
          });
        })
        .put(function(req, res){
            User.findById(req.params.user_id, function(err, user){
                if(err) res.send(err);
                if (req.body.name) user.name = req.body.name;
                if (req.body.email) user.email = req.body.email;
                if (req.body.username) user.username = req.body.username;
                if (req.body.password) user.password = req.body.password;
                user.save(function(err){
                  if (err) res.send(err);
                  res.json({message: 'User updated!'})
                });
            });
        })
        .delete(function(req, res){
            User.remove({
              _id: req.params.user_id
            }, function(err, user){
                if(err) return res.send(err)
                res.json({message:'User deleted!'});
            });
        });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api

  // app.route('/login')

  //   // show the form (GET http://localhost:1337/login)
  //   .get(function(req, res) {
  //     res.send('this is the login form');
  //   })

  //   // process the form (POST http://localhost:1337/login)
  //   .post(function(req, res) {
  //    console.log('processing');
  //    res.send('processing the login form!');
  //   });

// START THE SERVER
// ===============================
  app.listen(port);
  console.log('Magic happens on port ' + port);
