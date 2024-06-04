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
};

export default (sequelize) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			const { Label, Password } = models;
			this.hasMany(Label, { as: "labels", foreignKey: "userId" });
			this.hasOne(Password, { as: "password", foreignKey: "userId" });
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
