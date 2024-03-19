import {DataTypes, Model} from "sequelize";

export default class Role extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.User, {as: "creator", foreignKey: 'created_by'}); // Assoc. com a table users
        this.belongsTo(models.User, {as: "updater", foreignKey: 'updated_by'}); // Assoc. com a table users
        this.hasMany(models.Employee, { as: 'employee' }); // Assoc. com a table employee
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Definição dos campos do model
            name: {
                type: DataTypes.STRING(50),
                defaultValue: "",
                unique: {msg: "Nome de cargo já existe."},
                validate: {
                    notEmpty: {msg: "Nome de cargo não deve estar vazio."},
                    len: {
                        args: [3, 50],
                        msg: "Nome de cargo deve ter entre 3 e 50 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome de cargo deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            desc: {
                type: DataTypes.STRING(500),
                defaultValue: "",
                unique: {msg: "Descrição de cargo já existe."},
                validate: {
                    notEmpty: {msg: "Cargo não deve estar vazio."},
                    is: {
                        args: /^[a-zA-ZÀ-ÖØ-öø-ÿ.,;'"0-9\s-]{10,500}$/,
                        msg: "Descrição de cargo deve conter entre 10 e 500 caracteres e incluir apenas caracteres especiais necessários."
                    },
                }
            },
            created_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Criador de cargo inválido."}}
            },
            updated_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Actualizador de cargo inválido."}}
            },
        }, {
            sequelize,
        });
        return this;
    }

}
/*
* O atributo defaultValue em todos os campos permitem lançar os erros quando nada for enviado
* Dessa forma uma mensagem clara é enviada ao invés de: field doesn't have a defaultValue
*/