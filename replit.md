# Willard Peak Campground

A tactile, editorial campground website for planning a slower night at Willard Peak Campground in Willard, Utah.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/willard-peak-campground/src/App.tsx` — single-page campground experience and interactions
- `artifacts/willard-peak-campground/src/index.css` — editorial field-guide visual system, responsive layout, and motion
- `artifacts/willard-peak-campground/.replit-artifact/artifact.toml` — artifact metadata and managed web workflow

## Architecture decisions

- The site is presentation-first and intentionally does not invent booking, pricing, amenity, or operational data.
- The stay-planning form is a client-side planning aid with explicit copy that no booking inbox is connected yet.
- The provided campground address is the source of truth for the Google Maps action and visit section.

## Product

- Editorial landing page inspired by a printed field guide
- Responsive anchor navigation with mobile menu
- Stay-planning form with honest submission feedback
- Direct Google Maps action for the campground address

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
