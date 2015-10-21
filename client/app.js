var app = angular.module("app", ["ngRoute"]);

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
    controller: "LibraryController"
  })
  .otherwise({
    redirectTo: "/"
  });
});
