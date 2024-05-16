"use strict";
import { Model, DataTypes } from "sequelize";

export const LABEL_TABLE = "labels";

export const LabelSchema = {
	id: { primaryKey: true, type: DataTypes.UUID, allowNull: false },
	name: { type: DataTypes.STRING, allowNull: false },
	color: { type: DataTypes.STRING },
	autoAssignToNewRecords: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	archived: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	userId: {
		field: "user_id",
		allowNull: false,
		type: DataTypes.UUID,
		references: {
			model: "Users",
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "CASCADE",
	},
};

export default (sequelize) => {
	class Label extends Model {
		static associate(models) {
			const { User } = models;
			this.belongsTo(User, { as: "user" });
		}
	}
	Label.init(LabelSchema, {
		sequelize,
		modelName: "Label",
		timestamps: false,
	});
	return Label;
};
