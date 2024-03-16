'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_types', {
      user_types_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: { type: Sequelize.STRING(30), allowNull: false },
      desc: { type: Sequelize.STRING(70), allowNull: false },
      home: { type: Sequelize.STRING, allowNull: false }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_types');
  }
};