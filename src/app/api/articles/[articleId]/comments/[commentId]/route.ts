import { NextResponse, NextRequest } from 'next/server';
import { handlerServerError } from '@/utils/handlerServerError';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { parseArticleId } from '../../route';

type CommentIdParams = { commentId: string };

export async function PATCH(
  request: NextRequest,
  context: { params: CommentIdParams | Promise<CommentIdParams> }
) {
  try {
    const { commentId } = await context.params;
    const id = parseArticleId(commentId);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const data = await safeFetch(`${API.COMMENT}${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: authHeader },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to patch comment');
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: CommentIdParams | Promise<CommentIdParams> }
) {
  try {
    const { commentId } = await context.params;
    const id = parseArticleId(commentId);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.COMMENT}${id}`, {
      method: 'DELETE',
      headers: { Authorization: authHeader },
    });

    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to delete comment');
  }
}
