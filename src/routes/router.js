import { usersRouter } from "./user.router.js";
import { labelsRouter } from "./label.router.js";

export const setUpRouter = (app) => {
	app.use("/users", usersRouter);
	app.use("/labels", labelsRouter);
};
