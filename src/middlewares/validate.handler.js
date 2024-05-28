import Boom from "@hapi/boom";

export const validateData = (schema, mode) => (req, res, next) => {
	const data = req[mode];
	const { error } = schema.validate(data, { abortEarly: false });
	if (error) next(Boom.badRequest(error));
	next();
};
