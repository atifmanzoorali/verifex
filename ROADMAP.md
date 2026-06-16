# Verifex — Project Roadmap

This is the single source of truth for what gets built, in what order, and how to know when each phase is complete.

Update the status of each phase as work progresses. Do not move to the next phase until the current one passes its acceptance criteria.

---

## Status Overview

| Phase | Name | Status |
|---|---|---|
| 0 | Foundation | ✅ Complete |
| 1 | Setup & Infrastructure | ✅ Complete |
| 2 | Landing Page | ✅ Complete |
| 3 | Authentication | ✅ Complete |
| 4 | Dashboard Shell | ✅ Complete |
| 5 | API Key Management | ✅ Complete |
| 6 | Email Validation Engine | ✅ Complete |
| 7 | Usage Dashboard | ✅ Complete |
| 8 | Settings | ✅ Complete |
| 9 | API Documentation | ✅ Complete |
| 10 | Quality Assurance | ⬜ Not started |
| 11 | Ship | ⬜ Not started |

---

## Phase 0 — Foundation
**Status: ✅ Complete**

Everything built before writing a single line of product code. No phase can skip this.

### What Was Done
- Full folder structure created (standard Next.js layout — no wrapper folders)
- All configuration files: `tsconfig.json` (strict mode), `.eslintrc.json`, `.prettierrc`, `postcss.config.mjs`, `next.config.ts`, `tailwind.config.ts`, `vitest.config.ts`, `vercel.json`
- All type definitions: `api.types.ts`, `key.types.ts`, `validation.types.ts`, `database.types.ts`
- Library functions: `constants.ts`, `errors.ts` (with `withErrorHandler`), `utils.ts`, `validate-format.ts`, `validate-mx.ts`, `shiki.ts`, `docs-data.ts`
- Environment validation: `lib/env.ts` — validates all required vars at startup
- Supabase clients: `lib/supabase/client.ts`, `lib/supabase/server.ts`
- Database migration: `supabase/migrations/0001_initial_schema.sql` — profiles, api_keys, usage_logs with full RLS
- Middleware: `src/middleware.ts` — route protection and session refresh
- Service stubs: `auth.service.ts`, `keys.service.ts`, `usage.service.ts`
- Hook stubs: `useAuth.tsx`, `useApiKeys.ts`, `useUsage.ts`
- Route handler stubs: all four API routes with `withErrorHandler`
- Auth callback route: `src/app/auth/callback/route.ts`
- Next.js convention files: `error.tsx`, `not-found.tsx`, `dashboard/error.tsx`
- Auth layout: `(auth)/layout.tsx`
- CI workflow, PR template, `.env.example`, `LICENSE`, `supabase/config.toml`
- Documentation: `docs/architecture.md`, `docs/api-contracts.md`, `docs/decisions.md`
- Security headers in `vercel.json`
- `AuthProvider` mounted in root `layout.tsx`

---

## Phase 1 — Setup & Infrastructure
**Status: ✅ Complete**

### Objective
Get the project running locally with a live Supabase database. Nothing gets built until the database exists and the app starts without errors.

### Steps

**1. Install dependencies**
```bash
cd "C:\Users\Atif Manzoor\Documents\Verifex"
npm install
```

**2. Initialise shadcn/ui**
```bash
npx shadcn@latest init
```
Choose: New York style, default theme, CSS variables yes. This generates `components.json` and installs base shadcn files into `src/components/ui/`.

**3. Add required shadcn components**
```bash
npx shadcn@latest add button input label card badge separator dialog toast dropdown-menu
```

**4. Create Supabase project via MCP**
- Use Supabase MCP to create a new project named `verifex`
- Region: closest to Pakistan (Mumbai — `ap-south-1`)
- Copy the project URL, anon key, and service role key

**5. Create `.env.local`**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**6. Run the database migration**
Apply `supabase/migrations/0001_initial_schema.sql` via Supabase MCP.

**7. Regenerate database types**
```bash
supabase gen types typescript --local > src/types/database.types.ts
```

**8. Verify the app starts**
```bash
npm run dev
```
Open `http://localhost:3000`. The page loads. No console errors. No TypeScript errors (`npm run typecheck`).

### Files Modified
- `src/components/ui/` — shadcn base components added
- `components.json` — created by shadcn init
- `.env.local` — created (never committed)
- `src/types/database.types.ts` — regenerated from real schema

### Acceptance Criteria
- [ ] `npm install` completes with no errors
- [ ] `npm run dev` starts without crashing
- [ ] `http://localhost:3000` loads in browser
- [ ] `npm run typecheck` passes with zero errors
- [ ] Supabase project exists and migration has been applied
- [ ] All three tables exist in Supabase: `profiles`, `api_keys`, `usage_logs`

---

## Phase 2 — Landing Page
**Status: ✅ Complete**

### Objective
The public landing page is the first thing every visitor sees. It must exist before authentication so visitors have a clear entry point to register or log in.

### Sections

**1. Hero** — `src/components/landing/Hero.tsx`
- Headline, sub-headline, two CTAs: "Get started free" (→ `/register`) and "View docs" (→ `/docs`)
- Framer Motion entrance animation

**2. How It Works** — `src/components/landing/HowItWorks.tsx`
- Three steps: Register → Get API key → Call the API
- Simple icons, short descriptions

**3. Response Preview** — `src/components/landing/ResponsePreview.tsx`
- Side-by-side: valid email response and invalid email response
- Syntax-highlighted JSON using Shiki
- Shows exactly what a developer gets back

**4. FAQ** — `src/components/landing/Faq.tsx`
- Questions: What does it check? Is it free? Is it open source? Can I self-host? What is not checked (SMTP)?
- Accordion layout

**5. Call to Action** — `src/components/landing/CallToAction.tsx`
- Final CTA section: "Start validating emails in 2 minutes"
- Single button → `/register`

**6. Landing page** — `src/app/page.tsx`
- Assembles all sections
- No navbar for now (can be added later)

### Acceptance Criteria
- [ ] All five sections render correctly
- [ ] "Get started free" links to `/register`
- [ ] "View docs" links to `/docs`
- [ ] Response preview shows syntax-highlighted JSON
- [ ] Framer Motion animations play on page load
- [ ] Page looks good on mobile (responsive)
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 3 — Authentication
**Status: ✅ Complete**

### Objective
A user can register, confirm their email, log in, and log out. The dashboard is protected — unauthenticated users are redirected to login.

### Steps

**1. Register page** — `src/app/(auth)/register/page.tsx`
- Form fields: Full Name, Email, Password (React Hook Form + Zod)
- On submit: call `auth.service.ts → signUp()`
- On success: show "Check your email for a confirmation link"
- On error: show inline error message

**2. Login page** — `src/app/(auth)/login/page.tsx`
- Form fields: Email, Password
- On submit: call `auth.service.ts → signIn()`
- On success: redirect to `/dashboard`
- On error: show inline error message
- Link to Register and Forgot Password

**3. Forgot password page** — `src/app/(auth)/forgot-password/page.tsx`
- Form field: Email
- On submit: call `auth.service.ts → resetPassword()`
- On success: show "Check your email for a reset link"

**4. Auth callback** — already built in Phase 0
- `src/app/auth/callback/route.ts` exchanges the code for a session and redirects

**5. Verify middleware protection**
- Visiting `/dashboard` without being logged in → redirects to `/login`
- Visiting `/login` while logged in → redirects to `/dashboard`

### Components to Create
- `src/components/auth/RegisterForm.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/ForgotPasswordForm.tsx`

### Services Already Built (in Phase 0)
- `auth.service.ts`: `signUp()`, `signIn()`, `signOut()`, `resetPassword()`

### Acceptance Criteria
- [ ] User can register with name, email, password
- [ ] Confirmation email arrives (Supabase sends it)
- [ ] Confirming email redirects to `/dashboard`
- [ ] User can log in with correct credentials
- [ ] Wrong credentials show an error message, not a crash
- [ ] Visiting `/dashboard` without login redirects to `/login`
- [ ] Visiting `/login` while logged in redirects to `/dashboard`
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 4 — Dashboard Shell
**Status: ✅ Complete**

### Objective
A logged-in user sees a professional dashboard layout with sidebar navigation, a topbar, and working navigation between pages. No feature data yet — just the shell.

### Steps

**1. Sidebar** — `src/components/dashboard/Sidebar.tsx`
- Logo at top
- Navigation links: Overview, API Keys, Docs, Settings
- Active link highlighted
- Sign out button at bottom (calls `auth.service.ts → signOut()`)

**2. Topbar** — `src/components/dashboard/Topbar.tsx`
- Page title (changes per route)
- User email or name from `useAuth()`
- Mobile menu trigger button (visible on small screens only)

**3. Mobile Drawer** — `src/components/dashboard/MobileDrawer.tsx`
- Same navigation as sidebar
- Opens as a sheet/drawer on mobile
- Triggered by topbar button

**4. Dashboard Shell** — `src/components/dashboard/DashboardShell.tsx`
- Combines Sidebar + Topbar + MobileDrawer
- Renders `children` in the main content area

**5. Wire into layout** — `src/app/dashboard/layout.tsx`
- Replace the stub with `<DashboardShell>`

### Acceptance Criteria
- [x] Sidebar visible on desktop with all four navigation links
- [x] Clicking a nav link navigates to the correct page
- [x] Active link is visually highlighted
- [x] Topbar shows the correct page title
- [x] Sign out button logs the user out and redirects to `/` (landing page)
- [x] On mobile, sidebar is hidden and a drawer opens via the topbar button
- [x] `npm run typecheck` passes

---

## Phase 5 — API Key Management
**Status: ✅ Complete**

### Objective
A user can create an API key, see it once, copy it, and later revoke it. The dashboard keys page shows all active and revoked keys.

### Steps

**1. Complete `POST /api/v1/keys`** — `src/app/api/v1/keys/route.ts`
- Verify Supabase session (unauthorized if no session)
- Validate body with Zod: `{ name: string }`
- Enforce max 10 keys per user (from `constants.ts`)
- Generate key: `API_KEY_PREFIX + randomBytes(32).toString('hex')`
- Hash: `SHA-256` of the raw key
- Store hash + prefix in `api_keys` table
- Return the raw key once — never stored after this

**2. Complete `GET /api/v1/keys`**
- Verify Supabase session
- Return all keys for the user (prefix, name, is_active, created_at, last_used_at)
- Never return the hash

**3. Complete `DELETE /api/v1/keys`**
- Verify Supabase session
- Validate body with Zod: `{ id: string }`
- Confirm the key belongs to the requesting user
- Set `is_active = false` (soft delete — never hard delete for audit trail)

**4. Components**
- `src/components/keys/KeyCard.tsx` — shows key name, prefix, status, last used, revoke button
- `src/components/keys/CreateKeyModal.tsx` — name input, submit, shows raw key once with copy button and warning
- `src/components/keys/RevokeDialog.tsx` — confirmation dialog before revoking

**5. Keys page** — `src/app/dashboard/keys/page.tsx`
- Uses `useApiKeys()` hook
- "Create API Key" button opens `CreateKeyModal`
- Lists all keys using `KeyCard`

### Security Notes
- The raw key is generated server-side and returned in the response once
- Only the SHA-256 hash is written to the database
- If the response is lost, the user must create a new key
- `DELETE` sets `is_active = false` — does not delete the row (preserves usage log integrity)

### Acceptance Criteria
- [ ] User can create a key with a name
- [ ] Raw key is shown in a modal with a copy button — exactly once
- [ ] After closing the modal, the raw key is never shown again
- [ ] Key prefix (first 12 chars) is visible in the dashboard
- [ ] User can revoke a key — it shows as inactive
- [ ] Max 10 keys per user — creation fails with a clear error at the limit
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 6 — Email Validation Engine
**Status: ✅ Complete**

### Objective
The core product. A developer can call `POST /api/v1/validate` with an API key and an email address and get a structured validation result back.

### Steps

**1. `validate-format.ts`** — already complete (length check + regex)

**2. `validate-mx.ts`** — already complete (DNS MX lookup)

**3. Complete `POST /api/v1/validate`** — `src/app/api/v1/validate/route.ts`

Full logic in order:
```
1. Extract X-API-Key header → if missing → UNAUTHORIZED
2. Validate body with Zod: { email: string } → if invalid → VALIDATION_ERROR
3. Hash the API key (SHA-256)
4. Look up hash in api_keys table using service role client
5. If not found or is_active = false → UNAUTHORIZED
6. Rate limiting: count usage_logs for this api_key_id in last 60 seconds
   → if over limit → RATE_LIMITED
7. Run validateFormat(email) → if fails → return result immediately (no DNS call)
8. Extract domain from email
9. Run validateMx(domain)
10. Record start time before step 7, calculate duration_ms after step 9
11. Insert row into usage_logs (domain only, never full email)
12. Update last_used_at on the api_key row
13. Return ValidationResult
```

**4. Create a server-side Supabase service role client**
For the validation endpoint, session cookies do not exist (caller is external code, not a browser). A service role client is needed to:
- Look up the API key hash
- Insert into usage_logs
- Update last_used_at

### Key Security Rules for This Phase
- Never log the full email — extract the domain before any storage
- Hash the incoming key before lookup — never compare raw keys
- Use service role client for key lookup and logging
- Rate limit check happens BEFORE validation to prevent abuse

### Acceptance Criteria
- [ ] `curl` with valid key and valid email returns `{ valid: true, ... }`
- [ ] `curl` with valid key and invalid format returns `{ valid: false, reason: "Email format is invalid" }`
- [ ] `curl` with valid key and fake domain returns `{ valid: false, reason: "No MX records found for domain" }`
- [ ] `curl` with missing or wrong API key returns `401 UNAUTHORIZED`
- [ ] `curl` without email body returns `400 VALIDATION_ERROR`
- [ ] Usage log row created in Supabase after each call (domain only, no full email)
- [ ] `last_used_at` on the api_key row is updated after each call
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 7 — Usage Dashboard
**Status: ✅ Complete**

### Objective
A logged-in user can see how many validations they have made, the breakdown of valid vs invalid, and a table of recent calls.

### Steps

**1. Complete `GET /api/v1/usage`** — `src/app/api/v1/usage/route.ts`
- Verify Supabase session
- Read query params: `limit` (default 20, max 100), `offset` (default 0)
- Query `usage_logs` for the user — return summary (total, valid, invalid) + paginated logs
- Summary is calculated from the full dataset, not just the current page

**2. Components**
- `src/components/usage/StatCard.tsx` — displays a number with a label (Total, Valid, Invalid)
- `src/components/usage/ActivityTable.tsx` — table of recent logs: domain, result badge, duration, timestamp

**3. Dashboard overview page** — `src/app/dashboard/page.tsx`
- Uses `useUsage()` hook
- Three `StatCard` components at the top
- `ActivityTable` below showing the 20 most recent calls
- Empty state when no calls have been made yet

### Acceptance Criteria
- [ ] Three stat cards show correct numbers (total, valid, invalid)
- [ ] Activity table shows domain, result (valid/invalid as a coloured badge), duration, and time
- [ ] Numbers update when the user makes new API calls
- [ ] Empty state shown when no calls have been made
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 8 — Settings
**Status: ✅ Complete**

### Objective
A logged-in user can update their display name, change their password, and permanently delete their account.

### Steps

**1. Complete `DELETE /api/v1/account`** — `src/app/api/v1/account/route.ts`
Delete in FK-safe order:
```
1. Verify Supabase session
2. Delete usage_logs where user_id = user.id
3. Delete api_keys where user_id = user.id
4. Delete profiles where id = user.id
5. Delete the auth.users row (requires service role client)
6. Return success
```

**2. Components**
- `src/components/settings/ProfileForm.tsx` — display name field, save button
- `src/components/settings/PasswordForm.tsx` — current password + new password + confirm, save button
- `src/components/settings/DeleteAccountDialog.tsx` — confirmation dialog with typed confirmation ("delete my account")

**3. Settings page** — `src/app/dashboard/settings/page.tsx`
- Three sections: Profile, Password, Danger Zone
- Each section uses the relevant component

**4. Complete `updateProfile()` in `auth.service.ts`** — already stubbed, update Supabase user metadata

### Acceptance Criteria
- [ ] User can update their display name — change persists after page refresh
- [ ] User can change their password — old password required
- [ ] Account deletion: confirmation dialog requires typing "delete my account"
- [ ] After deletion: user is logged out, redirected to home page, cannot log back in
- [ ] All usage logs and API keys are deleted alongside the account
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 9 — API Documentation
**Status: ✅ Complete**

### Objective
A public documentation page at `/docs` explains the API to any visitor. Inside the dashboard at `/dashboard/docs`, the same page shows the user's own key prefix in the code examples.

### Steps

**1. Components**
- `src/components/docs/DocsLayout.tsx` — page structure with sidebar navigation between sections
- `src/components/docs/EndpointCard.tsx` — displays one endpoint: method, path, description, request, response
- `src/components/docs/CodeBlock.tsx` — renders pre-highlighted HTML from Shiki

**2. `lib/docs-data.ts`** — already stubbed
- Complete with all code examples: curl request, valid response, invalid response, error response
- Pre-highlight all examples server-side using `shiki.ts`
- Accept optional `keyPrefix` parameter — when provided, replace the placeholder in curl examples

**3. Public docs page** — `src/app/docs/page.tsx`
- Server Component
- Calls `getDocsExamples()` with no key prefix
- Renders `DocsLayout` with all endpoint sections

**4. Dashboard docs page** — `src/app/dashboard/docs/page.tsx`
- Server Component
- Reads the user's session server-side
- Queries the user's first active key prefix from `api_keys`
- Calls `getDocsExamples(keyPrefix)` — shows real prefix in examples
- If no keys exist, shows placeholder with a link to create one

### Acceptance Criteria
- [ ] `/docs` loads for an unauthenticated visitor
- [ ] `/dashboard/docs` shows the user's real key prefix in the curl example
- [ ] Code examples have syntax highlighting
- [ ] All endpoints are documented: validate, list keys, create key, revoke key, get usage, delete account
- [ ] Both response shapes are shown for the validate endpoint (valid and invalid)
- [ ] `npm run typecheck` passes
- [ ] `npm run lint` passes

---

## Phase 10 — Quality Assurance
**Status: ⬜ Not started**

### Objective
Every automated check passes. No known bugs. Code holds up to the production standards checklist.

### Steps

**1. Complete unit tests** — `tests/`
- `validate-format.test.ts` — already has 6 tests including length check
- `validate-mx.test.ts` — already has 2 tests (real domain + fake domain)
- `keys.service.test.ts` — expand to test key format, prefix, hash behaviour
- Add tests for `validate-mx.ts` edge cases: empty string domain, numeric-only domain

**2. Run the full quality check**
```bash
npm run typecheck   # zero errors
npm run lint        # zero warnings
npm run test        # all tests pass
```

**3. Manual review against production checklist**
Go through every item in the checklist from `nextjs-production-standards.md`:
- All Route Handlers use `withErrorHandler()` ✓
- All errors use `errorResponse()` — no inline JSON ✓
- No `process.env.X!` outside `lib/env.ts` ✓
- RLS on every table ✓
- No `console.log` anywhere
- No hardcoded values
- No function over 50 lines
- No file over 300 lines

**4. Review `docs/decisions.md`**
Ensure every major architectural decision is documented.

### Acceptance Criteria
- [ ] `npm run typecheck` — zero errors
- [ ] `npm run lint` — zero warnings
- [ ] `npm run test` — all tests pass
- [ ] Zero `console.log` in codebase (`grep -r "console.log" src/`)
- [ ] Zero hardcoded values outside `lib/constants.ts` and `lib/env.ts`
- [ ] Production checklist reviewed and all items pass

---

## Phase 11 — Ship
**Status: ⬜ Not started**

### Objective
Verifex is live on Vercel and public on GitHub.

### Steps

**1. Final README**
Written for two audiences: a developer who wants to use the API, and a technical reviewer evaluating the code.

Structure:
1. What it does (one paragraph)
2. Architecture overview
3. Quick start (register, get key, first curl call)
4. API reference (all endpoints)
5. Design decisions (links to `docs/decisions.md`)
6. Running tests
7. Self-hosting guide
8. Environment variables reference

**2. Deploy to Vercel via MCP**
- Use Vercel MCP to create and deploy the project
- Set all four environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_APP_URL` (set to the Vercel deployment URL)
- Update Supabase auth settings: add the Vercel URL to allowed redirect URLs

**3. Smoke test the live deployment**
- Register a new account on the live URL
- Confirm email
- Create an API key
- Call the live validation endpoint with `curl`
- Check usage dashboard updates

**4. Push to GitHub (public)**
- Create public repo: `github.com/atifmanzoorali/verifex`
- Push all code
- Verify CI workflow runs and passes on GitHub Actions

**5. Update `NEXT_PUBLIC_APP_URL` in README**
Replace placeholder with the live Vercel URL.

### Acceptance Criteria
- [ ] App is live on Vercel — accessible in a browser
- [ ] Full user journey works on live URL: register → confirm → create key → validate → see usage
- [ ] GitHub repo is public
- [ ] CI passes on GitHub Actions (green checkmark on main branch)
- [ ] README is complete and accurate
- [ ] No secrets or `.env.local` in the repository

---

## Definition of Done (Per Phase)

Before marking any phase complete:

1. `npm run typecheck` — zero TypeScript errors
2. `npm run lint` — zero ESLint warnings
3. `npm run test` — all tests pass
4. No `console.log` in any file
5. No hardcoded values outside `lib/constants.ts`
6. The layer chain is unbroken (Component → Hook → Service → Route Handler → lib)
7. The feature works end-to-end in the browser
