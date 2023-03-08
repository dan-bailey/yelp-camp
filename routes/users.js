const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegisterPage)
    .post(catchAsync(users.createNewUser));

router.route('/login')
    .get(users.renderLoginPage)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.authenticateUser);

router.route('/logout')
    .get(users.logoutUser);

module.exports = router;