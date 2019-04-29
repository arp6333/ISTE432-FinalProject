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
  list(req, res) {
    return WatchList
      .findAll({
        include: [{
          model: WatchListItem,
          as: 'watchListItems',
        }],
      })
      .then(watchLists => res.status(200).send(watchLists))
      .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return WatchList
      .findByPk(req.params.watchListId, {
        include: [{
          model: WatchListItem,
          as: 'watchListItems',
        }],
      })
      .then(watchList => {
        if (!watchList) {
          return res.status(404).send({
            message: 'WatchList Not Found',
          });
        }
        return res.status(200).send(watchList);
      })
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return WatchList
      .findByPk(req.params.watchListId, {
        include: [{
          model: WatchListItem,
          as: 'watchListItems',
        }],
      })
      .then(watchList => {
        if (!watchList) {
          return res.status(404).send({
            message: 'WatchList Not Found',
          });
        }
        return watchList
          .update({
            title: req.body.title || watchList.title,
          })
          .then(() => res.status(200).send(watchList))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  destroy(req, res) {
    return WatchList
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
};