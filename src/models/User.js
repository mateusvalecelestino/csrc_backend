import {DataTypes, Model} from "sequelize";
import bcrypt from 'bcryptjs';
import {password} from "../config/database";

export default class User extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.UserType, {as: "type", foreignKey: 'user_type'}); // Assoc. com a table user_type
        this.hasMany(models.User, {as: "creator", foreignKey: 'created_by'}); // Assoc. com a própria table
        this.hasMany(models.User, {as: "updater", foreignKey: 'updated_by'}); // Assoc. com a própria table
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Definição dos campos do model
            name: {
                type: DataTypes.STRING(30),
                defaultValue: "", // Valor default caso nada for enviado
                // Validações dos dados (tudo que é validate)
                validate: {
                    len: {
                        args: [3, 30],
                        msg: "name de utilizador deve ter entre 3 e 30 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "name deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            email: {
                type: DataTypes.STRING,
                defaultValue: "",
                unique: {msg: "email já existe."},
                validate: {isEmail: {msg: "email inválido."}}
            },
            password_hash: {
                type: DataTypes.STRING,
                defaultValue: ""
            },
            password: {
                type: DataTypes.VIRTUAL, // Não existe no banco
                defaultValue: "",
                validate: {
                    is: {
                        args: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,255})/g,
                        msg: "password deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula, um número, um caractere especial e deve ter no máximo 255 caracteres."
                    },
                }
            },
            user_type: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "user_type inválido."}}
            },
            active: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                validate: {isInt: {msg: "active inválido."}}
            },
            created_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "created_by inválido."}}
            },
            updated_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "updated_by inválido."}}
            },
        }, {
            sequelize,
        });

        // Cria o hash da senha antes de salvar no banco
        this.addHook('beforeSave', async user => {
            user.password_hash = await bcrypt.hash(user.password, 8);
        })
        return this;
    }

    // Verifica se a senha enviada pelo usuário bate com a hash
    isValidPassword(password) {
        return bcrypt.compare(password, this.password_hash)
    }
}
/*
* O atributo defaultValue em todos os campos permitem lançar os erros quando nada for enviado
* Dessa forma uma mensagem clara é enviada ao invés de: field doesn't have a defaultValue
*/