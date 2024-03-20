import {DataTypes, Model} from "sequelize";

export default class Patient extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.Employee, {as: "creator", foreignKey: 'created_by'});
        this.belongsTo(models.Employee, {as: "updater", foreignKey: 'updated_by'});
        this.hasOne(models.PatientAddress, {as: "patient_address"});
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Campos para a criação de employee
            full_name: {
                type: DataTypes.STRING(100),
                defaultValue: "",
                validate: {
                    notEmpty: {msg: "Nome de paciente não deve estar vazio."},
                    len: {
                        args: [10, 100],
                        msg: "Nome de paciente deve ter entre 10 e 100 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome de paciente deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            fathers_name: {
                type: DataTypes.STRING(100),
                defaultValue: "",
                validate: {
                    notEmpty: {msg: "Nome do pai do paciente não deve estar vazio."},
                    len: {
                        args: [10, 100],
                        msg: "Nome do pai do paciente deve ter entre 10 e 100 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome do pai do paciente deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            mothers_name: {
                type: DataTypes.STRING(100),
                defaultValue: "",
                validate: {
                    notEmpty: {msg: "Nome da mãe do paciente não deve estar vazio."},
                    len: {
                        args: [10, 100],
                        msg: "Nome da mãe do paciente deve ter entre 10 e 100 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome da mãe do paciente deve possuir apenas caracteres alfabéticos."
                    },
                }
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
            birth_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                defaultValue: "",
                validate: {isDate: {msg: "Data de nascimento do paciente inválida."}}
            },
            street: {
                type: DataTypes.VIRTUAL,
                allowNull: false,
                defaultValue: "",
                is: {
                    args: /^[a-zA-ZÀ-ÖØ-öø-ÿ.,;'"0-9\s-]{3,50}$/,
                    msg: "Nome do bairro deve conter entre 3 e 50 caracteres e incluir apenas caracteres especiais necessários."
                },
            },
            created_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Criador de paciente inválido."}}
            },
            updated_by: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Actualizador de paciente inválido."}}
            },
        }, {
            sequelize,
        });
        return this;
    }
}