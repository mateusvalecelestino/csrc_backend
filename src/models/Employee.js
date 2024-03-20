import {DataTypes, Model} from "sequelize";

export default class Employee extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.Role, {as: 'role'}); // Assoc. com a table roles
        this.belongsTo(models.Specialty, {as: 'specialty'}); // Assoc. com a table specialties
        this.hasOne(models.EmployeeContact, {as: 'contact'}); // Assoc. com a table employees_contacts
        this.belongsTo(models.User, {as: 'user'}); // Assoc. com a table users
        this.belongsTo(models.User, {as: "creator", foreignKey: 'created_by'});
        this.belongsTo(models.User, {as: "updater", foreignKey: 'updated_by'});
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init({
            // Campos para criação de users
            username: {
                type: DataTypes.VIRTUAL,
                defaultValue: "",
                unique: {msg: "Nome de utilizador já existe."},
                validate: {
                    notEmpty: {msg: "Nome de utilizador não deve estar vazio."},
                    len: {
                        args: [3, 30],
                        msg: "Nome de utilizador deve ter entre 3 e 30 caracteres."
                    },
                    is: {
                        args: /^[A-Za-zÀ-ú\s]+$/,
                        msg: "Nome de utilizador deve possuir apenas caracteres alfabéticos."
                    },
                }
            },
            user_email: {
                type: DataTypes.VIRTUAL,
                defaultValue: "",
                unique: {msg: "Email de utilizador já existe."},
                validate: {isEmail: {msg: "Email de utilizador inválido."}}
            },
            password: {
                type: DataTypes.VIRTUAL, // Não existe no banco
                defaultValue: "",
                validate: {
                    is: {
                        args: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,255})/g,
                        msg: "Senha de utilizador deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula, um número, um caractere especial e deve ter no máximo 255 caracteres."
                    },
                }
            },
            user_type: {
                type: DataTypes.VIRTUAL,
                defaultValue: "",
                validate: {
                    isInt: {msg: "Tipo de utilizador inválido."},
                    isIn: {
                        args: [[1, 2, 3, 4, 5]],
                        msg: "Tipo de utilizador inválido."
                    }
                }
            },
            // Campos para a criação de employee
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
                validate: {isDate: {msg: "Data de nascimento de funcionário inválida."}}
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
                unique: {msg: "Número de ordem já existe."},
                validate: {
                    notEmpty: {msg: "Número de ordem de funcionário não pode ser vazio."},
                    len: {
                        args: [3, 30],
                        msg: "Número de ordem de funcionário deve ter entre 3 e 30 caracteres."
                    }
                }
            },
            role_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Cargo de funcionário inválido."}}
            },
            specialty_id: {
                type: DataTypes.INTEGER,
                defaultValue: "",
                validate: {isInt: {msg: "Especialidade de funcionário inválido."}}
            },
            user_id: {
                type: DataTypes.INTEGER,
                defaultValue: ""
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
            hooks: {
                // Cria o usuário antes do employee
                async beforeCreate(employee, options) {
                    const t = options.transaction;
                    try {
                        const userData = {
                            username: employee.username,
                            user_email: employee.user_email,
                            password: employee.password,
                            user_type: employee.user_type,
                            created_by: employee.created_by,
                            updated_by: employee.updated_by
                        };

                        const user = await this.sequelize.models.User.create(userData, {transaction: t});
                        employee.user_id = user.id;
                    } catch (error) {
                        throw error;
                    }
                }
            }
        });
        return this;
    }
}