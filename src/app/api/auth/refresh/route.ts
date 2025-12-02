import { NextRequest } from 'next/server';
import { safeFetch } from '@/utils/safeFetch';
import { API_BASE_URL } from '@/constants/api';
import { APIError } from '@/types/Error';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

// 토큰 새로고침 요청 타입
interface RefreshTokenRequest {
  refreshToken: string;
}

// 인증 응답 타입
interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const body: RefreshTokenRequest = await request.json();

    // 입력 validation
    if (!body.refreshToken) {
      throw APIError.badRequest('리프레시 토큰이 필요합니다.');
    }

    // 외부 API 호출
    const authData = await safeFetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: body.refreshToken,
      }),
    });

    return createSuccessResponse<AuthResponse>(authData, '토큰이 갱신되었습니다.');
  } catch (error) {
    console.error('토큰 갱신 API 오류:', error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '토큰 갱신에 실패했습니다.'
    );
  }
}
