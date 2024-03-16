import Sequelize, { Model } from "sequelize";
import UserType from "./UserType";

export default class User extends Model{
    // Classe representando o modelo User
    static init(sequelize){
        super.init({
            // Definição dos campos do model
            users_id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
            name: Sequelize.STRING(30),
            email: { type: Sequelize.STRING, allowNull:false, unique: true },
            password_hash: { type: Sequelize.STRING, allowNull:false },
            type: { type: Sequelize.INTEGER, allowNull: false },
            active: { type: Sequelize.TINYINT, allowNull: false, defaultValue: 1 },
            created_by: { type: Sequelize.INTEGER, allowNull: false },
            updated_by: { type: Sequelize.INTEGER, allowNull: false },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        }, {
            sequelize,
        });

        // Definindo as relações com outros modelos|tabelas
        User.belongsTo(UserType, { foreignKey: 'type', as: 'userType' });
        User.belongsTo(User, { as: 'Creator', foreignKey: 'created_by' });
        User.belongsTo(User, { as: 'Updater', foreignKey: 'updated_by' });
        return this;
    }
}