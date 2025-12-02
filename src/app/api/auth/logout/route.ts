import { NextResponse } from 'next/server';

/**
 * 로그아웃 API
 * HttpOnly 쿠키에 저장된 리프레시 토큰을 삭제합니다.
 */
export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: '로그아웃되었습니다.',
    });

    // 리프레시 토큰 쿠키 삭제
    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // 즉시 만료
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('로그아웃 API 오류:', error);
    return NextResponse.json(
      {
        success: false,
        message: '로그아웃에 실패했습니다.',
      },
      { status: 500 }
    );
  }
}
