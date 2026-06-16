# Lessons Learned

Mistakes made during the Verifex build and how to avoid them in future projects.

---

## 1. Next.js 14 does not support `next.config.ts`

**What happened:**
The Phase 0 scaffold created `next.config.ts`. When we ran `npm run dev` for the first time in Phase 1, the app crashed immediately with the error: *"Configuring Next.js via 'next.config.ts' is not supported."*

**Why it happened:**
TypeScript config files (`next.config.ts`) were only added in Next.js 15. Next.js 14 only accepts `next.config.js` or `next.config.mjs`.

**The fix:**
Renamed `next.config.ts` to `next.config.mjs` and converted the TypeScript syntax to plain JavaScript.

**Rule for future projects:**
When scaffolding a Next.js 14 project, always create `next.config.mjs`. Never create `next.config.ts` unless you are confirmed to be on Next.js 15+.

---

## 2. Never use `npx shadcn@latest` on a Tailwind v3 + Radix UI project

**What happened:**
The roadmap said to run `npx shadcn@latest init`. At the time of building, `@latest` resolved to shadcn v4. The components it generated (e.g. `button.tsx`) imported from `@base-ui/react` instead of Radix UI, and the CSS used `@import "shadcn/tailwind.css"` — a Tailwind v4 pattern. This broke the entire component system because our project was built on Tailwind v3 and Radix UI.

**Why it happened:**
shadcn released a major new version (v4) that switched its underlying primitive library from Radix UI to Base UI, and moved from Tailwind v3 to Tailwind v4. The roadmap did not pin a version, so `@latest` pulled in the incompatible new version.

**The fix:**
Deleted all generated files, and re-ran init using the correct pinned version: `npx shadcn@2.4.0 init`.

**Rule for future projects:**
Always pin the shadcn version explicitly. If the project uses Tailwind v3 and Radix UI packages, use `shadcn@2.4.0`. Never use `@latest` unless you have confirmed the project is on Tailwind v4.

| Stack | shadcn version to use |
|---|---|
| Tailwind v3 + Radix UI | `shadcn@2.4.0` |
| Tailwind v4 + Base UI | `shadcn@latest` (v4+) |

---

## 3. shadcn init will overwrite `globals.css` — write it after, not before

**What happened:**
After writing the correct Verifex design system colors into `globals.css`, the shadcn init command overwrote the file with its own default color variables (in `oklch` format), destroying the work.

**Why it happened:**
`shadcn init` always updates `globals.css` as part of its setup. It does not check for existing content.

**Rule for future projects:**
Always run `shadcn init` first, then write the final `globals.css` with the project's design system colors. Never write `globals.css` before running shadcn init.

---

## 4. Never import `env.ts` in client-side Supabase code

**What happened:**
`src/lib/supabase/client.ts` imported from `env.ts` to get the Supabase URL and anon key. `env.ts` validates all required environment variables at module load time — including `SUPABASE_SERVICE_ROLE_KEY`, which is a server-only variable with no `NEXT_PUBLIC_` prefix. When Next.js bundled `client.ts` for the browser, it ran `env.ts` on the client, which threw because `SUPABASE_SERVICE_ROLE_KEY` is not available in the browser.

**Why it happened:**
`env.ts` was designed to validate both server and client variables in one place. That works on the server but breaks on the client.

**The fix:**
Updated `client.ts` to read `process.env.NEXT_PUBLIC_SUPABASE_URL` and `process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY` directly, bypassing `env.ts` entirely.

**Rule for future projects:**
`env.ts` (or any centralised env validator that includes server-only variables) must never be imported in client-side code. Client-side Supabase setup should read `process.env.NEXT_PUBLIC_*` variables directly.
