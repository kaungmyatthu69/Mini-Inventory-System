# Inventory System Mini

A minimal inventory management SPA built with Vue 3, TypeScript, and Tailwind CSS. Handles product browsing, order creation, and a dashboard with key metrics.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Language | TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 |
| State | Pinia (auth) + TanStack Query (server state) |
| Routing | Vue Router 5 |
| HTTP | Axios |
| Validation | Zod |
| Icons | Lucide Vue Next |
| Linting | ESLint + Oxlint |
| Formatting | Prettier |
| Testing | Vitest, Playwright |

## Project Structure

```
src/
├── api/              # Axios client + per-domain API functions
├── assets/           # Global CSS, static assets
├── components/       # Reusable UI components
│   └── layout/       # Layout shells (sidebar, top bar)
├── composables/      # Composable functions (auth, cart, queries)
├── constants/        # Static option lists (e.g. order statuses)
├── models/           # TypeScript interfaces + Zod schemas
├── router/           # Route definitions + auth guard
├── stores/           # Pinia stores (auth only)
├── utils/            # Shared helpers (formatting, error extraction)
└── views/            # Page-level components
    ├── auth/         # Login, Register
    ├── dashboard/    # Dashboard with stats
    ├── orders/       # Order list, Create order
    └── products/     # Product grid with filters
```

## Getting Started

### Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- pnpm (recommended)

### Install

```sh
pnpm install
```

### Environment

Copy the example env file and set your API URL:

```sh
cp .env.example .env
```

```env
VITE_API_URL=http://localhost:8000/api
```

### Development
import { z } from 'zod'

// Schemas
```sh
pnpm dev
```

### Production Build

```sh
pnpm build
```

### Preview Production Build

```sh
pnpm preview
```

## Available Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server with HMR |
| `pnpm build` | Type-check + build for production |
| `pnpm preview` | Preview the production build |
| `pnpm lint` | Run Oxlint then ESLint with auto-fix |
| `pnpm format` | Format `src/` with Prettier |
| `pnpm test:unit` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run E2E tests with Playwright |

## Features

- **Authentication** — Login/register with  token persistence and Zod form validation
- **Dashboard** — Overview stats (products, orders, revenue, low stock) with recent orders and stock alerts
- **Products** — Paginated product grid with search and category filtering
- **Orders** — Order list with status filter, expandable order details, and order creation with a product selector and cart

## API Contract

The frontend expects a REST API matching these endpoints:

| Method | Endpoint | Description |
|---|---|---|
| POST | `/login` | Authenticate, returns token + user |
| POST | `/register` | Create account, returns token + user |
| GET | `/dashboard` | Dashboard stats (products, orders, revenue, low stock) |
| GET | `/products?search=&category=&page=` | Paginated product list |
| GET | `/categories?page=` | Paginated category list |
| GET | `/orders?status=&page=` | Paginated order list |
| GET | `/orders/:id` | Single order detail |
| POST | `/orders` | Create a new order |

All authenticated endpoints require an `Authorization: Bearer <token>` header.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed).
