"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
	async up(queryInterface, Sequelize) {
		const DataTypes = Sequelize.DataTypes;

		await queryInterface.changeColumn("Users", "id", {
			primaryKey: true,
			type: DataTypes.UUID,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		});
	},

	async down(queryInterface, Sequelize) {
		const DataTypes = Sequelize.DataTypes;

		await queryInterface.changeColumn("Users", "id", {
			primaryKey: true,
			type: DataTypes.UUID,
			allowNull: false,
		});
	},
};
