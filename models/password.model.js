import { Model, DataTypes } from "sequelize";

export const PASSWORD_TABLE = "passwords";

export const PasswordSchema = {
	userId: {
		primaryKey: true,
		field: "user_id",
		allowNull: false,
		type: DataTypes.UUID,
		references: {
			model: "users",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING,
	},
};

export default (sequelize) => {
	class Password extends Model {
		static associate(models) {
			const { User } = models;
			this.belongsTo(User, { foreignKey: "userId" });
		}
	}
	Password.init(PasswordSchema, {
		sequelize,
		modelName: "Password",
		tableName: PASSWORD_TABLE,
		timestamps: false,
	});
	return Password;
};
