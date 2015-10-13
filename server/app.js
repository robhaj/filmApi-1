// *** main dependencies *** //
  require("./routes/api.js");
  require("./routes/user.js");
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
var userRoutes = require('./routes/user.js');

mongoose.connect("mongodb://localhost/movie-database");

// *** express instance *** //
var app = express();

// *** view engine *** //
app.set('view engine', 'html');

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
app.use('/user/', userRoutes);
app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});



//auth check function
exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
  res.json("Authenticated");
  return next(); }
  res.redirect('/#/recommend');
};


module.exports = app;
