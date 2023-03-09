var express = require('express');
var router = express.Router();
const passport = require('passport');


// import controller
const User = require('../controller/user');

router.post('/register',  User.register);
router.post('/login',  User.login);
router.post('/profile', passport.authenticate('jwt', { session: false }),  User.profile);

router.post('/remove',  User.remove);
router.post('/update',  User.update);
router.post('/allUser',  User.getAllUser);

module.exports = router;


