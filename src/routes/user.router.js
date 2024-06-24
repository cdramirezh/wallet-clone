import e from "express";
import { UserService } from "../services/user.service.js";
import { passport } from "../middlewares/auth.handler/setUpPassport.js";
import { validateData } from "../middlewares/validate.handler.js";
import {
	createUserSchema,
	getUserSchema,
	partiallyUpdateUserSchema,
	updateUserSchema,
} from "../schemas/user.schema.js";
import {
	actions,
	checkPermissions,
} from "../middlewares/permissions.handler.js";

const router = e.Router();
const service = new UserService();

router.get(
	"/",
	passport.authenticate("jwt-no-db-query", { session: false }),
	checkPermissions(actions.readAny, "user"),
	async (req, res, next) => {
		try {
			const usuarios = await service.find();
			res.json(usuarios);
		} catch (error) {
			next(error);
		}
	},
);

router.get(
	"/:id",
	validateData(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
);

router.post(
	"/",
	validateData(createUserSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const user = await service.create(body);
			res.status(201).json(user);
		} catch (error) {
			next(error);
		}
	},
);

router.put(
	"/:id",
	validateData(getUserSchema, "params"),
	validateData(updateUserSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const user = await service.update(id, body);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
);

router.patch(
	"/:id",
	validateData(getUserSchema, "params"),
	validateData(partiallyUpdateUserSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const user = await service.update(id, body);
			res.json(user);
		} catch (error) {
			next(error);
		}
	},
);

router.delete(
	"/:id",
	validateData(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const deletedId = await service.delete(id);
			res.status(204).json({ id: deletedId });
		} catch (error) {
			next(error);
		}
	},
);

export const usersRouter = router;
