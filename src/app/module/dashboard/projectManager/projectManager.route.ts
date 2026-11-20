import { Router } from "express";
import { checkAuth } from "../../../middleware/checkAuth";
import { ProjectManagerController } from "./projectManager.controller";

const router = Router();

// project manager overview route
router.get(
	"/overview",
	checkAuth("SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER"),
	ProjectManagerController.getOverview,
);

export const ProjectManagerRoutes = router;
