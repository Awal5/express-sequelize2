"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("vehicles", [
      {
        no_seri: "2f72",
        name: "Kereta Api Cibatuan",
        vehicle_type: "Darat",
        brand: "KAI",
        createdAt: new Date(),
      },
      {
        no_seri: "3f73",
        name: "Pesawat Boeink 767",
        vehicle_type: "Udara",
        brand: "Citylink",
        createdAt: new Date(),
      },
      {
        no_seri: "5r01",
        name: "Kapal Ferry",
        vehicle_type: "Laut",
        brand: "Washington State Ferry",
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("vehicles", null, []);
  },
};
