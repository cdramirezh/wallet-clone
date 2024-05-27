import express from "express";
import { config } from "./config/config.js";
import { sequelize } from "./utils/sequelize.js";
import { setUpRouter } from "./routes/router.js";
import {
	handleBoomError,
	handleError,
	logError,
} from "./middlewares/error.handler.js";

const app = express();
const port = config.port || 3000;

app.get("/", async (req, res) => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
		res.send("Backend working");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
		res.send("db error");
	}
});

app.use(express.json());
setUpRouter(app);

app.use(logError);
app.use(handleBoomError);
app.use(handleError);

app.listen(port, () => {
	console.log(`Backend started on port ${port}`);
});
