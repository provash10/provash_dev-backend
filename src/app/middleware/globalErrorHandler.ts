import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "@prisma/client";
import config from "../config";
import AppError from "../errors/AppError";

// global error handler middleware
export const globalErrorHandler = (
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	// console.log("error from global error handler", err)

	let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
	let message = err.message || "internal server error";
	let errorSources: any = null;

	if (err instanceof AppError) {
		statusCode = err.statusCode;
		message = err.message;
		errorSources = err.data;
	} else if (err instanceof Prisma.PrismaClientKnownRequestError) {
		statusCode = httpStatus.BAD_REQUEST;
		if (err.code === "P2002") {
			message = "duplicate key error record already exists";
		} else if (err.code === "P2003") {
			message = "foreign key constraint failed";
		} else if (err.code === "P2025") {
			statusCode = httpStatus.NOT_FOUND;
			message = "record not found";
		} else {
			message = `database query error: ${err.message}`;
		}
	} else if (err instanceof Prisma.PrismaClientValidationError) {
		statusCode = httpStatus.BAD_REQUEST;
		message = "provided field type is incorrect or required fields are missing";
	} else if (err instanceof Prisma.PrismaClientInitializationError) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = "cannot connect to database server please verify connection";
	}

	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
		errorSources: errorSources || undefined,
		stack: config.node_env === "development" ? err.stack : undefined,
	});
};
