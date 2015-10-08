var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Movie = require('../models/users.js').Movie;
var User = require('../models/users.js').User;

router.get('/movies', function(req, res, next) {
  console.log('test');
  Movie.findQ()
    .then(function (result) { res.json(result);})
    .catch(function (err) {res.send(err); })
    .done();
});

router.post('/movies', function (req, res, next) {
  // console.log(req.body);
  var newMovie = new Movie (req.body);
  newMovie.saveQ()
  .then(function (result) {
    res.json(newMovie);
  })
  .catch(function (err) {
    console.log(err)
    res.send(err);
  })
  .done();
});

router.get('/users', function(req, res, next) {
  console.log('test');
  User.findQ()
    .then(function (result) { res.json(result);})
    .catch(function (err) {res.send(err); })
    .done();
});

router.post('/users', function (req, res, next) {
  console.log('test');
  var newUser = new User ({
      email: 'hajekdickpics@gmail.com',
      library: ['a','b','c'],
      watchList: ['a','b','c'],
      recommendations: ['a','b','c']
  });
  newUser.saveQ()
  .then(function (result) { res.json(newUser);})
  .catch(function (err) { res.send(err); })
  .done();
});

module.exports = router;
