import { NextRequest, NextResponse } from 'next/server';
import { API } from '@/constants/api';
import { handlerServerError } from '@/utils/handlerServerError';
import { safeFetch } from '@/utils/safeFetch';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.NOTIFICATION}${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    return NextResponse.json({
      message: 'delete notification',
      data: data,
    });
  } catch (err: unknown) {
    return handlerServerError(err, 'Failed to delete notification');
  }
}
