app.factory("watchlistFactory", ["$http", function($http){
  var object = {};
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
  return object;
}]);
