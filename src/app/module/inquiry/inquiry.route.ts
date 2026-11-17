import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { InquiryController } from "./inquiry.controller";
import { InquiryValidation } from "./inquiry.validation";

const router = Router();

// Public: Clients can submit quote requests / inquiries
router.post(
	"/",
	validateRequest(InquiryValidation.createInquirySchema),
	InquiryController.createInquiry,
);

// Admin-only management
router.get(
	"/",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	InquiryController.getAllInquiries,
);

router.get(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	InquiryController.getInquiryById,
);

router.patch(
	"/:id/status",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	validateRequest(InquiryValidation.updateInquiryStatusSchema),
	InquiryController.updateInquiryStatus,
);

router.delete(
	"/:id",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	InquiryController.deleteInquiry,
);

export const InquiryRoutes = router;
