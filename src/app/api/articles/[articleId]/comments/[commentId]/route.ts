import { NextResponse, NextRequest } from 'next/server';
import { handlerServerError } from '@/utils/handlerServerError';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';

type CommendIdParams = { commentId: string };

export async function PATCH(
  request: NextRequest,
  context: { params: CommendIdParams | Promise<CommendIdParams> }
) {
  try {
    const { commentId } = await context.params;

    const body = await request.json();
    const res = await safeFetch(`${API.COMMENT}${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to patch comment');
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: CommendIdParams | Promise<CommendIdParams> }
) {
  try {
    const { commentId } = await context.params;

    const res = await safeFetch(`${API.COMMENT}${commentId}`, {
      method: 'DELETE',
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to delete comment');
  }
}
