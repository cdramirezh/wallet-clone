import bcrypt from "bcrypt";
// import { Boom } from "@hapi/boom";
import { sequelize } from "../utils/sequelize.js";

const { models } = sequelize;
const { Password } = models;

export class PasswordService {
	constructor() {}

	// TO DO
	// async findOne(userId) {
	// const credentials = await Password.findByPk(userId);
	// if (!credentials) throw Boom.notFound("please reset password");
	// return credentials;
	// }

	async create(userId, password) {
		const hash = await bcrypt.hash(password, 5);
		const newCredentials = await Password.create({ userId, password: hash });
		return newCredentials;
	}

	// TO DO
	// async update(userId, password) {
	// const credentials = await this.findOne(userId);
	// const hash = await bcrypt.hash(password, 5);
	// return await credentials.update({ userId, password: hash });
	// }

	// TO DO
	// async delete(userId) {
	// const credentials = await this.findOne(userId);
	// await credentials.destroy();
	// }
}
