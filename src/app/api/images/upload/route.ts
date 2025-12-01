import { NextRequest } from 'next/server';
import { LIMITS } from '@/constants/validation';
import { CONFIG } from '@/constants/config';
import { APIError } from '@/types/Error';

import {
  createErrorResponse,
  createSuccessResponse,
  validateEnvironmentVariables,
  validateFileUpload,
} from '@/utils/apiHelpers';

export async function POST(request: NextRequest) {
  try {
    validateEnvironmentVariables(
      { name: 'API_BASE_URL', value: CONFIG.API_BASE_URL },
      { name: 'ACCESS_TOKEN', value: CONFIG.ACCESS_TOKEN }
    );

    const formData = await request.formData();
    const imageFile = validateFileUpload(
      formData.get('image') as File | null,
      LIMITS.ALLOWED_IMAGE_TYPES,
      LIMITS.IMAGE_SIZE
    );

    // 외부 API로 이미지 업로드
    const uploadFormData = new FormData();
    uploadFormData.append('image', imageFile);

    const apiUrl = `${CONFIG.API_BASE_URL}/images/upload`;
    console.log('POST 이미지 업로드 API 요청 URL:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
      body: uploadFormData,
    });

    console.log('POST 이미지 업로드 외부 API 응답 상태:', response.status);

    if (response.status === 401) {
      console.log('POST 이미지 업로드 외부 API에서 토큰 만료/인증 실패 응답');
      const errorText = await response.text();
      console.log('POST 이미지 업로드 401 에러 응답:', errorText);
      return createErrorResponse(
        APIError.unauthorized('인증이 만료되었습니다. 다시 로그인해 주세요.')
      );
    } else if (response.status === 400) {
      const errorText = await response.text();
      console.log('POST 이미지 업로드 400 에러 응답:', errorText);
      return createErrorResponse(APIError.badRequest('잘못된 이미지 파일입니다.'));
    } else if (response.status === 413) {
      const errorText = await response.text();
      console.log('POST 이미지 업로드 413 에러 응답:', errorText);
      return createErrorResponse(APIError.payloadTooLarge('이미지 크기가 너무 폴니다.'));
    } else if (!response.ok) {
      const errorText = await response.text();
      console.log('POST 이미지 업로드 외부 API 에러 응답:', response.status, errorText);
      return createErrorResponse(
        APIError.fromResponse(
          response.status,
          `이미지 업로드 실패: ${response.status} - ${errorText}`
        )
      );
    }

    const result = await response.json();
    const imageUrl = result?.url || result?.data?.url;

    if (!imageUrl) {
      throw new Error('이미지 URL을 받지 못했습니다.');
    }

    return createSuccessResponse({ url: imageUrl }, '이미지 업로드 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '이미지 업로드 중 오류가 발생했습니다.'
    );
  }
}
