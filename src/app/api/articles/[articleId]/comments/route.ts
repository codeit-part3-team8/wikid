import { NextResponse, NextRequest } from 'next/server';
import { handlerServerError } from '@/utils/handlerServerError';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { parseArticleId } from '../route';

type CommentsParams = {
  articleId: string;
};

export async function GET(
  request: NextRequest,
  context: { params: CommentsParams | Promise<CommentsParams> }
) {
  const { articleId } = await context.params;
  const id = parseArticleId(articleId);

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit')) || 10;
  const cursor = Number(searchParams.get('cursor')) || 0;
  try {
    const data = await safeFetch(`${API.ARTICLES}${id}/comments?limit=${limit}&cursor=${cursor}`);

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
    const id = parseArticleId(articleId);

    const body = await request.json();
    const data = await safeFetch(`${API.ARTICLES}${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    return NextResponse.json(data);
  } catch (err) {
    return handlerServerError(err, 'Failed to post comments');
  }
}
