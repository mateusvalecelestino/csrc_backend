'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees_contacts', [
      {
        email: "teste@teste.com",
        tel: "123-123-123",
        employee_id: '1'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees_contacts', null, {});
  }
};