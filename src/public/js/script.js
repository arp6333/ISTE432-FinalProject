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
                return '{ error: "' + err + '" }';
            }
            
            if(movies.length < 1) {
                return '{ error: "No movies found!" }';
            }
            callback(movies['Search']);
        });
    },

    // Get info on a given name, using the year it came out as well in case of duplicates.
    getMovie: function(toGetTitle, toGetYear){
        var omdb = require('omdb-client');
        var params = {
            apiKey: '906d3817',
            query: toGetTitle,
            year: toGetYear
        }
        omdb.get(params, true, function(err, movie) {
            if(err) {
                return '{ error: "' + err + '" }';
            }
        
            if(!movie) {
                return '{ error: "Movie not found!" }';
            }

            return movie;
        });
    }
}