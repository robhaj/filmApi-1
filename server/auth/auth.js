var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/users').User;
var config = require('../config');

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    // res.json("Authenticated");
    return next(); }
    res.redirect('/#/recommend');
  };

  passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      var email = (profile.emails[0].value);
      console.log(email);

      var searchQuery = {
        email : email
      };

      var updates = {
        email : email,
      };

      var options = {
        upsert: true
      };

      User.findOneAndUpdate(searchQuery, updates, options, function(err, user){
        if(err){
          return done(err);
        } else {
          console.log(user);
          return done(null, user);
        }
      });
    });
  }));


  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  module.exports = ensureAuthenticated;
