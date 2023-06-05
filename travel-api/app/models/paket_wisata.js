"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class paket_wisata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paket_wisata.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      harga: DataTypes.INTEGER,
      tujuan: DataTypes.STRING,
      user_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "paket_wisata",
    }
  );
  return paket_wisata;
};
