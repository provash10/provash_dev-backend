import bcryptjs from "bcryptjs";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { googleClient } from "../../lib/googleAuth";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";

// credentials login service
const login = async (payload: { email: string; password: string }) => {
	const user = await prisma.user.findUnique({
		where: { email: payload.email },
	});

	if (!user) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
	}

	if (user.status === "BLOCKED") {
		throw new AppError(
			httpStatus.FORBIDDEN,
			"Your account is blocked. Contact support.",
		);
	}

	const isPasswordMatch = await bcryptjs.compare(
		payload.password,
		user.password,
	);

	if (!isPasswordMatch) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid email or password");
	}

	const tokenPayload = {
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in,
	);

	const refreshToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in,
	);

	return {
		accessToken,
		refreshToken,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			avatar: user.avatar,
		},
	};
};

// google oauth login service
const googleLogin = async (idToken: string) => {
	// console.log("verifying google id token")

	let googlePayload: any = null;

	try {
		const ticket = await googleClient.verifyIdToken({
			idToken,
			audience: config.google_client_id,
		});
		googlePayload = ticket.getPayload();
	} catch (error: any) {
		// console.log("google token verification error", error)
		throw new AppError(
			httpStatus.UNAUTHORIZED,
			"Invalid or expired Google Token",
		);
	}

	if (!googlePayload || !googlePayload.email) {
		throw new AppError(httpStatus.BAD_REQUEST, "Google email not found");
	}

	let user = await prisma.user.findUnique({
		where: { email: googlePayload.email },
	});

	if (!user) {
		// generate random secure password for oauth account
		const randomPassword = await bcryptjs.hash(
			`google_auth_${Date.now()}`,
			config.bcrypt_salt_rounds,
		);

		user = await prisma.user.create({
			data: {
				name: googlePayload.name || "Google User",
				email: googlePayload.email,
				password: randomPassword,
				avatar: googlePayload.picture || null,
				role: "CLIENT",
				status: "ACTIVE",
			},
		});
	}

	if (user.status === "BLOCKED") {
		throw new AppError(
			httpStatus.FORBIDDEN,
			"Your account is blocked. Contact support.",
		);
	}

	const tokenPayload = {
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in,
	);

	const refreshToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in,
	);

	return {
		accessToken,
		refreshToken,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
			avatar: user.avatar,
		},
	};
};

// user registration service
const register = async (payload: {
	name: string;
	email: string;
	password: string;
	phone?: string;
}) => {
	const existingUser = await prisma.user.findUnique({
		where: { email: payload.email },
	});

	if (existingUser) {
		throw new AppError(
			httpStatus.CONFLICT,
			"User with this email already exists",
		);
	}

	const hashedPassword = await bcryptjs.hash(
		payload.password,
		config.bcrypt_salt_rounds,
	);

	const user = await prisma.user.create({
		data: {
			name: payload.name,
			email: payload.email,
			password: hashedPassword,
			phone: payload.phone,
			role: "CLIENT",
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			avatar: true,
			createdAt: true,
		},
	});

	const tokenPayload = {
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
	};

	const accessToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in,
	);

	const refreshToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in,
	);

	return {
		accessToken,
		refreshToken,
		user,
	};
};

// refresh access token service
const refreshToken = async (token: string) => {
	const verified = jwtUtils.verifyToken(token, config.jwt_refresh_secret);

	if (!verified.success || !verified.data) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token");
	}

	const { userId } = verified.data as { userId: string };

	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!user || user.status === "BLOCKED") {
		throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized user");
	}

	const tokenPayload = {
		userId: user.id,
		email: user.email,
		name: user.name,
		role: user.role,
	};

	const newAccessToken = jwtUtils.createToken(
		tokenPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in,
	);

	return {
		accessToken: newAccessToken,
	};
};

// get current user profile service
const getMe = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
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
	});

	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, "User not found");
	}

	return user;
};

export const AuthService = {
	login,
	googleLogin,
	register,
	refreshToken,
	getMe,
};
