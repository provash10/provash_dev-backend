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

// create a new blog article
const createBlog = async (payload: any) => {
	const existing = await prisma.blog.findUnique({
		where: { slug: payload.slug },
	});

	if (existing) {
		throw new AppError(
			httpStatus.CONFLICT,
			"A blog article with this slug already exists",
		);
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
	getBlogBySlug,
	createBlog,
	updateBlog,
	deleteBlog,
};
