import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

export async function PATCH(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const body = await request.json();
    const authToken = request.headers.get('authorization');

    if (!authToken) {
      return createErrorResponse(new Error('인증 토큰이 필요합니다'), '인증이 필요한 요청입니다');
    }

    await safeFetch(`${API_BASE_URL}/users/me/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(body),
    });

    return createSuccessResponse({ success: true }, '비밀번호 변경 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '비밀번호 변경에 실패했습니다'
    );
  }
}
