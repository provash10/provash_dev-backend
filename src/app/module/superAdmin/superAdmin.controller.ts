import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SuperAdminService } from "./superAdmin.service";

// get super admin dashboard statistics controller
const getStats = catchAsync(async (_req: Request, res: Response) => {
	// console.log("get super admin stats controller invoked")
	const result = await SuperAdminService.getSuperAdminStats();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Super admin statistics fetched successfully",
		data: result,
	});
});

// get all platform users controller
const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
	// console.log("super admin get all users controller invoked")
	const result = await SuperAdminService.getAllUsers();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Platform users fetched successfully",
		data: result,
	});
});

// create staff user account controller
const createStaff = catchAsync(async (req: Request, res: Response) => {
	// console.log("super admin create staff controller invoked")
	const result = await SuperAdminService.createStaff(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Staff account created successfully",
		data: result,
	});
});

// update user status controller
const updateStatus = catchAsync(async (req: Request, res: Response) => {
	// console.log("super admin update status controller invoked")
	const { id } = req.params;
	const { status } = req.body;
	const result = await SuperAdminService.updateUserStatus(id, status);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User status updated successfully",
		data: result,
	});
});

// update user role controller
const updateRole = catchAsync(async (req: Request, res: Response) => {
	// console.log("super admin update role controller invoked")
	const { id } = req.params;
	const { role } = req.body;
	const result = await SuperAdminService.updateUserRole(id, role);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User role updated successfully",
		data: result,
	});
});

export const SuperAdminController = {
	getStats,
	getAllUsers,
	createStaff,
	updateStatus,
	updateRole,
};
