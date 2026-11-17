import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";
import { seedSuperAdmin } from "./app/utils/seed";

const PORT = config.port || 5000;

// start server main function
const main = async () => {
	try {
		await prisma.$connect();
		// console.log("database connected successfully via prisma")

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
