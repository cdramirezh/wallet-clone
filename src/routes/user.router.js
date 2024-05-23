import e from "express";
import { UserService } from "../services/user.service.js";

const router = e.Router();
const service = new UserService();

router.get("/", async (req, res, next) => {
	try {
		const usuarios = await service.find();
		res.send(usuarios);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const user = await service.findOne(id);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const body = req.body;
		const user = await service.create(body);
		res.status(201).json(user);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const user = await service.update(id, body);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.patch("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const body = req.body;
		const user = await service.update(id, body);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		await service.delete(id);
		res.status(201).json({ id });
	} catch (error) {
		next(error);
	}
});

export const usersRouter = router;
