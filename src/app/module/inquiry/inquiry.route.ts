import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { InquiryController } from "./inquiry.controller";
import { InquiryValidation } from "./inquiry.validation";

const router = Router();

// public client inquiry submission route
router.post(
	"/",
	validateRequest(InquiryValidation.createInquirySchema),
	InquiryController.createInquiry,
);

// get all inquiries route for staff
router.get(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER"),
	InquiryController.getAllInquiries,
);

// get inquiry by id route
router.get(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER"),
	InquiryController.getInquiryById,
);

// update inquiry status route
router.patch(
	"/:id/status",
	checkAuth("SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER"),
	validateRequest(InquiryValidation.updateInquiryStatusSchema),
	InquiryController.updateInquiryStatus,
);

// delete inquiry route
router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	InquiryController.deleteInquiry,
);

export const InquiryRoutes = router;
