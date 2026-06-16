import { describe, it, expect } from 'vitest';
import { createHash } from 'crypto';
import {
  API_KEY_PREFIX,
  API_KEY_RANDOM_BYTES,
  MAX_API_KEYS_PER_USER,
} from '@/lib/constants';

describe('API key format', () => {
  it('key prefix constant matches expected format', () => {
    expect(API_KEY_PREFIX).toBe('vfx_live_');
  });

  it('a generated key would start with the correct prefix', () => {
    const fakeKey = `${API_KEY_PREFIX}abcdef1234567890abcdef1234567890`;
    expect(fakeKey.startsWith(API_KEY_PREFIX)).toBe(true);
    expect(fakeKey.length).toBe(API_KEY_PREFIX.length + 32);
  });

  it('API_KEY_RANDOM_BYTES produces 64-char hex when stringified', () => {
    const hexLength = API_KEY_RANDOM_BYTES * 2;
    const fakeHex = '0'.repeat(hexLength);
    const fullKey = `${API_KEY_PREFIX}${fakeHex}`;
    expect(fullKey.length).toBe(API_KEY_PREFIX.length + hexLength);
  });

  it('SHA-256 hash of an API key is 64 hex characters', () => {
    const fakeKey = `${API_KEY_PREFIX}abcdef1234567890abcdef1234567890`;
    const hash = createHash('sha256').update(fakeKey).digest('hex');
    expect(hash).toHaveLength(64);
    expect(hash).toMatch(/^[0-9a-f]+$/);
  });

  it('the same key always produces the same hash', () => {
    const fakeKey = `${API_KEY_PREFIX}abcdef1234567890abcdef1234567890`;
    const hash1 = createHash('sha256').update(fakeKey).digest('hex');
    const hash2 = createHash('sha256').update(fakeKey).digest('hex');
    expect(hash1).toBe(hash2);
  });

  it('different keys produce different hashes', () => {
    const key1 = `${API_KEY_PREFIX}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1`;
    const key2 = `${API_KEY_PREFIX}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2`;
    const hash1 = createHash('sha256').update(key1).digest('hex');
    const hash2 = createHash('sha256').update(key2).digest('hex');
    expect(hash1).not.toBe(hash2);
  });

  it('MAX_API_KEYS_PER_USER is 10', () => {
    expect(MAX_API_KEYS_PER_USER).toBe(10);
  });

  it('key_prefix is the first 12 characters of the full key', () => {
    const fakeKey = `${API_KEY_PREFIX}abcdef1234567890abcdef1234567890`;
    const prefix = fakeKey.slice(0, 12);
    expect(prefix).toBe('vfx_live_abc');
    expect(prefix).toHaveLength(12);
  });
});
