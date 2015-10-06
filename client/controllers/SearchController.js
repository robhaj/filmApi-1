app.controller("SearchController", ["$scope", "movieFactory", function($scope, movieFactory) {

    $scope.searchMovies = function() {
    console.log($scope.search);
    movieFactory.searchRequest($scope.search).success(function(response){
    console.log(response);
    $scope.movies = response;
    })
    .error(function(error){
      console.log(error);
    });
        // var x = JSON.parse(data);
        // console.log(x[0].similarMovies[0]);
};
}]);
