import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getAllProjects = async (query: {
	category?: string;
	featured?: string;
}) => {
	const where: any = {};
	if (query.category) {
		where.category = query.category;
	}
	if (query.featured === "true") {
		where.featured = true;
	}

	return await prisma.portfolioProject.findMany({
		where,
		orderBy: [{ order: "asc" }, { createdAt: "desc" }],
	});
};

const getProjectBySlug = async (slug: string) => {
	const project = await prisma.portfolioProject.findUnique({
		where: { slug },
	});

	if (!project) {
		throw new AppError(httpStatus.NOT_FOUND, "Portfolio project not found");
	}

	return project;
};

const createProject = async (payload: any) => {
	const existing = await prisma.portfolioProject.findUnique({
		where: { slug: payload.slug },
	});

	if (existing) {
		throw new AppError(
			httpStatus.CONFLICT,
			"Project with this slug already exists",
		);
	}

	return await prisma.portfolioProject.create({
		data: payload,
	});
};

const updateProject = async (id: string, payload: any) => {
	const existing = await prisma.portfolioProject.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Portfolio project not found");
	}

	return await prisma.portfolioProject.update({
		where: { id },
		data: payload,
	});
};

const deleteProject = async (id: string) => {
	const existing = await prisma.portfolioProject.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Portfolio project not found");
	}

	return await prisma.portfolioProject.delete({
		where: { id },
	});
};

export const PortfolioService = {
	getAllProjects,
	getProjectBySlug,
	createProject,
	updateProject,
	deleteProject,
};
