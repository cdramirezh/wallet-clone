import "dotenv/config.js";

export const config = {
	port: process.env.PORT,
	env: process.env.NODE_ENV,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
	dbHost: process.env.DB_HOST,
	dbName: process.env.DB_NAME,
	dbPort: process.env.DB_PORT,
	dbEngine: process.env.DB_ENGINE,
	dbUrl: process.env.DATABASE_URL,
	dbPrivateUrl: process.env.DATABASE_PRIVATE_URL,
	jwtSecret: process.env.JWT_SECRET,
	jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY,
	emailUser: process.env.EMAIL_USER,
	emailPass: process.env.EMAIL_PASS,
};
