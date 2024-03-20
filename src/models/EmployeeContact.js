import {DataTypes, Model} from "sequelize";

export default class EmployeeContact extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.Employee, {as: "employee"}); // Assoc. com a table employee
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Definição dos campos do model
            email: {
                type: DataTypes.STRING,
                defaultValue: "",
                unique: {msg: "Email de funcionário já existe."},
                validate: { isEmail: {msg: "Email inválido."} }
            },
            tel: {
                type: DataTypes.STRING(20),
                defaultValue: "",
                unique: {msg: "Telefone de funcionário já existe."},
                validate: {
                    notEmpty: {msg: "Telefone de funcionário não deve estar vazio."},
                    len: {
                        args: [12, 20],
                        msg: "Telefone deve possuir entre 12 e 20 caracteres."
                    }
                }
            },
            employee_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Funcionário inválido."}}
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