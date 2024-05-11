"use strict";
const { Model, DataTypes } = require("sequelize");

export const USER_TABLE = "Users";

export const UserSchema = {
	id: { primaryKey: true, type: DataTypes.UUID, allowNull: false },
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: DataTypes.STRING,
	email: { allowNull: false, type: DataTypes.STRING },
};

export default (sequelize) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(UserSchema, {
		sequelize,
		modelName: "User",
		timestamps: false,
	});
	return User;
};
