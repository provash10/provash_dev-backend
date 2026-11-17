# Provash Digital Agency & Portfolio Backend API

Enterprise-grade modular backend API built with **Express.js**, **TypeScript**, and **Prisma ORM (PostgreSQL)** following the **Programming Hero Level-2 / Batch 7** architectural standard.

---

## 🛠️ Tech Stack
- **Runtime:** Node.js / Bun
- **Framework:** Express.js (TypeScript)
- **Database & ORM:** PostgreSQL + Prisma ORM
- **Authentication:** JWT (Access Token + Refresh Token) with Role-Based Access Control (RBAC)
- **Validation:** Zod Schema Validation
- **Code Standards:** Biome Formatter & Linter

---

## 📁 Modular Architecture
```
src/
├── app.ts                  # Application setup & route definitions
├── server.ts               # Server entry point & DB connection
└── app/
    ├── config/             # Environment configuration
    ├── errors/             # AppError & custom exceptions
    ├── interfaces/         # Shared TypeScript interfaces & types
    ├── lib/                # Prisma client singleton
    ├── middleware/         # checkAuth, validateRequest, globalErrorHandler, notFound
    ├── utils/              # catchAsync, sendResponse, jwt, seed
    └── module/
        ├── auth/           # Login, Register, Refresh Token, Me
        ├── user/           # User listing, Status & Role management
        ├── service/        # Agency Services (Web Dev, YouTube, SMM, etc.)
        ├── portfolio/      # Portfolio projects & showcases
        ├── inquiry/        # Client consultations & lead captures
        └── testimonial/    # Client reviews & testimonials
```

---

## 🚀 Getting Started

### 1. Install dependencies:
```bash
bun install
# or
npm install
```

### 2. Configure Environment:
Copy `.env.example` to `.env` and provide your database credentials:
```bash
cp .env.example .env
```

### 3. Database Migration & Prisma Client:
```bash
bun prisma migrate dev
# or
npx prisma db push
```

### 4. Run Development Server:
```bash
bun run dev
# or
npm run dev
```

The server will start on `http://localhost:5000`.
