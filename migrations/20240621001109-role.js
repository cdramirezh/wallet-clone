"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const roles = [
			{ id: "bdb2e6ee-6d68-419d-8516-81d860f070ba", name: "user" },
			{ id: "973b3d00-91e8-48ff-9dd7-0fc26d96d480", name: "admin" },
		];
		const { DataTypes } = Sequelize;
		await queryInterface.createTable("roles", {
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
			},
			name: { type: DataTypes.STRING, allowNull: false, unique: true },
		});
		await queryInterface.bulkInsert("roles", roles);
		await queryInterface.addColumn("users", "role_id", {
			allowNull: false,
			defaultValue: roles[0].id,
			type: DataTypes.UUID,
			references: { model: "roles", key: "id" },
			onUpdate: "CASCADE",
			onDelete: "SET DEFAULT",
		});
	},

	async down(queryInterface) {
		await queryInterface.removeColumn("users", "role_id");
		await queryInterface.dropTable("roles");
	},
};
