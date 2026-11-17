import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	phone: z.string().optional(),
});

const refreshTokenSchema = z.object({
	refreshToken: z.string({
		required_error: "Refresh token is required",
	}),
});

export const AuthValidation = {
	loginSchema,
	registerSchema,
	refreshTokenSchema,
};
