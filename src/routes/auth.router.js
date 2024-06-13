import Boom from "@hapi/boom";
import e from "express";
import { passport } from "../middlewares/auth.handler/setUpPassport.js";
import { validateData } from "../middlewares/validate.handler.js";
import { AuthService } from "../services/auth.service.js";
import { UserService } from "../services/user.service.js";
import {
	loginSchema,
	recoveryPasswordSchema,
	resetPasswordSchema,
} from "../schemas/user.schema.js";
import { PasswordService } from "../services/password.service.js";

const router = e.Router();
const service = new AuthService();
const userService = new UserService();
const passwordService = new PasswordService();

router.post(
	"/login",
	validateData(loginSchema, "body"),
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const token = service.signUserToken(user);
			res.json({ user, token });
		} catch (err) {
			next(err);
		}
	},
);

router.post(
	"/recovery",
	validateData(recoveryPasswordSchema, "body"),
	async (req, res, next) => {
		try {
			const { email } = req.body;
			const user = await userService.findByEmail(email);
			const info = await service.sendRecoveryEmail(user);
			res.json(info);
		} catch (err) {
			if (err.isBoom && err?.output?.payload?.statusCode === 404)
				next(Boom.unauthorized("Se te acabaron las fiestas"));
			else next(err);
		}
	},
);

router.patch(
	"/reset",
	validateData(resetPasswordSchema, "body"),
	passport.authenticate("jwt-reset", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const newPassword = req.body.newPassword;
			await passwordService.updateOrCreate(user.id, newPassword);
			const token = service.signUserToken(user);
			res.json({ user, token });
		} catch (err) {
			next(err);
		}
	},
);

export const authRouter = router;
