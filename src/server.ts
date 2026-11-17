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
		// connect to database
		await prisma.$connect();
		// console.log("database connected successfully via prisma")

		// seed super admin user
		await seedSuperAdmin();

		// start express http server
		app.listen(PORT, () => {
			// console.log("provash agency backend api running on port")
			// console.log("server running successfully")
		});

		// connect to redis cloud client in background
		redisClient.connect().catch((_redisErr) => {
			// console.log("redis cloud connection notice", _redisErr)
		});

		// verify nodemailer smtp configuration in background
		transporter.verify().catch((_mailErr) => {
			// console.log("nodemailer smtp verification notice", _mailErr)
		});
	} catch (error) {
		// console.log("failed to start the server", error)
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();
