import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { AdminController } from "./admin.controller";

const router = Router();

// admin studio overview route
router.get(
	"/overview",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	AdminController.getOverview,
);

export const AdminRoutes = router;
