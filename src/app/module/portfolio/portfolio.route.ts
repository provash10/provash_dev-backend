import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioValidation } from "./portfolio.validation";

const router = Router();

// public routes
router.get("/", PortfolioController.getAllProjects);
router.get("/:slug", PortfolioController.getProjectBySlug);

// admin only routes
router.post(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(PortfolioValidation.createPortfolioSchema),
	PortfolioController.createProject,
);

router.patch(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(PortfolioValidation.updatePortfolioSchema),
	PortfolioController.updateProject,
);

router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	PortfolioController.deleteProject,
);

export const PortfolioRoutes = router;
