var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Movie = require('../models/users.js').Movie;
var User = require('../models/users.js').User;
var passport = require('passport');
var ensureAuthenticated = require('../auth/auth.js');

//get user's movies

router.get('/movies', ensureAuthenticated, function (req, res, next) {
  var sessionID = (req.session.passport.user._id);

  User.findById(sessionID)
  .populate('library')
  .exec(function(err, user){
    if(err){
      res.send(err);
    } else {
      res.json(user);
    }
  });
});


//add movie to user's library

router.post('/movies', ensureAuthenticated, function (req, res, next) {
  console.log(req.session);
  var sessionID = (req.session.passport.user._id);
  var newMovie = new Movie (req.body);

  newMovie.saveQ();

  User.findByIdAndUpdateQ(sessionID,
    {$push: {"library": newMovie}},
    {safe: true, upsert: true, new : true, unique: true})
    .then (function(result) {
      res.json(result);
    })
    .catch(function (err) {
      res.send(err);
    })
    .done();
  });

  //delete movie from user's library

  router.delete('/movies/:id', function(req, res, next) {
    console.log(req.params.id);
    Movie.findByIdAndRemove(req.params.id, function(err, data){
      if(err){
        res.json({'message': err});
      } else {
        res.json(data);
      }
    });
  });


  //get user's watchlist

  router.get('/watchlist', ensureAuthenticated, function (req, res, next) {
    var sessionID = (req.session.passport.user._id);

    User.findById(sessionID)
    .populate('watchList')
    .exec(function(err, user){
      if(err){
        res.send(err);
      } else {
        res.json(user);
      }
    });
  });


  //add movie to user's watchlist

  router.post('/watchlist', ensureAuthenticated, function (req, res, next) {
    console.log(req.session);
    var sessionID = (req.session.passport.user._id);
    var newMovie = new Movie (req.body);

    newMovie.saveQ();

    User.findByIdAndUpdateQ(sessionID,
      {$push: {"watchList": newMovie}},
      {safe: true, upsert: true, new : true, unique: true})
      .then (function(result) {
        res.json(result);
      })
      .catch(function (err) {
        res.send(err);
      })
      .done();
    });


    //delete movie from user's watchlist

    router.delete('/watchlist/:id', function(req, res, next) {
      console.log(req.params.id);
      Movie.findByIdAndRemove(req.params.id, function(err, data){
        if(err){
          res.json({'message': err});
        } else {
          res.json(data);
        }
      });
    });


    //Get all users
    router.get('/users', ensureAuthenticated, function (req, res, next) {
      console.log('test');
      User.findQ()
      .then(function (result) { res.json(result);})
      .catch(function (err) {res.send(err); })
      .done();
    });



    module.exports = router;
