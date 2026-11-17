import type { Request, Response } from "express";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ServiceService } from "./service.service";

// get all services controller
const getAllServices = catchAsync(async (req: Request, res: Response) => {
	// console.log("get all services controller invoked")
	const result = await ServiceService.getAllServices(req.query);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Services fetched successfully",
		data: result,
	});
});

// get admin all services controller
const getAdminAllServices = catchAsync(async (_req: Request, res: Response) => {
	// console.log("get admin all services controller invoked")
	const result = await ServiceService.getAdminAllServices();
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Admin services fetched successfully",
		data: result,
	});
});

// get service by slug controller
const getServiceBySlug = catchAsync(async (req: Request, res: Response) => {
	// console.log("get service by slug controller invoked")
	const { slug } = req.params;
	const result = await ServiceService.getServiceBySlug(slug);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Service details fetched successfully",
		data: result,
	});
});

// create service controller
const createService = catchAsync(async (req: Request, res: Response) => {
	// console.log("create service controller invoked")
	const result = await ServiceService.createService(req.body);
	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Service created successfully",
		data: result,
	});
});

// update service controller
const updateService = catchAsync(async (req: Request, res: Response) => {
	// console.log("update service controller invoked")
	const { id } = req.params;
	const result = await ServiceService.updateService(id, req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Service updated successfully",
		data: result,
	});
});

// delete service controller
const deleteService = catchAsync(async (req: Request, res: Response) => {
	// console.log("delete service controller invoked")
	const { id } = req.params;
	const result = await ServiceService.deleteService(id);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Service deleted successfully",
		data: result,
	});
});

export const ServiceController = {
	getAllServices,
	getAdminAllServices,
	getServiceBySlug,
	createService,
	updateService,
	deleteService,
};
