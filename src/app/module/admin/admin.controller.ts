import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service";

// get admin studio overview controller
const getOverview = catchAsync(async (_req: Request, res: Response) => {
	// console.log("admin overview controller invoked")
	const result = await AdminService.getAdminOverview();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Admin overview fetched successfully",
		data: result,
	});
});

export const AdminController = {
	getOverview,
};
