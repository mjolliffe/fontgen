var express = require('express'),
    router = express.Router();

// Require fishes controller
var  UsersCtrl  = require('../controllers/users');


//||||||||||||||||||||||||||--
// USERS CRUD SERVICES
//||||||||||||||||||||||||||--
router.post('/login',       UsersCtrl.userAuth);
router.get('/users',        UsersCtrl.usersAll);
router.post('/users',       UsersCtrl.userCreate);
router.get('/users/fonts',  UsersCtrl.tokenVerify, UsersCtrl.getFonts);
router.get('/users/:id',    UsersCtrl.tokenVerify, UsersCtrl.userShow);
router.put('/users',        UsersCtrl.tokenVerify, UsersCtrl.userUpdate);
router.delete('/users',     UsersCtrl.tokenVerify, UsersCtrl.userDelete);

module.exports = router;
