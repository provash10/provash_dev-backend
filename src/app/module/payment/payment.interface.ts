// payment payload interface
export interface ICreatePaymentPayload {
	amount: number;
	currency?: string;
	serviceTitle: string;
	clientName: string;
	clientEmail: string;
	clientPhone?: string;
	paymentGateway?: "BKASH" | "SSLCOMMERZ" | "STRIPE" | "MANUAL";
}

// payment response interface
export interface IPaymentResponse {
	paymentUrl: string;
	transactionId: string;
	status: string;
}
