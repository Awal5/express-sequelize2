"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kendaraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kendaraan.belongsTo(models.paket_wisata, {
        foreignKey: "paketWisata_id",
        as: "paket_wisata",
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
      });
    }
  }
  Kendaraan.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nama: DataTypes.STRING,
      jenis: DataTypes.STRING,
      type: DataTypes.STRING,
      paketWisata_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Kendaraan",
    }
  );
  return Kendaraan;
};
