# API Contracts

All endpoints are under `/api/v1/`. Every response uses the same envelope:

```json
// Success
{ "success": true, "data": { ... } }

// Failure
{ "success": false, "error": { "message": "...", "code": "..." } }
```

---

## POST /api/v1/validate

Auth: `X-API-Key` header

```json
// Request
{ "email": "user@example.com" }

// Valid
{ "success": true, "data": { "valid": true, "email": "user@example.com", "domain": "example.com", "checks": { "format": true, "mx": true }, "mx_records": ["mail.example.com"], "duration_ms": 18 } }

// Invalid
{ "success": true, "data": { "valid": false, "email": "user@fake.xyz", "domain": "fake.xyz", "checks": { "format": true, "mx": false }, "mx_records": [], "duration_ms": 22, "reason": "No MX records found for domain" } }
```

---

## GET /api/v1/keys

Auth: Supabase session cookie

```json
{ "success": true, "data": [ { "id": "uuid", "name": "Production", "key_prefix": "vfx_live_xxxx", "is_active": true, "created_at": "...", "last_used_at": "..." } ] }
```

## POST /api/v1/keys

Auth: Supabase session cookie

```json
// Request
{ "name": "Production" }

// Response — raw key shown once, never again
{ "success": true, "data": { "id": "uuid", "name": "Production", "key": "vfx_live_...", "key_prefix": "vfx_live_xxxx", "is_active": true, "created_at": "...", "last_used_at": null } }
```

## DELETE /api/v1/keys

Auth: Supabase session cookie

```json
// Request
{ "id": "uuid" }

// Response
{ "success": true, "data": null }
```

---

## GET /api/v1/usage

Auth: Supabase session cookie. Query params: `limit` (default 20, max 100), `offset` (default 0)

```json
{ "success": true, "data": { "summary": { "total": 214, "valid": 189, "invalid": 25 }, "logs": [...], "total": 214 } }
```

---

## DELETE /api/v1/account

Auth: Supabase session cookie

```json
{ "success": true, "data": null }
```

Deletes in FK-safe order: usage_logs → api_keys → profiles → auth user.

---

## Error Codes

| Code | HTTP Status |
|---|---|
| `VALIDATION_ERROR` | 400 |
| `UNAUTHORIZED` | 401 |
| `FORBIDDEN` | 403 |
| `NOT_FOUND` | 404 |
| `CONFLICT` | 409 |
| `RATE_LIMITED` | 429 |
| `INTERNAL_ERROR` | 500 |
