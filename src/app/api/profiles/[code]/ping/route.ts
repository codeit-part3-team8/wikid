import { NextRequest } from 'next/server';
import { CONFIG } from '@/constants/config';
import { BaseParams, PingResponse, PingRequest } from '@/types/Api';
import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
} from '@/utils/apiHelpers';

export async function GET(_request: NextRequest, { params }: { params: Promise<BaseParams> }) {
  try {
    validateEnvironmentVariables(
      { name: 'API_BASE_URL', value: CONFIG.API_BASE_URL },
      { name: 'ACCESS_TOKEN', value: CONFIG.ACCESS_TOKEN }
    );

    const { code } = await params;

    const response = await fetch(`${CONFIG.API_BASE_URL}profiles/${code}/ping`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      let data;
      try {
        data = await response.json();
      } catch {
        // JSON 파싱 실패 시 기본값 사용
        data = {};
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
    } else {
      throw new Error('편집 상태 확인에 실패했습니다');
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
    validateEnvironmentVariables(
      { name: 'API_BASE_URL', value: CONFIG.API_BASE_URL },
      { name: 'ACCESS_TOKEN', value: CONFIG.ACCESS_TOKEN }
    );

    const { code } = await params;
    const body = (await request.json()) as PingRequest;

    const apiUrl = `${CONFIG.API_BASE_URL}profiles/${code}/ping`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 400) {
        throw new Error('잘못된 답입니다.');
      }
      throw new Error(`API 호출 실패: ${response.status}, 응답: ${errorText}`);
    }

    let data;
    try {
      data = await response.json();
    } catch {
      // JSON 파싱 실패 시 기본값 사용
      data = {};
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
