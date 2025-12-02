import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';
import { Params, parseArticleId } from '../route';

export async function POST(_request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const data = await safeFetch(`${API_BASE_URL}/articles/${id}/like`, { method: 'POST' });
    return createSuccessResponse(data, `게시글 ${id} 좋아요 성공`, 201);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '좋아요 등록에 실패했습니다'
    );
  }
}

export async function DELETE(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const data = await safeFetch(`${API_BASE_URL}/articles/${id}/like`, {
      method: 'DELETE',
      headers: { Authorization: authToken },
    });
    return createSuccessResponse(data, `게시글 ${id} 좋아요 취소 성공`);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '좋아요 취소에 실패했습니다'
    );
  }
}
