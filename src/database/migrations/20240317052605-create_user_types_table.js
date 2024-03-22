'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_types', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                unique: true,
            },
            desc: {
                type: Sequelize.STRING(70),
                allowNull: false,
                unique: true,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('user_types');
    },
};
