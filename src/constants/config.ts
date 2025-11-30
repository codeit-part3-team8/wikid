export const getEnvironmentVariable = (key: string, defaultValue = ''): string => {
  const value = process.env[key];
  return value || defaultValue;
};

export const getEnvironmentNumber = (key: string, defaultValue = 0): number => {
  const value = process.env[key];
  if (!value) return defaultValue;

  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const CONFIG = {
  ACCESS_TOKEN: getEnvironmentVariable('WIKID_ACCESS_TOKEN'),
  API_BASE_URL: getEnvironmentVariable('NEXT_PUBLIC_API_BASE_URL'),
  CURRENT_USER_CODE: getEnvironmentVariable('NEXT_PUBLIC_WIKID_CURRENT_USER_CODE'),
  CURRENT_USER_ID: getEnvironmentNumber('NEXT_PUBLIC_WIKID_CURRENT_USER_ID'),
} as const;

export const validateRequiredConfig = (): void => {
  const required = ['ACCESS_TOKEN', 'API_BASE_URL'] as const;
  const missing = required.filter((key) => !CONFIG[key]);

  if (missing.length > 0) {
    throw new Error(`필수 환경변수 누락: ${missing.join(', ')}`);
  }
};
