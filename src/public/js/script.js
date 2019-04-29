module.exports = {
    // Ellie Parobek
    // JavaScript functions needed for API calls.

    // Search by a given name.
    searchMovie: function(toSearch, callback){
        var omdb = require('omdb-client');
        var params = {
            apiKey: '906d3817',
            query: toSearch
        }
        omdb.search(params, function(err, movies) {
            if(err) {
                callback('{ error: "' + err + '" }');
            }
            
            if(movies.length < 1) {
                callback('{ error: "No movies found!" }');
            }
            callback(movies['Search']);
        });
    },

    // Get info on a given movie.
    getMovie: function(toGet, yearGet, callback){
        var omdb = require('omdb-client');
        var params = {
            apiKey: '906d3817',
            query: toGet,
            year: parseInt(yearGet)
        }
        omdb.search(params, function(err, movie) {
            if(err) {
                callback('{ error: "' + err + '" }');
            }
            console.log(movie['Search']);
            callback(movie['Search']);
        });
    },
}