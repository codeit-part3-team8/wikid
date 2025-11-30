import { NextResponse } from 'next/server';

export function handlerServerError(err: unknown, msg: string) {
  if (err instanceof Error) {
    console.error('[ServerError]', err.message);
    return NextResponse.json({ error: msg }, { status: 500 });
  } else if (typeof err === 'string') {
    console.error('[StringError]', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  } else {
    console.error('[UnknownError]', err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
