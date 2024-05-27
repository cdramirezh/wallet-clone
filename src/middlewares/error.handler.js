import chalk from "chalk";

export const logError = (err, req, res, next) => {
	const PRINT_WHOLE_ERROR_OBJ = false;

	console.error(
		chalk.red(PRINT_WHOLE_ERROR_OBJ ? JSON.stringify(err, null, 2) : err),
	);

	next(err);
};

export const handleBoomError = (err, req, res, next) => {
	if (err.isBoom) {
		const { output } = err;
		res.status(output?.statusCode).json(output?.payload);
	} else next(err);
};

export const handleError = (err, req, res, next) => {
	const { name, message } = err;
	if (err) res.status(500).json({ name, message });
	else next();
};
