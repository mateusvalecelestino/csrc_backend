'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // Altera a restrição de FK
        await queryInterface.sequelize.query(
            'ALTER TABLE employees_contacts DROP FOREIGN KEY employees_contacts_ibfk_1;'
        );
        await queryInterface.sequelize.query(
            'ALTER TABLE employees_contacts ADD CONSTRAINT employees_contacts_ibfk_1 FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE ON UPDATE CASCADE;'
        );
    },

    async down(queryInterface) {
        // Devolve a restrição de FK
        await queryInterface.sequelize.query(
            'ALTER TABLE employees_contacts DROP FOREIGN KEY employees_contacts_ibfk_1;'
        );
        await queryInterface.sequelize.query(
            'ALTER TABLE employees_contacts ADD CONSTRAINT employees_contacts_ibfk_1 FOREIGN KEY (employee_id) REFERENCES employees(id);'
        );
    },
};
