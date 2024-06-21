import Boom from "@hapi/boom";
import { PasswordService } from "./password.service.js";
import { sequelize } from "../utils/sequelize.js";

const { models } = sequelize;
const { User } = models;
const passwordService = new PasswordService();

export class UserService {
	constructor() {}

	async find() {
		const users = await User.findAll();
		return users;
	}

	async findOne(id) {
		const user = await User.findByPk(id, { include: ["role", "labels"] });
		if (!user) throw Boom.notFound("user not found");
		return user;
	}

	async findByEmail(email) {
		const user = await User.findOne({ where: { email }, include: "role" });
		if (!user) throw Boom.notFound("user not found");
		return user;
	}

	async create(user) {
		const password = user.password;
		delete user.password;
		const newUser = await User.create(user);
		await passwordService.create(newUser.id, password);
		return newUser;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		const updatedUser = await user.update(changes);
		return updatedUser;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}
