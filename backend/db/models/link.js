'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    static associate(models) {
      Link.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
      Link.hasMany(models.Click, { foreignKey: 'linkId', onDelete: 'CASCADE' });
    }
  }
  Link.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    link: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    shortLink: {
      type: DataTypes.STRING(256),
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};