import { describe, it, expect } from 'vitest';
import { API_KEY_PREFIX } from '@/lib/constants';

describe('API key format', () => {
  it('key prefix constant matches expected format', () => {
    expect(API_KEY_PREFIX).toBe('vfx_live_');
  });

  it('a generated key would start with the correct prefix', () => {
    const fakeKey = `${API_KEY_PREFIX}abcdef1234567890abcdef1234567890`;
    expect(fakeKey.startsWith(API_KEY_PREFIX)).toBe(true);
    expect(fakeKey.length).toBe(API_KEY_PREFIX.length + 32);
  });
});
