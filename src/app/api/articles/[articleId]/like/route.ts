import { NextResponse, NextRequest } from 'next/server';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';
import { handlerServerError } from '@/utils/handlerServerError';
import { Params, parseArticleId } from '../route';

export async function POST(_request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const data = await safeFetch(`${API.ARTICLES}${id}/like/`, { method: 'POST' });
    return NextResponse.json({
      message: `${id}/like posted`,
      data: data,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to post articleId/like');
  }
}

export async function DELETE(_request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const data = await safeFetch(`${API.ARTICLES}${id}/like/`, { method: 'DELETE' });
    return NextResponse.json({
      message: `${id}/like deleted`,
      data: data,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to delete articleId/like');
  }
}
