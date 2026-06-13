# Design Decisions

Every major technical choice is documented here, with the reason.
This is not auto-generated. These are real decisions made during architecture.

---

## 1. Hash-only API key storage

The raw API key is shown once at creation and never stored. Only the SHA-256 hash is written to the database.

**Why:** If the database is compromised, leaked hashes cannot be reversed into working keys. This is the same pattern used by GitHub personal access tokens. Storing raw keys would mean a single database breach gives attackers access to every user's integrations.

---

## 2. Domain-only logging in usage_logs

The full email address submitted for validation is never written to the database. Only the domain portion is logged.

**Why:** Users of the API are sending other people's email addresses. Storing `john@company.com` creates a PII liability. Storing `company.com` gives the same operational insight (which domains are being validated, which fail) with zero personal data exposure.

---

## 3. Two completely separate auth systems

Dashboard operations use a Supabase session (httpOnly cookie). The validation API uses an API key in the `X-API-Key` header. These are never mixed.

**Why:** The dashboard user and the API caller are different actors with different security requirements. The session cookie is appropriate for browser-to-server communication (short-lived, auto-refreshed, tied to a browser). The API key is appropriate for server-to-server communication (long-lived, manually managed, not tied to a session). Mixing them would mean a stolen session cookie could call the validation API, or that API keys would need session refresh logic.

---

## 4. Single Next.js app — no separate backend

The landing page, dashboard, and validation API all live in one Next.js application. There is no separate Express or Fastify server.

**Why:** The validation logic is simple and stateless. A separate backend would add infrastructure complexity (two deployments, two CI pipelines, CORS configuration) with no architectural benefit at this scale. Next.js Route Handlers run on the server and have full access to Node.js APIs including `dns/promises`.

---

## 5. No SMTP ping in validation

Validation stops at MX record lookup. It does not attempt to open an SMTP connection to verify the mailbox exists.

**Why:** SMTP pings are blocked by most mail servers, add 2-5 seconds of latency, and produce unreliable results. MX record lookup is fast, reliable, and sufficient to confirm a domain is mail-capable — which is the practical question most callers are asking.

---

## 6. Versioned API from day one (`/api/v1/`)

All endpoints are prefixed with `/api/v1/` even though there is only one version.

**Why:** Retrofitting version prefixes into a live API breaks existing integrations. Starting versioned costs nothing and keeps the option open to ship `/api/v2/` without breaking callers.
