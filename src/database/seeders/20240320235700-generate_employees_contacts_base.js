"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "employees_contacts",
      [
        {
          email: "admin@admin.com",
          tel: "123-123-123",
          employee_id: "1",
        },
        {
          email: "recep@recep.com",
          tel: "222-222-222",
          employee_id: "2",
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employees_contacts", null, {});
  },
};
