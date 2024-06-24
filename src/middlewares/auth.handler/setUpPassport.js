import passport from "passport";
import { LocalStrategy } from "./strategies/local.strategy.js";
import { JwtStrategyDefault, JwtStrategyReset } from "./strategies/jwt.strategy.js";

passport.use(LocalStrategy);
passport.use("jwt-default", JwtStrategyDefault);
passport.use("jwt-reset", JwtStrategyReset);

export { passport };
