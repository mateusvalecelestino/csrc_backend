'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        full_name: 'employee um',
        birth_date: "2024-03-19",
        gender: "M",
        order_number: "1234567890",
        role_id: "1",
        specialty_id: "1",
        user_id: "1",
        created_by: "1",
        updated_by: "1",
        created_at: new Date(),
        updated_at: new Date()
      // },
      // {
      //   full_name: 'employee dois',
      //   birth_date: "2024-03-19",
      //   gender: "F",
      //   order_number: "1234567890",
      //   role_id: 2,
      //   specialty_id: 2,
      //   user_id: 1,
      //   created_by: 1,
      //   updated_by: 1,
      //   created_at: new Date(),
      //   updated_at: new Date()
      // },
      // {
      //   full_name: 'employee três',
      //   birth_date: "2024-03-19",
      //   gender: "M",
      //   order_number: "1234567890",
      //   role_id: 1,
      //   specialty_id: 1,
      //   user_id: 1,
      //   created_by: 1,
      //   updated_by: 1,
      //   created_at: new Date(),
      //   updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};