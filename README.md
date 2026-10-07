# Willard-Peak-Campground_v1

A Replit workspace export containing a real, finished-looking frontend: a tactile, editorial website for Willard Peak Campground in Willard, Utah.

## Features (the `artifacts/willard-peak-campground` site)

- Brand header ("Willard Peak — Campground / Northern Utah") with a custom SVG mark
- Sections: field notes, plan-a-stay, find-us, check-in navigation
- Custom styling, mobile hook, toast system, error boundary, 404 page

## Tech stack

- Web artifact: React + TypeScript, Vite, Wouter, Tailwind CSS, shadcn/ui (`components/ui`), React Query
- Workspace template: pnpm workspaces, Node.js 24, TypeScript 5.9, Express 5 skeleton, PostgreSQL + Drizzle scaffolding, Zod (`zod/v4`), Orval

## Getting started

- Workspace root: `pnpm run typecheck`, `pnpm run build`; API skeleton: `pnpm --filter @workspace/api-server run dev` (port 5000, needs `DATABASE_URL`)
- Web artifact: `pnpm --filter @workspace/willard-peak-campground run dev` (Vite), `run build` for a production bundle

## Project structure

- `artifacts/willard-peak-campground/` — the real site (`src/App.tsx`, `src/pages/`, `src/components/`, `index.css`)
- `artifacts/api-server/`, `artifacts/mockup-sandbox/` — unused template skeletons
- `lib/` — shared `api-spec`, `api-client-react`, `api-zod`, `db`
- `replit.md` — describes the campground site and the workspace commands

## Status

The campground site itself is implemented; the backend is still template skeleton. Original Replit project: https://replit.com/@isitlocated/Willard-Peak-Campground
