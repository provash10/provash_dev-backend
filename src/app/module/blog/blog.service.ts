import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

// fetch all blogs with filtering and search
const getAllBlogs = async (query: {
	category?: string;
	search?: string;
	featured?: string;
	isPublished?: string;
}) => {
	const where: any = {};

	if (query.isPublished !== undefined) {
		where.isPublished = query.isPublished === "true";
	} else {
		// default to published blogs only
		where.isPublished = true;
	}

	if (query.category && query.category.toLowerCase() !== "all") {
		where.category = {
			equals: query.category,
			mode: "insensitive",
		};
	}

	if (query.featured === "true") {
		where.featured = true;
	}

	if (query.search) {
		where.OR = [
			{ title: { contains: query.search, mode: "insensitive" } },
			{ description: { contains: query.search, mode: "insensitive" } },
			{ tags: { has: query.search } },
		];
	}

	return await prisma.blog.findMany({
		where,
		orderBy: [{ order: "asc" }, { createdAt: "desc" }],
	});
};

// fetch single blog by unique slug
const getBlogBySlug = async (slug: string) => {
	const blog = await prisma.blog.findUnique({
		where: { slug },
	});

	if (!blog) {
		throw new AppError(httpStatus.NOT_FOUND, "Blog article not found");
	}

	return blog;
};

// fetch all distinct categories with counts
const getCategories = async () => {
	const groups = await prisma.blog.groupBy({
		by: ["category"],
		_count: {
			id: true,
		},
		where: {
			isPublished: true,
		},
		orderBy: {
			category: "asc",
		},
	});

	const total = await prisma.blog.count({
		where: {
			isPublished: true,
		},
	});

	return {
		total,
		categories: groups.map((g) => ({
			name: g.category,
			count: g._count.id,
		})),
	};
};

// slugify helper
const slugify = (text: string) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, "-")
		.replace(/^-+|-+$/g, "");
};

// calculate approximate reading time
const calculateReadTime = (content?: string, description?: string) => {
	const text = `${content || ""} ${description || ""}`;
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	return `${minutes} min read`;
};

// create a new blog article
const createBlog = async (payload: any) => {
	// generate slug if missing
	let baseSlug = payload.slug ? slugify(payload.slug) : slugify(payload.title);
	if (!baseSlug) {
		baseSlug = `post-${Date.now()}`;
	}

	// ensure unique slug
	let finalSlug = baseSlug;
	let counter = 1;
	while (await prisma.blog.findUnique({ where: { slug: finalSlug } })) {
		finalSlug = `${baseSlug}-${counter}`;
		counter++;
	}
	payload.slug = finalSlug;

	// estimate read time if not provided
	if (!payload.readTime) {
		payload.readTime = calculateReadTime(payload.content, payload.description);
	}

	// fallback image if missing
	if (!payload.image) {
		payload.image =
			"https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000";
	}

	return await prisma.blog.create({
		data: payload,
	});
};

// update existing blog article
const updateBlog = async (id: string, payload: any) => {
	const existing = await prisma.blog.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Blog article not found");
	}

	return await prisma.blog.update({
		where: { id },
		data: payload,
	});
};

// delete blog article by id
const deleteBlog = async (id: string) => {
	const existing = await prisma.blog.findUnique({ where: { id } });
	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Blog article not found");
	}

	return await prisma.blog.delete({
		where: { id },
	});
};

export const BlogService = {
	getAllBlogs,
	getCategories,
	getBlogBySlug,
	createBlog,
	updateBlog,
	deleteBlog,
};
