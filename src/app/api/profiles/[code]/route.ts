import { NextRequest } from 'next/server';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { CONFIG } from '@/constants/config';
import { BaseParams, APIProfileData, ProfileUpdateRequest } from '@/types/Api';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

export async function GET(_request: NextRequest, { params }: { params: Promise<BaseParams> }) {
  try {
    validateEnvironmentVariables({ name: 'ACCESS_TOKEN', value: CONFIG.ACCESS_TOKEN });

    const { code } = await params;

    const profile = await safeFetch(`${API.PROFILE}${code}`, {
      headers: {
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
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

    const updatedProfile = await safeFetch(`${CONFIG.API_BASE_URL}profiles/${code}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    return createSuccessResponse<APIProfileData>(
      updatedProfile,
      '프로필이 성공적으로 업데이트되었습니다'
    );
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '프로필 업데이트에 실패했습니다'
    );
  }
}
