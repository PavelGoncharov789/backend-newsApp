'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.User, {
        foreignKey: 'author',
        as: 'users',
      });
    }
  }
  News.init({
    author: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    tags: DataTypes.STRING,
    img: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};
