const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_APP_URL',
] as const;

type EnvKey = (typeof REQUIRED_ENV_VARS)[number];

function validateEnv(): Record<EnvKey, string> {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n\nCopy .env.example to .env.local and fill in the values.`
    );
  }

  return Object.fromEntries(
    REQUIRED_ENV_VARS.map((key) => [key, process.env[key] as string])
  ) as Record<EnvKey, string>;
}

export const env = validateEnv();
