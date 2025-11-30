import { NextResponse } from 'next/server';
import { APIError, ErrorResponse, handleAPIError } from '@/types/Error';

export const createErrorResponse = (
  error: Error | APIError | string,
  defaultMessage?: string
): NextResponse<ErrorResponse> => {
  const apiError = handleAPIError(error);

  return NextResponse.json(
    {
      error: defaultMessage || apiError.message,
      code: apiError.code,
    },
    { status: apiError.status }
  );
};

export const createSuccessResponse = <T>(
  data: T,
  message: string,
  status: number = 200
): NextResponse => {
  return NextResponse.json(
    {
      message,
      data,
    },
    { status }
  );
};

export const validateEnvironmentVariables = (
  ...variables: Array<{ name: string; value: string | undefined }>
): void => {
  const missing = variables.filter(({ value }) => !value).map(({ name }) => name);

  if (missing.length > 0) {
    throw APIError.internalServerError(`환경 변수가 설정되지 않았습니다: ${missing.join(', ')}`);
  }
};

export const validateRequestBody = <
  T extends Record<string, string | number | boolean | object | null>,
>(
  body: Record<string, string | number | boolean | object | null> | null,
  requiredFields: Array<keyof T>
): T => {
  if (!body || typeof body !== 'object') {
    throw APIError.badRequest('요청 본문이 유효하지 않습니다.');
  }

  const typedBody = body as T;
  const missing = requiredFields.filter((field) => !(field in typedBody));

  if (missing.length > 0) {
    throw APIError.badRequest(`필수 필드가 누락되었습니다: ${missing.join(', ')}`);
  }

  return typedBody;
};

export const validateFileUpload = (
  file: File | null | undefined,
  allowedTypes: readonly string[],
  maxSize: number
): File => {
  if (!file || !(file instanceof File)) {
    throw APIError.badRequest('파일이 필요합니다.');
  }

  if (!allowedTypes.includes(file.type)) {
    throw APIError.badRequest(
      `지원하지 않는 파일 형식입니다. 허용된 형식: ${allowedTypes.join(', ')}`
    );
  }

  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    throw APIError.payloadTooLarge(`파일 크기는 ${maxSizeMB}MB 이하여야 합니다.`);
  }

  return file;
};
