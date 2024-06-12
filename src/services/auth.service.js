import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sequelize } from "../utils/sequelize.js";
import { UserService } from "./user.service.js";
import { config } from "../config/config.js";
import { fillRecoveryEmail } from "../email.templates/recovery.js";
import { transporter } from "../utils/mail.js";
const { models } = sequelize;
const { Password } = models;

const userService = new UserService();

export class AuthService {
	constructor() {}

	async getPassword(id) {
		const password = await Password.findByPk(id);
		if (!password) throw Boom.notFound("please reset password");
		return password;
	}

	async login(email, password) {
		const user = await userService.findByEmail(email);
		const { id } = user;
		const { password: hash } = await this.getPassword(id);
		const isMatch = await bcrypt.compare(password, hash);
		if (!isMatch) throw Boom.unauthorized("password is not correct");
		return user;
	}

	signUserToken(user) {
		const payload = {
			sub: user.id,
		};
		const token = jwt.sign(payload, config.jwtSecret);
		return token;
	}

	async sendRecoveryEmail(user) {
		const payload = { sub: user.id };
		const token = jwt.sign(payload, config.jwtSecretRecovery, { expiresIn: "15min" });
		const link = `https://el-fontend.com/recovery?token=${token}`;
		const emailBody = fillRecoveryEmail({
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			link,
			token,
		});

		const info = await transporter.sendMail({
			to: user.email,
			subject: "Recover your password",
			html: emailBody,
		});

		return info;
	}
}
