'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      desc: {
        type: Sequelize.STRING(500),
        allowNull: false,
        unique: true
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });

    // Adição dos índices
    await queryInterface.addIndex('roles', ['name']);
    await queryInterface.addIndex('roles', ['created_by']);
    await queryInterface.addIndex('roles', ['updated_by']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
  }
};