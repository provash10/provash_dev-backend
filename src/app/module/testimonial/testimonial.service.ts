import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getPublishedTestimonials = async () => {
	return await prisma.testimonial.findMany({
		where: { isPublished: true },
		orderBy: [{ order: "asc" }, { createdAt: "desc" }],
	});
};

const getAllTestimonials = async () => {
	return await prisma.testimonial.findMany({
		orderBy: [{ order: "asc" }, { createdAt: "desc" }],
	});
};

const createTestimonial = async (payload: any) => {
	return await prisma.testimonial.create({
		data: payload,
	});
};

const updateTestimonial = async (id: string, payload: any) => {
	const existing = await prisma.testimonial.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Testimonial not found");
	}

	return await prisma.testimonial.update({
		where: { id },
		data: payload,
	});
};

const deleteTestimonial = async (id: string) => {
	const existing = await prisma.testimonial.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Testimonial not found");
	}

	return await prisma.testimonial.delete({
		where: { id },
	});
};

export const TestimonialService = {
	getPublishedTestimonials,
	getAllTestimonials,
	createTestimonial,
	updateTestimonial,
	deleteTestimonial,
};
