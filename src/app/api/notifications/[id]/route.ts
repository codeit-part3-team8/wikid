import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { id } = await params;

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const data = await safeFetch(`${API_BASE_URL}/notifications/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
    });

    return createSuccessResponse(data, '알림 삭제 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '알림 삭제에 실패했습니다'
    );
  }
}
