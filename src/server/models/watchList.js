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