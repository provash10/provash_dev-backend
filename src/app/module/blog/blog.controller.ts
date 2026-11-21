import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogService } from "./blog.service";

// get all blog articles
const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
	const result = await BlogService.getAllBlogs(req.query);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Blog articles fetched successfully",
		data: result,
	});
});

// get all blog categories with counts
const getCategories = catchAsync(async (_req: Request, res: Response) => {
	const result = await BlogService.getCategories();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Blog categories fetched successfully",
		data: result,
	});
});

// get single blog article by slug
const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
	const { slug } = req.params;
	const result = await BlogService.getBlogBySlug(slug);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Blog article details fetched successfully",
		data: result,
	});
});

// create blog article
const createBlog = catchAsync(async (req: Request, res: Response) => {
	const result = await BlogService.createBlog(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Blog article created successfully",
		data: result,
	});
});

// update blog article
const updateBlog = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BlogService.updateBlog(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Blog article updated successfully",
		data: result,
	});
});

// delete blog article
const deleteBlog = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await BlogService.deleteBlog(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Blog article deleted successfully",
		data: result,
	});
});

export const BlogController = {
	getAllBlogs,
	getCategories,
	getBlogBySlug,
	createBlog,
	updateBlog,
	deleteBlog,
};
