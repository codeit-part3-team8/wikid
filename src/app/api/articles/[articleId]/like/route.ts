import { NextResponse, NextRequest } from 'next/server';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { handlerServerError } from '@/utils/handlerServerError';
import { Params, parseArticleId } from '../route';

export async function POST(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.ARTICLES}${id}/like/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });
    return NextResponse.json({
      message: `${id}/like posted`,
      data: data,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to post articleId/like');
  }
}

export async function DELETE(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.ARTICLES}${id}/like/`, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader,
      },
    });
    return NextResponse.json({
      message: `${id}/like deleted`,
      data: data,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to delete articleId/like');
  }
}
