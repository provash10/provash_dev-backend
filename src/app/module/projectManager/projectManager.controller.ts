import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ProjectManagerService } from "./projectManager.service";

// get project manager sprint overview controller
const getOverview = catchAsync(async (_req: Request, res: Response) => {
	// console.log("project manager overview controller invoked")
	const result = await ProjectManagerService.getProjectManagerOverview();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Project manager overview fetched successfully",
		data: result,
	});
});

export const ProjectManagerController = {
	getOverview,
};
