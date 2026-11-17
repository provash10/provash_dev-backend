import crypto from "crypto";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { getBkashIdToken } from "../../lib/bkash";
import { sendEmail } from "../../lib/nodemailer";
import { prisma } from "../../lib/prisma";
import type { ICreatePaymentPayload } from "./payment.interface";

// initiate payment service supporting bkash tokenized api
const initiatePayment = async (
	payload: ICreatePaymentPayload,
	userId?: string,
) => {
	// console.log("initiating service payment transaction", payload)

	const transactionId = `txn_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
	const invoiceNumber = `inv_${Date.now()}`;

	let bkashPaymentUrl = "";
	let bkashPaymentId = "";

	if (payload.paymentGateway === "BKASH") {
		try {
			const idToken = await getBkashIdToken();

			const bkashCreateRes = await fetch(
				`${config.bkash_base_url}/tokenized/checkout/create`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: idToken,
						"X-App-Key": config.bkash_app_key,
					},
					body: JSON.stringify({
						mode: "0011",
						payerReference: payload.clientPhone || payload.clientEmail,
						callbackURL: config.bkash_callback_url,
						amount: String(payload.amount),
						currency: "BDT",
						intent: "sale",
						merchantInvoiceNumber: transactionId,
					}),
				},
			);

			const bkashResult = await bkashCreateRes.json();
			// console.log("bkash create payment response", bkashResult)

			if (bkashResult?.bkashURL) {
				bkashPaymentUrl = bkashResult.bkashURL;
				bkashPaymentId = bkashResult.paymentID;
			}
		} catch (_err) {
			// console.log("bkash sandbox payment gateway notice", _err)
		}
	}

	const fallbackUrl = `http://localhost:3000/payment/checkout?txn=${transactionId}&amount=${payload.amount}&service=${encodeURIComponent(payload.serviceTitle)}`;

	const payment = await prisma.payment.create({
		data: {
			transactionId,
			invoiceNumber,
			amount: payload.amount,
			currency: payload.currency || "BDT",
			serviceTitle: payload.serviceTitle,
			clientName: payload.clientName,
			clientEmail: payload.clientEmail,
			clientPhone: payload.clientPhone || null,
			paymentGateway: payload.paymentGateway || "BKASH",
			status: "PENDING",
			userId: userId || null,
			paymentUrl: bkashPaymentUrl || fallbackUrl,
		},
	});

	// send payment confirmation invoice email to client
	try {
		await sendEmail({
			to: payload.clientEmail,
			subject: `Payment Initiated - ${payload.serviceTitle} Invoice #${invoiceNumber}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
					<h2 style="color: #38bdf8;">Invoice #${invoiceNumber}</h2>
					<p>Dear ${payload.clientName},</p>
					<p>Your payment request for <strong>${payload.serviceTitle}</strong> has been created.</p>
					<p><strong>Amount:</strong> BDT ${payload.amount}</p>
					<p><strong>Transaction ID:</strong> ${transactionId}</p>
					<p>Click below to complete your secure payment:</p>
					<a href="${payment.paymentUrl}" style="display: inline-block; padding: 12px 24px; background: #06b6d4; color: #020617; font-weight: bold; text-decoration: none; border-radius: 8px;">Complete Payment</a>
					<p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Provash Agency & Developer Ecosystem</p>
				</div>
			`,
		});
	} catch (_mailErr) {
		// console.log("client email notification notice", _mailErr)
	}

	return {
		transactionId: payment.transactionId,
		invoiceNumber: payment.invoiceNumber,
		amount: payment.amount,
		currency: payment.currency,
		status: payment.status,
		paymentUrl: payment.paymentUrl,
		bkashPaymentId: bkashPaymentId || undefined,
	};
};

// handle bkash payment callback and execution
const handleBkashCallback = async (query: {
	paymentID?: string;
	status?: string;
	apiVersion?: string;
}) => {
	// console.log("bkash payment callback query", query)

	const { paymentID, status } = query;

	if (status !== "success" || !paymentID) {
		return { success: false, message: "Payment was cancelled or failed" };
	}

	try {
		const idToken = await getBkashIdToken();

		const executeRes = await fetch(
			`${config.bkash_base_url}/tokenized/checkout/execute`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: idToken,
					"X-App-Key": config.bkash_app_key,
				},
				body: JSON.stringify({ paymentID }),
			},
		);

		const executeResult = await executeRes.json();
		// console.log("bkash payment execute result", executeResult)

		if (
			executeResult?.statusCode === "0000" &&
			executeResult?.transactionStatus === "Completed"
		) {
			const merchantInvoiceNumber = executeResult.merchantInvoiceNumber;

			const updated = await prisma.payment.updateMany({
				where: { transactionId: merchantInvoiceNumber },
				data: { status: "COMPLETED" },
			});

			return {
				success: true,
				data: updated,
				invoice: merchantInvoiceNumber,
			};
		}

		return {
			success: false,
			message: executeResult?.statusMessage || "Execution failed",
		};
	} catch (error: any) {
		throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
	}
};

// verify and complete payment service manually
const verifyPayment = async (transactionId: string) => {
	// console.log("verifying payment transaction status")

	const payment = await prisma.payment.findUnique({
		where: { transactionId },
	});

	if (!payment) {
		throw new AppError(httpStatus.NOT_FOUND, "Payment transaction not found");
	}

	return await prisma.payment.update({
		where: { transactionId },
		data: { status: "COMPLETED" },
	});
};

// get all payments for admin
const getAllPayments = async () => {
	// console.log("fetching all payments for admin")

	return await prisma.payment.findMany({
		orderBy: { createdAt: "desc" },
		include: {
			user: {
				select: { id: true, name: true, email: true },
			},
		},
	});
};

// get payments of current user
const getMyPayments = async (userId: string) => {
	// console.log("fetching payments for logged in client")

	return await prisma.payment.findMany({
		where: { userId },
		orderBy: { createdAt: "desc" },
	});
};

// get payment details by transaction id
const getPaymentByTransactionId = async (transactionId: string) => {
	// console.log("fetching payment by transaction id")

	const payment = await prisma.payment.findUnique({
		where: { transactionId },
		include: {
			user: {
				select: { id: true, name: true, email: true },
			},
		},
	});

	if (!payment) {
		throw new AppError(httpStatus.NOT_FOUND, "Payment transaction not found");
	}

	return payment;
};

export const PaymentService = {
	initiatePayment,
	handleBkashCallback,
	verifyPayment,
	getAllPayments,
	getMyPayments,
	getPaymentByTransactionId,
};
