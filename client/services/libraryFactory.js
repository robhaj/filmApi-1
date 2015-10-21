app.factory("libraryFactory", ["$http", function($http) {
  var object = {};
  object.getL = function() {
    return $http.get('/api/movies');
  };
  object.postL = function(movie) {
    return $http.post('/api/movies', movie);
  };
  object.deleteL = function(movie) {
    return $http.delete('/api/movies/' +movie._id);
  };
  return object;
}]);
