app.controller("WatchlistController", ["$scope", "watchlistFactory", "searchFactory", function($scope, watchlistFactory, searchFactory) {

  $scope.movie = {};

  $scope.searchMovies = function() {
    searchFactory.searchRequest($scope.search)
    .success(function(data){
      $scope.movie = searchFactory.createMovie(data);
    })
    .error(function(error){
      console.log(error);
    });
  };

  $scope.addMovieToWatch = function() {
    watchlistFactory.postW($scope.movie)
    .success(function(){
      console.log('Added');
    })
    .error(function(data) {
      console.log(error);
    });
  };

  $scope.showWatch = function () {
    watchlistFactory.getW()
    .success(function(response){
      $scope.movieWatchList = response.watchList;
    })
    .error(function(error){
      console.log(error);
    });
  };

  $scope.showWatch();

  $scope.deleteMovie = function () {
    var movie = this.movie;

    watchlistFactory.deleteW(movie)
    .success(function(){
      console.log('Deleted');
    })
    .error(function(data) {
      console.log(error);
    });
  };
}]);
