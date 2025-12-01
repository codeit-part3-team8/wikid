import { API } from '@/constants/api';

// 회원가입 요청 타입
export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// 로그인 요청 타입
export interface SignInRequest {
  email: string;
  password: string;
}

// 인증 응답 타입
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

// 에러 응답 타입
export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

/**
 * 회원가입 API
 */
export const signUp = async (data: SignUpRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API.BASE}/auth/signUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || '회원가입에 실패했습니다.');
  }

  return response.json();
};

/**
 * 로그인 API
 */
export const signIn = async (data: SignInRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API.BASE}/auth/signIn`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const text = await response.text(); // 먼저 텍스트로 받아서
  try {
    const json: AuthResponse | ErrorResponse = JSON.parse(text);

    if (!response.ok) {
      throw new Error((json as ErrorResponse).message || '로그인에 실패했습니다.');
    }

    return json as AuthResponse;
  } catch {
    // JSON이 아니면 HTML 등 에러 페이지를 받았다는 의미
    throw new Error(`서버 응답 오류: ${text}`);
  }
};

/**
 * 토큰 새로고침 API
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${API.BASE}/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || '토큰 갱신에 실패했습니다.');
  }

  return response.json();
};
