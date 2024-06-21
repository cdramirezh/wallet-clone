"use strict";
import { Model, DataTypes } from "sequelize";

export const USER_TABLE = "users";

export const UserSchema = {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: DataTypes.STRING,
	email: { allowNull: false, type: DataTypes.STRING, unique: true },
	roleId: {
		field: "role_id",
		allowNull: false,
		defaultValue: "bdb2e6ee-6d68-419d-8516-81d860f070ba",
		type: DataTypes.UUID,
		references: { model: "roles", key: "id" },
		onUpdate: "CASCADE",
		onDelete: "SET DEFAULT",
	},
};

export default (sequelize) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			const { Label, Password, Role } = models;
			this.hasMany(Label, { as: "labels", foreignKey: "userId" });
			this.hasOne(Password, { as: "password", foreignKey: "userId" });
			this.belongsTo(Role, { as: "role" });
		}
	}
	User.init(UserSchema, {
		sequelize,
		modelName: "User",
		tableName: USER_TABLE,
		timestamps: false,
	});
	return User;
};
