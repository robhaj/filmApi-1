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


// *** routes *** //
var apiRoutes = require('./routes/api.js');
var routes = require('./routes/index.js');

mongoose.connect("mongodb://localhost/movie-database");


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


// *** main routes *** //
app.use('/api/', apiRoutes);
app.use('/', routes);
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});


module.exports = app;
