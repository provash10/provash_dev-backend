import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { TestimonialService } from "./testimonial.service";

const getPublishedTestimonials = catchAsync(async (_req: Request, res: Response) => {
	const result = await TestimonialService.getPublishedTestimonials();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Testimonials fetched successfully",
		data: result,
	});
});

const getAllTestimonials = catchAsync(async (_req: Request, res: Response) => {
	const result = await TestimonialService.getAllTestimonials();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "All testimonials fetched successfully",
		data: result,
	});
});

const createTestimonial = catchAsync(async (req: Request, res: Response) => {
	const result = await TestimonialService.createTestimonial(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Testimonial created successfully",
		data: result,
	});
});

const updateTestimonial = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await TestimonialService.updateTestimonial(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Testimonial updated successfully",
		data: result,
	});
});

const deleteTestimonial = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await TestimonialService.deleteTestimonial(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Testimonial deleted successfully",
		data: result,
	});
});

export const TestimonialController = {
	getPublishedTestimonials,
	getAllTestimonials,
	createTestimonial,
	updateTestimonial,
	deleteTestimonial,
};
