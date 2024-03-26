'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('specialties', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Adição dos índices
    await queryInterface.addIndex('specialties', ['name']);
    await queryInterface.addIndex('specialties', ['created_by']);
    await queryInterface.addIndex('specialties', ['updated_by']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('specialties');
  },
};
