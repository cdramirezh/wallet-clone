import passport from "passport";
import { LocalStrategy } from "./strategies/local.strategy.js";
import { JwtStrategyDefault, JwtStrategyNoDBQuery, JwtStrategyReset } from "./strategies/jwt.strategy.js";

passport.use(LocalStrategy);
passport.use("jwt-default", JwtStrategyDefault);
passport.use("jwt-no-db-query", JwtStrategyNoDBQuery);
passport.use("jwt-reset", JwtStrategyReset);

export { passport };
