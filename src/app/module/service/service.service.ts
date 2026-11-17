import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

// get all public active services
const getAllServices = async (query: { category?: any; featured?: string }) => {
	// console.log("fetching active services")
	const where: any = { isActive: true };

	if (query.category) {
		where.category = query.category;
	}

	if (query.featured === "true") {
		where.isFeatured = true;
	}

	return await prisma.service.findMany({
		where,
		orderBy: [{ order: "asc" }, { createdAt: "desc" }],
	});
};

// get all services for admin
const getAdminAllServices = async () => {
	// console.log("fetching all services for admin")
	return await prisma.service.findMany({
		orderBy: [{ order: "asc" }, { createdAt: "desc" }],
	});
};

// get single service by slug
const getServiceBySlug = async (slug: string) => {
	// console.log("fetching service by slug")
	const service = await prisma.service.findUnique({
		where: { slug },
	});

	if (!service) {
		throw new AppError(httpStatus.NOT_FOUND, "Service not found");
	}

	return service;
};

// create service
const createService = async (payload: any) => {
	// console.log("creating new service")
	const existing = await prisma.service.findUnique({
		where: { slug: payload.slug },
	});

	if (existing) {
		throw new AppError(
			httpStatus.CONFLICT,
			"A service with this slug already exists",
		);
	}

	return await prisma.service.create({
		data: payload,
	});
};

// update service
const updateService = async (id: string, payload: any) => {
	// console.log("updating existing service")
	const existing = await prisma.service.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Service not found");
	}

	return await prisma.service.update({
		where: { id },
		data: payload,
	});
};

// delete service
const deleteService = async (id: string) => {
	// console.log("deleting service")
	const existing = await prisma.service.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Service not found");
	}

	return await prisma.service.delete({
		where: { id },
	});
};

export const ServiceService = {
	getAllServices,
	getAdminAllServices,
	getServiceBySlug,
	createService,
	updateService,
	deleteService,
};
