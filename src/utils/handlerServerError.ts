import { NextResponse } from 'next/server';

export function handlerServerError(err: Error | string, msg: string) {
  if (err instanceof Error) {
    console.error('[ServerError]', err.message);
    return NextResponse.json({ error: msg }, { status: 500 });
  } else {
    console.error('[StringError]', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
