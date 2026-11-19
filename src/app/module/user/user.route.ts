import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = Router();

// get super admin dashboard statistics route
router.get(
	"/stats",
	checkAuth("SUPER_ADMIN"),
	UserController.getSuperAdminStats,
);

// get all users route
router.get(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	UserController.getAllUsers,
);

// create staff user route
router.post(
	"/create-staff",
	checkAuth("SUPER_ADMIN"),
	validateRequest(UserValidation.createStaffSchema),
	UserController.createStaff,
);

// update user status route
router.patch(
	"/:id/status",
	checkAuth("SUPER_ADMIN"),
	validateRequest(UserValidation.updateStatusSchema),
	UserController.updateUserStatus,
);

// update user role route
router.patch(
	"/:id/role",
	checkAuth("SUPER_ADMIN"),
	validateRequest(UserValidation.updateRoleSchema),
	UserController.updateUserRole,
);

export const UserRoutes = router;
