'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Alterar o tipo do campo 'name' na table 'user_types' de VARCHAR(20) para VARCHAR(30)
    await queryInterface.changeColumn('user_types', 'name',
        { type: Sequelize.STRING(30), allowNull: false}
    );
  },

  async down (queryInterface, Sequelize) {
    // Reverte a alteração
    await queryInterface.changeColumn('user_types', 'name',
        { type: Sequelize.STRING(20), allowNull: false}
    );
  }
};
