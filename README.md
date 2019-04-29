# WatchList
ISTE 432 - Final Project

Development Book

## Team Members & Roles

* Ellie Parobek - All

## Background

IMdb is a way of finding and reading information about movies and TV shows. Being able to explore movies and save ones that interest you all in one application would be beneficial in current times when users are lazy.

## Project Description

WatchList allows users to add movies and TV shows into a list to watch. The list is saved in a database to be accessed in the future. The OMdb API is used to pull information about movies and TV shows from IMdb.

## Project Requirements

* Users will be able to search for a movie or TV show in the OMdb API.

* Users will be able to add any movie or TV show item to their watchlist.

## Business Rules

* A user account is required to interact with the application in a way that can manipulate data.

* Movie or TV show entries are tied to an id in the OMdb API.

* A watchlist is tied to a user.

## Technologies Used

* Node / Express

* JavaScript / Angular

* PostGreSQL (using ElephantSQL) / Sequelize (a database ORM)

* HTML (through pug), CSS (Materialize Library)

## Design Patterns

### Model-View-Controller

Both the back-end service and front-end client segregate code based on their function: to represent data, to display data, and to process data. For example, the attributes associated with a WatchList would appear in the following model class located within the back-end service:

```js
module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  WatchList.associate = (models) => {
    WatchList.hasMany(models.WatchListItem, {
      foreignKey: 'watchListId',
      as: 'watchListItems',
    });
  };

  return WatchList;
};
```

While the front-end can represent the page displayed for searching movies and TV shows like this, using pug templating:

```js
extends template

block content
  div.main
    form(method='post', action='/submit-form')
      input(type='text', placeholder='Search', name='search')
      input(type='submit' id='searchButton' value='Search' class='waves-effect btn')
```

A controller class in the back-end looks like this, containing all the functions for using the database:

```js
const WatchList = require('../models').WatchList;
const WatchListItem = require('../models').WatchListItem;

module.exports = {
  create(req, res) {
    return WatchList
      .create({
        title: req.body.title,
      })
      .then(watchList => res.status(201).send(watchList))
      .catch(error => res.status(400).send(error));
  },
...
```

## Layering

### Data Layer

This layer handles requests for database information and carries out the requests against the DBMS. The database layer
resides solely in the back-end service. Controllers contain the primary functions needed to PUT, POST, UPDATE, and DELETE information in the database. Here is an example of the function for deleting a WatchList.

```js
...
 destroy(req, res) {
    return WatchList
      // Get the list to be deleted by id. 
      .findByPk(req.params.watchListId)
      .then(watchList => {
        if (!watchList) {
          return res.status(400).send({
            message: 'WatchList Not Found',
          });
        }
        return watchList
          .destroy()
          .then(() => res.status(200).send({ message: 'WatchList deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
...

```

### Domain Layer

This layer contains all model objects that represent data stored in the database. Model objects are immutable: they only serve to represent data, not modify it. Model classes allow us to define that a WatchList has many WatchListItems. In this example the 'title' is required if we want to write to the database object 'WatchList'. Now, we can query WatchList and its many WatchListItems with 'watchListItems:

```js
module.exports = (sequelize, DataTypes) => {
  const WatchList = sequelize.define('WatchList', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  WatchList.associate = (models) => {
    WatchList.hasMany(models.WatchListItem, {
      foreignKey: 'watchListId',
      as: 'watchListItems',
    });
  };

  return WatchList;
};
```

### Service Layer

Build around the REST service concept, the service layer allows retrieval and manipulation of data through a web-based interface.

### Interface Layer

Represented by the entire front-end, this is the portion of the application designed for direct user input. This layer will pull information from the back-end to display to the user. Here is an example of the search page after a user has searched something and data is retrieved:

```js
extends template

block content
  // Search bar
  div.main
    form(method='post', action='/submit-form')
      input(type='text', placeholder='Search', name='search')
      input(type='submit' id='searchButton' value='Search' class='waves-effect btn')
  // Search results
  div.results
    each result in search
      div.result
        form(method='post', action='/add')
          input(name='title' readonly value=result.Title)
          input(name='year' readonly value=result.Year)
          input(type='submit' id='infoButton' value='Add to WatchList' class='waves-effect btn')
```

## Exception Handling

* ValidationException
  * 0 VALUE_IS_OK
  * 1 VALUE_TOO_SHORT
  * 2 VALUE_TOO_LONG
  * 3 VALUE_ALREADY_TAKEN
  * 4 VALUE_IS_NULL
  * 5 VALUE_IS_NOT_VALUD
* DatabaseException
  * 101 FAILED_TO_CONNECT
  * 102 DIRECT_QUERY_FAILED
  * 103 PREPARED_QUERY_FAILED
  * 104 TRANSACTION_START_FAILED
  * 105 TRANSACTION_COMMIT_FAILED
  * 106 TRANSACTION_ROLLBACK_FAILED
* ControllerException
  * 201 CONTROLLER_NOT_FOUND
* EntryNotFoundException
  * 301 PRIMARY_KEY_NOT_FOUND
  * 302 UNIQUE_KEY_NOT_FOUND
  * 303 FOREIGN_KEY_NOT_FOUND
* RouteException
  * 401 REQUIRED_PARAMETER_IS_INVALID
  * 402 REQUEST_INVALID
  * 404 PAGE_NOT_FOUND
* SecurityException
  * 501 KEY_NOT_SUPPLIED
  * 502 KEY_NOT_FOUND
  * 503 KEY_NO_PERMISSION
  * 504 USER_NOT_FOUND
  * 505 USER_PASSWORD_INCORRECT
  * 506 USER_IS_DISABLED
  * 507 AUTHENTICATION_REQUIRED
  * 508 TOKEN_EXPIRED
  * 509 USER_NO_PERMISSION
* ViewException
  * 601 VIEW_NOT_FOUND
  * 602 TEMPLATE_NOT_FOUND
  * 603 ELEMENT_NOT_FOUND
  * 604 PAGE_NOT_FOUND
  * 605 FORM_NOT_FOUND
* APIException (Deprecated)
  * 701 NO_RESPONSE 
* LDAPException
  * 1200 FAILED_SET_LDAP_VERSION
  * 1201 FAILED_DISABLE_REFERRALS
  * 1202 FAILED_START_TLS
* InfoCentralException
  * 1300 IC_RESPONDED_500
* PageNotFoundException
  * 1400 PAGE_NOT_FOUND
* EntryInUseException
  * 1500 ENTRY_IN_USE
  
## Performance & Refactoring

Existing examples of "efficient" code:

* Use of JSON objects to send and receive data between layers/separate applications. In 'src/public/js/script.js', the data from the API is pulled as JSON and sent back to the front end.

* Only references what we need to reference instead of everything.

* Only make database calls for what data needs to be retrieved (ex. not using 'SELECT *')
  
### PostGreSQL conversion

The project was started in PostGreSQL so nothing needed to change. ElephantSQL uses PostGreSQL and the ORM Sequelize allows us to easily control it using Node.

## Unit Testing

### Front-End

By creating mock methods or objects to simulate our database, we can ensure that the front-end is working as intended by not requiring dependency with the back-end. For example (src/public/js/script.js):

```js
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
          callback('{ Title: 'Test Title', Year: '2019' }');
      });
  },
  ...
```

* The search page makes a database call to pull search results from the API. Instead of calling the database, we give the search function a JSON string that we fabricated that is similar to what the database would actually be sending (the 'callback' at the end of the function). This removes the ability to make sure the input from the user is being entered correctly as we would normally be sending user input to the database - but this will be tested when we remove the mock object (see below).

* The result instead of getting pulled from the database is hardcoded in as a string and then sent to the function to display the search results the same way the database pull would be sent. Then we can just make sure everything is displaying as intended.

### Back-End

When we remove the mock object and use the actual database for calls, this allows for testing of the back-end now that
we know the front-end is working as intended. For example (src/app.js line 48):

```js
app.get('/search/:toSearch', (req, res) => {
  searchMovie(req.params.toSearch, function(msg) {
    res.render('searchSomething', {
      title: 'Search',
      search: msg
    });
  });
});
```

* Back to the real search page call, we no longer use the mock JSON string and instead call a GET request to the database for the desired search. This allows us to make sure that the front-end will work in coordination with the database and with any input entered by the user. Once we are sure this is displaying and working as intended (along with seeing that it should be displaying the same as the mock version), we know it is ready for the final version.

This testing method can be repeated the same way with all of our functions. Remove any database calls and replace the responses with hardcoded strings or JSON, call the rest of the function/ method the same way we would with a database call, then make sure the results are the same as if we were calling the database.

## Packaging and Deployment

The code can be downloaded off of GitHub. Once entering the folder, run 'export DATABASE_URL=postgres://tsdivvwf:5nQgHrrcGWPBQ1hdYG_0n3hsHrT1nNKB@isilo.db.elephantsql.com:5432/tsdivvwf' and then 'npm run start:dev' to start up at 'localhost:/8000'. The database url has to be run first everytime you start up the command line, but only that one time until the command line is closed. Then you can just run 'npm run start:dev' everytime you want to start up the server on your local machine.

### Help

Assuming a full website, a help forum would be available with someone who understood the site moderating questions and answers. At the very least, questions could be answered on StackOverFlow or some other already existing forum.

## Code Repositories

[ISTE432-FinalProject](https://github.com/arp6333/ISTE432-FinalProject)

## Timeline

| Date       | User | Title            | Description |
|:-----------|:-----|:-----------------|: -----------|
| 04/26/19 | Ellie | Created Document | Edited existing document. |
| 04/27/19 | Ellie  | Back-end Creation  | Created back-end. |
| 04/28/19 | Ellie  | Front-end Creation  | Started front-end. |
