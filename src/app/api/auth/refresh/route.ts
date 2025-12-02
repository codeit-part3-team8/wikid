import { NextRequest, NextResponse } from 'next/server';
import { safeFetch } from '@/utils/safeFetch';
import { API_BASE_URL } from '@/constants/api';
import { APIError } from '@/types/Error';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

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

    // 쿠키에서 리프레시 토큰 가져오기
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 입력 validation
    if (!refreshToken) {
      throw APIError.unauthorized('리프레시 토큰이 없습니다. 다시 로그인해주세요.');
    }

    // 외부 API 호출
    const authData = await safeFetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    // 새로운 액세스 토큰 반환 및 리프레시 토큰 쿠키 갱신
    const response = NextResponse.json({
      success: true,
      message: '토큰이 갱신되었습니다.',
      data: {
        accessToken: authData.accessToken,
        user: authData.user,
      },
    });

    // 새로운 리프레시 토큰이 있으면 쿠키 갱신
    if (authData.refreshToken) {
      response.cookies.set('refreshToken', authData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7일
        path: '/',
      });
    }

    return response;
  } catch (error) {
    console.error('토큰 갱신 API 오류:', error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '토큰 갱신에 실패했습니다.'
    );
  }
}
