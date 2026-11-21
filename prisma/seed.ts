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

	// seed default technical blog articles
	const initialBlogs = [
		{
			title: "Mastering Next.js 16 SSR & Turbopack Performance",
			slug: "mastering-nextjs-16-ssr-turbopack-performance",
			category: "Technology & IT",
			subCategory: "Web Development",
			readTime: "6 min read",
			description:
				"Explore how Server-Side Rendering (SSR) in Next.js 16 improves SEO, speeds up initial page load, and delivers blazing-fast web experiences.",
			content:
				"Server-Side Rendering (SSR) in Next.js allows servers to generate full HTML documents on each incoming user request. By avoiding client-side layout shifts and initial blank screens, web apps achieve exceptional First Contentful Paint scores.\n\n![Turbopack and Next.js Engine Architecture](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000)\n\nTurbopack is written in Rust and serves as an ultra-fast incremental bundler. In Next.js applications, hot module replacement operates ten times faster than legacy Webpack setups. Learn more details on the [Official Next.js Documentation](https://nextjs.org) and explore benchmarking studies on [Vercel Engineering](https://vercel.com/blog).\n\n![High Performance Cloud Deployments and Edge Hydration](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000)\n\nCombining Server Components with streaming SSR unlocks near-instantaneous page rendering. Developers can stream complex data blocks using React Suspense boundaries without blocking the main navigation thread.",
			tags: ["Next.js", "SSR", "Turbopack", "Performance"],
			image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: true,
			order: 1,
		},
		{
			title: "The Architecture of Modern Large Language Models",
			slug: "the-architecture-of-modern-large-language-models",
			category: "Technology & IT",
			subCategory: "Artificial Intelligence",
			readTime: "7 min read",
			description:
				"An in-depth look at transformer self-attention mechanisms, tokenization pipelines, and fine-tuning techniques powering generative AI.",
			content:
				"Modern LLMs rely on multi-head attention layers that weigh tokens relative to context. Exploring how positional embeddings and causal masking work reveals why transformers scale efficiently.",
			tags: ["AI", "Transformers", "LLM", "Deep Learning"],
			image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: true,
			order: 2,
		},
		{
			title: "James Webb Space Telescope Discoveries in Deep Space",
			slug: "james-webb-space-telescope-discoveries-in-deep-space",
			category: "Science",
			subCategory: "Space & Astronomy",
			readTime: "5 min read",
			description:
				"How infrared observations are rewriting our understanding of early galaxy formation, exoplanet atmospheres, and stellar nurseries.",
			content:
				"JWST operates in infrared wavelengths, allowing it to penetrate cosmic dust veils. Spectroscopic analysis of exoplanet atmospheres has revealed water vapor, carbon dioxide, and clouds on worlds light-years away.",
			tags: ["Astronomy", "JWST", "Cosmology", "Space"],
			image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: true,
			order: 3,
		},
		{
			title: "Quantum Entanglement and Information Theory",
			slug: "quantum-entanglement-and-information-theory",
			category: "Science",
			subCategory: "Physics & Quantum",
			readTime: "6 min read",
			description:
				"Understanding non-locality, Bell test experiments, and how quantum states enable quantum key distribution and quantum computing.",
			content:
				"Quantum entanglement demonstrates correlations between separated particles that defy classical limits. When applied to cryptography, entangled pairs guarantee eavesdropping detection through fundamental laws of physics.",
			tags: ["Quantum", "Physics", "Cryptography", "Computing"],
			image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: false,
			order: 4,
		},
		{
			title: "Global Supply Chains and Geopolitical Realignment",
			slug: "global-supply-chains-and-geopolitical-realignment",
			category: "Politics",
			subCategory: "Geopolitics & Global Affairs",
			readTime: "6 min read",
			description:
				"How semiconductor trade, critical mineral corridors, and regional alliances are reshaping international trade politics.",
			content:
				"Nations are moving from just-in-time logistics to friend-shoring and sovereign manufacturing. Trade corridors across Eurasia and the Indo-Pacific reflect the intersection of defense policy and commercial strategy.",
			tags: ["Geopolitics", "Trade", "Diplomacy", "Supply Chain"],
			image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: false,
			order: 5,
		},
		{
			title: "The Rise of FinTech and Instant Cross-Border Payments",
			slug: "the-rise-of-fintech-and-instant-cross-border-payments",
			category: "Finance",
			subCategory: "FinTech",
			readTime: "5 min read",
			description:
				"How open banking APIs, ISO 20022 messaging, and distributed ledgers are cutting remittance costs and settlement latency worldwide.",
			content:
				"Cross-border payments historically suffered from correspondent banking friction. Modern FinTech platforms leverage real-time rail connections and automated currency matching to deliver instant settlement at a fraction of legacy fees.",
			tags: ["FinTech", "Banking", "Payments", "Remittance"],
			image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: true,
			order: 6,
		},
		{
			title: "Index Funds vs Active Stock Picking for Wealth Building",
			slug: "index-funds-vs-active-stock-picking-for-wealth-building",
			category: "Finance",
			subCategory: "Stock Market & Investing",
			readTime: "7 min read",
			description:
				"Analyzing long-term market returns, expense ratios, compounding gains, and why passive indexing beats most active funds.",
			content:
				"Decades of empirical data demonstrate that over eighty percent of actively managed funds underperform low-cost index benchmarks after fees. Dollar-cost averaging into broad market indices remains the most reliable strategy for compounding wealth.",
			tags: ["Investing", "Finance", "Wealth", "Stock Market"],
			image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000",
			isPublished: true,
			featured: false,
			order: 7,
		},
	];

	for (const blog of initialBlogs) {
		await prisma.blog.upsert({
			where: { slug: blog.slug },
			update: blog,
			create: blog,
		});
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
