module.exports = {
	async up(queryInterface, Sequelize) {
		const { DataTypes } = Sequelize;
		return queryInterface.createTable("labels", {
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
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("labels");
	},
};
