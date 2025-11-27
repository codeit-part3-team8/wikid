import { NextRequest, NextResponse } from 'next/server';
import { API } from '@/constants/api';
import { handlerServerError } from '@/utils/handlerServerError';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') ?? '';

  try {
    const res = await fetch(`${API.BASE}/${path}`);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return handlerServerError(err, 'Failed to fetch');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // 클라이언트가 보낸 body 파싱
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path') ?? '';

    const res = await fetch(`${API.BASE}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return handlerServerError(err, 'Failed to post');
  }
}
