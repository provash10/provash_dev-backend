import { z } from "zod";

// create staff validation schema
const createStaffSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	role: z.enum(["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"]),
	phone: z.string().optional(),
});

// update user status validation schema
const updateStatusSchema = z.object({
	status: z.enum(["ACTIVE", "BLOCKED"]),
});

// update user role validation schema
const updateRoleSchema = z.object({
	role: z.enum(["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"]),
});

export const UserValidation = {
	createStaffSchema,
	updateStatusSchema,
	updateRoleSchema,
};
