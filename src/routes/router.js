import e from "express";
import { usersRouter } from "./user.router.js";
import { labelsRouter } from "./label.router.js";
import { authRouter } from "./auth.router.js";

// Setting up router v1
const routerV1 = e.Router();

routerV1.use("/users", usersRouter);
routerV1.use("/labels", labelsRouter);
routerV1.use("/auth", authRouter);
// End setting up router v1

export const setUpRouter = (app) => {
	app.use("/api/v1", routerV1);
};
