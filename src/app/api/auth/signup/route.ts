import { NextRequest } from 'next/server';
import { safeFetch } from '@/utils/safeFetch';
import { API_BASE_URL } from '@/constants/api';
import { APIError } from '@/types/Error';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

// 회원가입 요청 타입
interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
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

    const body: SignUpRequest = await request.json();

    // 입력 validation
    if (!body.name || !body.email || !body.password || !body.passwordConfirmation) {
      throw APIError.badRequest('모든 필수 항목을 입력해주세요.');
    }

    if (body.password !== body.passwordConfirmation) {
      throw APIError.badRequest('비밀번호가 일치하지 않습니다.');
    }

    // 외부 API 호출
    const authData = await safeFetch(`${API_BASE_URL}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        password: body.password,
        passwordConfirmation: body.passwordConfirmation,
      }),
    });

    return createSuccessResponse<AuthResponse>(authData, '회원가입이 완료되었습니다.');
  } catch (error) {
    console.error('회원가입 API 오류:', error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '회원가입에 실패했습니다.'
    );
  }
}
