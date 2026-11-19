import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { UserService } from "./user.service";

// get all users controller
const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
	// console.log("get all users controller invoked")
	const result = await UserService.getAllUsers();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Users fetched successfully",
		data: result,
	});
});

// get super admin dashboard statistics controller
const getSuperAdminStats = catchAsync(async (_req: Request, res: Response) => {
	// console.log("get super admin stats controller invoked")
	const result = await UserService.getSuperAdminStats();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Super admin statistics fetched successfully",
		data: result,
	});
});

// create staff user controller
const createStaff = catchAsync(async (req: Request, res: Response) => {
	// console.log("create staff user controller invoked")
	const result = await UserService.createStaff(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Staff account created successfully",
		data: result,
	});
});

// update user status controller
const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
	// console.log("update user status controller invoked")
	const { id } = req.params;
	const { status } = req.body;
	const result = await UserService.updateUserStatus(id, status);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User status updated successfully",
		data: result,
	});
});

// update user role controller
const updateUserRole = catchAsync(async (req: Request, res: Response) => {
	// console.log("update user role controller invoked")
	const { id } = req.params;
	const { role } = req.body;
	const result = await UserService.updateUserRole(id, role);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User role updated successfully",
		data: result,
	});
});

export const UserController = {
	getAllUsers,
	getSuperAdminStats,
	createStaff,
	updateUserStatus,
	updateUserRole,
};
