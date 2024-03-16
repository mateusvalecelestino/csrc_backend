import Sequelize, { Model } from "sequelize";
import UserType from "./UserType";
import bcryptjs from 'bcryptjs';

export default class User extends Model{
    // Classe representando o modelo User
    static init(sequelize){
        super.init({
            // Definição dos campos do model
            users_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                // defaultValue: "", // Para dar a possibilidade de validar caso não for enviado nada para o campo
                validate: { isInt: { msg: "user_id inválido." } }
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false,
                defaultValue: "", // Para facilitar a validação do campo, no caso de não ser enviado nada.
                validate: {
                    len: {
                        args: [3, 30],
                        msg: "nome de utilizador deve ter entre 3 e 30 caracteres."
                    },
                    not: {
                        args: /^[A-Za-zÀ-ú\\s]+$/,
                        msg: "nome de utilizador deve possuir apenas caracteres alfabéticos."
                    },
                    isUppercase: { msg: "nome de utilizador não pode estar todo em maiúsculas." }
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull:false,
                unique: true,
                validate: {
                    len: {
                        args: [3, 255],
                        msg: "email de utilizador deve ter entre 3 e 255 caracteres."
                    },
                    isEmail: { msg: "email de utilizador inválido." }
                }
            },
            password_hash: { type: Sequelize.STRING, allowNull:false, defaultValue: "" },
            password: {
                type:Sequelize.VIRTUAL, // Não existe no banco de dados
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 255],
                        msg: "senha de utilizador deve ter entre 8 e 255 caracteres."
                    },
                    not: {
                        args: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,64})/g,
                        msg: "senha de utilizador deve possuir ao menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial"
                    }
                }
            },
            type: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: { isInt: { msg: "tipo de usuário inválido." } }
            },
            active: { type: Sequelize.TINYINT,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    notIn: {
                        args: [[1, 0]],
                        msg: "estado de utilizador inválido."
                    }
                }
            },
            created_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: { isInt: { msg: "criador de usuário inválido!" } }
            },
            updated_by: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: { isInt: { msg: "actualizador de usuário inválido!" } }
            },
            created_at: { type: Sequelize.DATE, allowNull: false },
            updated_at: { type: Sequelize.DATE, allowNull: false },
        }, {
            sequelize,
        });

        // Definindo as relações com outros modelos|tabelas
        User.belongsTo(UserType, { foreignKey: 'type', as: 'userType' });
        User.belongsTo(User, { as: 'Creator', foreignKey: 'created_by' });
        User.belongsTo(User, { as: 'Updater', foreignKey: 'updated_by' });

        this.addHook('beforeSave', async user => {
            // noinspection JSUnresolvedReference
            user.password_hash = await bcryptjs.hash(user.password, 8)
        })
        return this;
    }
}