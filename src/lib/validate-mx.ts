import { promises as dns } from 'dns';
import type { CheckResult } from '@/types/validation.types';

export async function validateMx(domain: string): Promise<CheckResult & { records: string[] }> {
  try {
    const records = await dns.resolveMx(domain);
    const sorted = records.sort((a, b) => a.priority - b.priority).map((r) => r.exchange);

    if (sorted.length === 0) {
      return { passed: false, reason: 'No MX records found for domain', records: [] };
    }

    return { passed: true, records: sorted };
  } catch {
    return { passed: false, reason: 'No MX records found for domain', records: [] };
  }
}
