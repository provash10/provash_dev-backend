import { z } from "zod";

// create software product validation schema
const createSoftwareSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	slug: z.string().min(3, "Slug is required"),
	tagline: z.string().min(5, "Tagline is required"),
	shortDesc: z.string().min(10, "Short description is required"),
	fullDesc: z.string().min(20, "Full description is required"),
	category: z.string().min(2, "Category is required"),
	thumbnail: z.string().optional(),
	liveUrl: z.string().url().optional().or(z.literal("")),
	githubUrl: z.string().url().optional().or(z.literal("")),
	features: z.array(z.string()).default([]),
	techStack: z.array(z.string()).min(1, "At least one technology required"),
	status: z.string().default("LIVE"),
	isFeatured: z.boolean().default(true),
	order: z.number().default(0),
});

// update software product validation schema
const updateSoftwareSchema = createSoftwareSchema.partial();

export const SoftwareValidation = {
	createSoftwareSchema,
	updateSoftwareSchema,
};
