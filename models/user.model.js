"use strict";
import { Model, DataTypes } from "sequelize";

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
			const { Label } = models;
			this.hasMany(Label, { as: "labels", foreignKey: "userId" });
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
