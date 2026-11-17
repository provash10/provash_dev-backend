import app from "./app";
import config from "./app/config";
import { transporter } from "./app/lib/nodemailer";
import { prisma } from "./app/lib/prisma";
import { redisClient } from "./app/lib/redis";
import { seedSuperAdmin } from "./app/utils/seed";

const PORT = config.port || 5000;

// start server main function
const main = async () => {
	try {
		// connect to postgresql database
		await prisma.$connect();
		// console.log("database connected successfully via prisma")

		// connect to redis cloud client
		try {
			await redisClient.connect();
			// console.log("redis cloud connected successfully")
		} catch (_redisError) {
			// console.log("redis connection error ignored", _redisError)
		}

		// verify nodemailer smtp configuration
		try {
			await transporter.verify();
			// console.log("nodemailer smtp connected successfully")
		} catch (_mailError) {
			// console.log("nodemailer verification notice", _mailError)
		}

		// seed initial super admin user
		await seedSuperAdmin();

		app.listen(PORT, () => {
			// console.log("provash agency backend api running on port")
			// console.log("server running successfully")
		});
	} catch (error) {
		// console.log("failed to start the server", error)
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();
