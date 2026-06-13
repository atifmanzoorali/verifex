import { highlight } from '@/lib/shiki';

export type DocsCodeExample = {
  label: string;
  lang: 'bash' | 'json' | 'typescript';
  raw: string;
  html?: string;
};

const CURL_EXAMPLE = `curl -X POST https://verifex.app/api/v1/validate \\
  -H "X-API-Key: vfx_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com"}'`;

const VALID_RESPONSE = `{
  "success": true,
  "data": {
    "valid": true,
    "email": "user@example.com",
    "domain": "example.com",
    "checks": { "format": true, "mx": true },
    "mx_records": ["mail.example.com"]
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
    "reason": "No MX records found for domain"
  }
}`;

export async function getDocsExamples(): Promise<DocsCodeExample[]> {
  const examples: DocsCodeExample[] = [
    { label: 'Request', lang: 'bash', raw: CURL_EXAMPLE },
    { label: 'Valid response', lang: 'json', raw: VALID_RESPONSE },
    { label: 'Invalid response', lang: 'json', raw: INVALID_RESPONSE },
  ];

  return Promise.all(
    examples.map(async (example) => ({
      ...example,
      html: await highlight(example.raw, example.lang),
    }))
  );
}
