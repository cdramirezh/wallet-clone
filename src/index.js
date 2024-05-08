import express from "express";
import { config } from "./config/config.js";

const app = express();
const port = config.port || 3000;

app.get("/", (req, res) => {
	res.send("Backend working");
});

app.listen(port, () => {
	console.log(`Backend started on port ${port}`);
});
