import type { CheckResult } from '@/types/validation.types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_MAX_LENGTH = 254;

export function validateFormat(email: string): CheckResult {
  if (email.length > EMAIL_MAX_LENGTH) {
    return { passed: false, reason: `Email must be ${EMAIL_MAX_LENGTH} characters or fewer` };
  }

  const passed = EMAIL_REGEX.test(email);
  return {
    passed,
    reason: passed ? undefined : 'Email format is invalid',
  };
}
