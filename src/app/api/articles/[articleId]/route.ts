import { NextResponse, NextRequest } from 'next/server';
import { handlerServerError } from '@/utils/handlerServerError';
import { API } from '@/constants/api';
import { safeFetch } from '@/utils/safeFetch';

export type Params = {
  articleId: string;
};

// articleId 안전하게 number로 전환
export function parseArticleId(articleId: string) {
  const id = parseInt(articleId, 10);
  if (isNaN(id) || id <= 0) {
    throw new Error('Invalid articleId');
  }
  return id;
}

export async function GET(_request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);
    const article = await safeFetch(`${API.ARTICLES}${id}`);

    return NextResponse.json({
      message: `ArticleID: ${id}`,
      data: article,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to get article');
  }
}

export async function PATCH(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const body = await request.json();
    const { image, title, content } = body;
    const payload = { image, title, content };

    const data = await safeFetch(`${API.ARTICLES}${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return NextResponse.json({
      message: `ArticleID: ${id} updated`,
      data: data,
    });
  } catch (err: unknown) {
    return handlerServerError(err, 'Failed to patch article');
  }
}

export async function DELETE(_request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;
    const id = parseArticleId(articleId);

    const data = await safeFetch(`${API.ARTICLES}${id}`, { method: 'DELETE' });

    return NextResponse.json({
      message: `ArticleID: ${id} deleted`,
      data: data,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to delete article');
  }
}
