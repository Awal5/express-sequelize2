"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Destinations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destinations.hasMany(models.Order, {
        foreignKey: "vehicles_id",
        as: "order",
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      });
    }
  }
  Destinations.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      city_name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      from: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Destinations",
    }
  );
  return Destinations;
};
