import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';

export type Params = {
  articleId: string;
};

// articleId 안전하게 number로 전환
export function parseArticleId(articleId: string) {
  const id = parseInt(articleId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('Invalid articleId');
  }
  return id;
}

export async function GET(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { articleId } = await context.params;

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const article = await safeFetch(`${API_BASE_URL}/articles/${articleId}`, {
      headers: { Authorization: authToken },
    });

    return createSuccessResponse(article, `게시글 ${articleId} 조회 성공`);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '게시글 조회에 실패했습니다'
    );
  }
}

export async function PATCH(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { articleId } = await context.params;

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const body = await request.json();
    const { image, title, content } = body;
    const payload = { image, title, content };

    const data = await safeFetch(`${API_BASE_URL}/articles/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(payload),
    });

    return createSuccessResponse(data, `게시글 ${articleId} 수정 성공`);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '게시글 수정에 실패했습니다'
    );
  }
}

export async function DELETE(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { articleId } = await context.params;

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const data = await safeFetch(`${API_BASE_URL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: { Authorization: authToken },
    });

    return createSuccessResponse(data, `게시글 ${articleId} 삭제 성공`);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '게시글 삭제에 실패했습니다'
    );
  }
}
