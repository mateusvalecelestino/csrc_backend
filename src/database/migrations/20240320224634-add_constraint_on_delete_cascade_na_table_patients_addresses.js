'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface) {
        // Altera a restrição de FK
        await queryInterface.sequelize.query(
            'ALTER TABLE patients_addresses DROP FOREIGN KEY patients_addresses_ibfk_1;'
        );
        await queryInterface.sequelize.query(
            'ALTER TABLE patients_addresses ADD CONSTRAINT patients_addresses_ibfk_1 FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE ON UPDATE CASCADE;'
        );
    },

    async down(queryInterface) {
        // Devolve a restrição de FK
        await queryInterface.sequelize.query(
            'ALTER TABLE patients_addresses DROP FOREIGN KEY patients_addresses_ibfk_1;'
        );
        await queryInterface.sequelize.query(
            'ALTER TABLE patients_addresses ADD CONSTRAINT patients_addresses_ibfk_1 FOREIGN KEY (patient_id) REFERENCES patients(id);'
        );
    },
};
