import dbUrl from "../src/utils/dbUrl";
import { config } from "../src/config/config";

const ENGINE = config.ENGINE;

export default {
	development: {
		url: dbUrl,
		dialect: ENGINE,
	},
	test: {
		url: dbUrl,
		dialect: ENGINE,
	},
	production: {
		url: dbUrl,
		dialect: ENGINE,
	},
};
