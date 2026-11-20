import { prisma } from "../../../lib/prisma";
import { SoftwareService } from "../../software/software.service";

// project manager overview metrics service
const getProjectManagerOverview = async () => {
	// console.log("project manager fetching delivery sprint metrics")
	const [activeInquiries, totalServices] = await Promise.all([
		prisma.inquiry.findMany({
			where: {
				status: { in: ["IN_PROGRESS", "CONTACTED", "PENDING"] },
			},
			orderBy: { createdAt: "desc" },
		}),
		prisma.service.count(),
	]);

	const softwareList = await SoftwareService.getAllSoftware({});
	const totalSoftware = softwareList.length;

	return {
		activeProjectsCount: activeInquiries.length,
		totalSoftware,
		totalServices,
		activeProjects: activeInquiries,
	};
};

export const ProjectManagerService = {
	getProjectManagerOverview,
};
