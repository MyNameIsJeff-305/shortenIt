'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Click extends Model {
    static associate(models) {
      Click.belongsTo(models.Link, { foreignKey: 'linkId', onDelete: 'CASCADE' });
    }
  }
  Click.init({
    linkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Links',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'Click',
  });
  return Click;
};