//Recommended Calls
app.factory("recommendedFactory", ["$http", function($http){
  var object = {};
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
