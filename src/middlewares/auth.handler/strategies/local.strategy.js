import { Strategy } from "passport-local";
import { AuthService } from "../../../services/auth.service.js";

const service = new AuthService();

export const LocalStrategy = new Strategy(
	"local",
	async (email, password, done) => {
		// passport gets 'username' & 'password' himself and executes this functions with them as params
		try {
			const user = await service.login(email, password);
			done(null, user); // this adds user to the req
		} catch (err) {
			done(err, false);
		}
	},
);
