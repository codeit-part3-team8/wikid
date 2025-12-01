import { NextRequest, NextResponse } from 'next/server';
import { LIMITS } from '@/constants/validation';
// import { APIError } from '@/types/Error';

import { createErrorResponse, createSuccessResponse, validateFileUpload } from '@/utils/apiHelpers';
import { API } from '@/constants/api';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = validateFileUpload(
      formData.get('image') as File | null,
      LIMITS.ALLOWED_IMAGE_TYPES,
      LIMITS.IMAGE_SIZE
    );

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // 외부 API로 이미지 업로드
    const uploadFormData = new FormData();
    uploadFormData.append('image', imageFile);

    const response = await fetch(API.IMAGE, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
      },
      body: uploadFormData,
    });

    if (!response.ok) {
      throw new Error(`이미지 업로드 실패: ${response.status} ${response.statusText}`);
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
