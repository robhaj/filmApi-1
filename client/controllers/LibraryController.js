app.controller("LibraryController", ["$scope", "searchFactory", "libraryFactory", "recommendedFactory", function($scope, searchFactory, libraryFactory, recommendedFactory) {
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

  $scope.addMovieToLibrary = function() {
    libraryFactory.postL($scope.movie)
    .success(function(){
      searchFactory.similarRequest($scope.movie.movie_id)
      .success(function(response) {
        for (var i = 0; i < response.results.length; i++) {
          $scope.recommendedMovie = searchFactory.createRecommend(response);
          recommendedFactory.postR($scope.recommendedMovie)
          .success(function(){
          })
          .error(function(){
            console.log('error');
          });
        }
      });
    });
  };

  $scope.showLibrary = function () {
    libraryFactory.getL()
    .success(function(response){
      $scope.movieLibrary = response.library;
    })
    .error(function(error){
      console.log(error);
    });
  };
  $scope.showLibrary();

  $scope.deleteMovie = function () {
    var movie = this.movie;
    libraryFactory.deleteL(movie)
    .success(function(){
      recommendedFactory.deleteR(movie.title);
      console.log('Deleted');
    })
    .error(function(data) {
      console.log(error);
    });
  };
}]);
