import Sequelize, { Model, DataTypes } from "sequelize";

export default class User extends Model{
    static associate(models) {
        this.belongsTo(models.UserType, { foreignKey: 'user_type' });
        this.hasMany(models.User, { foreignKey: 'created_by' });
        this.hasMany(models.User, { foreignKey: 'updated_by' });
    }

    static init(sequelize){
        // Chama o método init da classe pai para definir os campos do modelo
        super.init({
            // Definição dos campos do model
            users_id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
            name: DataTypes.STRING(30),
            email: DataTypes.STRING,
            password_hash: DataTypes.STRING,
            // password: DataTypes.VIRTUAL, // Não existe no banco
            user_type: DataTypes.INTEGER,
            active: { type: DataTypes.TINYINT, defaultValue: 1 },
            created_by: DataTypes.INTEGER,
            updated_by: DataTypes.INTEGER
        }, {
            sequelize,
        });
        return this;
    }
}