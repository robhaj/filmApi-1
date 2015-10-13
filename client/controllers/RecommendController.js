app.controller("RecommendController", ["$scope", "$window", "$http", "movieFactory", function($scope, $window, $http, movieFactory) {
  $scope.userTitles = [];
  $scope.similarMovieData = [];
  $scope.allSimilarObjects = [];
  $scope.movie = {};

  angular.element(document).ready(function(){
    movieFactory.getL()
    .success(function(response){
      $scope.userLibrary = response.library;
      console.log($scope.userLibrary);
      for (var i = 0; i < $scope.userLibrary.length; i++) {
        $scope.userTitles.push($scope.userLibrary[i].movie_id);
      }
      for (var l = 0; l < $scope.userTitles.length; l++) {
        movieFactory.similarRequest($scope.userTitles[l])
        .success(function(response){
          for (var k = 0; k < 10; k++) {
            $scope.allSimilarObjects.push(response.results[k]);
          }
        });
      }
    }
  );
});

$scope.addMovieToLibrary = function() {
   var data = this.movie
   console.log(data);
   $scope.movie = {
     title: data["original_title"],
     genres: data["genre_ids"][0],
     image: 'http://image.tmdb.org/t/p/w500/'+data["poster_path"],
     year: data["release_date"],
     plot: data["overview"],
     rated: data["vote_average"],
     imdbRating: Number(data["vote_average"]),
     movie_id: data["id"],
     watched: Boolean,
     userRating: Number,
     userReview: String,
   };
   console.log($scope.movie)
   movieFactory.postL($scope.movie)
    .success(function(){
     console.log('Added');
    })
   .error(function(data) {
     console.log(error);
   });
 };

$scope.addMovieToWatch = function() {
  var data = this.movie
  console.log(data);
  $scope.movie = {
    title: data["original_title"],
    genres: data["genre_ids"][0],
    image: 'http://image.tmdb.org/t/p/w500/'+data["poster_path"],
    year: data["release_date"],
    plot: data["overview"],
    rated: data["vote_average"],
    imdbRating: Number(data["vote_average"]),
    movie_id: data["id"],
    watched: Boolean,
    userRating: Number,
    userReview: String,
  };
  console.log($scope.movie)
  movieFactory.postW($scope.movie)
   .success(function(){
    console.log('Added');
   })
  .error(function(data) {
    console.log(error);
  });
};



$scope.redirectAuth = function(){
  console.log('test');
  $location.path('/auth/google');
};

}]);
