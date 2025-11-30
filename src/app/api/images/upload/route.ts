import { NextRequest } from 'next/server';
import { LIMITS } from '@/constants/validation';
import { CONFIG } from '@/constants/config';

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

    const apiUrl = `${CONFIG.API_BASE_URL}images/upload`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONFIG.ACCESS_TOKEN}`,
      },
      body: uploadFormData,
    });

    if (!response.ok) {
      throw new Error(`이미지 업로드 실패: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    return createSuccessResponse({ url: result.url }, '이미지 업로드 성공');
  } catch (error) {
    return createErrorResponse(
      error instanceof Error ? error : String(error),
      '이미지 업로드 중 오류가 발생했습니다.'
    );
  }
}
