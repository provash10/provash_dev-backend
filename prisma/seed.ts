import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// prisma singleton client instance
const prisma = new PrismaClient();

// main database seeding script
async function main() {
	// console.log("starting database seeding routine")

	const saltRounds = 10;
	const defaultPassword = await bcrypt.hash("Provash@2026", saltRounds);

	// seed default super admin account
	const superAdmin = await prisma.user.upsert({
		where: { email: "superadmin@provash.dev" },
		update: {
			role: "SUPER_ADMIN",
			status: "ACTIVE",
		},
		create: {
			name: "Provash Chandra Barman",
			email: "superadmin@provash.dev",
			password: defaultPassword,
			role: "SUPER_ADMIN",
			status: "ACTIVE",
			phone: "+8801700000001",
		},
	});

	// seed default studio admin account
	const studioAdmin = await prisma.user.upsert({
		where: { email: "admin@provash.dev" },
		update: {
			role: "ADMIN",
			status: "ACTIVE",
		},
		create: {
			name: "Provash Studio Admin",
			email: "admin@provash.dev",
			password: defaultPassword,
			role: "ADMIN",
			status: "ACTIVE",
			phone: "+8801700000002",
		},
	});

	// seed default project manager account
	const projectManager = await prisma.user.upsert({
		where: { email: "pm@provash.dev" },
		update: {
			role: "PROJECT_MANAGER",
			status: "ACTIVE",
		},
		create: {
			name: "Executive Project Manager",
			email: "pm@provash.dev",
			password: defaultPassword,
			role: "PROJECT_MANAGER",
			status: "ACTIVE",
			phone: "+8801700000003",
		},
	});

	// seed default demo client account
	const demoClient = await prisma.user.upsert({
		where: { email: "client@provash.dev" },
		update: {
			role: "CLIENT",
			status: "ACTIVE",
		},
		create: {
			name: "Valued Enterprise Client",
			email: "client@provash.dev",
			password: defaultPassword,
			role: "CLIENT",
			status: "ACTIVE",
			phone: "+8801700000004",
		},
	});

	// seed foundational agency services
	const services = [
		{
			title: "Full-Stack Web Development",
			slug: "full-stack-web-development",
			category: "WEB_DEVELOPMENT" as const,
			shortDesc:
				"High-performance Next.js and React enterprise applications with robust Express and PostgreSQL backends.",
			fullDesc:
				"End-to-end full stack web applications built with TypeScript, Prisma ORM, JWT security, bKash payments, and responsive Tailwind styling.",
			startingPrice: 45000,
			isFeatured: true,
			isActive: true,
			order: 1,
			features: [
				"Custom Next.js App Router Architecture",
				"PostgreSQL Database with Prisma ORM",
				"Role-Based Authentication and Security",
				"Online Payment Gateway Integration",
				"Dedicated Sprint Support and Maintenance",
			],
		},
		{
			title: "YouTube Automation & Operations",
			slug: "youtube-automation-operations",
			category: "YOUTUBE_AUTOMATION" as const,
			shortDesc:
				"Complete faceless and branded YouTube channel management, high-CTR thumbnails, and viral scriptwriting.",
			fullDesc:
				"Scalable video production pipelines engineered for audience retention, algorithm dominance, and monetized channel growth.",
			startingPrice: 35000,
			isFeatured: true,
			isActive: true,
			order: 2,
			features: [
				"Topic Research and High-Retention Scriptwriting",
				"4K Video Editing and Motion Graphics",
				"A/B Tested High-CTR Thumbnail Design",
				"Complete Channel SEO and Tag Optimization",
				"Monetization and Sponsorship Advisory",
			],
		},
		{
			title: "Social Media Marketing & Meta Ads",
			slug: "social-media-marketing-meta-ads",
			category: "SOCIAL_MEDIA_MARKETING" as const,
			shortDesc:
				"Targeted customer acquisition campaigns across Meta, TikTok, and Google with proven high return on ad spend.",
			fullDesc:
				"Omni-channel marketing funnels that turn cold audiences into loyal paying customers with conversion-focused ad creatives.",
			startingPrice: 25000,
			isFeatured: true,
			isActive: true,
			order: 3,
			features: [
				"Targeted Facebook and Instagram Ad Campaigns",
				"Audience Segmentation and Retargeting Pixels",
				"High-Converting Sales Copy and Creatives",
				"Conversion Tracking and Weekly ROI Reports",
				"Continuous Ad Budget Optimization",
			],
		},
		{
			title: "Technical SEO & Authority Growth",
			slug: "technical-seo-authority-growth",
			category: "SEO_OPTIMIZATION" as const,
			shortDesc:
				"Comprehensive on-page, off-page, and core web vitals optimization to rank your business on first-page search.",
			fullDesc:
				"White-hat search engine optimization strategies that deliver sustainable organic traffic, backlinks, and domain authority.",
			startingPrice: 20000,
			isFeatured: false,
			isActive: true,
			order: 4,
			features: [
				"Core Web Vitals and Page Speed Optimization",
				"Keyword Gap Analysis and Competitor Audit",
				"Schema Markup and Rich Snippets Setup",
				"Authority Backlink Outreach",
				"Monthly Search Console Ranking Reports",
			],
		},
	];

	for (const service of services) {
		await prisma.service.upsert({
			where: { slug: service.slug },
			update: {
				title: service.title,
				category: service.category,
				shortDesc: service.shortDesc,
				fullDesc: service.fullDesc,
				startingPrice: service.startingPrice,
				isFeatured: service.isFeatured,
				isActive: service.isActive,
				order: service.order,
				features: service.features,
			},
			create: service,
		});
	}

	// seed default portfolio projects
	const projects = [
		{
			title: "Shopyzu - E-Commerce Architecture",
			slug: "shopyzu-ecommerce-architecture",
			category: "Full-Stack Web",
			description:
				"A complete e-commerce website architecture featuring responsive layouts, custom cart management, and seamless UI flow.",
			thumbnail:
				"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
			liveUrl: "https://shopyzu.com",
			githubClient: "https://github.com/provash10",
			githubServer: "https://github.com/provash10",
			technologies: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL"],
			featured: true,
			order: 1,
		},
		{
			title: "SaaS Analytics Dashboard",
			slug: "saas-analytics-dashboard",
			category: "Full-Stack Web",
			description:
				"Real-time analytics platform featuring interactive charts, custom hooks, and secure HTTP interceptors for API calls.",
			thumbnail:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
			liveUrl: "https://analytics.provash.dev",
			githubClient: "https://github.com/provash10",
			githubServer: "https://github.com/provash10",
			technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
			featured: true,
			order: 2,
		},
		{
			title: "Agency Operations Portal",
			slug: "agency-operations-portal",
			category: "SaaS Architecture",
			description:
				"Centralized agency management system with automated invoice generation, sprint milestones, and client inquiry tracking.",
			thumbnail:
				"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
			liveUrl: "https://studio.provash.dev",
			githubClient: "https://github.com/provash10",
			githubServer: "https://github.com/provash10",
			technologies: ["Next.js 16", "React 19", "PostgreSQL", "bKash API"],
			featured: true,
			order: 3,
		},
	];

	for (const proj of projects) {
		await prisma.portfolioProject.upsert({
			where: { slug: proj.slug },
			update: proj,
			create: proj,
		});
	}

	// seed default testimonials
	const testimonials = [
		{
			clientName: "Marcus Vance",
			clientRole: "Founder",
			companyName: "Apex SaaS",
			rating: 5,
			feedback:
				"Provash and his agency team delivered our web application weeks ahead of schedule. The code quality, speed, and design were impeccable.",
			serviceType: "Full-Stack Web Development",
			isPublished: true,
			order: 1,
		},
		{
			clientName: "Sarah Jenkins",
			clientRole: "Digital Media Entrepreneur",
			companyName: "Creator Hub",
			rating: 5,
			feedback:
				"Our automated YouTube channel gained over 50,000 subscribers in four months under their content management and SEO strategy.",
			serviceType: "YouTube Automation",
			isPublished: true,
			order: 2,
		},
		{
			clientName: "David Thorne",
			clientRole: "Marketing Director",
			companyName: "Thorne Commerce",
			rating: 5,
			feedback:
				"The paid marketing funnels reduced our customer acquisition cost by thirty-eight percent in the first month. Highly recommended.",
			serviceType: "Social Media Marketing",
			isPublished: true,
			order: 3,
		},
	];

	for (const review of testimonials) {
		const existing = await prisma.testimonial.findFirst({
			where: { clientName: review.clientName },
		});
		if (!existing) {
			await prisma.testimonial.create({ data: review });
		}
	}

	// console.log("database seeding routine finished successfully")
}

// execute database seed runner
main()
	.catch((e) => {
		// console.log("database seed error notice", e)
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
