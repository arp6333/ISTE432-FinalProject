const WatchListItem = require('../models').WatchListItem;

module.exports = {
  create(req, res) {
    return WatchListItem
      .create({
        content: req.body.content,
        watchListId: req.params.watchListId,
      })
      .then(watchListItem => res.status(201).send(watchListItem))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return WatchListItem
      .findOne({
          where: {
            id: req.params.watchListItemId,
            watchListId: req.params.watchListId,
          },
        })
      .then(watchListItem => {
        if (!watchListItem) {
          return res.status(404).send({
            message: 'WatchListItem Not Found',
          });
        }
  
        return watchListItem
          .update(req.body, { 
            fields: Object.keys(req.body) 
          })
          .then(updatedWatchListItem => res.status(200).send(updatedWatchListItem))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return WatchListItem
      .findOne({
          where: {
            id: req.params.watchListItemId,
            watchListId: req.params.watchListId,
          },
        })
      .then(watchListItem => {
        if (!watchListItem) {
          return res.status(404).send({
            message: 'WatchListItem Not Found',
          });
        }
  
        return watchListItem
          .destroy()
          .then(() => res.status(200).send({ message: 'WatchListItem deleted successfully.' }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
};