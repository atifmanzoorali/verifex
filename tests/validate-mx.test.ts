import { vi, describe, it, expect, afterEach } from 'vitest';

vi.mock('dns', () => ({
  promises: {
    resolveMx: vi.fn(),
  },
}));

import { promises as dns } from 'dns';
import { validateMx } from '@/lib/validate-mx';

const mockResolveMx = vi.mocked(dns.resolveMx);

describe('validateMx', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('returns passed=true for a domain with MX records', async () => {
    mockResolveMx.mockResolvedValue([
      { priority: 10, exchange: 'alt1.gmail-smtp-in.l.google.com' },
      { priority: 5, exchange: 'gmail-smtp-in.l.google.com' },
    ]);
    const result = await validateMx('gmail.com');
    expect(result.passed).toBe(true);
    expect(result.records.length).toBeGreaterThan(0);
  });

  it('returns records sorted by priority (lowest first)', async () => {
    mockResolveMx.mockResolvedValue([
      { priority: 20, exchange: 'mx3.example.com' },
      { priority: 5, exchange: 'mx1.example.com' },
      { priority: 10, exchange: 'mx2.example.com' },
    ]);
    const result = await validateMx('example.com');
    expect(result.passed).toBe(true);
    expect(result.records).toEqual(['mx1.example.com', 'mx2.example.com', 'mx3.example.com']);
  });

  it('returns passed=false for a domain with no MX records', async () => {
    mockResolveMx.mockResolvedValue([]);
    const result = await validateMx('no-records.example.com');
    expect(result.passed).toBe(false);
    expect(result.records).toHaveLength(0);
    expect(result.reason).toBe('No MX records found for domain');
  });

  it('returns passed=false when DNS lookup throws', async () => {
    mockResolveMx.mockRejectedValue(new Error('ENOTFOUND'));
    const result = await validateMx('this-domain-does-not-exist-xyz123.com');
    expect(result.passed).toBe(false);
    expect(result.records).toHaveLength(0);
  });

  it('returns passed=false for an empty string domain', async () => {
    mockResolveMx.mockRejectedValue(new Error('ENOTFOUND'));
    const result = await validateMx('');
    expect(result.passed).toBe(false);
    expect(result.records).toHaveLength(0);
  });

  it('returns passed=false for a numeric-only domain', async () => {
    mockResolveMx.mockRejectedValue(new Error('ENOTFOUND'));
    const result = await validateMx('12345');
    expect(result.passed).toBe(false);
    expect(result.records).toHaveLength(0);
  });
});
