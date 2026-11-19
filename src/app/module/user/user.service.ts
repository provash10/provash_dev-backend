import bcryptjs from "bcryptjs";
import httpStatus from "http-status";
import config from "../../config";
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

// get super admin dashboard statistics service
const getSuperAdminStats = async () => {
	// console.log("fetching super admin overview statistics")
	const [totalUsers, totalInquiries, totalPayments, totalServices] =
		await Promise.all([
			prisma.user.count(),
			prisma.inquiry.count(),
			prisma.payment.findMany({
				where: { status: "COMPLETED" },
				select: { amount: true },
			}),
			prisma.service.count(),
		]);

	const totalRevenue = totalPayments.reduce((acc, curr) => acc + curr.amount, 0);

	const roleBreakdown = await prisma.user.groupBy({
		by: ["role"],
		_count: { id: true },
	});

	const inquiriesBreakdown = await prisma.inquiry.groupBy({
		by: ["status"],
		_count: { id: true },
	});

	return {
		totalUsers,
		totalRevenue,
		totalInquiries,
		totalServices,
		roleBreakdown,
		inquiriesBreakdown,
	};
};

// create staff user service
const createStaff = async (payload: {
	name: string;
	email: string;
	password: string;
	role: "SUPER_ADMIN" | "ADMIN" | "PROJECT_MANAGER" | "CLIENT";
	phone?: string;
}) => {
	// console.log("creating staff user")
	const existingUser = await prisma.user.findUnique({
		where: { email: payload.email },
	});

	if (existingUser) {
		throw new AppError(httpStatus.CONFLICT, "Email is already in use");
	}

	const hashedPassword = await bcryptjs.hash(
		payload.password,
		config.bcrypt_salt_rounds,
	);

	const newUser = await prisma.user.create({
		data: {
			name: payload.name,
			email: payload.email,
			password: hashedPassword,
			role: payload.role as any,
			phone: payload.phone,
			status: "ACTIVE",
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			status: true,
			phone: true,
			createdAt: true,
		},
	});

	return newUser;
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

	if (user.role === "SUPER_ADMIN" && status === "BLOCKED") {
		throw new AppError(
			httpStatus.FORBIDDEN,
			"Cannot block the primary super admin account",
		);
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
	role: "SUPER_ADMIN" | "ADMIN" | "PROJECT_MANAGER" | "CLIENT",
) => {
	// console.log("updating user role")
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	return await prisma.user.update({
		where: { id: userId },
		data: { role: role as any },
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
	getSuperAdminStats,
	createStaff,
	updateUserStatus,
	updateUserRole,
};
