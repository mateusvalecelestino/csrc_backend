'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('user_types', [
            {
                name: 'Admin',
                desc: "Acesso total ao sistema."
            },
            {
                name: 'Médico',
                desc: "Acesso a funcionalidades médicas e de paciente."
            },
            {
                name: 'Analista de Laboratório',
                desc: "Acesso a ferramentas e dados laboratoriais."
            },
            {
                name: 'Triagista',
                desc: "Acesso a ferramentas de triagem e informações iniciais do paciente."
            },
            {
                name: 'Recepcionista',
                desc: "Acesso a ferramentas de agendamento e gestão de pacientes."
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user_types', null, {});
    }
};