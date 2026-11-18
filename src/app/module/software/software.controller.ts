import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SoftwareService } from "./software.service";

// get all software products controller
const getAllSoftware = catchAsync(async (req: Request, res: Response) => {
	// console.log("get all software products controller invoked")
	const result = await SoftwareService.getAllSoftware(req.query);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Software products fetched successfully",
		data: result,
	});
});

// get software product by slug controller
const getSoftwareBySlug = catchAsync(async (req: Request, res: Response) => {
	// console.log("get software product by slug controller invoked")
	const { slug } = req.params;
	const result = await SoftwareService.getSoftwareBySlug(slug);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Software product details fetched successfully",
		data: result,
	});
});

// create software product controller
const createSoftware = catchAsync(async (req: Request, res: Response) => {
	// console.log("create software product controller invoked")
	const result = await SoftwareService.createSoftware(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Software product created successfully",
		data: result,
	});
});

// update software product controller
const updateSoftware = catchAsync(async (req: Request, res: Response) => {
	// console.log("update software product controller invoked")
	const { id } = req.params;
	const result = await SoftwareService.updateSoftware(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Software product updated successfully",
		data: result,
	});
});

// delete software product controller
const deleteSoftware = catchAsync(async (req: Request, res: Response) => {
	// console.log("delete software product controller invoked")
	const { id } = req.params;
	const result = await SoftwareService.deleteSoftware(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Software product deleted successfully",
		data: result,
	});
});

export const SoftwareController = {
	getAllSoftware,
	getSoftwareBySlug,
	createSoftware,
	updateSoftware,
	deleteSoftware,
};
