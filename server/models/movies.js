var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String
});


var User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://localhost/node_api');

// make this available to our users in our Node applications
module.exports = User;
