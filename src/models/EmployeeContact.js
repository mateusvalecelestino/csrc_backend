import Sequelize, {DataTypes, Model} from "sequelize"; // Import do Sequelize e o model

export default class EmployeeContact extends Model {
    // Classe representando o modelo EmployeeContact
    static associate(models) {
        this.belongsTo(models.Employee, {as: 'employee', foreignKey: 'employee_id'});
    }

    // Método estático para inicializar o modelo EmployeeContact
    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        super.init({
            // Definição dos campos do model
            email: DataTypes.STRING,
            tel: DataTypes.STRING(15),
            employee_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: "",
                validate: { isInt: {msg: "Id de funcionário inválido."} }
            }
        }, {
            sequelize, // Opção para passar a conexão com o banco de dados
            timestamps: false, // Desabilita o registo de criação e update
            tableName: 'employees_contacts', // Definindo o nome da tabela explicitamente
        });
        return this; // Retorna a própria classe para permitir encadeamento de métodos
    }
}