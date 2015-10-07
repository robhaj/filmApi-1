var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// get ALL users
router.get('/users', function(req, res, next) {
  res.send('test');
});

module.exports = router;
