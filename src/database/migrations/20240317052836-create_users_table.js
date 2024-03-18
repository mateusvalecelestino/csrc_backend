'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // Realiza a migration
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true
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
                    key: 'id'
                },
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
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
        await queryInterface.addIndex('users', ['user_type']);
        await queryInterface.addIndex('users', ['created_by']);
        await queryInterface.addIndex('users', ['updated_by']);
    },

    // Desfaz a migration
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};