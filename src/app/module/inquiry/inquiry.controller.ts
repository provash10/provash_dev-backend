import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { InquiryService } from "./inquiry.service";

const createInquiry = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const result = await InquiryService.createInquiry(req.body, userId);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Inquiry submitted successfully. We will get back to you soon!",
		data: result,
	});
});

const getAllInquiries = catchAsync(async (req: Request, res: Response) => {
	const result = await InquiryService.getAllInquiries(req.query);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Inquiries fetched successfully",
		data: result,
	});
});

// get logged in client own inquiries controller
const getMyInquiries = catchAsync(async (req: Request, res: Response) => {
	const userId = req.user?.userId;
	const email = req.user?.email;
	const result = await InquiryService.getMyInquiries(userId, email);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Client inquiries fetched successfully",
		data: result,
	});
});

const getInquiryById = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await InquiryService.getInquiryById(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Inquiry fetched successfully",
		data: result,
	});
});

const updateInquiryStatus = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await InquiryService.updateInquiryStatus(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Inquiry status updated successfully",
		data: result,
	});
});

const deleteInquiry = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await InquiryService.deleteInquiry(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Inquiry deleted successfully",
		data: result,
	});
});

export const InquiryController = {
	createInquiry,
	getAllInquiries,
	getMyInquiries,
	getInquiryById,
	updateInquiryStatus,
	deleteInquiry,
};
