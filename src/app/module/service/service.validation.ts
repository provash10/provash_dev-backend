import { z } from "zod";

// create service validation schema
const createServiceSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	slug: z.string().min(3, "Slug is required"),
	category: z.enum([
		"WEB_DEVELOPMENT",
		"YOUTUBE_AUTOMATION",
		"SOCIAL_MEDIA_MARKETING",
		"SEO_OPTIMIZATION",
		"STRATEGY_CONSULTING",
	]),
	shortDesc: z.string().min(10, "Short description is required"),
	fullDesc: z.string().min(20, "Full description is required"),
	icon: z.string().optional(),
	coverImage: z.string().optional(),
	features: z.array(z.string()).default([]),
	startingPrice: z.number().optional(),
	isFeatured: z.boolean().default(false),
	isActive: z.boolean().default(true),
	order: z.number().default(0),
});

// update service validation schema
const updateServiceSchema = createServiceSchema.partial();

export const ServiceValidation = {
	createServiceSchema,
	updateServiceSchema,
};
