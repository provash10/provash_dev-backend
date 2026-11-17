import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PortfolioService } from "./portfolio.service";

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
	const result = await PortfolioService.getAllProjects(req.query);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Portfolio projects fetched successfully",
		data: result,
	});
});

const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
	const { slug } = req.params;
	const result = await PortfolioService.getProjectBySlug(slug);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Portfolio project details fetched successfully",
		data: result,
	});
});

const createProject = catchAsync(async (req: Request, res: Response) => {
	const result = await PortfolioService.createProject(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Portfolio project created successfully",
		data: result,
	});
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await PortfolioService.updateProject(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Portfolio project updated successfully",
		data: result,
	});
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
	const { id } = req.params;
	const result = await PortfolioService.deleteProject(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Portfolio project deleted successfully",
		data: result,
	});
});

export const PortfolioController = {
	getAllProjects,
	getProjectBySlug,
	createProject,
	updateProject,
	deleteProject,
};
