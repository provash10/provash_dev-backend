import { z } from "zod";

// super admin create staff schema validation
const createStaffSchema = z.object({
	body: z.object({
		name: z.string({
			required_error: "name is required",
		}),
		email: z.string({
			required_error: "email is required",
		}).email("invalid email address"),
		password: z.string({
			required_error: "password is required",
		}).min(6, "password must be at least six characters"),
		role: z.enum(["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"], {
			required_error: "role is required",
		}),
		phone: z.string().optional(),
	}),
});

// super admin update user status schema validation
const updateStatusSchema = z.object({
	body: z.object({
		status: z.enum(["ACTIVE", "BLOCKED"], {
			required_error: "status is required",
		}),
	}),
});

// super admin update user role schema validation
const updateRoleSchema = z.object({
	body: z.object({
		role: z.enum(["SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"], {
			required_error: "role is required",
		}),
	}),
});

export const SuperAdminValidation = {
	createStaffSchema,
	updateStatusSchema,
	updateRoleSchema,
};
