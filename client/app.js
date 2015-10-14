var app = angular.module("app", ["ngRoute", "angular-flip"]);
// var ensureAuthenticated = require('../auth/auth.js');

app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "./views/library.html",
    controller: "LibraryController"
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
  .when("/auth/google/callback", {
    templateUrl: './views/search.html',
    controller: "SearchController"
  })
  .otherwise({
    redirectTo: "/"
  });
});
