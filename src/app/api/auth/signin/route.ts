import { NextRequest, NextResponse } from 'next/server';
import { safeFetch } from '@/utils/safeFetch';
import { API_BASE_URL } from '@/constants/api';
import { APIError } from '@/types/Error';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

// 로그인 요청 타입
interface SignInRequest {
  email: string;
  password: string;
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

    const body: SignInRequest = await request.json();

    // 입력 validation
    if (!body.email || !body.password) {
      throw APIError.badRequest('이메일과 비밀번호를 입력해주세요.');
    }

    // 외부 API 호출
    const authData = await safeFetch(`${API_BASE_URL}/auth/signIn`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });

    // 리프레시 토큰을 HttpOnly 쿠키로 설정
    const response = NextResponse.json({
      success: true,
      message: '로그인이 완료되었습니다.',
      data: {
        accessToken: authData.accessToken,
        user: authData.user,
      },
    });

    // HttpOnly, Secure 쿠키로 리프레시 토큰 설정
    response.cookies.set('refreshToken', authData.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('로그인 API 오류:', error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '로그인에 실패했습니다.'
    );
  }
}
