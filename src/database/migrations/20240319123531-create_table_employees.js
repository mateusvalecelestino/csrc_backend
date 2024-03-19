'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Realiza a migration
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false,
      },
      order_number: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      },
      specialty_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'specialties',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        }

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

    // Adiciona os índices
    await queryInterface.addIndex('employees', ['user_id']);
    await queryInterface.addIndex('employees', ['created_by']);
    await queryInterface.addIndex('employees', ['updated_by']);
  },

  // Desfaz a migration
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('employees');
  }
};