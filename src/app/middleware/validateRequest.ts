import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import type { AnyZodObject } from "zod";
import AppError from "../errors/AppError";
import { catchAsync } from "../utils/catchAsync";

export const validateRequest = (schema: AnyZodObject) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const payload = req.body ?? {};
		const result = await schema.safeParseAsync(payload);

		if (!result.success) {
			const firstError = result.error.issues[0]?.message || "Validation Error";
			throw new AppError(httpStatus.BAD_REQUEST, firstError, "", result.error.issues);
		}

		req.body = result.data;
		next();
	});
};

