import passport from "passport";
import { LocalStrategy } from "./strategies/local.strategy.js";
import { JwtStrategyReset } from "./strategies/jwt.strategy.js";

passport.use(LocalStrategy);
passport.use("jwt-reset", JwtStrategyReset);

export { passport };
