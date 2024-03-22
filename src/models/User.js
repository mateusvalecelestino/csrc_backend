import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
    // Definição as associações (joins)
    static associate(models) {
        this.belongsTo(models.UserType, {
            as: 'type',
            foreignKey: 'user_type',
        }); // Assoc. com a table user_type
        this.belongsTo(models.User, {
            as: 'creator',
            foreignKey: 'created_by',
        }); // Assoc. com a própria table
        this.belongsTo(models.User, {
            as: 'updater',
            foreignKey: 'updated_by',
        }); // Assoc. com a própria table
        this.hasOne(models.Role, {
            as: 'role_creator',
            foreignKey: 'created_by',
        }); // Assoc. com a table roles
        this.hasOne(models.Role, {
            as: 'role_updater',
            foreignKey: 'updated_by',
        }); // Assoc. com a table roles
        this.hasOne(models.Role, {
            as: 'speciality_creator',
            foreignKey: 'created_by',
        }); // Assoc. com a table speciality
        this.hasOne(models.Role, {
            as: 'speciality_updater',
            foreignKey: 'updated_by',
        }); // Assoc. com a table speciality
        this.hasOne(models.Employee, {
            as: 'employees_created',
            foreignKey: 'created_by',
        }); // Assoc. com a table employees
        this.hasOne(models.Employee, {
            as: 'employees_updated',
            foreignKey: 'updated_by',
        }); // Assoc. com a table employees
        this.hasOne(models.Employee, { as: 'employee', foreignKey: 'user_id' }); // Assoc. com a table employee
    }

    static init(sequelize) {
        // Chama o método init da classe pai para definir os campos do modelo
        // noinspection SpellCheckingInspection
        super.init(
            {
                // Definição dos campos do model
                username: {
                    type: DataTypes.STRING(30),
                    defaultValue: '',
                    unique: { msg: 'Nome de utilizador já existe.' },
                    validate: {
                        notEmpty: {
                            msg: 'Nome de utilizador não deve estar vazio.',
                        },
                        len: {
                            args: [3, 30],
                            msg: 'Nome de utilizador deve ter entre 3 e 30 caracteres.',
                        },
                        is: {
                            args: /^[A-Za-zÀ-ú\s]+$/,
                            msg: 'Nome de utilizador deve possuir apenas caracteres alfabéticos.',
                        },
                    },
                },
                user_email: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                    unique: { msg: 'Email de utilizador já existe.' },
                    validate: {
                        isEmail: { msg: 'Email de utilizador inválido.' },
                    },
                },
                password_hash: {
                    type: DataTypes.STRING,
                    defaultValue: '',
                },
                password: {
                    type: DataTypes.VIRTUAL, // Não existe no banco
                    defaultValue: '',
                    validate: {
                        is: {
                            args: /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,255})/g,
                            msg: 'Senha de utilizador deve ter no mínimo 8 caracteres, incluindo pelo menos uma letra minúscula, uma letra maiúscula, um número, um caractere especial e deve ter no máximo 255 caracteres.',
                        },
                    },
                },
                user_type: {
                    type: DataTypes.INTEGER,
                    defaultValue: '',
                    validate: {
                        isInt: { msg: 'Tipo de utilizador inválido.' },
                        isIn: {
                            args: [[1, 2, 3, 4, 5]],
                            msg: 'Tipo de utilizador inválido.',
                        },
                    },
                },
                active: {
                    type: DataTypes.TINYINT,
                    defaultValue: 1,
                    validate: {
                        isInt: { msg: 'Estado de utilizador inválido.' },
                        isIn: {
                            args: [[0, 1]],
                            msg: 'Estado de utilizador inválido.',
                        },
                    },
                },
                created_by: {
                    type: DataTypes.INTEGER,
                    defaultValue: '',
                    validate: {
                        isInt: { msg: 'Criador de utilizador inválido.' },
                    },
                },
                updated_by: {
                    type: DataTypes.INTEGER,
                    defaultValue: '',
                    validate: {
                        isInt: { msg: 'Actualizador de utilizador inválido.' },
                    },
                },
            },
            {
                sequelize,
                hooks: {
                    async beforeSave(user) {
                        if (user.password)
                            user.password_hash = await bcrypt.hash(
                                user.password,
                                8
                            );
                        return user;
                    },
                },
            }
        );
    }

    // Verifica se a senha enviada pelo usuário bate com a hash
    isValidPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}
/*
 * O atributo defaultValue em todos os campos permitem lançar os erros quando nada for enviado
 * Dessa forma uma mensagem clara é enviada ao invés de: field doesn't have a defaultValue
 */
