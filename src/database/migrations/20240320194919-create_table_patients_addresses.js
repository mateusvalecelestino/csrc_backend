'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('patients_addresses', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            street: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            patient_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: 'patients',
                    key: 'id',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('patients_addresses');
    },
};
