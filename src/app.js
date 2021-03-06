// Ellie Parobek
// Main code for loading pages and making HTTP requests.
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var scripts = require('./public/js/script.js');
var searchMovie = scripts.searchMovie;
var getMovie = scripts.getMovie;

// Express info
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set the views and static files (js and css) for pug.
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

require('./server/routes')(app);
var user = 1;
/* // Get the logged in user ID. If 0, redirect to login when trying to view pages.

app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login'
  });
});
// Do login
app.post('/login', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }

});

// Register page
app.get('/register', (req, res) => {
  res.render('register', {
    title: 'Login'
  });
});
// Do register
app.post('/register', (req, res) => {
  
}); */

// Home page
app.get('/', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  const request = require('request');
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl + 'api/watchLists/' + user;
  request(fullUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.render('index', {
        title: 'Your WatchList',
        content: JSON.parse(body)
      });
    }
    else{
      console.log(error);
    }
  });
});

// Search page
app.get('/search', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  res.render('search', {
    title: 'Search',
    search: "{}"
  });
});

// Search page with a searched index
app.get('/search/:toSearch', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  searchMovie(req.params.toSearch, function(msg) {
    res.render('searchSomething', {
      title: 'Search',
      search: msg
    });
  });
});

// Get more info on selected movie
app.post('/info', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  const movieId = req.body.id;
  getMovie(movieId, function(msg) {
    console.log(msg);
    res.render('info', {
      title: 'More Info',
      result: msg
    });
  });
});

// Get more info on selected movie
app.get('/info', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  res.redirect('/search');
});

// Get requested search and redirect
app.post('/submit-form', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  const toSearch = req.body.search;
  res.redirect('/search/' + toSearch);
});

// Add requested movie to watchlist
app.post('/add', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  const toAdd = req.body.title;
  const request = require('request');
  var fullUrl = req.protocol + '://' + req.get('host') + '/api/watchLists/' + user + '/items';
  request.post(fullUrl, {
    json: {
      content: toAdd
    }
  },
  (error, res, body) => {
  if(error) {
    console.error(error);
    return;
  }
  console.log(`statusCode: ${res.statusCode}`);
  });
  res.redirect('/');
});

// Delete requested movie from watchlist
app.post('/delete', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  const toDelete = req.body.title;
  const itemId = req.body.id;
  const request = require('request');
  var fullUrl = req.protocol + '://' + req.get('host') + '/api/watchLists/' + user +'/items/' + itemId;
  request.delete(fullUrl, {
    json: {
      content: toDelete
    }
  },
  (error, res, body) => {
    if(error) {
      console.error(error);
      return;
    }
    console.log(`statusCode: ${res.statusCode}`);
  });
  res.redirect('/');
});

// Any other page attempt to be called
app.get('*', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});
app.post('*', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});
app.delete('*', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});
app.put('*', (req, res) => {
  if(user == 0){
    res.redirect('/login');
  }
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});

module.exports = app;