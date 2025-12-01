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

export async function GET(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const article = await safeFetch(`${API.ARTICLES}${articleId}`, {
      headers: { Authorization: authHeader },
    });

    return NextResponse.json({
      message: `ArticleID: ${articleId}`,
      data: article,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to get article');
  }
}

export async function PATCH(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const body = await request.json();
    const { image, title, content } = body;
    const payload = { image, title, content };

    const data = await safeFetch(`${API.ARTICLES}${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      message: `ArticleID: ${articleId} updated`,
      data: data,
    });
  } catch (err: unknown) {
    return handlerServerError(err, 'Failed to patch article');
  }
}

export async function DELETE(request: NextRequest, context: { params: Params | Promise<Params> }) {
  try {
    const { articleId } = await context.params;

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.ARTICLES}${articleId}`, {
      method: 'DELETE',
      headers: { Authorization: authHeader },
    });

    return NextResponse.json({
      message: `ArticleID: ${articleId} deleted`,
      data: data,
    });
  } catch (err) {
    return handlerServerError(err, 'Failed to delete article');
  }
}
