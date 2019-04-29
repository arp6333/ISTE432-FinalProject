// Ellie Parobek
// JavaScript functions needed for API calls.
var omdb = require('omdb');

// Search by a given name.
function searchMovie(toSearch){
    omdb.search(toSearch, function(err, movies) {
        if(err) {
            return '{ error: "' + err + '" }';
        }
        
        if(movies.length < 1) {
            return '{ error: "No movies found!" }';
        }

        return movies;
    });
}

// Get info on a given name, using the year it came out as well in case of duplicates.
function getMovie(toGetTitle, toGetYear){
    omdb.get({ title: toGetTitle, year: toGetYear }, true, function(err, movie) {
        if(err) {
            return '{ error: "' + err + '" }';
        }
     
        if(!movie) {
            return '{ error: "Movie not found!" }';
        }

        return movie;
    });
}