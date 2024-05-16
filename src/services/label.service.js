import { sequelize } from "../utils/sequelize.js";
const { models } = sequelize;
const { Label } = models;

export class LabelService {
	constructor() {}

	async find() {
		const labels = await Label.findAll({ include: "user" });
		return labels;
	}
}
