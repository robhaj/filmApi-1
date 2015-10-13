var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose-q')(require('mongoose'));
var passport = require('passport');
var google = require('../auth/auth');
var User = require('../models/users.js').User;

router.get('/auth/google',
passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.email' }));

router.get('/auth/google/callback',
passport.authenticate('google', { successRedirect : '/#/library',
failureRedirect : '/#/recommend' }));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/#/watchlist');
});

module.exports = router;
