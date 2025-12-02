import { NextRequest } from 'next/server';
import { API_BASE_URL } from '@/constants/api';
import { BaseParams, PingResponse, PingRequest } from '@/types/Api';
import { APIError } from '@/types/Error';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

export async function GET(_request: NextRequest, { params }: { params: Promise<BaseParams> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const { code } = await params;

    const apiUrl = `${API_BASE_URL}/profiles/${code}/ping`;
    console.log('API 요청 URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('외부 API 응답 상태:', response.status);

    if (response.status === 200) {
      let data: Partial<PingResponse>;
      try {
        data = await response.json();
      } catch {
        console.error('GET ping 응답 JSON 파싱 실패');
        return createErrorResponse(APIError.internalServerError('서버 응답을 처리할 수 없습니다.'));
      }
      const pingResponse: PingResponse = {
        userId: data.userId,
        registeredAt: data.registeredAt,
        isEditing: Boolean(data.userId), // 누군가 편집 중 (본인 포함)
      };
      return createSuccessResponse(pingResponse, '편집 상태 확인 성공');
    } else if (response.status === 204) {
      const pingResponse: PingResponse = {
        isEditing: false,
      };
      return createSuccessResponse(pingResponse, '편집 상태 확인 성공');
    } else if (response.status === 401) {
      console.log('외부 API에서 인증 필요 응답');
      // 인증 오류 시 기본값 반환
      const pingResponse: PingResponse = {
        isEditing: false,
      };
      return createSuccessResponse(pingResponse, '편집 상태 확인 성공 (인증 없음)');
    } else if (response.status === 404) {
      console.log('외부 API에서 프로필을 찾을 수 없음 - 기본값 반환');
      // 프로필이 없으면 편집 중이 아닌 것으로 간주
      const pingResponse: PingResponse = {
        isEditing: false,
      };
      return createSuccessResponse(pingResponse, '편집 상태 확인 성공 (프로필 없음)');
    } else {
      const errorText = await response.text();
      console.log('외부 API 에러 응답:', response.status, errorText);
      throw new Error(`외부 API 에러: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '서버 내부 오류가 발생했습니다'
    );
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<BaseParams> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: API_BASE_URL });

    const authToken = request.headers.get('authorization');
    if (!authToken) {
      return createErrorResponse(new Error('인증 토큰이 필요합니다'), '인증이 필요한 요청입니다');
    }

    const { code } = await params;
    const body = (await request.json()) as PingRequest;

    const apiUrl = `${API_BASE_URL}/profiles/${code}/ping`;
    console.log('POST 어피 요청 URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(body),
    });

    console.log('POST 외부 API 응답 상태:', response.status);

    if (response.status === 401) {
      console.log('POST 외부 API에서 토큰 만료/인증 실패 응답');
      const errorText = await response.text();
      console.log('POST 401 에러 응답:', errorText);
      return createErrorResponse(
        APIError.unauthorized('인증이 만료되었습니다. 다시 로그인해 주세요.')
      );
    } else if (response.status === 400) {
      const errorText = await response.text();
      console.log('POST 400 에러 응답:', errorText);
      return createErrorResponse(APIError.badRequest('잘못된 답입니다.'));
    } else if (response.status === 404) {
      console.log('POST 외부 API에서 프로필을 찾을 수 없음');
      const errorText = await response.text();
      console.log('POST 404 에러 응답:', errorText);
      return createErrorResponse(APIError.notFound('위키를 찾을 수 없습니다.'));
    } else if (!response.ok) {
      const errorText = await response.text();
      console.log('POST 외부 API 에러 응답:', response.status, errorText);
      return createErrorResponse(
        APIError.fromResponse(response.status, `API 호출 실패: ${response.status} - ${errorText}`)
      );
    }

    let data: Partial<PingResponse>;
    try {
      data = await response.json();
    } catch {
      console.error('POST ping 응답 JSON 파싱 실패');
      return createErrorResponse(APIError.internalServerError('서버 응답을 처리할 수 없습니다.'));
    }
    const pingResponse: PingResponse = {
      userId: data.userId,
      registeredAt: data.registeredAt,
      isEditing: Boolean(data.userId),
    };
    return createSuccessResponse(pingResponse, '편집 권한 확인 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '서버 오류가 발생했습니다'
    );
  }
}
