import { sequelize } from "../utils/sequelize.js";
const { models } = sequelize;
const { User } = models;

export class UserService {
	constructor() {}

	async find() {
		const users = await User.findAll();
		return users;
	}
}
