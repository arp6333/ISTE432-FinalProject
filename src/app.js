// Ellie Parobek
// Main code for loading pages.
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
var scripts = include('./public/js/script.js')

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
    res.render('index', {
      title: 'Home'
    });
});

// Search page
app.get('/search', (req, res) => {
  res.render('search', {
    title: 'Search',
    search: scripts.searchMovie("")
  });
});

// Search page with a searched index
app.get('/search/:toSearch', (req, res) => {
  res.render('search', {
    title: 'Search',
    search: scripts.searchMovie(toSearch)
  });
});

// Any other page attempt to be called
app.get('*', (req, res) => {
  res.send('404 - Page Not Found');
});

module.exports = app;