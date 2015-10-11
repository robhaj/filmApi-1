var app = angular.module("app", ["ngRoute"]);
// var ensureAuthenticated = require('../auth/auth.js');



app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl: "./views/search.html",
    controller: "SearchController",
     access : {allowAnonymous : false}
  })
  .when("/recommend", {
    templateUrl: "./views/recommend.html",
    controller: "SearchController"
  })
  .when("/library", {
    templateUrl: "./views/library.html",
    controller: "LibraryController",
    access : {allowAnonymous : false}
  })
  .when("/watchlist", {
    templateUrl: "./views/watchlist.html",
    controller: "SearchController"
  })
  .when("/auth/google/callback", {
    templateUrl: './views/search.html',
    controller: "SearchController"
  })
  .otherwise({
    redirectTo: "/"
  });
});
