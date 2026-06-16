# Verifex — The Full Build Story

**Project:** Verifex — Open-Source Email Validation SaaS
**Built by:** Atif Manzoor (product direction) + Claude (technical execution)
**Started:** June 2026
**Status:** All 11 phases complete. Live on Vercel.
**GitHub:** https://github.com/atifmanzoorali/verifex
**Live URL:** https://verifex-puce.vercel.app

---

## What This Project Is

Verifex is a production-grade, open-source email validation SaaS. It lets developers validate email addresses programmatically — checking format and MX records — through a simple REST API.

Developers register on the Verifex website, create an API key from their dashboard, and then call the validation endpoint from their own code. Every call is logged. They can see their usage stats, manage multiple keys, and revoke any key from the dashboard.

The product has no payments. The point was never monetisation. The point was to build something that senior engineers would look at on GitHub and say: this person understands how software is actually made.

---

## Why This Project Was Built

Atif Manzoor is a non-technical operator with 20 years of business experience. He is not a developer. He understands products, markets, and users deeply — and is building software by directing AI as his technical layer. Verifex was the first portfolio-grade project built this way.

The thinking behind choosing email validation as the subject:

- **Universal utility** — every SaaS, newsletter, and signup form needs email validation. It is not a niche problem.
- **Existing solutions are paid and closed** — ZeroBounce, NeverBounce, AbstractAPI all charge. There is no credible open-source alternative that is also well-designed and hosted.
- **Technically rich but bounded** — email validation is simple enough to build in weeks but complex enough to demonstrate real architecture: two-layer validation, API key security, rate limiting, usage logging, a full dashboard, authentication, and database design.
- **Evaluable by engineers** — a senior engineer looking at the GitHub repo would immediately understand what the system does and be able to assess the quality of every decision.

The secondary goal was to prove something: a non-engineer directing AI can produce code that holds up to technical scrutiny from established engineers and founders.

---

## The Design Philosophy

Before a single line of code was written, a complete design system was created. The aesthetic direction was Swiss International Typographic Style — the visual language of precision, structure, and clarity that defined the best European corporate design of the 20th century.

The specific influence was a Detroit 1982 punk concert poster. The colours were extracted from that poster: warm off-white background, deep near-black text, a teal primary, a muted cream for landing sections. No gradients. No rounded corners beyond 4px. No decorative graphics. Typography is Inter only. Light mode only — no dark mode.

The rule was: the design must feel like it was made by someone who has strong opinions, not someone who accepted defaults.

All of this was documented in `DESIGN.md` and embedded as hard rules in the project instructions — so every component built in every phase followed the same system automatically.

---

## The Architecture Decision

Verifex is a single Next.js application. One codebase. One deployment. It handles everything:
- The public landing page
- User authentication
- The developer dashboard
- The validation API endpoint
- The API documentation

There is no separate backend service. No Express. No Fastify. No separate API server. Next.js Route Handlers run on the server and have full access to Node.js, including the DNS module needed for MX record lookups.

The reason for this choice: at this scale, a separate backend adds two deployments, two CI pipelines, and CORS configuration — with no architectural benefit. The simplicity is a feature, not a compromise.

The layer chain was defined once and never broken:

```
Page / Component → Hook → Service → Route Handler → Supabase / dns/promises
```

Components never call APIs directly. Route Handlers contain no business logic. Services contain no component state. This separation makes every layer testable and replaceable independently.

---

## The Tech Stack

Every choice in the stack has a reason.

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | Single codebase for UI and API. Server Components eliminate client-side data fetching complexity. |
| Styling | Tailwind CSS | Fast to build. Clean output. No CSS file bloat. |
| UI components | shadcn/ui | Accessible, unstyled base components. No design lock-in. Each component is copied into the project and owned. |
| Auth + Database | Supabase | Email/password auth with httpOnly cookie sessions. PostgreSQL. Row Level Security enforced at the database level. |
| DNS validation | Node.js `dns/promises` | Built-in to Node. Zero extra dependencies. Runs natively in Route Handlers. |
| Forms | React Hook Form + Zod | Type-safe form validation. Same Zod schemas used for both TypeScript type inference and runtime input validation. |
| Animations | Framer Motion | Landing page entrance animations. Nothing else. |
| Syntax highlighting | Shiki | Server-side code highlighting in the API docs — HTML is pre-rendered on the server, sent to client as a string. Zero client-side JS for syntax highlighting. |
| Testing | Vitest | Unit tests for all logic. DNS module mocked to remove network dependency from tests. |
| Deployment | Vercel | Native Next.js support. Serverless functions for API routes. |
| Build tooling | MCP (Supabase + Vercel) | The entire build-deploy-debug loop runs inside Claude — no context switching. |

---

## The Security Model

Three specific security decisions were made explicitly and documented:

**1. Hash-only API key storage**
The raw API key is shown once at creation and never stored. Only the SHA-256 hash is written to the database. If the database is ever compromised, the leaked hashes cannot be reversed into working keys. This is the same pattern used by GitHub personal access tokens.

**2. Domain-only logging**
The full email address submitted for validation is never written to the database. Only the domain portion is logged (`example.com`, not `user@example.com`). This is because developers using the API are sending other people's email addresses. Storing full emails creates a PII liability. Storing just the domain gives the same operational insight with zero personal data exposure.

**3. Two completely separate auth systems**
Dashboard operations use a Supabase session cookie. The validation API uses an API key in the `X-API-Key` header. These two systems never cross. The dashboard user and the API caller are different actors with different security requirements — mixing them would be an architectural error.

---

## The Database

Three tables. All with Row Level Security. Each user can only read and modify their own rows.

**profiles** — Created automatically when a user registers. Stores display name and email.

**api_keys** — One row per key. Stores the SHA-256 hash (not the raw key), the first 12 characters as a prefix shown in the dashboard, the key name, and whether the key is active. Keys are never deleted — revoking sets `is_active = false`. This preserves the audit trail because `usage_logs` rows reference the key by ID.

**usage_logs** — One row per validation call. Stores the domain validated, the result (valid/invalid), which checks passed, duration in milliseconds, and which key was used. The full email address is never written here.

Rate limiting is implemented by counting `usage_logs` rows for the calling key in the past 60 seconds. No Redis. No separate rate-limit service. A single SQL count query is fast enough at this scale, and avoiding Redis means one less infrastructure dependency and one less failure mode.

---

## The Build Process

The project was built in 11 phases, each with defined acceptance criteria. Nothing moved to the next phase until the current phase was fully complete and tested.

**Phase 0 — Foundation**
Full scaffold created before any feature work. All folders, config files, TypeScript type definitions, service stubs, database migration, design system, and CI/CD pipeline. The entire skeleton of the product existed before a single feature was implemented. This approach means structural decisions are made once, deliberately — not discovered mid-build.

**Phase 1 — Infrastructure**
Dependencies installed. shadcn/ui component library connected. Supabase project created and migration run. The development environment confirmed working end-to-end before UI work started.

**Phase 2 — Landing Page**
Six components: Navbar, Hero, HowItWorks, ResponsePreview, FAQ, CallToAction. The ResponsePreview is a Server Component that calls the Shiki syntax highlighter at build time — the highlighted JSON is sent to the browser as pre-rendered HTML, not processed on the client.

**Phase 3 — Authentication**
Register, login, and forgot password — all using React Hook Form and Zod validation. Supabase handles the email confirmation flow. The middleware file protects all dashboard routes and refreshes the session cookie on every request.

**Phase 4 — Dashboard Shell**
Sidebar, topbar, and mobile drawer. The sidebar has the VFX monogram — a teal square tile with white text. "VFX" is the prefix of every API key (`vfx_live_`). The logo and the API key format are intentionally connected.

**Phase 5 — API Key Management**
The full key creation flow: click Create, give it a name, the raw key appears once and is copied immediately. After that, only the prefix (`vfx_live_a1b2`) is ever shown. Revoking a key shows a confirmation dialog and then sets the key to inactive — it remains visible at reduced opacity as an audit trail.

**Phase 6 — Email Validation Engine**
The two validation layers: `validate-format.ts` checks the email structure with a regex and a 254-character length limit. `validate-mx.ts` looks up the domain's MX records via Node's `dns/promises`. The endpoint routes hashes the incoming API key, looks it up in the database, checks the rate limit, runs both validations, logs the result, and returns a structured JSON response.

**Phase 7 — Usage Dashboard**
Three stat cards (total validations, valid, invalid) and a paginated activity table. The stat cards use a 3px left-border accent — teal for total, green for valid, red for invalid. This left-border pattern is the visual system used throughout the product.

**Phase 8 — Settings**
Profile update (display name), password change (requires current password for re-authentication), and account deletion. Account deletion requires the user to type "delete my account" before anything happens. The deletion sequence is FK-safe: usage logs first, then API keys, then the profile row, then the auth user.

**Phase 9 — API Documentation**
Full API reference built as two pages: public at `/docs` and personalised at `/dashboard/docs`. The dashboard version detects the user's first active API key and substitutes the real prefix into every curl example — so the documentation is immediately usable without copy-pasting. Shiki highlights all code examples server-side before they reach the browser.

**Phase 10 — Quality Assurance**
This phase fixed everything that would not survive scrutiny from a senior engineer:

- TypeScript compilation errors caused by a version mismatch between `@supabase/ssr` (version 0.5.x, built against a 3-parameter TypeScript generic) and `supabase-js` (version 2.108, which uses a 4-parameter generic). Resolved with a type assertion in the server client file, with a comment explaining exactly why.
- The Supabase database type file had to be hand-maintained rather than auto-generated, because the CLI output format doesn't match what `supabase-js@2.108` requires. Every table needs a `Relationships: []` field. Empty schema sections need a specific TypeScript mapped type pattern.
- ESLint configured with correct rules for underscore-prefixed unused parameters, generated shadcn files, and legitimate `console.error` calls.
- DNS-dependent tests rewritten using `vi.mock('dns')` to remove all network dependencies from the test suite. Tests now pass in any environment.
- All functions refactored to stay under 50 lines. The validation route handler was 107 lines — split into three helper functions. The docs data builder was 111 lines — split into four section builders.
- All hardcoded production URLs removed. Every reference to the live URL now reads from the environment variable.
- 20 tests passing across three files. Zero TypeScript errors. Zero ESLint warnings. Zero `console.log` calls in the codebase.

---

## What Was Accomplished

At the end of Phase 10, the Verifex codebase is:

- **Complete** — every feature specified in the original brief is built and working
- **Clean** — strict TypeScript, zero lint warnings, zero hardcoded values, functions under 50 lines
- **Tested** — 20 unit tests covering format validation, DNS lookup (mocked), key generation and hashing
- **Documented** — architecture decisions, API contracts, design system, and this brief all written and maintained
- **Secure** — no raw API keys stored, no full emails logged, session in httpOnly cookies, RLS on all tables
- **Reviewable** — every major technical decision is documented in `docs/decisions.md` with the reason

Phase 11 is also complete. Verifex is live at https://verifex-puce.vercel.app, the GitHub repo is public at https://github.com/atifmanzoorali/verifex, and GitHub is connected to Vercel with auto-deploy on every push to main.

---

## The Broader Context

This project was built to demonstrate something specific: that a non-technical person with strong product instincts and a clear vision can direct AI to build production-quality software.

Atif has 20 years of business experience — international trade, brand building, ecommerce, team management, product launches. He is not a developer. He has never written production code independently.

What he did on this project:
- Defined the product concept and scope
- Made design aesthetic decisions (Swiss typography, the colour palette, the visual rules)
- Set the quality bar ("this must hold up to scrutiny from senior engineers")
- Directed the build phase by phase
- Reviewed and approved architectural decisions
- Made business-level calls (no payments, open source, focus on code quality as the portfolio piece)

What Claude did:
- Owned all technical decisions
- Implemented every file from scratch
- Pushed back when approaches were wrong
- Identified and fixed quality issues without being asked
- Maintained architectural consistency across all phases

The result is a codebase that does not look like it was written by an AI. It looks like it was written by a developer who has strong opinions about code quality, security, and architecture. That was the goal.

---

## Key Links

- **Live site:** https://verifex-puce.vercel.app
- **GitHub repo:** https://github.com/atifmanzoorali/verifex
- **Project rules (live):** `/verifex/.claude/CLAUDE.md`
- **Architecture:** `/verifex/docs/architecture.md`
- **API contracts:** `/verifex/docs/api-contracts.md`
- **Design decisions:** `/verifex/docs/decisions.md`
- **Design system:** `/verifex/DESIGN.md`
