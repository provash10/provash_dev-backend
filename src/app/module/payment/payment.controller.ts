import type { Request, Response } from "express";
import httpStatus from "http-status";
import config from "../../config";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { PaymentService } from "./payment.service";

// initiate payment controller
const initiatePayment = catchAsync(async (req: Request, res: Response) => {
	// console.log("initiate payment controller invoked")

	const userId = req.user?.userId;
	const result = await PaymentService.initiatePayment(req.body, userId);

	sendResponse(res, {
		statusCode: httpStatus.CREATED,
		success: true,
		message: "Payment initiated successfully",
		data: result,
	});
});

// handle bkash payment callback controller
const handleBkashCallback = catchAsync(async (req: Request, res: Response) => {
	// console.log("bkash callback controller invoked", req.query)

	const result = await PaymentService.handleBkashCallback(req.query);

	if (result.success) {
		res.redirect(
			`${config.frontend_url}/payment/success?invoice=${result.invoice}`,
		);
	} else {
		res.redirect(
			`${config.frontend_url}/payment/failed?message=${encodeURIComponent(result.message || "Failed")}`,
		);
	}
});

// verify payment controller
const verifyPayment = catchAsync(async (req: Request, res: Response) => {
	// console.log("verify payment controller invoked")

	const { transactionId } = req.params;
	const result = await PaymentService.verifyPayment(transactionId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "Payment verified and completed successfully",
		data: result,
	});
});

// get all payments for admin controller
const getAllPayments = catchAsync(async (_req: Request, res: Response) => {
	// console.log("get all payments controller invoked")

	const result = await PaymentService.getAllPayments();

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "All payment records fetched successfully",
		data: result,
	});
});

// get current user payments controller
const getMyPayments = catchAsync(async (req: Request, res: Response) => {
	// console.log("get my payments controller invoked")

	const userId = req.user?.userId as string;
	const result = await PaymentService.getMyPayments(userId);

	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User payments fetched successfully",
		data: result,
	});
});

// get payment by transaction id controller
const getPaymentByTransactionId = catchAsync(
	async (req: Request, res: Response) => {
		// console.log("get payment details controller invoked")

		const { transactionId } = req.params;
		const result = await PaymentService.getPaymentByTransactionId(transactionId);

		sendResponse(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Payment details fetched successfully",
			data: result,
		});
	},
);

export const PaymentController = {
	initiatePayment,
	handleBkashCallback,
	verifyPayment,
	getAllPayments,
	getMyPayments,
	getPaymentByTransactionId,
};
