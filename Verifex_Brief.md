# Project: Verifex — Email Validation API

**Started:** 2026-06-13
**Updated:** 2026-06-13
**Goal:** A production-grade, open-source email validation SaaS. Users register, manage API keys from a dashboard, and use those keys to call the validation API. No payments. The code quality is the portfolio piece.
**Status:** Scaffolded — folder structure complete, ready for Step 1 (install dependencies)
**Live URL:** TBD (Vercel)
**GitHub:** TBD — public repo, open source from day one

---

## Why This Project

Email validation is a universal need — every SaaS, newsletter, and signup form needs it. The existing solutions (ZeroBounce, NeverBounce, AbstractAPI) are paid and closed source. Verifex is the open-source alternative: free to use, free to inspect, free to self-host.

Primary goal: portfolio piece demonstrating production-grade API design, TypeScript discipline, proper authentication, key management, and clean architecture — all visible on GitHub.

Secondary goal: prove that a non-engineer directing AI can produce code that holds up to scrutiny from established engineers and founders evaluating technical capability.

No payments in this phase. Ship the technical foundation first.

---

## What It Is

Verifex is a single Next.js application. It does everything: landing page, authentication, developer dashboard, and the validation API endpoint. There is no separate backend service.

**The Web App** — Next.js 14 App Router serves as both the product interface and the API:
- Landing page explaining the product and its value
- User registration and login (email + password via Supabase)
- Dashboard where authenticated users manage API keys and view usage stats
- API documentation page — accessible both publicly and from inside the dashboard

**The API** — Next.js Route Handler validates emails:
- Accepts API keys issued from the dashboard
- Runs a two-layer validation: format check + MX record lookup
- Logs every validation call with result, domain, and duration

Everything lives in one repository.

---

## User Flow

1. User lands on the Verifex landing page
2. User signs up with email + password (Supabase handles auth)
3. User confirms their email (Supabase sends the confirmation link)
4. User is taken to their dashboard
5. From the dashboard, user creates one or more API keys (e.g. one for dev, one for prod)
6. User copies the raw API key — it is shown once at creation, never again
7. User stores the key in their environment variables
8. User calls the validation endpoint from their own code using the `X-API-Key` header
9. User returns to the dashboard to see usage stats, create more keys, or revoke existing ones

---

## What It Does

### Web App (Next.js — dashboard + marketing)
- Landing page: product description, how-it-works, response shape preview, FAQ, call to action
- Auth pages: Sign Up, Log In, Forgot Password (all via Supabase email/password)
- Dashboard overview: total validations, valid count, invalid count, recent activity table
- API key management: create key, name it, see key prefix, revoke it, copy reminder
- Settings page: update display name, change password, delete account
- API docs: full reference — public at `/docs`, with real key prefix shown inside `/dashboard/docs`

### Validation API (Next.js Route Handler — developer-facing)
- **Format check** — regex validates the email structure (`user@domain.com`)
- **MX record lookup** — DNS query confirms the domain has active mail servers
- Returns structured JSON: valid/invalid, domain, MX records found, which check failed and why

**Validation layers in order:**
1. Format validation — rejects malformed emails immediately (no DNS call)
2. MX record lookup — only runs if format passes; confirms domain is mail-capable

No SMTP ping — too slow, too many servers block it, not needed for this scope.

---

## Tech Stack

Every choice has a reason. No random libraries.

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 14 (App Router) + TypeScript** | Single codebase for landing page, dashboard, and API. Server Components + Route Handlers eliminate the need for a separate backend |
| Styling | **Tailwind CSS** | Fast to build, clean output, no CSS file bloat |
| UI components | **shadcn/ui** | Accessible, unstyled-by-default components — no design lock-in |
| Auth + Database | **Supabase** | Email/password auth with httpOnly cookie session, PostgreSQL, Row Level Security on every table |
| DNS Lookup | **Node.js `dns/promises`** | Built-in — zero extra dependencies, runs inside Route Handlers |
| Forms | **React Hook Form + Zod** | Type-safe form validation, same Zod schemas used for type inference and runtime validation |
| Animations | **Framer Motion** | Landing page animations |
| Syntax highlighting | **Shiki** | Server-side code highlighting in the API docs — pre-rendered HTML sent to the client |
| Testing | **Vitest** | Unit tests for all service functions |
| Deployment | **Vercel** | Native Next.js support, scales automatically |
| MCP Infrastructure | **Supabase MCP + Vercel MCP** | Full build-deploy-debug loop runs inside Claude — no context switching |

---

## MCP Infrastructure (Already Connected)

Both MCPs are live in this Claude Code environment:
- **Supabase MCP** — database creation, migrations, and table management without leaving the editor
- **Vercel MCP** — deployment, environment variables, and logs without leaving the editor

This means the entire build-deploy-debug loop runs inside Claude.

---

## Architecture

### Repository Structure

Standard Next.js project structure. No wrapper folders.

```
verifex/
├── .claude/                          ← project rules (CLAUDE.md)
├── .github/
│   ├── workflows/ci.yml              ← type check, lint, test on every push
│   └── PULL_REQUEST_TEMPLATE.md
│
├── src/
│   ├── app/
│   │   ├── page.tsx                  Landing page
│   │   ├── layout.tsx                Root layout
│   │   ├── globals.css
│   │   ├── docs/page.tsx             Public API docs
│   │   ├── (auth)/                   Route group — no URL segment
│   │   │   ├── layout.tsx            Centered auth layout
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── auth/callback/route.ts    Supabase email confirmation handler
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            Dashboard shell layout
│   │   │   ├── page.tsx              Usage overview — stat cards + activity table
│   │   │   ├── keys/page.tsx         API key management
│   │   │   ├── docs/page.tsx         Docs with real key prefix shown
│   │   │   └── settings/page.tsx     Profile, password, delete account
│   │   └── api/v1/
│   │       ├── validate/route.ts     POST — email validation endpoint
│   │       ├── keys/route.ts         GET / POST / DELETE — API key management
│   │       ├── usage/route.ts        GET — usage stats + recent logs
│   │       └── account/route.ts      DELETE — delete account and all data
│   │
│   ├── components/
│   │   ├── landing/                  Hero, HowItWorks, ResponsePreview, Faq, CallToAction
│   │   ├── dashboard/                Sidebar, Topbar, MobileDrawer, DashboardShell
│   │   ├── keys/                     KeyCard, CreateKeyModal, RevokeDialog
│   │   ├── usage/                    StatCard, ActivityTable
│   │   ├── settings/                 ProfileForm, PasswordForm, DeleteAccountDialog
│   │   ├── docs/                     DocsLayout, EndpointCard, CodeBlock
│   │   └── ui/                       shadcn/ui base components
│   │
│   ├── services/
│   │   ├── auth.service.ts           signUp(), signIn(), signOut(), resetPassword(), updateProfile()
│   │   ├── keys.service.ts           createKey(), listKeys(), revokeKey()
│   │   └── usage.service.ts          getUsage()
│   │
│   ├── hooks/
│   │   ├── useAuth.tsx               AuthProvider + useAuth hook
│   │   ├── useApiKeys.ts             keys state, loading, error, createKey(), revokeKey(), refresh()
│   │   └── useUsage.ts               summary, logs, total, loading, error, refresh()
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             createBrowserClient — for 'use client' files
│   │   │   └── server.ts             createServerClient — for Server Components + Route Handlers
│   │   ├── constants.ts              API key prefix, limits, versioning constants
│   │   ├── errors.ts                 Standard error response factory
│   │   ├── validate-format.ts        Regex email format check
│   │   ├── validate-mx.ts            DNS MX record lookup via dns/promises
│   │   ├── shiki.ts                  Server-only syntax highlighter helper
│   │   ├── docs-data.ts              Pre-highlighted code examples for docs page
│   │   └── utils.ts                  cn(), formatDate(), formatDuration()
│   │
│   ├── middleware.ts                 Supabase session refresh + route protection
│   └── types/
│       ├── api.types.ts              Standard API response shape
│       ├── key.types.ts              ApiKey, CreateApiKeyRequest/Response
│       ├── validation.types.ts       ValidationRequest, ValidationResult, CheckResult
│       └── database.types.ts         Supabase database type definitions
│
├── supabase/
│   └── migrations/
│       └── 0001_initial_schema.sql   profiles, api_keys, usage_logs + RLS policies
│
├── tests/
│   ├── validate-format.test.ts
│   ├── validate-mx.test.ts
│   └── keys.service.test.ts
│
├── public/                           Static assets — logo, og image
├── docs/
│   ├── architecture.md
│   ├── api-contracts.md
│   └── decisions.md
│
├── .env.example
├── .eslintrc.json
├── .gitignore
├── .prettierrc
├── LICENSE
├── next.config.ts
├── package.json
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

**The chain of responsibility — never skip a layer, never merge two layers:**

`Page/Component → Hook → Service → API Route Handler → Supabase / dns/promises`

Route Handlers contain no business logic. Services contain no component state. Components make no API calls directly.

---

## API Endpoints

All endpoints under `/api/v1/`. Versioned from day one.

### API Key Management (Dashboard → API — uses Supabase session cookie)

```
POST /api/v1/keys
Body: { "name": "Production" }
Response: { "success": true, "data": { "id": "...", "name": "Production", "key": "vfx_live_...", "key_prefix": "vfx_live_xxxx", "created_at": "..." } }
Note: Raw key is returned once. Never stored. Save it now.

GET /api/v1/keys
Response: { "success": true, "data": [ { "id": "...", "name": "Production", "key_prefix": "vfx_live_xxxx", "is_active": true, "created_at": "...", "last_used_at": "..." } ] }

DELETE /api/v1/keys
Body: { "id": "uuid" }
Response: { "success": true, "data": { "message": "Key revoked." } }
```

### Usage Stats (Dashboard → API — uses Supabase session cookie)

```
GET /api/v1/usage?limit=20&offset=0
Response: {
  "success": true,
  "data": {
    "summary": { "total": 214, "valid": 189, "invalid": 25 },
    "logs": [ { "id": "...", "email_domain": "example.com", "result": "valid", "duration_ms": 38, "created_at": "..." } ],
    "total": 214
  }
}
```

### Email Validation (Developer's Code → API — uses X-API-Key header)

```
POST /api/v1/validate
Header: X-API-Key: vfx_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Body: { "email": "user@example.com" }

// Valid response
{
  "success": true,
  "data": {
    "valid": true,
    "email": "user@example.com",
    "domain": "example.com",
    "checks": {
      "format": true,
      "mx": true
    },
    "mx_records": ["mail.example.com"]
  }
}

// Invalid response
{
  "success": true,
  "data": {
    "valid": false,
    "email": "user@fakedomain.xyz",
    "domain": "fakedomain.xyz",
    "checks": {
      "format": true,
      "mx": false
    },
    "mx_records": [],
    "reason": "No MX records found for domain"
  }
}
```

### Account Management (Dashboard → API — uses Supabase session cookie)

```
DELETE /api/v1/account
Response: { "success": true, "data": { "message": "Account deleted." } }
Note: Deletes in FK-safe order — usage_logs → api_keys → profiles → auth user
```

### Standard Error Response

Every error in the system returns this exact shape:

```json
{
  "success": false,
  "error": {
    "message": "Human-readable description",
    "code": "MACHINE_READABLE_CODE"
  }
}
```

Standard error codes: `VALIDATION_ERROR` (400), `UNAUTHORIZED` (401), `FORBIDDEN` (403), `NOT_FOUND` (404), `CONFLICT` (409), `RATE_LIMITED` (429), `INTERNAL_ERROR` (500)

---

## Database Schema (Supabase / PostgreSQL)

### profiles
Auto-created by a Supabase trigger when a user registers.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, FK → auth.users |
| email | text | |
| full_name | text | |
| created_at | timestamptz | |

### api_keys

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| user_id | uuid | FK → auth.users |
| name | text | Human label — "Production", "My App" |
| key_hash | text | SHA-256 of the raw key — raw key never stored |
| key_prefix | text | First 12 chars shown in dashboard (e.g. `vfx_live_xxxx`) |
| is_active | boolean | False = revoked |
| created_at | timestamptz | |
| last_used_at | timestamptz | Updated on every successful validation call |

### usage_logs

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key |
| api_key_id | uuid | FK → api_keys |
| user_id | uuid | FK → auth.users |
| email_domain | text | Domain portion only — full email never logged |
| result | text | `'valid'` \| `'invalid'` |
| format_check | boolean | Did format validation pass? |
| mx_check | boolean | Did MX lookup pass? |
| duration_ms | integer | Total validation time |
| created_at | timestamptz | |

Row Level Security is enabled on all three tables. Users can only read and modify their own rows.

**Privacy note:** The full email address is never stored. Only the domain is logged. This is intentional and worth calling out in the README.

---

## Two Auth Systems — Never Mixed

This is the most important architectural detail. There are two completely separate authentication mechanisms used for different callers.

**1. Supabase Session (httpOnly cookie)**
- Who uses it: the person logged into the Verifex website
- How it works: Supabase sets a session cookie on login. Middleware refreshes it on every request. Route Handlers verify it with `supabase.auth.getUser()`
- Used for: all dashboard operations — creating/listing/revoking API keys, viewing usage, account settings
- Never used for the validation endpoint

**2. API Key (X-API-Key header)**
- Who uses it: developers calling the validation API from their own code
- How it works: raw key generated on creation, shown once, SHA-256 hash stored in Supabase. Incoming key is hashed and looked up in `api_keys` table
- Format: `vfx_live_` prefix + 32 random hex chars
- Used for: `POST /api/v1/validate` only
- Never used for dashboard operations

If there is any question about which to use — look at who the caller is. Dashboard UI = Supabase session. Developer's application code = API key.

---

## Code Quality Standards

These are the specific things that separate production code from AI slop.

1. TypeScript strict mode throughout — `tsconfig.json` has `"strict": true`, no `any` types without a comment explaining why
2. Every function has an explicit return type
3. All API calls go through `/services` — no fetch() calls inside components or pages
4. All inputs validated with Zod before processing — bad data returns a clean error, not a server crash
5. API keys: SHA-256 hash stored, raw key never written anywhere after creation
6. Supabase session stored in httpOnly cookie — never localStorage
7. Full email never stored — only the domain is logged in usage_logs
8. `SUPABASE_SERVICE_ROLE_KEY` is server-only — no `NEXT_PUBLIC_` prefix, never reaches the browser
9. Standard error response shape on every failure — no raw Supabase errors, no unstructured messages
10. No function longer than 50 lines, no file longer than 300 lines
11. No `console.log` committed — all removed before commits
12. No hardcoded values — constants or environment variables for everything

---

## GitHub Strategy

The repo is public from the start. The README is written for two audiences simultaneously: a developer who wants to use the API, and a technical reviewer who wants to evaluate the code.

**README structure:**
1. What it does (one paragraph)
2. Architecture overview (single Next.js app explained clearly)
3. Quick start (register, get a key, first curl call)
4. API reference (endpoint, request shape, both response shapes)
5. Design decisions (why hash-only key storage, why domain-only logging, why two auth systems)
6. Running tests
7. Self-hosting guide
8. Environment variables reference

---

## Build Order

1. Scaffold Next.js 14 + TypeScript project
2. Connect Supabase — create project via MCP, run migrations
3. Implement auth — register, login, forgot password, email callback
4. Build dashboard shell — sidebar, topbar, mobile drawer, route protection via middleware
5. Implement API key management — create, list, revoke (Route Handler + service + hook + UI)
6. Implement email validation logic — `validate-format.ts` + `validate-mx.ts`
7. Wire up the validation endpoint — `POST /api/v1/validate`
8. Add usage logging — log every call to `usage_logs`
9. Build usage dashboard — stat cards + activity table
10. Build settings page — update profile, change password, delete account
11. Build API docs — public `/docs` + personalized `/dashboard/docs`
12. Write tests (Vitest)
13. Write README
14. Deploy to Vercel via MCP
15. Push to GitHub (public)

---

## Progress Log
- 2026-06-13: Brief written. Full SaaS scope confirmed. Architecture defined.
- 2026-06-13: Full project scaffolded. All folders, config files, type definitions, service stubs, migration, tests, and docs created. Structure corrected to standard Next.js layout (no web/ wrapper). Rule added to global CLAUDE.md: always use professional standard Next.js structure, flag any deviations before implementing.
- 2026-06-13: Multiple review passes completed. Fixed: missing packages (clsx, tailwind-merge, tailwindcss-animate, autoprefixer, prettier, @hookform/resolvers, lucide-react, shadcn Radix packages), missing postcss.config.mjs, RLS security hole on usage_logs, manually written database.types.ts (added regeneration warning), missing hook files, missing docs-data.ts, AuthProvider not mounted in layout.tsx, Supabase client recreated on every render (fixed with useRef), missing error.tsx and not-found.tsx, missing dashboard/error.tsx, missing supabase/config.toml, React plugin removed from vitest, unused @vitejs/plugin-react removed from package.json, env variable validation (lib/env.ts created), vercel.json with security headers, withErrorHandler pattern established, all route stubs use errorResponse().
- 2026-06-13: Design system created. Swiss International Typographic Style, light only. Full system documented in DESIGN.md covering colours (extracted from Detroit 1982 punk poster), typography (Inter, 11-size scale), spacing, border radius (2px sharp corners), shadows, grid, and all component specs. Visual preview in design-preview.html. Design rules embedded in .claude/CLAUDE.md. ROADMAP.md created with 11 phases, acceptance criteria for each. nextjs-production-standards.md saved to global .claude/ folder.
