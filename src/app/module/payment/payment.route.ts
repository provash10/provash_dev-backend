import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { PaymentController } from "./payment.controller";
import { PaymentValidation } from "./payment.validation";

const router = Router();

// initiate payment route
router.post(
	"/initiate",
	validateRequest(PaymentValidation.initiatePaymentSchema),
	PaymentController.initiatePayment,
);

// bkash callback webhook route (get and post supported by bkash)
router.get("/bkash/callback", PaymentController.handleBkashCallback);
router.post("/bkash/callback", PaymentController.handleBkashCallback);

// verify payment route
router.post(
	"/verify/:transactionId",
	PaymentController.verifyPayment,
);

// get single payment details route
router.get(
	"/:transactionId",
	PaymentController.getPaymentByTransactionId,
);

// get my payments route
router.get(
	"/my/history",
	checkAuth("SUPER_ADMIN", "ADMIN", "PROJECT_MANAGER", "CLIENT"),
	PaymentController.getMyPayments,
);

// admin get all payments route
router.get(
	"/admin/all",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	PaymentController.getAllPayments,
);

export const PaymentRoutes = router;
