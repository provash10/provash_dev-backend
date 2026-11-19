import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import type { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import type { IRequestUser } from "../interfaces";
import { prisma } from "../lib/prisma";
import { catchAsync } from "../utils/catchAsync";
import { jwtUtils } from "../utils/jwt";

declare global {
	namespace Express {
		interface Request {
			user?: IRequestUser;
		}
	}
}

export const checkAuth = (...requiredRoles: Array<"SUPER_ADMIN" | "ADMIN" | "PROJECT_MANAGER" | "CLIENT">) => {
	return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		const token = req.cookies?.accessToken
			? req.cookies.accessToken
			: req.headers.authorization?.startsWith("Bearer ")
				? req.headers.authorization.split(" ")[1]
				: req.headers.authorization;

		if (!token) {
			throw new AppError(
				httpStatus.UNAUTHORIZED,
				"You are not authorized. Please log in to proceed.",
			);
		}

		const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

		if (!verifiedToken.success || !verifiedToken.data) {
			throw new AppError(
				httpStatus.UNAUTHORIZED,
				verifiedToken.error || "Invalid token.",
			);
		}

		const { userId } = verifiedToken.data as JwtPayload & IRequestUser;

		const user = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new AppError(httpStatus.NOT_FOUND, "User no longer exists.");
		}

		if (user.status === "BLOCKED") {
			throw new AppError(
				httpStatus.FORBIDDEN,
				"Your account has been deactivated or blocked.",
			);
		}

		if (requiredRoles.length && !requiredRoles.includes(user.role)) {
			throw new AppError(
				httpStatus.FORBIDDEN,
				"You do not have permission to access this resource.",
			);
		}

		req.user = {
			userId: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
		};

		next();
	});
};
