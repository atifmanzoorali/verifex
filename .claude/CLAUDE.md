# Verifex — Project Rules

Read this before writing any code. These rules are non-negotiable.

---

## What This Project Is

Verifex is a portfolio-grade, open-source email validation SaaS. The primary audience is senior engineers evaluating technical quality on GitHub. Every decision must hold up to that scrutiny.

No payments. The code quality is the product.

---

## Key Project Documents

Read these before doing anything:

| File | What it contains |
|---|---|
| `.claude/CLAUDE.md` | This file — all rules |
| `ROADMAP.md` | Detailed phase-by-phase build plan with acceptance criteria |
| `DESIGN.md` | Full design system — colours, typography, components, rules |
| `design-preview.html` | Open in browser to see the design visually |
| `Verifex_Brief.md` | Full product brief — what it is, why it exists, all decisions |
| `docs/architecture.md` | Layer chain and request lifecycle |
| `docs/api-contracts.md` | Every endpoint, request shape, response shape |
| `docs/decisions.md` | Why each major architectural decision was made |

---

## Current Status

**Phase 0 (Foundation) is complete.** The entire scaffold is built and reviewed. Dependencies are not yet installed.

**Next step: Phase 1 of ROADMAP.md — install dependencies and initialise shadcn/ui.**

### Phase Progress

- [x] Phase 0 — Foundation (scaffold, config, types, stubs, migration, design system)
- [ ] Phase 1 — Setup & Infrastructure (install deps, shadcn, Supabase project, migration)
- [ ] Phase 2 — Authentication
- [ ] Phase 3 — Dashboard Shell
- [ ] Phase 4 — API Key Management
- [ ] Phase 5 — Email Validation Engine
- [ ] Phase 6 — Usage Dashboard
- [ ] Phase 7 — Settings
- [ ] Phase 8 — API Documentation
- [ ] Phase 9 — Landing Page
- [ ] Phase 10 — Quality Assurance
- [ ] Phase 11 — Ship

See `ROADMAP.md` for the full detail of each phase.

---

## What Is Already Built (Do Not Rebuild)

These files have real, complete logic. Do not overwrite or recreate them.

| File | What is in it |
|---|---|
| `src/lib/constants.ts` | API key prefix, limits, versioning constants |
| `src/lib/errors.ts` | `errorResponse()` + `withErrorHandler()` — fully implemented |
| `src/lib/env.ts` | Startup env var validation — reads all required vars or throws |
| `src/lib/utils.ts` | `cn()`, `formatDate()`, `formatDuration()` |
| `src/lib/validate-format.ts` | Email format check with 254-char length limit |
| `src/lib/validate-mx.ts` | DNS MX record lookup via `dns/promises` |
| `src/lib/shiki.ts` | Server-side syntax highlighter singleton |
| `src/lib/docs-data.ts` | Pre-highlighted code examples for docs page |
| `src/lib/supabase/client.ts` | Browser Supabase client using `env` |
| `src/lib/supabase/server.ts` | Server Supabase client using `env` |
| `src/middleware.ts` | Route protection + session refresh — complete |
| `src/app/auth/callback/route.ts` | Supabase email confirmation handler — complete |
| `src/app/layout.tsx` | Root layout with `AuthProvider` mounted — complete |
| `src/app/(auth)/layout.tsx` | Centered auth layout — complete |
| `src/app/error.tsx` | Root error boundary — complete |
| `src/app/not-found.tsx` | Custom 404 page — complete |
| `src/app/dashboard/error.tsx` | Dashboard error boundary — complete |
| `src/hooks/useAuth.tsx` | `AuthProvider` + `useAuth()` hook — complete |
| `src/hooks/useApiKeys.ts` | API keys state hook — complete |
| `src/hooks/useUsage.ts` | Usage data hook — complete |
| `src/services/auth.service.ts` | Auth service functions — complete |
| `src/services/keys.service.ts` | Keys service functions — complete |
| `src/services/usage.service.ts` | Usage service functions — complete |
| `src/types/api.types.ts` | Standard API response types |
| `src/types/key.types.ts` | API key types |
| `src/types/validation.types.ts` | Validation result types |
| `src/types/database.types.ts` | Supabase DB types (regenerate after schema changes) |
| `supabase/migrations/0001_initial_schema.sql` | Full schema with RLS — complete |
| `supabase/config.toml` | Supabase CLI config — complete |
| `tests/validate-format.test.ts` | 6 tests including length check |
| `tests/validate-mx.test.ts` | 2 tests — real domain + fake domain |
| `tests/keys.service.test.ts` | Key format tests |

## What Is a Stub (Needs Building)

These files exist with placeholder logic. They will be built in their respective phases.

| File | Built in Phase |
|---|---|
| `src/app/page.tsx` | Phase 9 — Landing Page |
| `src/app/(auth)/login/page.tsx` | Phase 2 — Authentication |
| `src/app/(auth)/register/page.tsx` | Phase 2 — Authentication |
| `src/app/(auth)/forgot-password/page.tsx` | Phase 2 — Authentication |
| `src/app/dashboard/layout.tsx` | Phase 3 — Dashboard Shell |
| `src/app/dashboard/page.tsx` | Phase 6 — Usage Dashboard |
| `src/app/dashboard/keys/page.tsx` | Phase 4 — API Key Management |
| `src/app/dashboard/settings/page.tsx` | Phase 7 — Settings |
| `src/app/dashboard/docs/page.tsx` | Phase 8 — API Docs |
| `src/app/docs/page.tsx` | Phase 8 — API Docs |
| `src/app/api/v1/keys/route.ts` | Phase 4 — API Key Management |
| `src/app/api/v1/validate/route.ts` | Phase 5 — Email Validation Engine |
| `src/app/api/v1/usage/route.ts` | Phase 6 — Usage Dashboard |
| `src/app/api/v1/account/route.ts` | Phase 7 — Settings |
| `src/components/` | All component folders are empty — built per phase |

---

## Folder Structure

Standard Next.js layout. No wrapper folders.

```
verifex/
├── .claude/
│   └── CLAUDE.md                     ← This file
├── .github/
│   ├── workflows/ci.yml
│   └── PULL_REQUEST_TEMPLATE.md
├── src/
│   ├── app/
│   │   ├── page.tsx                  stub
│   │   ├── layout.tsx                complete — AuthProvider mounted
│   │   ├── globals.css               complete — CSS variables need updating (Phase 1)
│   │   ├── error.tsx                 complete — root error boundary
│   │   ├── not-found.tsx             complete — custom 404
│   │   ├── docs/page.tsx             stub
│   │   ├── (auth)/
│   │   │   ├── layout.tsx            complete — centered layout
│   │   │   ├── login/page.tsx        stub
│   │   │   ├── register/page.tsx     stub
│   │   │   └── forgot-password/page.tsx  stub
│   │   ├── auth/callback/route.ts    complete
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            stub
│   │   │   ├── page.tsx              stub
│   │   │   ├── error.tsx             complete — dashboard error boundary
│   │   │   ├── keys/page.tsx         stub
│   │   │   ├── docs/page.tsx         stub
│   │   │   └── settings/page.tsx     stub
│   │   └── api/v1/
│   │       ├── validate/route.ts     stub — wrapped with withErrorHandler
│   │       ├── keys/route.ts         stub — wrapped with withErrorHandler
│   │       ├── usage/route.ts        stub — wrapped with withErrorHandler
│   │       └── account/route.ts      stub — wrapped with withErrorHandler
│   ├── components/
│   │   ├── landing/                  empty — Phase 9
│   │   ├── dashboard/                empty — Phase 3
│   │   ├── keys/                     empty — Phase 4
│   │   ├── usage/                    empty — Phase 6
│   │   ├── settings/                 empty — Phase 7
│   │   ├── docs/                     empty — Phase 8
│   │   └── ui/                       empty — populated by shadcn in Phase 1
│   ├── services/
│   │   ├── auth.service.ts           complete
│   │   ├── keys.service.ts           complete
│   │   └── usage.service.ts          complete
│   ├── hooks/
│   │   ├── useAuth.tsx               complete
│   │   ├── useApiKeys.ts             complete
│   │   └── useUsage.ts               complete
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             complete — uses env.ts
│   │   │   └── server.ts             complete — uses env.ts
│   │   ├── constants.ts              complete
│   │   ├── env.ts                    complete — startup env validation
│   │   ├── errors.ts                 complete — errorResponse + withErrorHandler
│   │   ├── validate-format.ts        complete — regex + 254-char limit
│   │   ├── validate-mx.ts            complete — DNS MX lookup
│   │   ├── shiki.ts                  complete
│   │   ├── docs-data.ts              complete
│   │   └── utils.ts                  complete
│   ├── middleware.ts                 complete
│   └── types/
│       ├── api.types.ts              complete
│       ├── key.types.ts              complete
│       ├── validation.types.ts       complete
│       └── database.types.ts         complete — regenerate after schema changes
├── supabase/
│   ├── config.toml                   complete
│   └── migrations/
│       └── 0001_initial_schema.sql   complete — profiles, api_keys, usage_logs + RLS
├── tests/
│   ├── validate-format.test.ts       complete — 6 tests
│   ├── validate-mx.test.ts           complete — 2 tests
│   └── keys.service.test.ts          complete — 3 tests
├── public/
├── docs/
│   ├── architecture.md               complete
│   ├── api-contracts.md              complete
│   └── decisions.md                  complete
├── DESIGN.md                         complete — full design system
├── ROADMAP.md                        complete — phase-by-phase build plan
├── Verifex_Brief.md                  complete — full product brief
├── design-preview.html               complete — open in browser to see design
├── .env.example                      complete
├── .eslintrc.json                    complete
├── .gitignore                        complete
├── .prettierrc                       complete
├── LICENSE                           complete
├── next.config.ts                    complete
├── package.json                      complete — all deps listed, not yet installed
├── postcss.config.mjs                complete
├── README.md                         stub — written in Phase 11
├── tailwind.config.ts                complete — CSS vars need updating (Phase 1)
├── tsconfig.json                     complete — strict mode
├── vercel.json                       complete — security headers
└── vitest.config.ts                  complete
```

---

## The Layer Chain — Never Break It

```
Page / Component → Hook → Service → Route Handler → Supabase / dns/promises
```

- Components never call `fetch()` directly
- Route Handlers contain zero business logic — receive, validate with Zod, call a service, return
- Services contain zero React imports, zero component state
- `lib/` contains pure utility functions with no side effects

If a change would break this chain, restructure rather than break the rule.

---

## Database Types — Never Edit Manually

`src/types/database.types.ts` is auto-generated. After any schema change or migration, regenerate it:

```bash
supabase gen types typescript --local > src/types/database.types.ts
```

Never edit this file by hand. Manual edits will be overwritten and will silently drift from the real schema.

---

## TypeScript Rules

- `tsconfig.json` has `"strict": true` — never disable it
- No `any` types. If you must use one, add a comment explaining exactly why
- Every function must have an explicit return type
- All Zod schemas must be used for both runtime validation and TypeScript type inference (`z.infer<typeof Schema>`)

---

## Security Rules

- API keys: SHA-256 hash stored, raw key never written anywhere after creation
- Supabase session stored in httpOnly cookie — never localStorage
- Full email address never stored — only the domain logged in `usage_logs`
- `SUPABASE_SERVICE_ROLE_KEY` is server-only — never prefixed with `NEXT_PUBLIC_`
- RLS enabled on every Supabase table

---

## Code Quality Rules

- No function longer than 50 lines
- No file longer than 300 lines
- No `console.log` committed — remove before every commit. This means debug output only.
- `console.error` on the server IS allowed and expected for real errors — Vercel captures it in logs. Use it inside `withErrorHandler` and anywhere an unexpected failure must be recorded.
- No hardcoded values — use `lib/constants.ts` or environment variables
- Standard error response shape on every API failure — use `errorResponse()` from `lib/errors.ts`, never raw Supabase errors, never inline JSON
- Every Route Handler must be wrapped with `withErrorHandler()` from `lib/errors.ts` — this catches unexpected crashes and returns the standard error shape instead of a broken 500 response
- Rate limiting on `POST /api/v1/validate`: query `usage_logs` to count requests by `api_key_id` in the last 60 seconds, return `RATE_LIMITED` if over limit. Vercel provides DDoS protection at the infrastructure level automatically.

---

## Design System — Non-Negotiable

The full design system is defined in `DESIGN.md` at the project root. Read it before writing any frontend code.
A visual preview is in `design-preview.html` — open it in a browser to see the design.

### Style: Swiss International Typographic Style. Light only. No dark mode.

---

### Colours

Never invent a colour. Every colour used in the UI must come from this list.

| Token | Hex | Use |
|---|---|---|
| `background` | `#F0ECE3` | Page background — always warm off-white, never pure white |
| `surface` | `#FFFFFF` | Cards, panels, modals, inputs |
| `surface-muted` | `#F7F4EE` | Table rows, subtle elevated areas |
| `border` | `#D9D3C5` | All borders |
| `border-strong` | `#B8B0A0` | Focus rings, active borders |
| `text-primary` | `#111111` | All main text and headings |
| `text-secondary` | `#555047` | Descriptions, metadata |
| `text-muted` | `#8A8278` | Placeholders, labels, captions |
| `primary` | `#1A7A78` | Buttons, links, active nav, focus |
| `primary-hover` | `#155E5C` | Hover on primary elements |
| `destructive` | `#B83232` | Delete, danger, errors |
| `brand-cream` | `#E2DDD0` | Landing page hero background |
| `brand-teal` | `#5BBFBE` | Large graphic blocks on landing page only |
| `brand-yellow` | `#C9B827` | Accent / warning only — use sparingly |
| `brand-green` | `#7A9638` | Success states only |
| `brand-ink` | `#111111` | Dark full-bleed sections |

---

### Typography

One font only: **Inter**. Already installed.

- Headings: weight 700–900, `tracking-tight` (`-0.025em` and tighter as size increases)
- Body: weight 400–500, normal tracking
- Labels / stat card titles: `text-xs`, `font-semibold`, `uppercase`, `tracking-widest`
- No italic anywhere — use weight contrast instead
- No font other than Inter

**Key sizes:**
- Dashboard page title: `text-2xl font-bold` (24px / 700)
- Dashboard section heading: `text-xl font-semibold` (20px / 600)
- Card title: `text-lg font-medium` (18px / 500)
- Body text: `text-base font-normal text-secondary` (16px / 400)
- Stat card value: `text-4xl font-bold` or larger (36px+ / 700–800)
- Landing hero: `text-5xl` to `text-7xl`, weight 800–900, `tracking-tight`

---

### Spacing

4px base grid. Use Tailwind spacing scale only — no arbitrary values.

---

### Border Radius

`rounded-sm` (2px) everywhere. This is set as the default `--radius` CSS variable.

**Never use:** `rounded-lg`, `rounded-xl`, `rounded-2xl` — too soft, breaks the Swiss design language.

Exceptions:
- Modals, dropdowns: `rounded` (4px)
- Avatars: `rounded-full`

---

### Shadows

- Cards on dashboard: `shadow-sm` only
- Dropdowns and modals: `shadow-md` only
- **Never use:** `shadow-lg`, `shadow-xl`, `shadow-2xl`

When in doubt, use a border instead of a shadow.

---

### Buttons — 3 Variants Only

```
Primary:     bg-primary text-white — one per view maximum
Secondary:   bg-white border border-border — for secondary actions
Destructive: bg-destructive text-white — always behind a confirmation dialog
```

Never create a fourth button variant. Never place two primary buttons side by side.

---

### Components Quick Reference

**Stat card:** White card, border, `shadow-sm`. Label: `text-xs font-semibold uppercase tracking-widest text-muted`. Value: `text-4xl font-bold` minimum.

**Nav item active state:** `bg-[#EAF3F3] text-primary font-semibold border-l-2 border-primary`

**Badge — valid:** `bg-[#EEF5E8] text-[#3A6A1A] border border-[#B8D49A]`

**Badge — invalid:** `bg-[#FBF0EE] text-[#8A2020] border border-[#E8B4B0]`

**Code block:** `bg-[#111111] text-[#F0ECE3]` — the only dark surface in the product.

**Input focus:** `border-primary` + `ring-2 ring-primary/20`

---

### What Is Banned

- Gradients on any background
- Shadows larger than `shadow-md`
- Border radius larger than `rounded` (4px) except avatars
- Decorative illustrations or abstract graphics
- Centered body text — always left-align
- More than 2 colours on a single component
- Any font other than Inter
- Hover states that move or animate elements — colour change only

---

## Two Auth Systems — Never Mixed

| Auth Type | Used For | Never Used For |
|---|---|---|
| Supabase session (httpOnly cookie) | Dashboard operations — keys, usage, settings | Validation endpoint |
| API Key (X-API-Key header) | `POST /api/v1/validate` only | Dashboard operations |

---

## File Naming

- React components: `PascalCase.tsx`
- Everything else: `kebab-case.ts`
- Test files mirror the file they test: `validate-format.test.ts`

---

## What "Done" Means

A feature is done when:
1. TypeScript compiles with zero errors
2. ESLint passes with zero warnings
3. The relevant unit tests pass
4. No `console.log` remains
5. No hardcoded values remain
