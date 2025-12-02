import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';
import { parseArticleId } from '../../route';

type CommentIdParams = { commentId: string };

export async function PATCH(
  request: NextRequest,
  context: { params: CommentIdParams | Promise<CommentIdParams> }
) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { commentId } = await context.params;
    const id = parseArticleId(commentId);

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const body = await request.json();
    const data = await safeFetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: authToken },
      body: JSON.stringify(body),
    });

    return createSuccessResponse(data, '댓글 수정 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '댓글 수정에 실패했습니다'
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: CommentIdParams | Promise<CommentIdParams> }
) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { commentId } = await context.params;
    const id = parseArticleId(commentId);

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const data = await safeFetch(`${API_BASE_URL}/comments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: authToken },
    });

    return createSuccessResponse(data, '댓글 삭제 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '댓글 삭제에 실패했습니다'
    );
  }
}
