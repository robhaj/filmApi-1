app.controller("LibraryController", ["$scope", "movieFactory", "$rootScope", function($scope, movieFactory, $rootScope) {
  $scope.movie = {};

  // $scope.isLoggedIn = function() {
  //       $http.get('/api/users')
  //         .success(function(data) {
  //           console.log(data);
  //           $rootScope.loggedIn = data;
  //           if (data) return true
  //           return false;
  //         })
  //         .error(function(data) {
  //           console.log('error: ' + data);
  //           return false
  //         });
  //     };

  $scope.retrieveEmail = function() {
    movieFactory.getUser(id)
    .success(function(data){
      console.log(data);
    });
  };

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
     movieFactory.postL($scope.movie)
      .success(function(){
        movieFactory.similarRequest($scope.movie.movie_id)
          .success(function(response) {
            for (var i = 0; i < response.results.length; i++) {
              $scope.recommendedMovie = {
                title: response.results[i]["original_title"],
                genres: response.results[i]["genre_ids"][0],
                image: 'http://image.tmdb.org/t/p/w500/'+response.results[i]["poster_path"],
                year: response.results[i]["release_date"],
                plot: response.results[i]["overview"],
                rated: response.results[i]["vote_average"],
                imdbRating: Number(response.results[i]["vote_average"]),
                movie_id: response.results[i]["id"].toString(),
                watched: Boolean,
                userRating: Number,
                userReview: String,
                recommendedBy: $scope.movie.title
              };
              console.log($scope.recommendedMovie.image);
              movieFactory.postR($scope.recommendedMovie)
              .success(function(){
                console.log('movie added to R');
              })
            .error(function(){
              console.log('error');
            });
          }
        });
      });
    };


   $scope.addMovieToRecommend = function() {
     movieFactory.postR($scope.movie)
     .success(function(){
       console.log('Added to Recommended');
     }).error(function(data){
       console.log(error);
     });
   };

  $scope.showLibrary = function () {
    movieFactory.getL()
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
    movieFactory.deleteL(movie)
    .success(function(){
      movieFactory.deleteR(movie.title)
      console.log('Deleted');
    })
    .error(function(data) {
      console.log(error);
    });
  };


}]);
