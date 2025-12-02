import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';
import { parseArticleId } from '../route';

type CommentsParams = {
  articleId: string;
};

export async function GET(
  request: NextRequest,
  context: { params: CommentsParams | Promise<CommentsParams> }
) {
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

    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 10;
    const cursor = Number(searchParams.get('cursor')) || 0;

    const data = await safeFetch(
      `${API_BASE_URL}/articles/${id}/comments?limit=${limit}&cursor=${cursor}`,
      {
        headers: { Authorization: authToken },
      }
    );

    return createSuccessResponse(data, '댓글 목록 조회 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '댓글 조회에 실패했습니다'
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: CommentsParams | Promise<CommentsParams> }
) {
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

    const body = await request.json();
    const data = await safeFetch(`${API_BASE_URL}/articles/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: authToken },
      body: JSON.stringify(body),
    });

    return createSuccessResponse(data, '댓글 작성 성공', 201);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '댓글 작성에 실패했습니다'
    );
  }
}
