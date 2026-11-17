import { z } from "zod";

const createInquirySchema = z.object({
	name: z.string().min(2, "Name is required"),
	email: z.string().email("Invalid email address"),
	phone: z.string().optional(),
	serviceId: z.string().uuid().optional(),
	budget: z.string().optional(),
	timeline: z.string().optional(),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

const updateInquiryStatusSchema = z.object({
	status: z.enum([
		"PENDING",
		"IN_PROGRESS",
		"CONTACTED",
		"RESOLVED",
		"CANCELLED",
	]),
	notes: z.string().optional(),
});

export const InquiryValidation = {
	createInquirySchema,
	updateInquiryStatusSchema,
};
