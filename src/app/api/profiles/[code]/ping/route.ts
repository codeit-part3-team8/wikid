import { NextRequest, NextResponse } from 'next/server';

interface PingResponse {
  registeredAt: string;
  userId: number;
}

const ACCESS_TOKEN = process.env.WIKID_ACCESS_TOKEN || '';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const response = await fetch(`${API_BASE_URL}profiles/${code}/ping`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      return NextResponse.json({ userId: data.userId }, { status: 200 });
    } else if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    } else {
      return NextResponse.json(
        { error: '편집 상태 확인에 실패했습니다' },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error('error:', error);
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const body = await request.json();

    const apiUrl = `${API_BASE_URL}profiles/${code}/ping`;
    const requestBody = JSON.stringify(body);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 400) {
        return NextResponse.json({ error: '잘못된 답입니다.' }, { status: 400 });
      }
      throw new Error(`API 호출 실패: ${response.status}, 응답: ${errorText}`);
    }

    const data: PingResponse = await response.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
        success: false,
      },
      { status: 500 }
    );
  }
}
