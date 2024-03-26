import Sequelize, { Model } from 'sequelize'; // Import do Sequelize e o model

export default class UserType extends Model {
  // Classe representando o modelo UserType
  static associate(models) {
    this.hasMany(models.User, { as: 'type', foreignKey: 'user_type' });
  }

  // Método estático para inicializar o modelo UserType
  static init(sequelize) {
    // Chama o método init da classe pai para definir os campos do modelo
    super.init(
      {
        // Definição dos campos do model
        name: Sequelize.STRING(20),
        desc: Sequelize.STRING(30),
        home: Sequelize.STRING,
      },
      {
        sequelize, // Opção para passar a conexão com o banco de dados
        timestamps: false, // Desabilita o registo de criação e update
      }
    );
    return this; // Retorna a própria classe para permitir encadeamento de métodos
  }
}
