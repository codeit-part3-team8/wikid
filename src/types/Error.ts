export class APIError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(status: number, message: string, code?: string) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
  }

  static badRequest(message: string = '잘못된 요청입니다.', code?: string): APIError {
    return new APIError(400, message, code);
  }

  static unauthorized(message: string = '인증이 필요합니다.', code?: string): APIError {
    return new APIError(401, message, code);
  }

  static forbidden(message: string = '접근이 거부되었습니다.', code?: string): APIError {
    return new APIError(403, message, code);
  }

  static notFound(message: string = '리소스를 찾을 수 없습니다.', code?: string): APIError {
    return new APIError(404, message, code);
  }

  static payloadTooLarge(message: string = '요청 크기가 너무 큽니다.', code?: string): APIError {
    return new APIError(413, message, code);
  }

  static internalServerError(
    message: string = '서버 내부 오류가 발생했습니다.',
    code?: string
  ): APIError {
    return new APIError(500, message, code);
  }

  static fromResponse(status: number, message: string, code?: string): APIError {
    return new APIError(status, message, code);
  }
}

export type ErrorResponse = {
  error: string;
  code?: string;
  details?: Record<string, string | number | boolean>;
};

export type SuccessResponse<T = Record<string, string | number | boolean | object | null>> = {
  message: string;
  data?: T;
};

export type APIResponse<T = Record<string, string | number | boolean | object | null>> =
  | SuccessResponse<T>
  | ErrorResponse;

export const isErrorResponse = (response: APIResponse): response is ErrorResponse => {
  return 'error' in response;
};

export const handleAPIError = (error: Error | APIError | string): APIError => {
  if (error instanceof APIError) {
    return error;
  }

  if (error instanceof Error) {
    return APIError.internalServerError(error.message);
  }

  return APIError.internalServerError('알 수 없는 오류가 발생했습니다.');
};
