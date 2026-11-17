import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ServiceController } from "./service.controller";
import { ServiceValidation } from "./service.validation";

const router = Router();

// get all public active services
router.get("/", ServiceController.getAllServices);

// get single service by slug
router.get("/:slug", ServiceController.getServiceBySlug);

// admin get all services
router.get(
	"/admin/all",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	ServiceController.getAdminAllServices,
);

// admin create service
router.post(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(ServiceValidation.createServiceSchema),
	ServiceController.createService,
);

// admin update service
router.patch(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(ServiceValidation.updateServiceSchema),
	ServiceController.updateService,
);

// admin delete service
router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	ServiceController.deleteService,
);

export const ServiceRoutes = router;
