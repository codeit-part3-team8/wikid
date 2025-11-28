import { NextResponse } from 'next/server';

export function handlerServerError(err: unknown, msg: string) {
  if (err instanceof Error) {
    console.error('[ServerError]', err.message); // 서버 콘솔에 출력되는 에러
    return NextResponse.json({ error: msg }, { status: 500 }); // 클라이언트에 출력되는 에러
  } else {
    console.error('[UnknownError]', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
