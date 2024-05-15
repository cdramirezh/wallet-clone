import { promises as fs } from "fs";
import path from "path";

export const setUpModels = async (sequelize) => {
	const modelsDirectory = "models/";
	const modelsDirectoryRelativePath = "../models";

	const files = await fs.readdir(modelsDirectory);
	const modelFiles = files.filter((file) => file.endsWith(".model.js"));
	// import models
	const modules = await Promise.all(
		modelFiles.map((modelFile) => {
			const modelPath = path.join(modelsDirectoryRelativePath, modelFile);
			return import(modelPath);
		}),
	);

	const models = {};
	modules.forEach((module) => {
		const model = module
			// Init the model and return the model class
			.default(sequelize);
		// Store model for executing it's associate method later
		models[module.modelName] = model;
	});

	// Set up model relationships
	Object.keys(models).forEach((modelName) => {
		if (models[modelName].associate) {
			models[modelName].associate(models);
		}
	});
};
