import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { sendEmail } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import {
	generateAdminInquiryEmail,
	generateClientWelcomeEmail,
} from "../../templates/emailTemplates";

// create inquiry and trigger email notifications service
const createInquiry = async (payload: any, userId?: string) => {
	const newInquiry = await prisma.inquiry.create({
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

	// asynchronously trigger email notifications without blocking client response
	try {
		const adminEmail = config.super_admin_email || "provashsharma10@gmail.com";
		sendEmail({
			to: adminEmail,
			subject: `New Client Inquiry: ${newInquiry.name} (${newInquiry.budget || "Custom"})`,
			html: generateAdminInquiryEmail(newInquiry),
		}).catch((_err) => {
			// console.log("admin email dispatch notice", _err)
		});

		sendEmail({
			to: newInquiry.email,
			subject: "Thank you for contacting Provash Digital Agency!",
			html: generateClientWelcomeEmail(newInquiry.name, newInquiry.message),
		}).catch((_err) => {
			// console.log("client email dispatch notice", _err)
		});
	} catch (_err) {
		// console.log("email service notice", _err)
	}

	return newInquiry;
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

// get logged in client own inquiries
const getMyInquiries = async (userId?: string, email?: string) => {
	const orConditions: any[] = [];
	if (userId) orConditions.push({ userId });
	if (email) orConditions.push({ email });

	if (orConditions.length === 0) return [];

	return await prisma.inquiry.findMany({
		where: { OR: orConditions },
		include: {
			service: {
				select: { id: true, title: true, category: true },
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
	getMyInquiries,
	getInquiryById,
	updateInquiryStatus,
	deleteInquiry,
};
