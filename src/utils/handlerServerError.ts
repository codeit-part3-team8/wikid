import { NextResponse } from 'next/server';

export function handlerServerError(err: unknown, msg: string) {
  if (err instanceof Error) {
    console.error(err.message);
    return NextResponse.json({ error: msg, message: err.message }, { status: 500 });
  } else {
    console.error(err);
    return NextResponse.json({ error: msg, message: 'Unknown error' }, { status: 500 });
  }
}
