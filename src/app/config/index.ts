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

	// google oauth client id
	google_client_id: process.env.GOOGLE_CLIENT_ID || "",

	// redis credentials
	redis_user: process.env.REDIS_USER || "default",
	redis_password: process.env.REDIS_PASSWORD || "",
	redis_host: process.env.REDIS_HOST || "",
	redis_port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,

	// email smtp credentials
	smtp_user: process.env.SMTP_USER || "",
	smtp_password: process.env.SMTP_PASSWORD || "",
	email_sender: process.env.EMAIL_SENDER || "",

	// cloudinary media credentials
	cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
	cloudinary_api_key: process.env.CLOUDINARY_API_KEY || "",
	cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET || "",

	// bkash payment gateway credentials
	bkash_base_url:
		process.env.BKASH_BASE_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta",
	bkash_username: process.env.BKASH_USERNAME || "",
	bkash_password: process.env.BKASH_PASSWORD || "",
	bkash_app_key: process.env.BKASH_APP_KEY || "",
	bkash_app_secret: process.env.BKASH_APP_SECRET || "",
	bkash_callback_url:
		process.env.BKASH_CALLBACK_URL ||
		"http://localhost:5000/api/v1/payments/bkash/callback",
};

export default config;
