var MyAPIFilms = require('myapifilms-api');

var api = new MyAPIFilms({
  rateLimit: 30,
  interval: 10,
  timeout: 20000
});

api({title:'The Shawshank Redemption', similarMovies: 1}).list().then(function(movies) {
    console.log(movies[similarMovies]);
}).catch(function(err) {
    console.log(err);
});

// api({
//       idIMDB:'tt0111161',
//       similarMovies: 1
// }).list(function(err, movie) {
//     console.log(err, movie);
// });
