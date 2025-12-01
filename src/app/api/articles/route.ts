import { NextRequest, NextResponse } from 'next/server';
import { API } from '@/constants/api';
import { handlerServerError } from '@/utils/handlerServerError';
import { safeFetch } from '@/utils/safeFetch';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, title, content } = body;
    const payload = {
      image,
      title,
      content,
    };

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.ARTICLES}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      message: 'post article',
      data: data,
    });
  } catch (err: unknown) {
    return handlerServerError(err, 'Failed to post articles');
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const page = searchParams.get('page') ?? '1'; // 페이지 번호
    const pageSize = searchParams.get('pageSize') ?? '10'; // 페이지 당 게시글 수
    const orderBy = searchParams.get('orderBy') ?? 'recent'; // 정렬 기준
    const keyword = searchParams.get('keyword') ?? ''; // 검색 키워드

    const query = new URLSearchParams({
      page,
      pageSize,
      orderBy,
    });
    if (keyword) query.append('keyword', keyword);

    const authHeader = request.headers.get('authorization');
    if (!authHeader) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const data = await safeFetch(`${API.ARTICLES}?${query.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
    });

    return NextResponse.json({
      message: 'get article',
      data: data,
    });
  } catch (err: unknown) {
    return handlerServerError(err, 'Failed to get articles');
  }
}
