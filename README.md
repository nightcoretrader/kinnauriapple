# Kinnaur Apple — Premium Pre-Booking Platform

Three independent apps (not a monorepo):

- `web/` — Next.js landing page (no payment)
- `admin/` — Vite admin portal
- `api/` — NestJS + Prisma + PostgreSQL

## Local setup

**Requirements:** Node 20+, npm or pnpm, Docker Desktop.

```bash
# 1. Database
docker compose up -d

# 2. API
cd api
pnpm install
pnpm prisma:generate
pnpm exec prisma migrate dev --name init
pnpm exec prisma db seed
pnpm dev
# http://localhost:3001  Swagger: http://localhost:3001/docs

# 3. Landing page (new terminal)
cd web
pnpm install
pnpm dev
# http://localhost:3000

# 4. Admin portal (new terminal)
cd admin
pnpm install
pnpm dev
# http://localhost:5173
```

### Seeded admin login

- Email: `leo.a@example.org`
- Password: `ChangeMe123!`

Change these in `api/.env` (`SEED_ADMIN_*`) and re-run `pnpm exec prisma db seed` from `api/`.

Adminer: `http://localhost:8080` — PostgreSQL server `postgres`, user/password/db `kinnaur`. Host port **55432**.

## Scope

- Public `POST /api/bookings` (rate-limited). **No payment fields.**
- Admin JWT auth, dashboard, orders pipeline, CSV export, customers, settings, activity log.
