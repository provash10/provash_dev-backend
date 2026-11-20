import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Application, type Request, type Response } from "express";
import httpStatus from "http-status";
import config from "./app/config";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import { AuthRoutes } from "./app/module/auth/auth.route";
import { InquiryRoutes } from "./app/module/inquiry/inquiry.route";
import { PaymentRoutes } from "./app/module/payment/payment.route";
import { PortfolioRoutes } from "./app/module/portfolio/portfolio.route";
import { ServiceRoutes } from "./app/module/service/service.route";
import { SoftwareRoutes } from "./app/module/software/software.route";
import { SuperAdminRoutes } from "./app/module/superAdmin/superAdmin.route";
import { AdminRoutes } from "./app/module/admin/admin.route";
import { ProjectManagerRoutes } from "./app/module/projectManager/projectManager.route";
import { TestimonialRoutes } from "./app/module/testimonial/testimonial.route";
import { UserRoutes } from "./app/module/user/user.route";

const app: Application = express();

// CORS configuration
app.use(
	cors({
		origin: [config.frontend_url, "http://localhost:3000"],
		credentials: true,
	}),
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application api routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/super-admin", SuperAdminRoutes);
app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/project-manager", ProjectManagerRoutes);
app.use("/api/v1/services", ServiceRoutes);
app.use("/api/v1/software", SoftwareRoutes);
app.use("/api/v1/portfolio", PortfolioRoutes);
app.use("/api/v1/inquiries", InquiryRoutes);
app.use("/api/v1/testimonials", TestimonialRoutes);
app.use("/api/v1/payments", PaymentRoutes);

// Health check endpoint
app.get("/", (_req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		message: "Provash Agency & Portfolio Backend API is running smoothly",
		timestamp: new Date().toISOString(),
	});
});

// Centralized error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
