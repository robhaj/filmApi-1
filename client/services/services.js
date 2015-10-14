app.factory("movieFactory", ["$http", function($http) {

  var object = {};
  tmdbKey = '3b129aca94a2990ebc97bcc866f6d689';

  object.searchRequest = function(title) {
    return $http.jsonp('http://api.themoviedb.org/3/search/movie?query='+title+'&api_key='+tmdbKey+'&callback=JSON_CALLBACK');
  };

  object.similarRequest = function(id) {
    return $http.jsonp('http://api.themoviedb.org/3/movie/'+id+'/similar?api_key='+tmdbKey+'&callback=JSON_CALLBACK');
  };

  //Library Calls

  object.getL = function() {
    return $http.get('/api/movies');
  };

  object.postL = function(movie) {
    return $http.post('/api/movies', movie);
  };

  object.deleteL = function(movie) {
    return $http.delete('/api/movies/' +movie._id);
  };

  //Watchlist Calls

  object.getW = function() {
    return $http.get('/api/watchlist');
  };

  object.postW = function(movie) {
    console.log(movie);
    return $http.post('/api/watchlist', movie);
  };

  object.deleteW = function(movie) {
    return $http.delete('/api/watchlist/' +movie._id);
  };

  //Recommended Calls

  object.getR = function() {
    return $http.get('/api/recommend');
  };
  object.postR = function(movie) {
    return $http.post('/api/recommend', movie);
  };
  object.deleteR = function(movieTitle) {
    return $http.delete('/api/recommend/' + movieTitle);
  };
  return object;
}]);
