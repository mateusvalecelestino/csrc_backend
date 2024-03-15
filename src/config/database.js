// # -> Arq. de config da db
import 'dotenv/config'; // Importa o dotenv
module.exports = {
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    timezone: 'Africa/Luanda',
    define: {
        timestamps: true, // Define o registo automático de data de criação e alteração de items do banco
    },
};