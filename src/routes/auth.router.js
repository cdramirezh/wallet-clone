import e from "express";
import { passport } from "../middlewares/auth.handler/setUpPassport.js";
import { AuthService } from "../services/auth.service.js";
import { validateData } from "../middlewares/validate.handler.js";
import { loginSchema } from "../schemas/user.schema.js";

const router = e.Router();
const service = new AuthService();

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

export const authRouter = router;
