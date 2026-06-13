import { describe, it, expect } from 'vitest';
import { validateMx } from '@/lib/validate-mx';

describe('validateMx', () => {
  it('returns passed=true for a real domain with MX records', async () => {
    const result = await validateMx('gmail.com');
    expect(result.passed).toBe(true);
    expect(result.records.length).toBeGreaterThan(0);
  });

  it('returns passed=false for a fake domain', async () => {
    const result = await validateMx('this-domain-does-not-exist-xyz123.com');
    expect(result.passed).toBe(false);
    expect(result.records).toHaveLength(0);
  });
});
