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
	dbUrl: process.env.DATABASE_URL, // Intended for a database accesible across the internet
	dbPrivateUrl: process.env.DATABASE_PRIVATE_URL, // Intended for a database accesible only in a closed environment
	jwtSecret: process.env.JWT_SECRET, // Intended for user authentication tokens
	jwtSecretReset: process.env.JWT_SECRET_RESET, // Intended for password reset
	emailUser: process.env.EMAIL_USER,
	emailPass: process.env.EMAIL_PASS,
};
