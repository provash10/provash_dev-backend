import { prisma } from "../../lib/prisma";
import { SoftwareService } from "../software/software.service";

// admin overview metrics service
const getAdminOverview = async () => {
	// console.log("admin fetching studio overview metrics")
	const [totalInquiries, totalServices, totalUsers] = await Promise.all([
		prisma.inquiry.count(),
		prisma.service.count(),
		prisma.user.count({ where: { role: "CLIENT" } }),
	]);

	const softwareList = await SoftwareService.getAllSoftware({});
	const totalSoftware = softwareList.length;

	const recentInquiries = await prisma.inquiry.findMany({
		take: 10,
		orderBy: { createdAt: "desc" },
	});

	return {
		totalInquiries,
		totalServices,
		totalSoftware,
		totalClients: totalUsers,
		recentInquiries,
	};
};

export const AdminService = {
	getAdminOverview,
};
