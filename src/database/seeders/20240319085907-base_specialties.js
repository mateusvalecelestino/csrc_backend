'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'specialties',
      [
        {
          name: 'Geral',
          created_by: 1,
          updated_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Pediatria',
          created_by: 1,
          updated_by: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('specialties', null, {});
  },
};
