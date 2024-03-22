'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'users',
            [
                {
                    username: 'Admin',
                    user_email: 'admin@admin.com',
                    password_hash:
                        '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                    user_type: 1,
                    created_by: 1,
                    updated_by: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Medico',
                    user_email: 'medico@medico.com',
                    password_hash:
                        '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                    user_type: 2,
                    created_by: 1,
                    updated_by: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Anal. Lab',
                    user_email: 'anal@anal.com',
                    password_hash:
                        '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                    user_type: 3,
                    created_by: 1,
                    updated_by: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Triagista',
                    user_email: 'triagista@triagista.com',
                    password_hash:
                        '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                    user_type: 4,
                    created_by: 1,
                    updated_by: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
                {
                    username: 'Recepcionista',
                    user_email: 'recepcionista@recepcionista.com',
                    password_hash:
                        '$2a$08$CTr1hm80.Dn9a9tAjWFrtOZZmbYa/uSQE01IY.9nLuYWyShgFyzYi', // Csrc-1234
                    user_type: 5,
                    created_by: 1,
                    updated_by: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
