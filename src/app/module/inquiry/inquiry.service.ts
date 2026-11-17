import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const createInquiry = async (payload: any, userId?: string) => {
	return await prisma.inquiry.create({
		data: {
			...payload,
			userId: userId || null,
		},
		include: {
			service: {
				select: { id: true, title: true, category: true },
			},
		},
	});
};

const getAllInquiries = async (query: { status?: any }) => {
	const where: any = {};
	if (query.status) {
		where.status = query.status;
	}

	return await prisma.inquiry.findMany({
		where,
		include: {
			service: {
				select: { id: true, title: true, category: true },
			},
			user: {
				select: { id: true, name: true, email: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});
};

const getInquiryById = async (id: string) => {
	const inquiry = await prisma.inquiry.findUnique({
		where: { id },
		include: {
			service: true,
			user: {
				select: { id: true, name: true, email: true, phone: true },
			},
		},
	});

	if (!inquiry) {
		throw new AppError(httpStatus.NOT_FOUND, "Inquiry not found");
	}

	return inquiry;
};

const updateInquiryStatus = async (
	id: string,
	payload: { status: any; notes?: string },
) => {
	const existing = await prisma.inquiry.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Inquiry not found");
	}

	return await prisma.inquiry.update({
		where: { id },
		data: payload,
	});
};

const deleteInquiry = async (id: string) => {
	const existing = await prisma.inquiry.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Inquiry not found");
	}

	return await prisma.inquiry.delete({
		where: { id },
	});
};

export const InquiryService = {
	createInquiry,
	getAllInquiries,
	getInquiryById,
	updateInquiryStatus,
	deleteInquiry,
};
