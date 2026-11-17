import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

// get all users service
const getAllUsers = async () => {
	// console.log("fetching all users")
	const users = await prisma.user.findMany({
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			status: true,
			phone: true,
			avatar: true,
			createdAt: true,
		},
		orderBy: { createdAt: "desc" },
	});
	return users;
};

// update user status service
const updateUserStatus = async (
	userId: string,
	status: "ACTIVE" | "BLOCKED",
) => {
	// console.log("updating user status")
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}
	return await prisma.user.update({
		where: { id: userId },
		data: { status },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			status: true,
		},
	});
};

// update user role service
const updateUserRole = async (
	userId: string,
	role: "SUPER_ADMIN" | "ADMIN" | "CLIENT",
) => {
	// console.log("updating user role")
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}
	return await prisma.user.update({
		where: { id: userId },
		data: { role },
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			status: true,
		},
	});
};

export const UserService = {
	getAllUsers,
	updateUserStatus,
	updateUserRole,
};
