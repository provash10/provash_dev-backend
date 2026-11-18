import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

// fallback software products catalog
const defaultSoftwareProducts = [
	{
		id: "devflow-erp",
		slug: "devflow-erp",
		title: "DevFlow ERP",
		category: "Agency CRM & Project Suite",
		tagline: "All-in-One Agency Management, Client Portal & Automated Billing",
		shortDesc:
			"Complete enterprise workflow platform for agencies and studios. Manage client onboarding, sprint milestones, digital contracts, and automated invoice processing in a unified dashboard.",
		fullDesc:
			"DevFlow ERP is built to eliminate scattered spreadsheets and multiple SaaS subscriptions for growing digital agencies. It provides a real-time client collaboration portal where clients can track project milestones, approve staging releases, submit revisions, and pay milestone invoices with automatic payment confirmation.",
		features: [
			"Client Onboarding Portal with White-Label Branding",
			"Agile Sprint Board & Milestone Progress Tracking",
			"Automated Invoice Generation with bKash & Stripe Checkout",
			"Role-Based Access Control (Admins, Project Managers, Clients)",
			"Digital Contract Signing & Scope-of-Work Agreements",
			"Real-Time Activity Audit Logs & Email Notifications",
		],
		techStack: [
			"Next.js 16",
			"React 19",
			"TypeScript 5",
			"PostgreSQL",
			"Prisma ORM",
			"Tailwind CSS v4",
			"TanStack Query",
		],
		liveUrl: "https://devflow-erp-demo.vercel.app",
		status: "LIVE",
		isFeatured: true,
		order: 1,
	},
	{
		id: "tubepulse-ai",
		slug: "tubepulse-ai",
		title: "TubePulse AI",
		category: "YouTube Creator SaaS",
		tagline: "AI-Powered YouTube Channel Analytics, CTR Prediction & Keyword Engine",
		shortDesc:
			"Discover high-CPM niches, generate viral hook scripts, predict video thumbnail CTR with machine learning, and track audience retention benchmarks in real-time.",
		fullDesc:
			"TubePulse AI empowers creators and media automation studios to scale channel revenue faster. By analyzing thousands of trending YouTube videos in your niche, the platform identifies viral title patterns, generates retention-optimized scripts, and recommends click-worthy thumbnail designs.",
		features: [
			"High-CPM Niche & Competitor Keyword Opportunity Scanner",
			"AI Hook & Script Generator Optimized for YouTube Algorithms",
			"Thumbnail A/B Testing Simulator with Computer Vision CTR Scoring",
			"Automated Channel SEO Audits & Upload Time Recommendations",
			"Multi-Channel Analytics Dashboard with Revenue Forecasting",
			"Direct YouTube Data API v3 Integration",
		],
		techStack: [
			"Next.js 16",
			"React 19",
			"Node.js",
			"Python FastApi",
			"YouTube Data API",
			"OpenAI API",
			"PostgreSQL",
		],
		liveUrl: "https://tubepulse-ai-demo.vercel.app",
		status: "LIVE",
		isFeatured: true,
		order: 2,
	},
	{
		id: "socialboost-hub",
		slug: "socialboost-hub",
		title: "SocialBoost Hub",
		category: "SMM Growth & Reseller Portal",
		tagline: "Automated Social Growth Platform with Instant API Fulfillment",
		shortDesc:
			"Automate organic and targeted growth campaigns across YouTube, Facebook, and Instagram. Includes instant order processing, dynamic wallet balance, and reseller REST API.",
		fullDesc:
			"SocialBoost Hub is an automated growth engine built for social media managers and reseller businesses. It enables instant ordering of channel setup packages, high-retention subscriber campaigns, verified page setup, and automated drip-feed deliveries with real-time status webhooks.",
		features: [
			"Instant Order Placement with Automatic Provider API Routing",
			"Wallet Top-Up via bKash, Nagad, Rocket, and Binance Pay",
			"Drip-Feed Delivery Scheduling for Natural Retention Growth",
			"Reseller REST API with Full Webhook Status Callbacks",
			"Refill Guarantee Tracking & Automated Refill Request Handling",
			"Tiered Pricing System for Wholesale Resellers & VIP Clients",
		],
		techStack: [
			"Next.js 16",
			"React 19",
			"TypeScript 5",
			"Express.js",
			"Redis Queue",
			"PostgreSQL",
			"Prisma ORM",
		],
		liveUrl: "https://socialboost-hub-demo.vercel.app",
		status: "LIVE",
		isFeatured: true,
		order: 3,
	},
	{
		id: "restopos-cloud",
		slug: "restopos-cloud",
		title: "RestoPos Cloud",
		category: "Restaurant POS & Inventory",
		tagline: "Cloud-Based Restaurant POS, Kitchen Display & Real-Time Inventory Control",
		shortDesc:
			"Complete hospitality management software with offline-first billing, multi-kitchen order routing (KDS), digital QR menu ordering, and ingredient-level inventory tracking.",
		fullDesc:
			"RestoPos Cloud is engineered for high-volume cafes, restaurants, and cloud kitchens. Featuring lightning-fast touch billing, wireless thermal printer integration, table reservation management, and real-time food waste tracking to maximize operational margins.",
		features: [
			"Touch-Optimized POS Register with Offline Sync Capability",
			"Kitchen Display System (KDS) with Instant Sound Alerts",
			"QR Code Table Ordering with Contactless Digital Checkout",
			"Ingredient-Level Raw Inventory & Recipe Costing Calculator",
			"Multi-Branch Central Management with Unified Stock Transfer",
			"Thermal POS Printer & Bluetooth Receipt Hardware Support",
		],
		techStack: [
			"Next.js 16",
			"React 19",
			"TypeScript 5",
			"PostgreSQL",
			"Socket.io",
			"Web Bluetooth API",
			"Tailwind CSS v4",
		],
		liveUrl: "https://restopos-cloud-demo.vercel.app",
		status: "LIVE",
		isFeatured: true,
		order: 4,
	},
	{
		id: "shopnest-commerce",
		slug: "shopnest-commerce",
		title: "ShopNest Commerce",
		category: "Headless E-Commerce Engine",
		tagline: "Ultra-Fast Headless E-Commerce Platform with Multi-Vendor Capabilities",
		shortDesc:
			"Deliver sub-second page loads with modern headless storefront architecture. Features automated shipping courier API, flash-sale cache, and localized payment gateway.",
		fullDesc:
			"ShopNest Commerce is designed for modern online retailers who need extreme speed, dynamic conversion rate optimization, and seamless integration with courier systems like SteadFast and Pathao, combined with automated bKash/Nagad checkout.",
		features: [
			"Sub-Second Headless Storefront Powered by Next.js App Router",
			"SteadFast, Pathao & RedX Automated Courier API Dispatch",
			"One-Click Express Checkout with Instant bKash & Card Gateway",
			"Flash Sale Countdown Engine with Redis High-Concurrency Cache",
			"Dynamic Product Variants, Bulk Price Rules & Discount Coupons",
			"Automated Abandoned Cart Recovery via WhatsApp & SMS",
		],
		techStack: [
			"Next.js 16",
			"React 19",
			"TypeScript 5",
			"Express.js",
			"PostgreSQL",
			"Prisma ORM",
			"Redis",
		],
		liveUrl: "https://shopnest-commerce-demo.vercel.app",
		status: "LIVE",
		isFeatured: true,
		order: 5,
	},
	{
		id: "medcare-plus",
		slug: "medcare-plus",
		title: "MedCare Plus",
		category: "Healthcare & Telemedicine",
		tagline: "Complete Hospital ERP, Doctor Appointment & Telemedicine Suite",
		shortDesc:
			"HIPAA-compliant healthcare management platform with doctor appointment booking, secure WebRTC video consultation, digital prescription writer, and pharmacy billing.",
		fullDesc:
			"MedCare Plus connects patients, specialist physicians, diagnostic labs, and pharmacies in one secure cloud workspace. Supports digital electronic medical records (EMR), automated appointment SMS reminders, and instant digital prescription generation.",
		features: [
			"Doctor Appointment Booking with Real-Time Slot Availability",
			"HD Video Consultation Powered by Encrypted WebRTC",
			"Digital Prescription Builder with Drug Interaction Warning",
			"Patient Electronic Medical Records (EMR) & Diagnostic Uploads",
			"Pharmacy POS & Medication Expiry Tracking System",
			"Automated SMS & Email Appointment Reminders",
		],
		techStack: [
			"Next.js 16",
			"React 19",
			"TypeScript 5",
			"WebRTC",
			"Express.js",
			"PostgreSQL",
			"Prisma ORM",
		],
		liveUrl: "https://medcare-plus-demo.vercel.app",
		status: "LIVE",
		isFeatured: true,
		order: 6,
	},
];

// get all public active software products
const getAllSoftware = async (query: { category?: string; featured?: string }) => {
	// console.log("fetching software products")
	try {
		const softwareClient = (prisma as any).softwareProduct;
		if (softwareClient) {
			const where: any = {};
			if (query.category) {
				where.category = query.category;
			}
			if (query.featured === "true") {
				where.isFeatured = true;
			}

			const dbItems = await softwareClient.findMany({
				where,
				orderBy: [{ order: "asc" }, { createdAt: "desc" }],
			});

			if (dbItems && dbItems.length > 0) {
				return dbItems;
			}
		}
	} catch {
		// fallback to catalog if database query is unavailable
	}

	let filtered = defaultSoftwareProducts;
	if (query.category) {
		filtered = filtered.filter((item) =>
			item.category.toLowerCase().includes(query.category!.toLowerCase()),
		);
	}
	if (query.featured === "true") {
		filtered = filtered.filter((item) => item.isFeatured);
	}
	return filtered;
};

// get single software product by slug
const getSoftwareBySlug = async (slug: string) => {
	// console.log("fetching software product by slug")
	try {
		const softwareClient = (prisma as any).softwareProduct;
		if (softwareClient) {
			const dbItem = await softwareClient.findUnique({
				where: { slug },
			});
			if (dbItem) {
				return dbItem;
			}
		}
	} catch {
		// fallback to catalog if database query is unavailable
	}

	const fallbackItem = defaultSoftwareProducts.find(
		(item) => item.slug === slug,
	);
	if (!fallbackItem) {
		throw new AppError(httpStatus.NOT_FOUND, "Software product not found");
	}

	return fallbackItem;
};

// create software product
const createSoftware = async (payload: any) => {
	// console.log("creating software product")
	const softwareClient = (prisma as any).softwareProduct;
	if (!softwareClient) {
		throw new AppError(
			httpStatus.SERVICE_UNAVAILABLE,
			"Software products database model is not initialized yet",
		);
	}

	const existing = await softwareClient.findUnique({
		where: { slug: payload.slug },
	});

	if (existing) {
		throw new AppError(
			httpStatus.CONFLICT,
			"A software product with this slug already exists",
		);
	}

	return await softwareClient.create({
		data: payload,
	});
};

// update software product
const updateSoftware = async (id: string, payload: any) => {
	// console.log("updating software product")
	const softwareClient = (prisma as any).softwareProduct;
	if (!softwareClient) {
		throw new AppError(
			httpStatus.SERVICE_UNAVAILABLE,
			"Software products database model is not initialized yet",
		);
	}

	const existing = await softwareClient.findUnique({
		where: { id },
	});

	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Software product not found");
	}

	return await softwareClient.update({
		where: { id },
		data: payload,
	});
};

// delete software product
const deleteSoftware = async (id: string) => {
	// console.log("deleting software product")
	const softwareClient = (prisma as any).softwareProduct;
	if (!softwareClient) {
		throw new AppError(
			httpStatus.SERVICE_UNAVAILABLE,
			"Software products database model is not initialized yet",
		);
	}

	const existing = await softwareClient.findUnique({
		where: { id },
	});

	if (!existing) {
		throw new AppError(httpStatus.NOT_FOUND, "Software product not found");
	}

	return await softwareClient.delete({
		where: { id },
	});
};

export const SoftwareService = {
	getAllSoftware,
	getSoftwareBySlug,
	createSoftware,
	updateSoftware,
	deleteSoftware,
};
