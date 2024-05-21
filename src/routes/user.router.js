import e from "express";
import { UserService } from "../services/user.service.js";

const router = e.Router();
const service = new UserService();

router.get("/", async (req, res) => {
	const usuarios = await service.find();
	res.send(usuarios);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const user = await service.findOne(id);
	res.json(user);
});

router.post("/", async (req, res) => {
	const body = req.body;
	const user = await service.create(body);
	res.json(user);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const user = await service.update(id, body);
	res.json(user);
});

router.patch("/:id", async (req, res) => {
	const { id } = req.params;
	const body = req.body;
	const user = await service.update(id, body);
	res.json(user);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await service.delete(id);
	res.status(201).json({ id });
});

export const usersRouter = router;
