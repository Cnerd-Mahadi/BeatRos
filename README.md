# BeatRos

A production-ready e-commerce platform built with a microservices architecture. Browse products, manage your cart as a guest or signed-in user, and check out with Stripe — all backed by a distributed backend that handles each concern independently.

> Built as a portfolio project to demonstrate real-world system design, not just CRUD.

---

## What it does

Customers can browse a product catalog, filter by brand or category, add items to their cart, and complete a purchase via Stripe. The cart persists across sessions — even before you sign in, your items are saved and automatically merged when you log in.

Behind the scenes, completing a payment triggers an async workflow: inventory is deducted and a confirmation email is sent — without blocking the checkout response.

---

## What makes it interesting

**Microservices that actually talk to each other**
The backend is split into four independent services — products, orders, inventory, and cart. A single API gateway sits in front of all of them, handling authentication and routing. Each service owns its own database schema and can be scaled or deployed independently.

**Guest cart that actually works**
Most implementations break anonymous carts when you switch domains or browsers block third-party cookies. This one reads the session server-side and forwards it as a request header, so it works reliably regardless of browser cookie policies.

**Stripe webhooks handled at the right layer**
Payment verification happens at the gateway — the signature is validated once using the raw request body, then the confirmed event is forwarded to the order service as plain JSON. The order service never touches Stripe directly.

**Async job processing**
Stock release and order confirmation emails are dispatched as background jobs via Upstash QStash. If a payment fails mid-flight, reserved stock is automatically released. The checkout flow stays fast and the side effects happen reliably in the background.

**Resilient inter-service communication**
Every service-to-service HTTP call retries automatically on transient failures using exponential backoff — shared across all services from a single axios instance. One config change fixes every service at once.

**Structured logging across all services**
Every log line is tagged with the service name, so when running in production you can tell at a glance whether an error came from the order service or the inventory service.

---

## Tech Stack

**Frontend** — Next.js 15, React 19, Tailwind CSS, TanStack Query, Zustand, Clerk, Framer Motion

**Backend** — Node.js, Express 5, TypeScript, Prisma, PostgreSQL, Upstash Redis, Upstash QStash, Stripe, Clerk, Winston

**Monorepo** — pnpm workspaces, Turborepo, Docker, supervisord

---

## Architecture Overview

```
Next.js Frontend
      │
      ▼
  API Gateway          ← auth, rate limiting, Stripe webhook verification
      │
      ├── Product Service    ← catalog, filtering, brands, categories
      ├── Order Service      ← checkout sessions, async job handlers
      ├── Inventory Service  ← stock reserve / deduct / release
      └── Cart Service       ← Redis-backed, guest + authenticated
```

Shared utilities (logger, HTTP client, Redis) live in a workspace package consumed by every service — changes propagate everywhere without duplication.

---

## Running Locally

```bash
pnpm install
pnpm dev
```

You'll need accounts for Clerk, Stripe, Upstash (Redis + QStash), and a PostgreSQL database. Copy the `.env.example` files in each app and fill in your keys.
