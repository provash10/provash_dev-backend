import { z } from "zod";

// super admin create staff schema validation
const createStaffSchema = z.object({
	name: z.string().min(2, "name is required"),
	email: z.string().email("invalid email address"),
	password: z.string().min(6, "password must be at least six characters"),
	role: z.enum(["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"]),
	phone: z.string().optional(),
});

// super admin update user status schema validation
const updateStatusSchema = z.object({
	status: z.enum(["ACTIVE", "BLOCKED"]),
});

// super admin update user role schema validation
const updateRoleSchema = z.object({
	role: z.enum(["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"]),
});

export const SuperAdminValidation = {
	createStaffSchema,
	updateStatusSchema,
	updateRoleSchema,
};
