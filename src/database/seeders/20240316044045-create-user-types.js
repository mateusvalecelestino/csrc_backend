'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('user_types', [
       {
         name: 'Admin',
         desc: "Acesso total ao sistema.",
         home: "/dash/admin/home"
       },
       {
         name: 'Médico',
         desc: "Acesso a funcionalidades médicas e de paciente.",
         home: "/dash/medico/home"
       },
       {
         name: 'Analista de Laboratório',
         desc: "Acesso a ferramentas e dados laboratoriais.",
         home: "/dash/analista/home"
       },
       {
         name: 'Triagista',
         desc: "Acesso a ferramentas de triagem e informações iniciais do paciente.",
         home: "/dash/triagista/home"
       },
       {
         name: 'Recepcionista',
         desc: "Acesso a ferramentas de agendamento e gestão de pacientes.",
         home: "/dash/recepcionista/home"
       }
     ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('user_types', null, {});
  }
};
