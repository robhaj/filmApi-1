var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Movie = new Schema ({
  title: String,
  genres: Array,
  image: String,
  year: String,
  plot: String,
  rated: String,
  imdbRating: Number,
  watched: Boolean,
  userRating: Number,
  userReview: String,
  movie_id: String
});

var User = new Schema ({
  email: String,
  library: [{ type : Schema.Types.ObjectId, ref : 'movies'}],
  watchList: [{ type : Schema.Types.ObjectId, ref : 'movies'}],
  recommendations: [{ type : Schema.Types.ObjectId, ref : 'movies'}],
});


var User = mongoose.model('users', User);
var Movie = mongoose.model('movies', Movie);

module.exports = {
  User: User,
  Movie: Movie
};
