import { NextResponse, NextRequest } from 'next/server';
import { handlerServerError } from '@/utils/handlerServerError';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';

type CommentsParams = {
  articleId: string;
};

// commentId 안전하게 number로 전환
export function parseCommentId(articleId: string) {
  const id = parseInt(articleId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('Invalid commentId');
  }
  return id;
}

export async function GET(
  request: NextRequest,
  context: { params: CommentsParams | Promise<CommentsParams> }
) {
  const { articleId } = await context.params;
  const id = parseCommentId(articleId);

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 10;
  const cursor = Number(searchParams.get('cursor')) || 0;
  try {
    const res = await safeFetch(`${API.ARTICLES}${id}/comments?limit=${limit}&cursor=${cursor}`);
    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to fetch comments');
  }
}

export async function POST(
  request: NextRequest,
  context: { params: CommentsParams | Promise<CommentsParams> }
) {
  try {
    const { articleId } = await context.params;
    const id = parseCommentId(articleId);

    const body = await request.json();
    const res = await safeFetch(`${API.ARTICLES}${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to post comments');
  }
}
