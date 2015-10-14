var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Movie = require('../models/users.js').Movie;
var User = require('../models/users.js').User;

//Post new user
router.post('/', function (req, res, next) {
  console.log('test');
  var newUser = new User ({
    email: 'hajekd@gmail.com',
    library: ['a','b','c'],
    watchList: ['a','b','c'],
    recommendations: ['a','b','c']
  });
  newUser.saveQ()
  .then(function (result) { res.json(newUser);})
  .catch(function (err) { res.send(err); })
  .done();
});

router.get('/:id', function (req, res, next ){
  res.json(req.session);
});

router.get('/users', function(req, res, next) {
  console.log('test');
  User.findQ()
  .then(function (result) { res.json(result);})
  .catch(function (err) {res.send(err); })
  .done();
});

module.exports = router;
