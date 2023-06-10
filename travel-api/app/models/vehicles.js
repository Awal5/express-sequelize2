"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vehicle.hasMany(models.Order, {
        foreignKey: "vehicles_id",
        as: "order",
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      });
    }
  }
  Vehicle.init(
    {
      no_seri: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      vehicle_type: DataTypes.STRING,
      brand: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  return Vehicle;
};
