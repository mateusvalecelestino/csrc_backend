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
            email: { type: DataTypes.STRING },
            tel: { type: DataTypes.STRING(20) },
            employee_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Funcionário inválido."}}
            },
        }, {
            sequelize,
            timestamps: false, // Desabilita o registo de criação e update
        });
        return this;
    }

}
/*
* O atributo defaultValue em todos os campos permitem lançar os erros quando nada for enviado
* Dessa forma uma mensagem clara é enviada ao invés de: field doesn't have a defaultValue
*/