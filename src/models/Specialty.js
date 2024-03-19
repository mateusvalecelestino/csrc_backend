import {DataTypes, Model} from "sequelize";

export default class Specialty extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.User, {as: "creator", foreignKey: 'created_by'}); // Assoc. com a table users
        this.belongsTo(models.User, {as: "updater", foreignKey: 'updated_by'}); // Assoc. com a table users
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Definição dos campos do model
            name: {
                type: DataTypes.STRING(50),
                defaultValue: "",
                unique: {msg: "Nome de especialidade já existe."},
                validate: {
                    notEmpty: {msg: "Nome de especialidade não deve estar vazio."},
                    len: {
                        args: [3, 50],
                        msg: "Nome de especialidade deve ter entre 3 e 50 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome de especialidade deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            created_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Criador de especialidade inválido."}}
            },
            updated_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Actualizador de especialidade inválido."}}
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