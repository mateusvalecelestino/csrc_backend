'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Realiza a migration
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      users_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_types',
          key: 'user_types_id'
        },
        onDelete: 'RESTRICT'
      },
      active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'users_id',
          onDelete: 'RESTRICT'
        }
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'users_id',
          onDelete: 'RESTRICT'
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

    // Adiciona os índices
    await queryInterface.addIndex('users', ['user_type']);
    await queryInterface.addIndex('users', ['created_by']);
    await queryInterface.addIndex('users', ['updated_by']);
  },

  // Desfaz a migration
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};