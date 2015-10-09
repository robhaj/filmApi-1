// *** main dependencies *** //
require("./routes/api.js");
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



// *** routes *** //
var apiRoutes = require('./routes/api.js');

mongoose.connect("mongodb://localhost/movie-database");

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      console.log(profile);
      return done(null, profile);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// *** express instance *** //
var app = express();


// *** view engine *** //
app.set('view engine', 'html');


// *** static directory *** //

// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/')));


app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.me' }));

app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect : '/#/library',
                    failureRedirect : '/login' }));

// *** main routes *** //
app.use('/api/', apiRoutes);
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});


// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) { return next(); }
//   res.redirect('/login');
// }

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // *** error handlers *** //
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;
