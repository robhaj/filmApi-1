app.controller("LibraryController", ["$scope", "movieFactory", function($scope, movieFactory) {

  $scope.movie = {};

  $scope.searchMovies = function() {
    movieFactory.searchRequest($scope.search)
    .success(function(data){
      $scope.movie = {
            title: data[0].title,
            genres: data[0].genres,
            image: data[0].urlPoster,
            year: data[0].year,
            duration: data[0].runtime[0],
            plot: data[0].simplePlot,
            rated: data[0].rated,
            imdbRating: data[0].rating,
            watched: Boolean,
            userRating: Number,
            userReview: String,
            dateWatched: { type: Date, default: Date.now }
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
      console.log('Error: ' + data);
    });
  };

}]);
