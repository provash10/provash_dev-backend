import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";
import { seedSuperAdmin } from "./app/utils/seed";

const PORT = config.port || 5000;

const main = async () => {
	try {
		await prisma.$connect();
		console.log("Database connected successfully via Prisma.");

		await seedSuperAdmin();

		app.listen(PORT, () => {
			console.log(`Provash Agency Backend API running on port ${PORT}`);
			console.log(`URL: http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error("Failed to start the server:", error);
		await prisma.$disconnect();
		process.exit(1);
	}
};

main();
