import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Backend working");
});

app.listen(port, () => {
	console.log(`Backend started on port ${port}`);
});
