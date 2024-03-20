import Sequelize, {DataTypes, Model} from "sequelize"; // Import do Sequelize e o model

export default class PatientAddress extends Model {
    // Classe representando o modelo PatientAddress
    static associate(models) {
        this.belongsTo(models.Patient, {as: 'patient', foreignKey: 'patient_id'});
    }

    // Método estático para inicializar o modelo PatientAddress
    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        super.init({
            // Definição dos campos do model
            street: {
                type: DataTypes.STRING(50),
                allowNull: false,
                defaultValue: "",
                is: {
                    args: /^[a-zA-ZÀ-ÖØ-öø-ÿ.,;'"0-9\s-]{3,50}$/,
                    msg: "Nome do bairro deve conter entre 3 e 50 caracteres e incluir apenas caracteres especiais necessários."
                },
            },
            patient_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                defaultValue: "",
                validate: { isInt: {msg: "Id de paciente inválido."} }
            }
        }, {
            sequelize, // Opção para passar a conexão com o banco de dados
            timestamps: false, // Desabilita o registo de criação e update
            tableName: 'patients_addresses', // Definindo o nome da tabela explicitamente
        });
        return this; // Retorna a própria classe para permitir encadeamento de métodos
    }
}