"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		const { DataTypes } = Sequelize;
		await queryInterface.createTable("passwords", {
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
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("passwords");
	},
};
