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

**All 11 phases complete. Verifex is fully shipped.**

- **Live URL:** https://verifex-puce.vercel.app
- **GitHub:** https://github.com/atifmanzoorali/verifex
- **Supabase project:** ojskknebqzzrlpctecma (redirect URLs configured for live domain)
- **Auto-deploy:** GitHub main → Vercel (push to main triggers deployment automatically)
- **CI:** GitHub Actions runs typecheck + lint + tests on every push to main

**GitHub sync: All work committed and pushed on `main`.** Do not re-push anything already committed.

### Phase Progress

- [x] Phase 0 — Foundation (scaffold, config, types, stubs, migration, design system)
- [x] Phase 1 — Setup & Infrastructure (install deps, shadcn, Supabase project, migration)
- [x] Phase 2 — Landing Page
- [x] Phase 3 — Authentication
- [x] Phase 4 — Dashboard Shell
- [x] Phase 5 — API Key Management
- [x] Phase 6 — Email Validation Engine
- [x] Phase 7 — Usage Dashboard
- [x] Phase 8 — Settings
- [x] Phase 9 — API Documentation
- [x] Phase 10 — Quality Assurance
- [x] Phase 11 — Ship

See `ROADMAP.md` for the full detail of each phase.

---

## What Is Already Built (Do Not Rebuild)

These files have real, complete logic. Do not overwrite or recreate them.

| File | What is in it |
|---|---|
| `src/lib/constants.ts` | API key prefix, limits, versioning, rate limit constants |
| `src/lib/errors.ts` | `errorResponse()` + `withErrorHandler()` — fully implemented |
| `src/lib/env.ts` | Startup env var validation — reads all required vars or throws |
| `src/lib/utils.ts` | `cn()`, `formatDate()`, `formatDuration()` |
| `src/lib/validate-format.ts` | Email format check with 254-char length limit |
| `src/lib/validate-mx.ts` | DNS MX record lookup via `dns/promises` |
| `src/lib/shiki.ts` | Server-side syntax highlighter singleton |
| `src/lib/docs-data.ts` | Pre-highlighted code examples for docs; `getDocsData(keyPrefix?)` builds 4 sections via extracted builder functions; uses `env.NEXT_PUBLIC_APP_URL` (no hardcoded URLs); all response shapes match actual route handler output |
| `src/lib/supabase/client.ts` | Browser Supabase client — reads `process.env.NEXT_PUBLIC_*` directly (NOT via `env.ts` — that causes a client-side crash) |
| `src/lib/supabase/server.ts` | Cookie-based server Supabase client — returns `SupabaseClient<Database>` with `as unknown as` type assertion (required: @supabase/ssr@0.5.x built against 3-param generic; supabase-js@2.108 uses 4 params — runtime is identical) |
| `src/lib/supabase/service.ts` | Service role Supabase client singleton — bypasses RLS, used by validate endpoint only (no session cookie) |
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
| `src/services/usage.service.ts` | Usage service functions + `UsageSummary`, `UsageLog`, `UsageResponse` types — complete |
| `src/types/api.types.ts` | Standard API response types |
| `src/types/key.types.ts` | API key types |
| `src/types/validation.types.ts` | Validation result types — `ValidationResult` includes `duration_ms: number` |
| `src/types/database.types.ts` | Supabase DB types — hand-maintained to satisfy supabase-js@2.108 `GenericSchema` contract: all tables require `Relationships: []`; empty sections (`Views`, `Functions`, `Enums`, `CompositeTypes`) use `{ [_ in never]: never }` not `Record<string, never>` |
| `supabase/migrations/0001_initial_schema.sql` | Full schema with RLS — complete |
| `supabase/config.toml` | Supabase CLI config — complete |
| `tests/validate-format.test.ts` | 6 tests including length check |
| `tests/validate-mx.test.ts` | 6 tests — uses `vi.mock('dns')` (no live DNS calls); covers MX found, sorted by priority, no MX, DNS throws, empty domain, numeric domain |
| `tests/keys.service.test.ts` | 8 tests — key prefix format, random bytes hex length, SHA-256 hash length/format/determinism/collision resistance, MAX_API_KEYS_PER_USER constant, 12-char prefix slice |
| `src/app/page.tsx` | Landing page — assembles all 6 sections, uses Suspense for ResponsePreview |
| `src/components/landing/Navbar.tsx` | Pill navbar — floating, logo left, links + CTA right, Framer Motion entrance |
| `src/components/landing/Hero.tsx` | Hero section — full viewport, Swiss typography, teal depth blur, Framer Motion stagger |
| `src/components/landing/HowItWorks.tsx` | 3-step grid — large muted numbers, border-left column separators |
| `src/components/landing/ResponsePreview.tsx` | Async server component — Shiki-highlighted valid/invalid JSON on dark background |
| `src/components/landing/Faq.tsx` | Custom accordion — 5 questions, numbered, plus/minus toggle |
| `src/components/landing/CallToAction.tsx` | Final CTA — brand-cream bg, headline left, button right, footer bar |
| `src/components/auth/RegisterForm.tsx` | React Hook Form + Zod — Full Name, Email, Password — calls `signUp()` |
| `src/components/auth/LoginForm.tsx` | React Hook Form + Zod — Email, Password — calls `signIn()`, redirects to `/dashboard` |
| `src/components/auth/ForgotPasswordForm.tsx` | React Hook Form + Zod — Email only — calls `resetPassword()` |
| `src/app/(auth)/register/page.tsx` | Mounts `RegisterForm` — complete |
| `src/app/(auth)/login/page.tsx` | Mounts `LoginForm` — complete |
| `src/app/(auth)/forgot-password/page.tsx` | Mounts `ForgotPasswordForm` — complete |
| `src/components/dashboard/Sidebar.tsx` | VFX monogram logo, 4 nav links with teal left-border active state, sign out → `/` |
| `src/components/dashboard/Topbar.tsx` | Page title hidden on desktop (content H1 owns it), shown on mobile; user avatar right |
| `src/components/dashboard/MobileDrawer.tsx` | Slide-in drawer — matching VFX logo, same nav as sidebar, backdrop overlay |
| `src/components/dashboard/DashboardShell.tsx` | Combines Sidebar + Topbar + MobileDrawer; content centred in `max-w-4xl` wrapper |
| `src/app/dashboard/layout.tsx` | Mounts `DashboardShell` — complete |
| `src/app/api/v1/keys/route.ts` | GET/POST/DELETE — session auth, Zod validation, SHA-256 hashing, 10-key limit |
| `src/components/keys/KeyCard.tsx` | 3px teal left-border accent, key prefix as hero in monospace, dots for hidden portion, subtle revoke button; revoked keys at 40% opacity |
| `src/components/keys/CreateKeyModal.tsx` | Two-state dialog: name form → raw key revealed once with copy button |
| `src/components/keys/RevokeDialog.tsx` | Confirmation dialog before revoking a key |
| `src/app/dashboard/keys/page.tsx` | text-3xl H1, active key count (X of 10), separator, empty state with Key icon; uses `useApiKeys()` |
| `src/app/api/v1/validate/route.ts` | POST — X-API-Key auth, rate limit (60/min), format check, MX check, usage logging; refactored with 3 extracted helpers: `resolveApiKey`, `checkRateLimit`, `logValidation`; response includes `duration_ms` |
| `src/app/api/v1/usage/route.ts` | GET — session auth, summary counts from ALL logs, paginated rows |
| `src/components/usage/StatCard.tsx` | 3px coloured left-border accent (teal/green/red), animated loading skeleton |
| `src/components/usage/ActivityTable.tsx` | Table: domain (mono), valid/invalid badge, duration, timestamp; alternating rows |
| `src/app/dashboard/page.tsx` | Overview — 3 StatCards + ActivityTable, uses `useUsage()` |
| `src/app/api/v1/account/route.ts` | DELETE — session auth, FK-safe delete (usage_logs → api_keys → profiles → auth.users via service role) |
| `src/components/settings/ProfileForm.tsx` | React Hook Form + Zod — display name field, calls `updateProfile()`, inline success/error |
| `src/components/settings/PasswordForm.tsx` | React Hook Form + Zod — current + new + confirm; calls `updatePassword()` which re-auths then updates |
| `src/components/settings/DeleteAccountDialog.tsx` | Confirmation dialog — user must type "delete my account"; calls DELETE /api/v1/account, then signOut, then redirects to / |
| `src/app/dashboard/settings/page.tsx` | Three sections: Profile, Password, Danger Zone — complete |
| `src/components/docs/CodeBlock.tsx` | Renders Shiki HTML in dark `bg-[#111111]` container |
| `src/components/docs/EndpointCard.tsx` | Method badge (coloured), path, description, auth note, stacked CodeBlocks |
| `src/components/docs/DocsLayout.tsx` | Sticky sidebar (anchor links), BaseUrl card, ResponseEnvelope card, endpoint sections, error codes table; accepts `baseUrl` prop |
| `src/app/docs/page.tsx` | Public Server Component — sticky header with back nav and CTA, full docs below; passes `baseUrl={env.NEXT_PUBLIC_APP_URL}` |
| `src/app/dashboard/docs/page.tsx` | Dashboard Server Component — reads user's first active key prefix, passes to getDocsData; passes `baseUrl={env.NEXT_PUBLIC_APP_URL}` |

## What Is a Stub (Needs Building)

*Nothing. All phases complete. The project is live.*

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
│   │   ├── page.tsx                  complete — landing page
│   │   ├── layout.tsx                complete — AuthProvider mounted
│   │   ├── globals.css               complete
│   │   ├── error.tsx                 complete — root error boundary
│   │   ├── not-found.tsx             complete — custom 404
│   │   ├── docs/page.tsx             complete — Phase 9
│   │   ├── (auth)/
│   │   │   ├── layout.tsx            complete — centered layout
│   │   │   ├── login/page.tsx        complete
│   │   │   ├── register/page.tsx     complete
│   │   │   └── forgot-password/page.tsx  complete
│   │   ├── auth/callback/route.ts    complete
│   │   ├── dashboard/
│   │   │   ├── layout.tsx            complete — DashboardShell
│   │   │   ├── page.tsx              complete — Overview (StatCards + ActivityTable)
│   │   │   ├── error.tsx             complete — dashboard error boundary
│   │   │   ├── keys/page.tsx         complete — API Key Management
│   │   │   ├── docs/page.tsx         complete — Phase 9
│   │   │   └── settings/page.tsx     complete — Phase 8
│   │   └── api/v1/
│   │       ├── validate/route.ts     complete — email validation engine
│   │       ├── keys/route.ts         complete — GET/POST/DELETE
│   │       ├── usage/route.ts        complete — GET with summary + pagination
│   │       └── account/route.ts      complete — Phase 8
│   ├── components/
│   │   ├── landing/                  complete — all 6 sections built
│   │   ├── dashboard/                complete — Sidebar, Topbar, MobileDrawer, DashboardShell
│   │   ├── keys/                     complete — KeyCard, CreateKeyModal, RevokeDialog
│   │   ├── usage/                    complete — StatCard, ActivityTable
│   │   ├── settings/                 complete — ProfileForm, PasswordForm, DeleteAccountDialog
│   │   ├── docs/                     complete — CodeBlock, EndpointCard, DocsLayout
│   │   └── ui/                       complete — shadcn components
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
│   │   │   ├── client.ts             complete — browser client
│   │   │   ├── server.ts             complete — cookie-based server client (type assertion for ssr@0.5.x compat)
│   │   │   └── service.ts            complete — service role client (validate endpoint only)
│   │   ├── constants.ts              complete
│   │   ├── env.ts                    complete — startup env validation
│   │   ├── errors.ts                 complete — errorResponse + withErrorHandler
│   │   ├── validate-format.ts        complete — regex + 254-char limit
│   │   ├── validate-mx.ts            complete — DNS MX lookup
│   │   ├── shiki.ts                  complete
│   │   ├── docs-data.ts              complete — 4 section builders, env.NEXT_PUBLIC_APP_URL
│   │   └── utils.ts                  complete — cn, formatDate, formatDuration
│   ├── middleware.ts                 complete
│   └── types/
│       ├── api.types.ts              complete
│       ├── key.types.ts              complete
│       ├── validation.types.ts       complete
│       └── database.types.ts         complete — hand-maintained for supabase-js@2.108 GenericSchema contract
├── supabase/
│   ├── config.toml                   complete
│   └── migrations/
│       └── 0001_initial_schema.sql   complete — profiles, api_keys, usage_logs + RLS
├── tests/
│   ├── validate-format.test.ts       complete — 6 tests
│   ├── validate-mx.test.ts           complete — 6 tests (mocked DNS)
│   └── keys.service.test.ts          complete — 8 tests
├── public/
├── docs/
│   ├── architecture.md               complete
│   ├── api-contracts.md              complete
│   └── decisions.md                  complete — 8 decisions documented
├── DESIGN.md                         complete — full design system
├── ROADMAP.md                        complete — phase-by-phase build plan
├── Verifex_Brief.md                  complete — full product brief
├── design-preview.html               complete — open in browser to see design
├── .env.example                      complete
├── .eslintrc.json                    complete — argsIgnorePattern for _ params, overrides for shadcn ui files
├── .gitignore                        complete
├── .prettierrc                       complete
├── LICENSE                           complete
├── next.config.mjs                   complete
├── package.json                      complete
├── postcss.config.mjs                complete
├── README.md                         complete — live URLs, correct paths
├── tailwind.config.ts                complete
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

## Two Auth Systems — Never Mixed

| Auth Type | Used For | Client |
|---|---|---|
| Supabase session (httpOnly cookie) | Dashboard operations — keys, usage, settings | `lib/supabase/server.ts` |
| API Key (`X-API-Key` header) | `POST /api/v1/validate` only | `lib/supabase/service.ts` |

---

## Dashboard Design Decisions (Do Not Undo)

These were deliberate design choices made during Phase 4–7:

- **Sidebar logo:** VFX monogram tile (teal square, white text) + "Verifex" wordmark. The "VFX" references the `vfx_live_` API key prefix — intentional brand tie.
- **Topbar:** Page title is hidden on desktop (`lg:hidden`) because the content H1 owns the page. Title shows on mobile where the sidebar is hidden.
- **Page H1s:** `text-3xl font-bold tracking-tight` — bigger than the original design spec. Intentional.
- **Left-border accent pattern:** Used on KeyCards (3px teal = active, gray = revoked), StatCards (teal/green/red), and nav items. This is the visual system — keep it consistent.
- **Key prefix display:** Shows `vfx_live_xxx` + `••••••••` dots (not ellipsis). Dots signal "hidden secret content."
- **Revoke button:** Subtle outlined button by default, turns red on hover. Never red at rest.
- **Revoked keys:** Shown at 40% opacity (audit trail). Not hidden.

---

## Database Types — Critical Constraint

`src/types/database.types.ts` must satisfy the `GenericSchema` interface in supabase-js@2.108. **Do not regenerate with `supabase gen types`** — the CLI output format differs from what this version requires and will break TypeScript compilation.

**Required structure:**
- Every table must have `Relationships: []`
- Empty sections (`Views`, `Functions`, `Enums`, `CompositeTypes`) must use `{ [_ in never]: never }` — NOT `Record<string, never>`

If the schema changes (new table or column), edit the file manually following the existing pattern.

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
- No `console.log` committed — remove before every commit
- `console.error` on the server IS allowed for real errors — Vercel captures it in logs
- No hardcoded values — use `lib/constants.ts` or environment variables
- Standard error response shape on every API failure — use `errorResponse()` from `lib/errors.ts`
- Every Route Handler must be wrapped with `withErrorHandler()` from `lib/errors.ts`
- Rate limiting on `POST /api/v1/validate`: 60 requests per 60 seconds per key (`RATE_LIMIT_PER_MINUTE` in constants)

---

## Design System — Non-Negotiable

The full design system is defined in `DESIGN.md` at the project root. Read it before writing any frontend code.

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

- Headings: weight 700–900, `tracking-tight`
- Body: weight 400–500, normal tracking
- Labels / stat card titles: `text-xs`, `font-semibold`, `uppercase`, `tracking-widest`
- No italic anywhere — use weight contrast instead

**Key sizes:**
- Dashboard page H1: `text-3xl font-bold tracking-tight` (established in Phase 5–7)
- Dashboard section heading: `text-xl font-semibold`
- Stat card value: `text-4xl font-bold` minimum
- Landing hero: `text-5xl` to `text-7xl`, weight 800–900, `tracking-tight`

---

### Border Radius

`rounded-sm` (2px) everywhere.

**Never use:** `rounded-lg`, `rounded-xl`, `rounded-2xl`

Exceptions:
- Modals, dropdowns: `rounded` (4px)
- Avatars: `rounded-full`

---

### Shadows

- Cards: `shadow-sm` only
- Dropdowns and modals: `shadow-md` only
- **Never use:** `shadow-lg`, `shadow-xl`, `shadow-2xl`

---

### Buttons — 3 Variants Only

```
Primary:     bg-[#1A7A78] hover:bg-[#155E5C] text-white rounded-sm
Secondary:   bg-white border border-[#D9D3C5] text-[#555047] rounded-sm
Destructive: bg-[#B83232] hover:bg-[#8A2020] text-white rounded-sm — always behind a confirmation dialog
```

Never create a fourth variant. Never place two primary buttons side by side.

---

### Components Quick Reference

**Left-border accent card pattern (used on KeyCard, StatCard):**
```
flex overflow-hidden rounded-sm bg-white shadow-sm
├── div w-[3px] bg-primary (or green/red)
└── div flex-1 border border-l-0 border-[#D9D3C5] rounded-r-sm px-5 py-4/5
```

**Nav item active state:** `bg-[#EAF3F3] text-primary font-semibold border-l-2 border-primary`

**Badge — valid:** `bg-[#EEF5E8] text-[#3A6A1A] border border-[#B8D49A]` + green dot
**Badge — invalid:** `bg-[#FBF0EE] text-[#8A2020] border border-[#E8B4B0]` + red dot

**Code block:** `bg-[#111111] text-[#F0ECE3]` — the only dark surface in the product.

**Input focus:** `border-[#1A7A78]` + `ring-2 ring-[#1A7A78]/20`

**Page header pattern (used on keys page + overview page):**
```
border-b border-[#D9D3C5] pb-6 mb-8
├── h1 text-3xl font-bold tracking-tight text-[#111111]
└── p  text-sm text-[#555047] mt-1.5
```

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
