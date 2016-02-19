var User    = require('../models/user'),
    bcrypt  = require('bcrypt-nodejs')
    jwt     = require('jsonwebtoken'),
    env     = require('../config/environment'),
    secret  = env.secret;

///AUTHENTICATE USER

var userAuth = function(req, res, next){
  User.findOne({
      email: req.body.email
    }).select('name email password').exec(function(err, user){
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
            email: user.email,
            _id: user._id
          }, secret, {
            expiresInMinutes: 43200 //expires in 30 days
          });

          res.json({
            success: true,
            message: 'Yay a token!',
            token: token,
            user: user
          });
        }
      }
  });
};

///VERIFY TOKEN

var tokenVerify = function(req, res, next){
  console.log('Coming to the app!')

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if(token){
    jwt.verify(token, secret, function(err, decoded){
      if(err) {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
};

///CREATE USER

var userCreate = function(req, res){
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

   console.log(user.name + user.email + user.password);

  // save the user and check for errors
  user.save(function(err) {
    if (err) {
        // duplicate entry
      if (err.code == 11000)
        return res.json({ success: false, message: err});
      else
        return res.send(err);
    }
    res.json({ message: 'User created!' });
  });
};

///GET USER

var userShow = function(req, res){
  User.findById(req.params.user_id, function(err, user){
      if(err) res.send(err);
      res.json(user);
  });
}

///GET USERS

var usersAll = function(req, res){
  User.find({}, function(err, users){
    if(err) res.send(err);
    res.json(users);
  });
}

///UPDATE USER

var userUpdate = function(req, res){
  console.log('getting to server')
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, secret, function(err, decoded) {
    User.findById(req.params.user_id, function(err, user){
        if(err) res.send(err);
        if (req.body.name)      user.name     = req.body.name;
        if (req.body.email)     user.email    = req.body.email;
        if (req.body.password)  user.password = req.body.password;
        if (req.body.fonts)     user.fonts    = req.body.fonts;
        user.save(function(err){
          if (err) res.send(err);
          res.json({message: 'User updated!'})
        });
    });
  });
}

///DELETE USER

var userDelete = function(req, res){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, secret, function(err, decoded) {
    User.remove({
      _id: decoded._id
      }, function(err, user){
        if(err) return res.send(err)
        res.json({message:'User deleted!'});
    });
  });
}

///EXPORT MODULE
module.exports = {
  userAuth:     userAuth,
  tokenVerify:  tokenVerify,
  userCreate:   userCreate,
  userShow:     userShow,
  usersAll:     usersAll,
  userUpdate:   userUpdate,
  userDelete:   userDelete
};

