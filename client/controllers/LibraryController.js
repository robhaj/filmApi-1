app.controller("LibraryController", ["$scope", "movieFactory", function($scope, movieFactory) {

  $scope.movie = {};

  $scope.searchMovies = function() {
    movieFactory.searchRequest($scope.search)
    .success(function(data){
      $scope.movie = {
            title: data[0].title,
            genres: data[0].genres,
            image: data[0].urlPoster,
            year: Number(data[0].year),
            duration: data[0].runtime[0],
            plot: data[0].simplePlot,
            rated: data[0].rated,
            imdbRating: Number(data[0].rating),
            watched: Boolean,
            userRating: Number,
            userReview: String,
          };
          console.log($scope.movie);
        })
    .error(function(error){
      console.log(error);
    });
  };

  $scope.addMovieToLibrary = function() {
    console.log($scope.movie);
    movieFactory.post($scope.movie)
     .success(function(){
      console.log('Added');
     })
    .error(function(data) {
      console.log(error);
    });
  };

  $scope.showLibrary = function () {
    movieFactory.get()
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
    console.log(movie);
    movieFactory.delete(movie)
     .success(function(){
      console.log('Deleted');
     })
    .error(function(data) {
      console.log(error);
    });
  };


}]);
