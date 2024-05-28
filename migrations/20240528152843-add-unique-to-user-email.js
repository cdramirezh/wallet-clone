"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addConstraint("users", {
			fields: ["email"],
			type: "unique",
			name: "unique_user_email",
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeConstraint("unique_user_email");
	},
};
