"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Users", {
			id: {
				primaryKey: true,
				type: Sequelize.DataTypes.UUID,
				allowNull: false,
			},
			firstName: { type: Sequelize.DataTypes.STRING, allowNull: false },
			lastName: Sequelize.DataTypes.STRING,
			email: { allowNull: false, type: Sequelize.DataTypes.STRING },
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable("Users");
	},
};
