import Sequelize, { Model } from "sequelize"; // Import do Sequelize e o model

export default class UserType extends Model{
    // Recebe a conexão com o banco (sequelize = connection)
    static init(sequelize){
        super.init({
            // Definição dos campos do model
            name: Sequelize.STRING(20),
            desc: Sequelize.STRING(30),
            home: Sequelize.STRING
        }, {
            sequelize,
        });
        return this;
    }
}