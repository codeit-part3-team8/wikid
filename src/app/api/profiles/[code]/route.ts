import { NextRequest } from 'next/server';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { CONFIG } from '@/constants/config';
import { BaseParams, APIProfileData } from '@/types/Api';
import { APIError } from '@/types/Error';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

export async function GET(_request: NextRequest, { params }: { params: Promise<BaseParams> }) {
  try {
    validateEnvironmentVariables({ name: 'API_BASE_URL', value: CONFIG.API_BASE_URL });

    const { code } = await params;

    const profile = await safeFetch(`${API.PROFILE}${code}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return createSuccessResponse<APIProfileData>(profile, '프로필 정보 조회 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '프로필 조회에 실패했습니다'
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<BaseParams> }) {
  try {
    validateEnvironmentVariables(
      { name: 'API_BASE_URL', value: CONFIG.API_BASE_URL },
      { name: 'ACCESS_TOKEN', value: CONFIG.ACCESS_TOKEN }
    );

    const { code } = await params;
    const body = await request.json();

    if (!body.securityAnswer || !body.securityQuestion) {
      return createErrorResponse(
        new Error('보안 질문과 답변이 필요합니다'),
        '필수 필드가 누락되었습니다'
      );
    }

    const apiUrl = `${CONFIG.API_BASE_URL}/profiles/${code}`;
    console.log('PATCH API 요청 URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    console.log('PATCH 외부 API 응답 상태:', response.status);

    if (response.status === 401) {
      console.log('PATCH 외부 API에서 토큰 만료/인증 실패 응답');
      const errorText = await response.text();
      console.log('PATCH 401 에러 응답:', errorText);
      return createErrorResponse(
        APIError.unauthorized('인증이 만료되었습니다. 다시 로그인해 주세요.')
      );
    } else if (response.status === 400) {
      const errorText = await response.text();
      console.log('PATCH 400 에러 응답:', errorText);
      return createErrorResponse(APIError.badRequest('잘못된 요청입니다.'));
    } else if (response.status === 404) {
      console.log('PATCH 외부 API에서 프로필을 찾을 수 없음');
      const errorText = await response.text();
      console.log('PATCH 404 에러 응답:', errorText);
      return createErrorResponse(APIError.notFound('프로필을 찾을 수 없습니다.'));
    } else if (!response.ok) {
      const errorText = await response.text();
      console.log('PATCH 외부 API 에러 응답:', response.status, errorText);
      return createErrorResponse(
        APIError.fromResponse(response.status, `API 호출 실패: ${response.status} - ${errorText}`)
      );
    }

    let updatedProfile: Partial<APIProfileData>;
    try {
      updatedProfile = await response.json();
    } catch {
      // JSON 파싱 실패 시 기본값 사용
      console.warn('PATCH 응답 JSON 파싱 실패, 기본값 사용');
      updatedProfile = { name: '', content: '' };
    }

    return createSuccessResponse<APIProfileData>(
      updatedProfile as APIProfileData,
      '프로필이 성공적으로 업데이트되었습니다'
    );
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '프로필 업데이트에 실패했습니다'
    );
  }
}
