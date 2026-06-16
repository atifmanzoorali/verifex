export type CheckResult = {
  passed: boolean;
  reason?: string;
};

export type ValidationRequest = {
  email: string;
};

export type ValidationResult = {
  valid: boolean;
  email: string;
  domain: string;
  checks: {
    format: boolean;
    mx: boolean;
  };
  mx_records: string[];
  duration_ms: number;
  reason?: string;
};
