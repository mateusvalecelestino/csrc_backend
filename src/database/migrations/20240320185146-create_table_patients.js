'use strict';

const { DataTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // Realiza a migration
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('patients', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            full_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            fathers_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            mothers_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM('M', 'F'),
                allowNull: false,
            },
            birth_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'employees',
                    key: 'id',
                    onDelete: 'RESTRICT',
                    onUpdate: 'CASCADE',
                },
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'employees',
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

        // Adiciona os índices
        await queryInterface.addIndex('patients', ['created_by']);
        await queryInterface.addIndex('patients', ['updated_by']);
    },

    // Desfaz a migration
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('patients');
    },
};
