import { NextRequest, NextResponse } from 'next/server';
import { API } from '@/constants/api';
import { handlerServerError } from '@/utils/handlerServerError';
import { safeFetch } from '@/utils/safeFetch';

export type Params = {
  code: string;
};

const ACCESS_TOKEN = process.env.WIKID_ACCESS_TOKEN || '';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(_request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { code } = await params;

    const profile = await safeFetch(`${API.PROFILE}${code}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json({
      message: `코드 ${code}의 프로필 정보를 조회했습니다`,
      data: profile,
    });
  } catch (err) {
    return handlerServerError(err, '프로필 조회에 실패했습니다');
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const { code } = await params;

    const contentType = request.headers.get('content-type');
    let body: Record<string, string | File>;

    if (contentType?.startsWith('multipart/form-data')) {
      const formData = await request.formData();
      body = {} as Record<string, string>;

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          body[key] = value.name || '';
        } else {
          body[key] = value.toString();
        }
      }
    } else {
      body = await request.json();
    }

    const apiUrl = `${API_BASE_URL}profiles/${code}`;
    const requestBody = JSON.stringify(body);

    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
        requestData: Object.keys(body),
      });
      throw new Error(`프로필 수정 실패: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const updatedProfile = await response.json();

    return NextResponse.json({
      message: '프로필이 성공적으로 업데이트되었습니다',
      data: updatedProfile,
    });
  } catch (err) {
    return handlerServerError(err, '프로필 업데이트에 실패했습니다');
  }
}
