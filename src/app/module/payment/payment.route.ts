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
	checkAuth("SUPER_ADMIN", "ADMIN", "CLIENT"),
	PaymentController.getMyPayments,
);

// admin get all payments route
router.get(
	"/admin/all",
	checkAuth("SUPER_ADMIN", "ADMIN"),
	PaymentController.getAllPayments,
);

export const PaymentRoutes = router;
