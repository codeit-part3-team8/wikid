import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';
import { APIError } from '@/types/Error';

export async function POST(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const body = await request.json();
    const { image, title, content } = body;

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const payload = {
      image,
      title,
      content,
    };

    const data = await safeFetch(`${API_BASE_URL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(payload),
    });

    return createSuccessResponse(data, '게시글 작성 성공', 201);
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '게시글 작성에 실패했습니다'
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { searchParams } = new URL(request.url);

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(
        APIError.unauthorized('인증이 필요합니다'),
        '인증이 필요한 요청입니다'
      );
    }

    const page = searchParams.get('page') ?? '1';
    const pageSize = searchParams.get('pageSize') ?? '10';
    const orderBy = searchParams.get('orderBy') ?? 'recent';
    const keyword = searchParams.get('keyword') ?? '';

    const query = new URLSearchParams({
      page,
      pageSize,
      orderBy,
    });
    if (keyword) query.append('keyword', keyword);

    const data = await safeFetch(`${API_BASE_URL}/articles?${query.toString()}`, {
      headers: { Authorization: authToken },
    });

    return createSuccessResponse(data, '게시글 목록 조회 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '게시글 목록 조회에 실패했습니다'
    );
  }
}
