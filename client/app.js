var app = angular.module("app", ["ngRoute", "ngResource"]);
//
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "./views/search.html",
    controller: "SearchController"
  })
  .when("/recommend", {
    templateUrl: "./views/recommend.html",
    controller: "RecommendController"
  })
  .when("/library", {
    templateUrl: "./views/library.html",
    controller: "LibraryController"
  })
  .when("/watchlist", {
    templateUrl: "./views/watchlist.html",
    controller: "WatchlistController"
  })
  .otherwise({
    redirectTo: "/"
  });
});
