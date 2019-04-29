// Ellie Parobek
// JavaScript functions needed for API calls.
var omdb = require('omdb');

var result = "";

function searchMovie(toSearch){
    omdb.search(toSearch, function(err, movies) {
        if(err) {
            return console.error(err);
        }
        
        if(movies.length < 1) {
            return console.log('No movies were found!');
        }

        result = movies;
    });
}

function getMovie(toGetTitle, toGetYear){
    omdb.get({ title: toGetTitle, year: toGetYear }, true, function(err, movie) {
        if(err) {
            return console.error(err);
        }
     
        if(!movie) {
            return console.log('Movie not found!');
        }
     
        result = movie;
    });
}