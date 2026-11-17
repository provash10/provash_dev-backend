import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { TestimonialController } from "./testimonial.controller";
import { TestimonialValidation } from "./testimonial.validation";

const router = Router();

// Public: View published reviews
router.get("/", TestimonialController.getPublishedTestimonials);

// Admin-only management
router.get(
	"/admin/all",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	TestimonialController.getAllTestimonials,
);

router.post(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(TestimonialValidation.createTestimonialSchema),
	TestimonialController.createTestimonial,
);

router.patch(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(TestimonialValidation.updateTestimonialSchema),
	TestimonialController.updateTestimonial,
);

router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	TestimonialController.deleteTestimonial,
);

export const TestimonialRoutes = router;
