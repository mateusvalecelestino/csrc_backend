'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('employees', [
            {
                full_name: 'Recepcionista',
                birth_date: "2024-03-19",
                gender: "M",
                order_number: "1234567890",
                email: "teste@teste.com",
                tel: "123-123-123",
                role_id: "1",
                specialty_id: "1",
                user_id: "5",
                created_by: "1",
                updated_by: "1",
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('employees', null, {});
    }
};