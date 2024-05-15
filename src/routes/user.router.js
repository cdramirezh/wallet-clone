import e from "express";
import { UserService } from "../services/user.service.js";

const router = e.Router();
const service = new UserService();

router.get("/", async (req, res) => {
	const usuarios = await service.find();
	res.send(usuarios);
});

export const usersRouter = router;
