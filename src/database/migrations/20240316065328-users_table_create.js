'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      users_id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(30), allowNull: false },
      email: { type: Sequelize.STRING, allowNull:false, unique: true },
      password_hash: { type: Sequelize.STRING, allowNull:false },
      // FK de user_types
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_types', key: 'user_types_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      active: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 1 },
      // FK de created by
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'users_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'},
      // FK de updated by
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'users_id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'},
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });

    // Adiciona uma chave estrangeira para user_types
    await queryInterface.addConstraint('users', {
      fields: ['type'],
      type: 'foreign key',
      name: 'fk_users_type_id_user_types',
      references: { // Referência à tabela user_types
        table: 'user_types',
        field: 'user_types_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


    // Adiciona as constraints de chave estrangeira para os campos created_by e updated_by
    await queryInterface.addConstraint('users', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'fk_users_created_by_users_id',
      references: {
        table: 'users',
        field: 'users_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('users', {
      fields: ['updated_by'],
      type: 'foreign key',
      name: 'fk_users_updated_by_users_id',
      references: {
        table: 'users',
        field: 'users_id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    // Adiciona os indices
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['created_by']);
    await queryInterface.addIndex('users', ['updated_by']);
  },

  async down (queryInterface) {
    // Drop dos índices
    await queryInterface.removeIndex('users', ['email']);
    await queryInterface.removeIndex('users', ['created_by']);
    await queryInterface.removeIndex('users', ['updated_by']);

    // Remoção das constraints de chave estrangeira
    await queryInterface.removeConstraint('users', 'fk_users_created_by_users_id');
    await queryInterface.removeConstraint('users', 'fk_users_updated_by_users_id');

    // Remoção da chave estrangeira para user_types
    await queryInterface.removeConstraint('users', 'fk_users_type_id_user_types');

    // Remoção da tabela 'users'
    await queryInterface.dropTable('users');
  }
};