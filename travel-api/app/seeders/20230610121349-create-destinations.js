"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("destinations", [
      {
        city_name: "Yogyakarta",
        price: 400000,
        from: "Bandung",
        createdAt: new Date(),
      },
      {
        city_name: "Surabaya",
        price: 200000,
        from: "Semarang",
        createdAt: new Date(),
      },
      {
        city_name: "Denpasar",
        price: 150000,
        from: "Nusa Penida",
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("destinations", null, []);
  },
};
