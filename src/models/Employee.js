import {DataTypes, Model} from "sequelize";
import bcrypt from 'bcryptjs';

export default class Employee extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.Role, {as: 'role'}); // Assoc. com a table roles
        this.belongsTo(models.Specialty, {as: 'specialty'}); // Assoc. com a table specialties
        this.belongsTo(models.User, {as: 'employee'}); // Assoc. com a table users
        this.belongsTo(models.User, { as: "creator", foreignKey: 'created_by' });
        this.belongsTo(models.User, { as: "updater", foreignKey: 'updated_by' });
    }


    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Definição dos campos do model
            full_name: {
                type: DataTypes.STRING(100),
                defaultValue: "",
                validate: {
                    notEmpty: {msg: "Nome de funcionário não deve estar vazio."},
                    len: {
                        args: [10, 100],
                        msg: "Nome de funcionário deve ter entre 10 e 100 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome de funcionário deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            birth_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: "",
                validate: { isDate: { msg: "Data de nascimento de funcionário inválida." } }
            },
            gender: {
              type: DataTypes.ENUM('M', 'F'),
              allowNull: false,
              validate: {
                  isIn: {
                      args: [['M', 'F']],
                      msg: "Género deve ser M ou F."
                  }
              }
            },
            order_number: {
                type: DataTypes.STRING(30),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "Número de ordem de funcionário não pode ser vazio." },
                    len: {
                        args: [3, 30],
                        msg: "Número de ordem de funcionário deve ter entre 3 e 30 caracteres."
                    }
                }
            },
            role_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: { isInt: { msg: "Cargo de funcionário inválido."} }
            },
            specialty_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: { isInt: { msg: "Especialidade de funcionário inválido."} }
            },
            user_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: { isInt: { msg: "Usuário de funcionário inválido."} }
            },
            active: {
                type: DataTypes.TINYINT,
                defaultValue: 1,
                validate: {
                    isInt: {msg: "Estado de funcionário inválido."},
                    isIn: {
                        args: [[0, 1]],
                        msg: "Estado de funcionário inválido."
                    }
                }
            },
            created_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Criador de funcionário inválido."}}
            },
            updated_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Actualizador de funcionário inválido."}}
            },
        }, {
            sequelize,
        });
        return this;
    }
}