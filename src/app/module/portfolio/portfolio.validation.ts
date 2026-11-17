import { z } from "zod";

// create portfolio validation schema
const createPortfolioSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	slug: z.string().min(3, "Slug is required"),
	description: z.string().min(10, "Description is required"),
	category: z.string().min(2, "Category is required"),
	thumbnail: z.string().url("Valid thumbnail image URL is required"),
	gallery: z.array(z.string()).default([]),
	liveUrl: z.string().url().optional().or(z.literal("")),
	githubClient: z.string().url().optional().or(z.literal("")),
	githubServer: z.string().url().optional().or(z.literal("")),
	technologies: z.array(z.string()).min(1, "At least one technology required"),
	featured: z.boolean().default(false),
	order: z.number().default(0),
});

// update portfolio validation schema
const updatePortfolioSchema = createPortfolioSchema.partial();

export const PortfolioValidation = {
	createPortfolioSchema,
	updatePortfolioSchema,
};
