app.controller("SearchController", ["$scope", "$window", "movieFactory", function($scope, $window, movieFactory) {
  $scope.similarTitles = [];
  $scope.similarImages = [];
  $scope.movies = "";

  $scope.searchMovies = function() {
    movieFactory.searchRequest($scope.search)
    .success(function(data){
      $scope.movies = data[0].urlPoster;
      $scope.similarMovies = data[0].similarMovies;
      for (var i = 0; i < $scope.similarMovies.length; i++) {
        $scope.similarTitles.push($scope.similarMovies[i].name);
      }
    })
    .error(function(error){
      console.log(error);
    });
  };

  // $scope.searchSimilar = function() {
  //   for (var i = 0; i < $scope.similarTitles.length; i++) {
  //     movieFactory.searchRequest($scope.similarTitles[i])
  //     .success(function(data){
  //       $scope.similarMovieData = data;
  //       $scope.similarImages.push($scope.similarMovieData[0].urlPoster);
  //     });
  //   }
  // };

  $scope.redirectAuth = function(){
    console.log('test');
    $location.path('/auth/google');
  };



}]);
