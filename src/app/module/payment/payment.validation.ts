import { z } from "zod";

// initiate payment validation schema
const initiatePaymentSchema = z.object({
	amount: z.number().positive("Amount must be positive"),
	currency: z.string().default("BDT"),
	serviceTitle: z.string().min(2, "Service title is required"),
	clientName: z.string().min(2, "Client name is required"),
	clientEmail: z.string().email("Valid client email is required"),
	clientPhone: z.string().optional(),
	paymentGateway: z
		.enum(["BKASH", "SSLCOMMERZ", "STRIPE", "MANUAL"])
		.default("BKASH"),
});

// update payment status validation schema
const updatePaymentStatusSchema = z.object({
	status: z.enum(["PENDING", "COMPLETED", "FAILED", "REFUNDED"]),
});

export const PaymentValidation = {
	initiatePaymentSchema,
	updatePaymentStatusSchema,
};
