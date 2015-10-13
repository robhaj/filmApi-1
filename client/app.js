var app = angular.module("app", ["ngRoute"]);
// var ensureAuthenticated = require('../auth/auth.js');

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
  .when("/auth/google/callback", {
    templateUrl: './views/search.html',
    controller: "SearchController"
  })
  .otherwise({
    redirectTo: "/"
  });
});
