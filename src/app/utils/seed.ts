import bcryptjs from "bcryptjs";
import config from "../config";
import { prisma } from "../lib/prisma";

// seed super admin function
export const seedSuperAdmin = async () => {
	try {
		const isSuperAdminExist = await prisma.user.findFirst({
			where: {
				role: "SUPER_ADMIN",
			},
		});

		if (isSuperAdminExist) {
			return;
		}

		const hashedPassword = await bcryptjs.hash(
			config.super_admin_password,
			config.bcrypt_salt_rounds,
		);

		await prisma.user.create({
			data: {
				name: config.super_admin_name,
				email: config.super_admin_email,
				password: hashedPassword,
				role: "SUPER_ADMIN",
				status: "ACTIVE",
			},
		});

		// console.log("super admin seeded successfully")
	} catch (error) {
		// console.log("error seeding super admin", error)
	}
};
