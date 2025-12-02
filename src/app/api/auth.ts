// API 기본 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
const TEAM_ID = process.env.NEXT_PUBLIC_TEAM_ID || '';

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

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
  password: string; // 현재 비밀번호
  currentPassword: string; // 새 비밀번호
  passwordConfirmation: string;
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
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signUp`, {
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
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/signIn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || '로그인에 실패했습니다.');
  }

  return response.json();
};

/**
 * 토큰 새로고침 API
 */
export const refreshToken = async (refreshToken: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/auth/refresh-token`, {
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

/**
 * 비밀번호 변경 API
 */
export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const response = await fetch('/api/passwordchange', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || '비밀번호 변경에 실패했습니다.');
  }
};

// 위키 생성 요청 타입
export interface CreateProfileRequest {
  securityQuestion: string;
  securityAnswer: string;
}

// 위키 생성 응답 타입
export interface CreateProfileResponse {
  id: number;
  code: string;
  name: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  image: string;
  securityQuestion: string;
  updatedAt: string;
  registeredAt: string;
}

/**
 * 위키(프로필) 생성 API
 */
export const createProfile = async (data: CreateProfileRequest): Promise<CreateProfileResponse> => {
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const response = await fetch(`${API_BASE_URL}/${TEAM_ID}/profiles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || '위키 생성에 실패했습니다.');
  }

  return response.json();
};
