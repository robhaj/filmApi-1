var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Movie = require('../models/users.js').Movie;
var User = require('../models/users.js').User;
var passport = require('passport');
var ensureAuthenticated = require('../auth/auth.js');

//get user's info

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

// router.delete('/movies', function (req, res, next) {
  // console.log(req.session);
 // var sessionID = (req.session.passport.user._id);
 //  var movieID = "561b1410e11b091d54254851";

 //       User.update(
 //            {_id : sessionID},
 //            { $unset: { 'library' : { _id : movieID }}},
 //            function(err, data){
 //                if(err) return console.log(err);
 //                res.json(data.library);
 //            });
 //    });

// router.delete('/movies', function (req, res, next) {
//  console.log(req.session);
//   var sessionID = "5617e88649352581b7d0e01d";
//   var movieID = "561b1410e11b091d54254851";

//   User.findByIdAndUpdateQ(
//       sessionID,
//       {$pull: {"library": {_id : movieID}}},
//         {new : true},
//         function(err, model) {
//             console.log(err);
//         })
//   .then(function (result) { res.json(result);})
//   .catch(function (err) {
//     console.log(err);
//     res.send(err);
//   })
//  .done();
// });

//   var movieID = "561b2812fb1114cb5a8eeba0";
//   var sessionID= "561b1d542b9323b1f0eb70b2";

//   User.findByIdAndUpdate(
//     sessionID,
//    { $pull: { library : {  id : movieID } } },
//    function(err, data){
//       if(err){
//         console.log(err);
//         return res.send(err);
//         }
//         return res.json(data);
//      });
// });

  //   User.update(sessionID, {$pull: {library: {_id: "561aec7d7639f7933da52d99"}}}, {new: true}, function (err, user) {
  //     if (err) { return res.json(err);
  //     }
  //     res.json(user); // or whatever else you want to send

  //   });
  // });


router.delete('/movies/:id', function(req, res, next) {

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




// //Post new user
// router.post('/users', function (req, res, next) {
//   console.log('test');
//   var newUser = new User ({
//       email: 'hajekdickpics@gmail.com',
//       library: ['a','b','c'],
//       watchList: ['a','b','c'],
//       recommendations: ['a','b','c']
//   });
//   newUser.saveQ()
//   .then(function (result) { res.json(newUser);})
//   .catch(function (err) { res.send(err); })
//   .done();
// });

module.exports = router;
