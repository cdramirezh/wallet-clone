import Boom from "@hapi/boom";
import { ac } from "../utils/access.control.js";

export const checkPermissions = (action, resource) => (req, res, next) => {
	const role = req?.user?.role?.name || req?.user?.role;
	if (!role) next(Boom.unauthorized());
	try {
		const permission = ac.can(role)[action](resource);
		if (!permission.granted) next(Boom.unauthorized());
		else next();
	} catch (err) {
		next(Boom.badImplementation("Some dev didn't write a correct action"));
	}
};

export const actions = {
	createAny: "createAny",
	readAny: "readAny",
	updateAny: "updateAny",
	deleteAny: "deleteAny",
	createOwn: "createOwn",
	readOwn: "readOwn",
	updateOwn: "updateOwn",
	deleteOwn: "deleteOwn",
};
