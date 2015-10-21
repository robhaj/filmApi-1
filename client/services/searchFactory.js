app.factory("searchFactory", ["$http", function($http) {
  var object = {};
  tmdbKey = '3b129aca94a2990ebc97bcc866f6d689';
  object.searchRequest = function(title) {
    return $http.jsonp('http://api.themoviedb.org/3/search/movie?query='+title+'&api_key='+tmdbKey+'&callback=JSON_CALLBACK');
  };
  object.similarRequest = function(id) {
    return $http.jsonp('http://api.themoviedb.org/3/movie/'+id+'/similar?api_key='+tmdbKey+'&callback=JSON_CALLBACK');
  };
  object.createMovie = function(data){
    var movie = {
      title: data["results"][0]["original_title"],
      genres: data["results"][0]["genre_ids"][0],
      image: 'http://image.tmdb.org/t/p/w500/'+data["results"][0]["poster_path"],
      year: data["results"][0]["release_date"],
      plot: data["results"][0]["overview"],
      rated: data["results"][0]["vote_average"],
      imdbRating: Number(data["results"][0]["vote_average"]),
      movie_id: data["results"][0]["id"],
      watched: Boolean,
      userRating: Number,
      userReview: String,
    };
    return movie;
  }
  object.createRecommend = function(response){
    var recommendMovie = {
        title: response.results[i]["original_title"],
        genres: response.results[i]["genre_ids"][0],
        image: 'http://image.tmdb.org/t/p/w500/'+response.results[i]["poster_path"],
        year: response.results[i]["release_date"],
        plot: response.results[i]["overview"],
        rated: response.results[i]["vote_average"],
        imdbRating: Number(response.results[i]["vote_average"]),
        movie_id: response.results[i]["id"].toString(),
        watched: Boolean,
        userRating: Number,
        userReview: String,
        recommendedBy: $scope.movie.title
    };
    return recommendMovie;
  };
  return object;
}]);
