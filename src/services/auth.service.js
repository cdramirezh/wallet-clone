import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PasswordService } from "./password.service.js";
import { UserService } from "./user.service.js";
import { config } from "../config/config.js";
import { fillEmail } from "../email.templates/fillEmail.js";
import { transporter } from "../utils/mail.js";

const userService = new UserService();
const passwordService = new PasswordService();

export class AuthService {
	constructor() {}

	async login(email, password) {
		const user = await userService.findByEmail(email);
		const { id } = user;
		const { password: hash } = await passwordService.findOne(id);
		const isMatch = await bcrypt.compare(password, hash);
		if (!isMatch) throw Boom.unauthorized("password is not correct");
		return user;
	}

	signUserToken(user) {
		const role = user?.role?.name;
		if (!role) throw Boom.badImplementation("need role to sing token");
		const payload = {
			sub: user.id,
			role,
		};
		const token = jwt.sign(payload, config.jwtSecret);
		return token;
	}

	async sendRecoveryEmail(user) {
		const payload = { sub: user.id };
		const token = jwt.sign(payload, config.jwtSecretReset, {
			expiresIn: "15min",
		});
		const link = `https://el-fontend.com/recovery?token=${token}`;
		const emailBody = await fillEmail("password.recovery.html", {
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
