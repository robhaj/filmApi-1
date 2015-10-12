app.factory("movieFactory", ["$http", function($http) {
  var object = {};

  object.searchRequest = function(title) {
    return $http.jsonp('http://www.myapifilms.com/imdb?title='+title+'&format=JSONP&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=N&exactFilter=0&limit=1&forceYear=0&lang=en-us&actors=N&biography=0&trailer=0&uniqueName=0&filmography=0&bornDied=0&starSign=0&actorActress=0&actorTrivia=0&movieTrivia=0&awards=0&moviePhotos=N&movieVideos=N&token=4457262f-994c-4a3b-9ec0-a98c91bf2cfe&similarMovies=1&adultSearch=0&callback=JSON_CALLBACK', { cache: true});
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

  return object;
}]);
