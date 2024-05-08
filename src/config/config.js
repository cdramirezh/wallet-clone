import "dotenv/config";

export const config = {
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
};
