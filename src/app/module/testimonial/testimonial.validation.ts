import { z } from "zod";

const createTestimonialSchema = z.object({
	clientName: z.string().min(2, "Client name is required"),
	clientRole: z.string().min(2, "Client role is required"),
	clientAvatar: z.string().url().optional().or(z.literal("")),
	companyName: z.string().optional(),
	rating: z.number().min(1).max(5).default(5),
	feedback: z.string().min(10, "Feedback must be at least 10 characters"),
	serviceType: z.string().optional(),
	isPublished: z.boolean().default(true),
	order: z.number().default(0),
});

const updateTestimonialSchema = createTestimonialSchema.partial();

export const TestimonialValidation = {
	createTestimonialSchema,
	updateTestimonialSchema,
};
