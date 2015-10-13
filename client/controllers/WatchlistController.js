app.controller("WatchlistController", ["$scope", "movieFactory", function($scope, movieFactory) {

  $scope.movie = {};

  $scope.searchMovies = function() {
    movieFactory.searchRequest($scope.search)
    .success(function(data){
      $scope.movie = {
        title: data["results"][0]["original_title"],
        genres: data["results"][0]["genre_ids"][0],
        image: 'http://image.tmdb.org/t/p/w500/'+data["results"][0]["poster_path"],
        year: data["results"][0]["release_date"],
        plot: data["results"][0]["overview"],
        rated: data["results"][0]["vote_average"],
        imdbRating: Number(data["results"][0]["vote_average"]),
        movie_id: data["results"][0]["id"],
        watched: Boolean,
        userRating: Number,
        userReview: String,
      };
    })
    .error(function(error){
      console.log(error);
    });
  };


  $scope.addMovieToLibrary = function() {
     console.log($scope.movie);
     movieFactory.postW($scope.movie)
      .success(function(){
       console.log('Added');
      })
     .error(function(data) {
       console.log(error);
     });
   };


  $scope.showLibrary = function () {
    movieFactory.getW()
    .success(function(response){
      $scope.movieWatchList = response.watchList;
    })
    .error(function(error){
      console.log(error);
    });
  };

  $scope.showLibrary();

  $scope.deleteMovie = function () {
    var movie = this.movie;
    console.log(movie);
    movieFactory.deleteW(movie)
    .success(function(){
      console.log('Deleted');
    })
    .error(function(data) {
      console.log(error);
    });
  };


}]);
