import { highlight } from '@/lib/shiki';
import { env } from '@/lib/env';

export type DocsCodeExample = {
  label: string;
  lang: 'bash' | 'json' | 'typescript';
  raw: string;
  html: string;
};

export type DocsEndpoint = {
  method: 'GET' | 'POST' | 'DELETE';
  path: string;
  description: string;
  auth: string;
  examples: DocsCodeExample[];
};

export type DocsSection = {
  id: string;
  title: string;
  intro: string;
  endpoints: DocsEndpoint[];
};

export type DocsErrorCode = {
  code: string;
  status: number;
  meaning: string;
};

export const ERROR_CODES: DocsErrorCode[] = [
  { code: 'VALIDATION_ERROR', status: 400, meaning: 'Request body failed schema validation' },
  { code: 'UNAUTHORIZED',     status: 401, meaning: 'Missing or invalid API key or session' },
  { code: 'FORBIDDEN',        status: 403, meaning: 'Valid credentials but insufficient permissions' },
  { code: 'NOT_FOUND',        status: 404, meaning: 'Requested resource does not exist' },
  { code: 'CONFLICT',         status: 409, meaning: 'Resource already exists or state conflict' },
  { code: 'RATE_LIMITED',     status: 429, meaning: 'Too many requests — 60 per minute per API key' },
  { code: 'INTERNAL_ERROR',   status: 500, meaning: 'Unexpected server error' },
];

const VALID_RESPONSE = `{
  "success": true,
  "data": {
    "valid": true,
    "email": "user@example.com",
    "domain": "example.com",
    "checks": { "format": true, "mx": true },
    "mx_records": ["mail.example.com"],
    "duration_ms": 18
  }
}`;

const INVALID_RESPONSE = `{
  "success": true,
  "data": {
    "valid": false,
    "email": "user@fakedomain.xyz",
    "domain": "fakedomain.xyz",
    "checks": { "format": true, "mx": false },
    "mx_records": [],
    "reason": "No MX records found for domain",
    "duration_ms": 22
  }
}`;

const KEYS_LIST_RESPONSE = `{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-...",
      "name": "Production",
      "key_prefix": "vfx_live_a1b2",
      "is_active": true,
      "created_at": "2024-01-15T10:30:00Z",
      "last_used_at": "2024-01-20T14:22:00Z"
    }
  ]
}`;

const KEYS_CREATE_BODY    = `{ "name": "Production" }`;
const KEYS_CREATE_RESPONSE = `{
  "success": true,
  "data": {
    "id": "a1b2c3d4-...",
    "name": "Production",
    "key": "vfx_live_a1b2c3d4...",
    "key_prefix": "vfx_live_a1b2",
    "created_at": "2024-01-15T10:30:00Z"
  }
}`;

const KEYS_REVOKE_BODY     = `{ "id": "a1b2c3d4-..." }`;
const KEYS_REVOKE_RESPONSE = `{ "success": true, "data": { "message": "Key revoked." } }`;

const USAGE_RESPONSE = `{
  "success": true,
  "data": {
    "summary": { "total": 214, "valid": 189, "invalid": 25 },
    "logs": [
      {
        "id": "uuid",
        "email_domain": "example.com",
        "result": "valid",
        "duration_ms": 18,
        "created_at": "2024-01-20T14:22:00Z"
      }
    ],
    "total": 214
  }
}`;

const ACCOUNT_RESPONSE = `{ "success": true, "data": null }`;

async function h(raw: string, lang: 'bash' | 'json' | 'typescript'): Promise<string> {
  return highlight(raw, lang);
}

function buildValidateSection(curlRaw: string, curlHtml: string, validHtml: string, invalidHtml: string): DocsSection {
  return {
    id: 'validate',
    title: 'Validate Email',
    intro: 'Validates an email address with a format check followed by a DNS MX record lookup. Both checks must pass for valid: true.',
    endpoints: [
      {
        method: 'POST',
        path: '/api/v1/validate',
        description: 'Submit an email address for validation. Returns detailed check results and lookup duration.',
        auth: 'X-API-Key header. Rate limited to 60 requests per 60 seconds per key.',
        examples: [
          { label: 'Request', lang: 'bash', raw: curlRaw, html: curlHtml },
          { label: 'Valid response', lang: 'json', raw: VALID_RESPONSE, html: validHtml },
          { label: 'Invalid response', lang: 'json', raw: INVALID_RESPONSE, html: invalidHtml },
        ],
      },
    ],
  };
}

function buildKeysSection(listHtml: string, createBodyHtml: string, createRespHtml: string, revokeBodyHtml: string, revokeRespHtml: string): DocsSection {
  return {
    id: 'keys',
    title: 'API Keys',
    intro: 'Manage your API keys. Keys are shown once at creation and cannot be retrieved again. Maximum 10 keys per account. These endpoints require a browser session — they are not callable via curl.',
    endpoints: [
      {
        method: 'GET', path: '/api/v1/keys',
        description: 'List all keys for the authenticated user. Never returns the key hash.',
        auth: 'Supabase session cookie (browser only).',
        examples: [{ label: 'Response', lang: 'json', raw: KEYS_LIST_RESPONSE, html: listHtml }],
      },
      {
        method: 'POST', path: '/api/v1/keys',
        description: 'Create a new API key. The raw key is returned exactly once — copy it immediately.',
        auth: 'Supabase session cookie (browser only).',
        examples: [
          { label: 'Request body', lang: 'json', raw: KEYS_CREATE_BODY, html: createBodyHtml },
          { label: 'Response', lang: 'json', raw: KEYS_CREATE_RESPONSE, html: createRespHtml },
        ],
      },
      {
        method: 'DELETE', path: '/api/v1/keys',
        description: 'Revoke an API key. Sets is_active to false. The row is retained for audit trail.',
        auth: 'Supabase session cookie (browser only).',
        examples: [
          { label: 'Request body', lang: 'json', raw: KEYS_REVOKE_BODY, html: revokeBodyHtml },
          { label: 'Response', lang: 'json', raw: KEYS_REVOKE_RESPONSE, html: revokeRespHtml },
        ],
      },
    ],
  };
}

function buildUsageSection(usageHtml: string): DocsSection {
  return {
    id: 'usage',
    title: 'Usage',
    intro: 'Query your validation history. Returns an aggregate summary plus a paginated log of recent calls. Full email addresses are never stored — only the domain.',
    endpoints: [
      {
        method: 'GET', path: '/api/v1/usage',
        description: 'Fetch usage summary and recent activity. Query params: limit (default 20, max 100), offset (default 0).',
        auth: 'Supabase session cookie (browser only).',
        examples: [{ label: 'Response', lang: 'json', raw: USAGE_RESPONSE, html: usageHtml }],
      },
    ],
  };
}

function buildAccountSection(accountHtml: string): DocsSection {
  return {
    id: 'account',
    title: 'Account',
    intro: 'Account deletion is permanent. All API keys and usage logs are removed in FK-safe order before the auth user is deleted.',
    endpoints: [
      {
        method: 'DELETE', path: '/api/v1/account',
        description: 'Permanently delete the authenticated account and all associated data.',
        auth: 'Supabase session cookie (browser only).',
        examples: [{ label: 'Response', lang: 'json', raw: ACCOUNT_RESPONSE, html: accountHtml }],
      },
    ],
  };
}

export async function getDocsData(keyPrefix?: string): Promise<DocsSection[]> {
  const key = keyPrefix ? `${keyPrefix}...` : 'vfx_live_your_key_here';
  const validateCurl = `curl -X POST ${env.NEXT_PUBLIC_APP_URL}/api/v1/validate \\
  -H "X-API-Key: ${key}" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com"}'`;

  const [
    curlHtml, validHtml, invalidHtml,
    keysListHtml, keysCreateBodyHtml, keysCreateResponseHtml,
    keysRevokeBodyHtml, keysRevokeResponseHtml,
    usageHtml, accountHtml,
  ] = await Promise.all([
    h(validateCurl, 'bash'), h(VALID_RESPONSE, 'json'), h(INVALID_RESPONSE, 'json'),
    h(KEYS_LIST_RESPONSE, 'json'), h(KEYS_CREATE_BODY, 'json'), h(KEYS_CREATE_RESPONSE, 'json'),
    h(KEYS_REVOKE_BODY, 'json'), h(KEYS_REVOKE_RESPONSE, 'json'),
    h(USAGE_RESPONSE, 'json'), h(ACCOUNT_RESPONSE, 'json'),
  ]);

  return [
    buildValidateSection(validateCurl, curlHtml, validHtml, invalidHtml),
    buildKeysSection(keysListHtml, keysCreateBodyHtml, keysCreateResponseHtml, keysRevokeBodyHtml, keysRevokeResponseHtml),
    buildUsageSection(usageHtml),
    buildAccountSection(accountHtml),
  ];
}
