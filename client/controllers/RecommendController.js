app.controller("RecommendController", ["$scope", "$window", "$http", "movieFactory", function($scope, $window, $http, movieFactory) {
  $scope.similarTitles = [];
  $scope.similarMovieData = [];
  $scope.allSimilarObjects = [];


  $scope.searchSimilar = function () {
    movieFactory.get()
    .success(function(response){
      $scope.userLibrary = response.library;
      for (var i = 0; i < $scope.userLibrary.length; i++) {

        $scope.similarTitles.push($scope.userLibrary[i].title);
      }

      for (var l = 0; l < $scope.similarTitles.length; l++) {

        movieFactory.searchRequest($scope.similarTitles[l])
        .success(function(data){

        for (k=0; k < data[0].similarMovies.length; k++){
          $scope.similarMovieData.push(data[0].similarMovies[k].name);
        }
        console.log($scope.similarMovieData);

  });
  for (var j = 0; j < $scope.similarMovieData.length; j++){
    movieFactory.searchRequest($scope.similarMovieData[j])
    .success(function(data){
      $scope.allSimilarObjects.push(data[0]);
      console.log($scope.allSimilarObjects);

    })
    .error(function(error){
      console.log(error);
});

}
}
}
);
};

    $scope.redirectAuth = function(){
      console.log('test');
      $location.path('/auth/google');
    };

  }]);
