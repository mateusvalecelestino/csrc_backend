'use strict';

//Esses triggers são para quando um usuário for desactivado o funcionário também e vice-versa
module.exports = {
    up: async (queryInterface) => {
        // Criação do trigger para a tabela 'users'
        await queryInterface.sequelize.query(`
        CREATE TRIGGER users_active_trigger AFTER UPDATE ON users
        FOR EACH ROW
        BEGIN
            IF NEW.active = 0 THEN
                UPDATE employees SET active = 0 WHERE user_id = NEW.id;
            END IF;
        END;
    `);

        // Criação do trigger para a tabela 'employees'
        await queryInterface.sequelize.query(`
        CREATE TRIGGER employees_active_trigger AFTER UPDATE ON employees
        FOR EACH ROW
        BEGIN
            IF NEW.active = 0 THEN
                UPDATE users SET active = 0 WHERE id = NEW.user_id;
            END IF;
        END;
    `);
    },

    down: async (queryInterface, Sequelize) => {
        // Remova os triggers na operação de rollback, se necessário
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS users_active_trigger');
        await queryInterface.sequelize.query('DROP TRIGGER IF EXISTS employees_active_trigger');
    }
};