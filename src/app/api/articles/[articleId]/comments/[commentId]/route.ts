import { NextResponse, NextRequest } from 'next/server';
import { handlerServerError } from '@/utils/handlerServerError';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';

type CommentIdParams = { commentId: string };

export async function PATCH(
  request: NextRequest,
  context: { params: CommentIdParams | Promise<CommentIdParams> }
) {
  try {
    const { commentId } = await context.params;

    const body = await request.json();
    const data = await safeFetch(`${API.COMMENT}${commentId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to patch comment');
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: CommentIdParams | Promise<CommentIdParams> }
) {
  try {
    const { commentId } = await context.params;

    const data = await safeFetch(`${API.COMMENT}${commentId}`, {
      method: 'DELETE',
    });

    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to delete comment');
  }
}
