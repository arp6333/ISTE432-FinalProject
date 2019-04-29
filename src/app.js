// Ellie Parobek
// Main code for loading pages.
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

// Home page
app.get('/', (req, res) => {
  const request = require('request');
  request('http://localhost:8000/api/watchLists/1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      console.log(body.watchListItems);
      res.render('index', {
        title: 'Your WatchList',
        content: body.watchListItems
      });
    }
    else{
      console.log(error);
    }
  });
});

// Search page
app.get('/search', (req, res) => {
  res.render('search', {
    title: 'Search',
    search: "{}"
  });
});

// Search page with a searched index
app.get('/search/:toSearch', (req, res) => {
  searchMovie(req.params.toSearch, function(msg) {
    res.render('search', {
      title: 'Search',
      search: msg
    });
  });
});

// Info page
app.get('/info', (req, res) => {
  res.redirect('/search');
});

// Get more info on selected movie
app.post('/get-info', (req, res) => {
  const title = req.body.title;
  const year = req.body.year.substr(0, 4);
  getMovie(title, year, function(msg) {
    res.render('info', {
      title: title,
      search: msg
    });
  });
});

// Get requested search and redirect
app.post('/submit-form', (req, res) => {
  const toSearch = req.body.search;
  res.redirect('/search/' + toSearch);
});

// Add requested movie to watchlist
app.post('/add', (req, res) => {
  const toAdd = req.body.title;
  res.redirect('/api/watchLists/1/' + toAdd);
});

// Any other page attempt to be called
app.get('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});
app.post('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});
app.delete('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});
app.put('*', (req, res) => {
  res.render('error', {
    title: 'Error',
    code: '404 - Page not found.'
  });
});

module.exports = app;