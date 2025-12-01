import { NextRequest, NextResponse } from 'next/server';
import { API } from '@/constants/api';
import { handlerServerError } from '@/utils/handlerServerError';
import { safeFetch } from '@/utils/safeFetch';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.NOTIFICATION}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    return NextResponse.json({
      message: 'get notifications',
      data: data,
    });
  } catch (err: unknown) {
    return handlerServerError(err, 'Failed to get notifications');
  }
}
