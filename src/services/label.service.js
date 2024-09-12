import Boom from "@hapi/boom";
import { sequelize } from "../utils/sequelize.js";
const { models } = sequelize;
const { Label } = models;

export class LabelService {
	constructor() {}

	async find() {
		const labels = await Label.findAll({ include: "user" });
		return labels;
	}

	async findOne(id) {
		const label = await Label.findByPk(id);
		if (!label) throw Boom.notFound("label not found");
		return label;
	}

	async findByUser(id) {
		const labels = await Label.findAll({ where: { userId: id } });
		return labels;
	}

	async create(label) {
		const newLabel = await Label.create(label);
		return newLabel;
	}

	async update(id, changes) {
		const label = await this.findOne(id);
		const updatedLabel = await label.update(changes);
		return updatedLabel;
	}

	async delete(id) {
		const label = await this.findOne(id);
		await label.destroy();
		return { id };
	}
}
