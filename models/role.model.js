import { Model, DataTypes } from "sequelize";

export const ROLE_TABLE = "roles";

export const RoleSchema = {
	id: {
		primaryKey: true,
		type: DataTypes.UUID,
		allowNull: false,
		defaultValue: DataTypes.UUIDV4,
	},
	name: { type: DataTypes.STRING, allowNull: false, unique: true },
};

export default (sequelize) => {
	class Role extends Model {
		static associate(models) {
			const { User } = models;
			this.hasMany(User, { as: "users", foreignKey: "roleId" });
		}
	}
	Role.init(RoleSchema, {
		sequelize,
		modelName: "Role",
		tableName: ROLE_TABLE,
		timestamps: false,
	});
	return Role;
};
