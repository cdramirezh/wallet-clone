import bcrypt from "bcrypt";
import Boom from "@hapi/boom";
import { sequelize } from "../utils/sequelize.js";

const { models } = sequelize;
const { Password } = models;

export class PasswordService {
	constructor() {}

	async findOne(userId) {
		const credentials = await Password.findByPk(userId);
		if (!credentials) throw Boom.notFound("please reset password");
		return credentials;
	}

	async create(userId, password) {
		const hash = await bcrypt.hash(password, 5);
		const newCredentials = await Password.create({ userId, password: hash });
		return newCredentials;
	}

	async update(userId, newPassword) {
		const credentials = await this.findOne(userId);
		const hash = await bcrypt.hash(newPassword, 5);
		const newCredentials = await credentials.update({ userId, password: hash });
		return newCredentials;
	}

	async updateOrCreate(userId, newPassword) {
		const credentials = await Password.findByPk(userId);
		const newCredentials = !credentials
			? await this.create(userId, newPassword)
			: await this.update(userId, newPassword);
		return newCredentials;
	}

	// TO DO
	// async delete(userId) {
	// const credentials = await this.findOne(userId);
	// await credentials.destroy();
	// }
}
