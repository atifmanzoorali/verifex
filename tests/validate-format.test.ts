import { describe, it, expect } from 'vitest';
import { validateFormat } from '@/lib/validate-format';

describe('validateFormat', () => {
  it('accepts a valid email', () => {
    expect(validateFormat('user@example.com').passed).toBe(true);
  });

  it('rejects an email with no @', () => {
    expect(validateFormat('userexample.com').passed).toBe(false);
  });

  it('rejects an email with no domain', () => {
    expect(validateFormat('user@').passed).toBe(false);
  });

  it('rejects an email with spaces', () => {
    expect(validateFormat('user @example.com').passed).toBe(false);
  });

  it('rejects an empty string', () => {
    expect(validateFormat('').passed).toBe(false);
  });

  it('rejects an email over 254 characters', () => {
    const longEmail = `${'a'.repeat(250)}@example.com`;
    const result = validateFormat(longEmail);
    expect(result.passed).toBe(false);
    expect(result.reason).toContain('254');
  });
});
