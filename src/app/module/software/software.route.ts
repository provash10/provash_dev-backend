import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { SoftwareController } from "./software.controller";
import { SoftwareValidation } from "./software.validation";

const router = Router();

// get all public software products
router.get("/", SoftwareController.getAllSoftware);

// get single software product by slug
router.get("/:slug", SoftwareController.getSoftwareBySlug);

// admin create software product
router.post(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(SoftwareValidation.createSoftwareSchema),
	SoftwareController.createSoftware,
);

// admin update software product
router.patch(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(SoftwareValidation.updateSoftwareSchema),
	SoftwareController.updateSoftware,
);

// admin delete software product
router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	SoftwareController.deleteSoftware,
);

export const SoftwareRoutes = router;
