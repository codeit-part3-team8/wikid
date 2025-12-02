import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

/**
 * 위키(프로필) 생성 API
 * POST /api/profiles
 */
export async function POST(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const authToken = request.headers.get('authorization');

    if (!authToken) {
      return createErrorResponse(new Error('인증 토큰이 필요합니다'), '인증이 필요한 요청입니다');
    }

    const body = await request.json();

    const data = await safeFetch(`${API_BASE_URL}/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(body),
    });

    return createSuccessResponse(data, '위키 생성 성공', 201);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '위키 생성에 실패했습니다'
    );
  }
}
