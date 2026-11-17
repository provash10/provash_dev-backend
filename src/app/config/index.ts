import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

// application configuration values
const config = {
	node_env: process.env.NODE_ENV || "development",
	port: process.env.PORT ? Number(process.env.PORT) : 5000,
	database_url: process.env.DATABASE_URL,
	backend_url: process.env.BACKEND_URL || "http://localhost:5000",
	frontend_url: process.env.FRONTEND_URL || "http://localhost:3000",
	bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS
		? Number(process.env.BCRYPT_SALT_ROUNDS)
		: 10,
	jwt_access_secret:
		process.env.JWT_ACCESS_SECRET || "provash_super_secret_access_key",
	jwt_refresh_secret:
		process.env.JWT_REFRESH_SECRET || "provash_super_secret_refresh_key",
	jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
	jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
	super_admin_name: process.env.SUPER_ADMIN_NAME || "Provash Admin",
	super_admin_email: process.env.SUPER_ADMIN_EMAIL || "admin@provash.dev",
	super_admin_password:
		process.env.SUPER_ADMIN_PASSWORD || "Admin@provash123",
};

export default config;
