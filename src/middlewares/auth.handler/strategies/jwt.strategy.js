import { Strategy, ExtractJwt } from "passport-jwt";
import { config } from "../../../config/config.js";
import { UserService } from "../../../services/user.service.js";

const userService = new UserService();

const createJwtStrategy = (secretOrKey, doNotQueryDB) => {
	var options = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey,
	};

	// El strategy, usando el secretOrKey y el jwtFromRequest autentica y devuelve el jwtPayload
	return new Strategy(options, async (jwtPayload, done) => {
		try {
			const id = jwtPayload.sub;
			const user = doNotQueryDB ? jwtPayload : await userService.findOne(id);
			if (!user) return done(null, false);
			// 'done' mete el segundo argumento dentro request.user.
			else return done(null, user);
		} catch (err) {
			// Es un error-first callback
			return done(err, false);
		}
	});
};

export const JwtStrategyDefault = createJwtStrategy(config.jwtSecret);
export const JwtStrategyNoDBQuery = createJwtStrategy(config.jwtSecret, true);
export const JwtStrategyReset = createJwtStrategy(config.jwtSecretReset);
