app.controller("RecommendController", ["$scope", "$window", "$http", "recommendedFactory", function($scope, $window, $http, recommendedFactory) {

$scope.addMovieToRecommend = function() {
  recommendedFactory.postR($scope.movie)
    .success(function(){
      console.log('Added to Recommended');
    })
    .error(function(data){
      console.log(error);
    });
  };

$scope.showRecommended = function () {
  recommendedFactory.getR()
  .success(function(response){
    $scope.movieRecommends = response.recommendations;
  })
  .error(function(error){
    console.log(error);
  });
};

$scope.showRecommended();

$scope.redirectAuth = function(){
  $location.path('/auth/google');
};
}]);
