import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserController } from "./user.controller";

const router = Router();

// get all users route
router.get(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	UserController.getAllUsers,
);

// update user status route
router.patch(
	"/:id/status",
	checkAuth("SUPER_ADMIN"),
	UserController.updateUserStatus,
);

// update user role route
router.patch(
	"/:id/role",
	checkAuth("SUPER_ADMIN"),
	UserController.updateUserRole,
);

export const UserRoutes = router;
