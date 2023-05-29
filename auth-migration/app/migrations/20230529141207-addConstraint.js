"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addConstraint("Statuses", {
      type: "foreign key",
      fields: ["user_id"],
      name: "fk_users_userId",
      references: {
        table: "Users",
        field: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.removeConstraint("Statuses", "fk_users_userId");
  },
};
