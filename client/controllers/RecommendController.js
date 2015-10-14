app.controller("RecommendController", ["$scope", "$window", "$http", "movieFactory", function($scope, $window, $http, movieFactory) {

$scope.showRecommended = function () {
  movieFactory.getR()
  .success(function(response){
    $scope.movieRecommends = response.recommendations;
    console.log($scope.movieRecommends);
  })
  .error(function(error){
    console.log(error);
  });
};

$scope.showRecommended();

$scope.addMovieToLibrary = function() {
   var data = this.movie;
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
