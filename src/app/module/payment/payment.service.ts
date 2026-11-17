import crypto from "crypto";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import type { ICreatePaymentPayload } from "./payment.interface";

// initiate payment service
const initiatePayment = async (
	payload: ICreatePaymentPayload,
	userId?: string,
) => {
	// console.log("initiating service payment transaction")

	const transactionId = `txn_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`;
	const invoiceNumber = `inv_${Date.now()}`;

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
			paymentUrl: `https://checkout.provash.dev/pay/${transactionId}`,
		},
	});

	return {
		transactionId: payment.transactionId,
		invoiceNumber: payment.invoiceNumber,
		amount: payment.amount,
		currency: payment.currency,
		status: payment.status,
		paymentUrl: payment.paymentUrl,
	};
};

// verify and complete payment service
const verifyPayment = async (transactionId: string) => {
	// console.log("verifying payment transaction status")

	const payment = await prisma.payment.findUnique({
		where: { transactionId },
	});

	if (!payment) {
		throw new AppError(httpStatus.NOT_FOUND, "Payment transaction not found");
	}

	const updated = await prisma.payment.update({
		where: { transactionId },
		data: { status: "COMPLETED" },
	});

	return updated;
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
	verifyPayment,
	getAllPayments,
	getMyPayments,
	getPaymentByTransactionId,
};
