module.exports = (sequelize, DataTypes) => {
  const WatchListItem = sequelize.define('WatchListItem', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  WatchListItem.associate = (models) => {
    WatchListItem.belongsTo(models.WatchList, {
      foreignKey: 'watchListId',
      onDelete: 'CASCADE',
    });
  };

  return WatchListItem;
};