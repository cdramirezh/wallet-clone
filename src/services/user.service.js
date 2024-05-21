import { sequelize } from "../utils/sequelize.js";
const { models } = sequelize;
const { User } = models;

export class UserService {
	constructor() {}

	async find() {
		const users = await User.findAll({ include: "labels" });
		return users;
	}

	async findOne(id) {
		const user = await User.findByPk(id);
		return user;
	}

	async create(user) {
		const newUser = await User.create(user);
		return newUser;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		return await user.update(changes);
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}
