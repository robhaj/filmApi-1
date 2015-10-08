var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
  email: String,
  library: Array,
  watchList: Array,
  recommendations: Array
});

var Movie = new Schema ({
  title: String,
  genres: Array,
  image: String,
  year: Number,
  duration: String,
  plot: String,
  rated: String,
  imdbRating: Number,
  watched: Boolean,
  userRating: Number,
  userReview: String,
});

var User = mongoose.model('users', User);
var Movie = mongoose.model('movies', Movie);

module.exports = {
  User: User,
  Movie: Movie
};
