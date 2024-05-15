import { usersRouter } from "./user.router.js";

export const setUpRouter = (app) => {
	app.use("/users", usersRouter);
};
