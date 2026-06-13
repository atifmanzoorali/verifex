# Architecture

## Overview

Verifex is a single Next.js 14 application. It serves the marketing landing page, the authenticated developer dashboard, and the validation API — all from one codebase, one deployment.

## Layer Chain

```
Page / Component
      ↓
    Hook          (state, loading, error, refresh)
      ↓
  Service         (fetch calls to the API)
      ↓
Route Handler     (receives request, validates with Zod, calls lib, returns response)
      ↓
 lib / Supabase   (pure functions — format check, MX lookup, database queries)
```

No layer reaches past its immediate neighbor. This makes each layer independently testable and replaceable.

## Auth Systems

Two systems, never mixed. See `decisions.md` for why.

| System | Used By | Mechanism |
|---|---|---|
| Supabase session | Dashboard UI (browser) | httpOnly cookie, refreshed by middleware |
| API Key | Developer code (server) | `X-API-Key` header, SHA-256 hash lookup |

## Request Lifecycle — Validation API

1. Developer code sends `POST /api/v1/validate` with `X-API-Key` header and `{ email }` body
2. Route Handler extracts and validates the API key
3. Key hash is looked up in `api_keys` table via service role client
4. `validate-format.ts` checks email structure (no DNS call)
5. If format passes, `validate-mx.ts` queries DNS for MX records
6. Result is written to `usage_logs` (domain only, never full email)
7. Response returned to caller

## Request Lifecycle — Dashboard

1. User logs in via Supabase auth (email + password)
2. Supabase sets session cookie; middleware refreshes it on every request
3. Dashboard pages are Server Components — they read session server-side
4. Mutations go through client hooks → services → Route Handlers
5. Route Handlers verify session with `supabase.auth.getUser()` before any operation
