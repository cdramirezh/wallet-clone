import { config } from "../config/config.js";

let URI;

if (config.dbPrivateUrl) URI = config.dbPrivateUrl;
else if (config.dbUrl) URI = config.dbUrl;
else {
	const DB_NAME = config.dbName;
	const ENGINE = config.dbEngine;
	const HOST = config.dbHost;
	const PASSWORD = encodeURIComponent(config.dbPassword);
	const PORT = config.dbPort;
	const USER = encodeURIComponent(config.dbUser);

	URI = `${ENGINE}://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;
}

export default URI;
