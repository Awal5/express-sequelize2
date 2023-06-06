"use strict";
const { Model, UUIDV4 } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "users",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });

      Order.belongsTo(models.Vehicle, {
        foreignKey: "vehicles_id",
        as: "vehicles",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });

      Order.belongsTo(models.Destinations, {
        foreignKey: "destinations_id",
        as: "destinations",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  Order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
      },
      order_date: DataTypes.DATE,
      travel_date: DataTypes.DATE,
      tax: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      user_id: DataTypes.UUID,
      vehicles_id: DataTypes.INTEGER,
      destinations_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
