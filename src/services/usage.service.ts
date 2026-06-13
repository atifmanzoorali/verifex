import { API_BASE_PATH, USAGE_DEFAULT_LIMIT } from '@/lib/constants';

export type UsageSummary = {
  total: number;
  valid: number;
  invalid: number;
};

export type UsageLog = {
  id: string;
  email_domain: string;
  result: 'valid' | 'invalid';
  duration_ms: number;
  created_at: string;
};

export type UsageResponse = {
  summary: UsageSummary;
  logs: UsageLog[];
  total: number;
};

export async function getUsage(
  limit = USAGE_DEFAULT_LIMIT,
  offset = 0
): Promise<UsageResponse> {
  const res = await fetch(`${API_BASE_PATH}/usage?limit=${limit}&offset=${offset}`);
  const json = await res.json();
  if (!json.success) throw new Error(json.error.message);
  return json.data;
}
