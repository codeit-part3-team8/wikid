import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

export async function GET(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') ?? '';

    const res = await fetch(`${API_BASE_URL}/${path}`);
    const data = await res.json();
    return createSuccessResponse(data, '프록시 GET 요청 성공');
  } catch (error) {
    console.error(error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '프록시 요청에 실패했습니다'
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') ?? '';

    const res = await fetch(`${API_BASE_URL}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return createSuccessResponse(data, '프록시 POST 요청 성공', 201);
  } catch (error) {
    console.error(error);
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '프록시 POST 요청에 실패했습니다'
    );
  }
}
