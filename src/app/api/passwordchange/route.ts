import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || '';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get('authorization');

    const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/users/me/password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader || '',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: '비밀번호 변경에 실패했습니다.' }, { status: 500 });
  }
}
