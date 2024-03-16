'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@admin.com',
        password_hash: 'hashed_password_1',
        user_type: 1,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Medico',
        email: 'medico@medico.com',
        password_hash: 'hashed_password_2',
        user_type: 2,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Anal. Lab',
        email: 'anal@anal.com',
        password_hash: 'hashed_password_3',
        user_type: 3,
        created_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};