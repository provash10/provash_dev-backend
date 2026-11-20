import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { validateRequest } from "../../../middleware/validateRequest";
import { SuperAdminController } from "./superAdmin.controller";
import { SuperAdminValidation } from "./superAdmin.validation";

const router = Router();

// super admin overview statistics route
router.get(
	"/stats",
	checkAuth("SUPER_ADMIN"),
	SuperAdminController.getStats,
);

// super admin get all users route
router.get(
	"/users",
	checkAuth("SUPER_ADMIN"),
	SuperAdminController.getAllUsers,
);

// super admin create staff user route
router.post(
	"/create-staff",
	checkAuth("SUPER_ADMIN"),
	validateRequest(SuperAdminValidation.createStaffSchema),
	SuperAdminController.createStaff,
);

// super admin update user status route
router.patch(
	"/users/:id/status",
	checkAuth("SUPER_ADMIN"),
	validateRequest(SuperAdminValidation.updateStatusSchema),
	SuperAdminController.updateStatus,
);

// super admin update user role route
router.patch(
	"/users/:id/role",
	checkAuth("SUPER_ADMIN"),
	validateRequest(SuperAdminValidation.updateRoleSchema),
	SuperAdminController.updateRole,
);

export const SuperAdminRoutes = router;
