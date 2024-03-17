'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [
            {
                name: 'Admin',
                email: 'admin@admin.com',
                password_hash: '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                user_type: 1,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Medico',
                email: 'medico@medico.com',
                password_hash: '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                user_type: 2,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Anal. Lab',
                email: 'anal@anal.com',
                password_hash: '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                user_type: 3,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Triagista',
                email: 'triagista@triagista.com',
                password_hash: '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                user_type: 4,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                name: 'Recepcionista',
                email: 'recepcionista@recepcionista.com',
                password_hash: '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                user_type: 5,
                created_by: 1,
                updated_by: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    }
};