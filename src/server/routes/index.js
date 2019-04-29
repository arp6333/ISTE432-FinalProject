const watchListsController = require('../controllers').watchLists;
const watchListItemsController = require('../controllers').watchListItems;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the WatchLists API!',
  }));
  
  app.post('/api/watchLists', watchListsController.create);
  app.get('/api/watchLists', watchListsController.list);
  app.get('/api/watchLists/:watchListId', watchListsController.retrieve);
  app.put('/api/watchLists/:watchListId', watchListsController.update);
  app.delete('/api/watchLists/:watchListId', watchListsController.destroy);

  app.post('/api/watchLists/:watchListId/items', watchListItemsController.create);
  app.put('/api/watchLists/:watchListId/items/:watchListItemId', watchListItemsController.update);
  app.delete('/api/watchLists/:watchListId/items/:watchListItemId', watchListItemsController.destroy);

  app.all('/api/watchLists/:watchListId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};