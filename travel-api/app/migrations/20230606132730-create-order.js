"use strict";

const { UUIDV4 } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: UUIDV4,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      travel_date: {
        type: Sequelize.DATE,
      },
      tax: {
        type: Sequelize.INTEGER,
      },
      total_price: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.STRING,
      },
      vehicles_id: {
        type: Sequelize.INTEGER,
      },
      destinations_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
