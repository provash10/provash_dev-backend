import { z } from "zod";

// create blog validation schema
const createBlogSchema = z.object({
	title: z.string().min(3, "Title must be at least 3 characters"),
	slug: z.string().optional(),
	category: z.string().min(2, "Category is required"),
	subCategory: z.string().optional().default("General"),
	readTime: z.string().optional(),
	description: z.string().min(10, "Description must be at least 10 characters"),
	content: z.string().optional().or(z.literal("")),
	image: z.string().optional().or(z.literal("")),
	tags: z.array(z.string()).default([]),
	isPublished: z.boolean().default(true),
	featured: z.boolean().default(false),
	order: z.number().default(0),
});

// update blog validation schema
const updateBlogSchema = createBlogSchema.partial();

export const BlogValidation = {
	createBlogSchema,
	updateBlogSchema,
};
