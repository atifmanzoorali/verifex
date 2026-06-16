# Verifex

Open-source email validation API. Two-layer check: format validation + MX record lookup. Free to use, free to inspect, free to self-host.

---

## What It Does

Send an email address. Get back a structured response telling you whether it's valid, which checks passed, and why it failed if it did.

```bash
curl -X POST https://verifex-puce.vercel.app/api/v1/validate \
  -H "X-API-Key: vfx_live_your_key_here" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

```json
{
  "success": true,
  "data": {
    "valid": true,
    "email": "user@example.com",
    "domain": "example.com",
    "checks": { "format": true, "mx": true },
    "mx_records": ["mail.example.com"]
  }
}
```

---

## Architecture

Single Next.js 14 application. No separate backend. The same codebase serves the landing page, the authenticated dashboard, and the validation API.

See [`docs/architecture.md`](docs/architecture.md) for the full layer breakdown.
See [`docs/decisions.md`](docs/decisions.md) for why each major decision was made.

---

## Quick Start

1. Register at [verifex-puce.vercel.app](https://verifex-puce.vercel.app)
2. Go to your dashboard and create an API key
3. Copy the key — it is shown once
4. Call the API:

```bash
curl -X POST https://verifex-puce.vercel.app/api/v1/validate \
  -H "X-API-Key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@gmail.com"}'
```

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript strict mode |
| Styling | Tailwind CSS + shadcn/ui |
| Auth + Database | Supabase (email/password, PostgreSQL, RLS) |
| DNS Lookup | Node.js `dns/promises` (zero extra dependencies) |
| Forms | React Hook Form + Zod |
| Testing | Vitest |
| Deployment | Vercel |

---

## Running Tests

```bash
git clone https://github.com/atifmanzoorali/verifex
cd verifex
npm install
npm run test
```

---

## Self-Hosting

```bash
git clone https://github.com/atifmanzoorali/verifex
cd verifex
cp .env.example .env.local
# Fill in your Supabase credentials in .env.local
npm install
npx supabase db push  # runs migrations
npm run dev
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server-only — never exposed to browser |
| `NEXT_PUBLIC_APP_URL` | Yes | Your deployment URL (e.g. `https://verifex.app`) |

---

## License

MIT — see [LICENSE](LICENSE)
