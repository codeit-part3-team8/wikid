/**
 * 토큰 저장/관리 유틸리티
 *
 * 보안 정책:
 * - 액세스 토큰: localStorage에 저장 (클라이언트에서 API 요청 시 사용)
 * - 리프레시 토큰: HttpOnly 쿠키에 저장 (XSS 공격 방지)
 */

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken', // 레거시 호환용 (사용 중단 예정)
  USER_PROFILE: 'userProfile',
} as const;

export const COOKIE_KEYS = {
  REFRESH_TOKEN: 'refreshToken',
} as const;

export interface UserProfile {
  userId: number;
  code: string;
  name?: string;
}

/**
 * 액세스 토큰 저장
 */
export const setAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
  }
};

/**
 * 리프레시 토큰 저장 (쿠키에 저장)
 * HttpOnly 쿠키 설정은 서버 측(API 라우트)에서 처리됩니다.
 */
export const setRefreshToken = (token: string): void => {
  // 클라이언트에서는 쿠키 설정을 위해 API 라우트로 전달
  // 실제 저장은 /api/auth/signin 또는 /api/auth/refresh에서 처리
  if (typeof window !== 'undefined') {
    // 레거시 localStorage 제거
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  }
};

/**
 * 액세스 토큰 가져오기
 */
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  }
  return null;
};

/**
 * 리프레시 토큰 가져오기
 * 쿠키에서 가져오는 것은 서버 측에서만 가능 (HttpOnly)
 */
export const getRefreshToken = (): string | null => {
  // 클라이언트에서는 HttpOnly 쿠키에 접근 불가
  // 서버 측 API 라우트에서만 사용 가능
  if (typeof window !== 'undefined') {
    // 레거시 localStorage에서 제거
    const legacyToken = localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
    if (legacyToken) {
      localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    }
  }
  return null;
};

/**
 * 사용자 프로필 저장
 */
export const setUserProfile = (profile: UserProfile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEYS.USER_PROFILE, JSON.stringify(profile));
  }
};

/**
 * 사용자 프로필 가져오기
 */
export const getUserProfile = (): UserProfile | null => {
  if (typeof window !== 'undefined') {
    const profile = localStorage.getItem(TOKEN_KEYS.USER_PROFILE);
    if (profile) {
      try {
        return JSON.parse(profile);
      } catch (error) {
        console.error('UserProfile 파싱 오류:', error);
        localStorage.removeItem(TOKEN_KEYS.USER_PROFILE);
      }
    }
  }
  return null;
};

/**
 * 사용자 프로필 삭제
 */
export const clearUserProfile = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEYS.USER_PROFILE);
  }
};

/**
 * 모든 토큰 및 사용자 데이터 삭제 (로그아웃)
 */
export const clearTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN); // 레거시 제거
    localStorage.removeItem(TOKEN_KEYS.USER_PROFILE);

    // 쿠키에 저장된 리프레시 토큰 삭제는 API 라우트를 통해 처리
    fetch('/api/auth/logout', { method: 'POST' }).catch((error) => {
      console.warn('로그아웃 API 호출 실패 (클라이언트 토큰은 제거됨):', error);
    });
  }
};

/**
 * 로그인 여부 확인
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

/**
 * 리프레시 토큰으로 액세스 토큰 갱신
 * 리프레시 토큰은 HttpOnly 쿠키에 저장되어 있으므로 자동으로 서버에 전송됨
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    // 리프레시 토큰은 HttpOnly 쿠키에 있으므로 자동으로 서버에 전송됨
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 쿠키 포함
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const result = await response.json();
    const { accessToken } = result.data;

    // 새로운 액세스 토큰만 저장 (리프레시 토큰은 서버가 쿠키로 설정)
    setAccessToken(accessToken);

    return true;
  } catch (error) {
    console.error('토큰 갱신 실패:', error);
    // 토큰 갱신 실패 시 모든 토큰 삭제
    clearTokens();
    return false;
  }
};

/**
 * 인증이 필요한 API 요청을 위한 fetch wrapper
 * 401 에러 시 자동으로 토큰을 갱신하고 재시도
 */
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    throw new Error('액세스 토큰이 없습니다. 로그인이 필요합니다.');
  }

  // Authorization 헤더 추가
  const authOptions: RequestInit = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await fetch(url, authOptions);

    // 401 Unauthorized 에러 시 토큰 갱신 후 재시도
    if (response.status === 401) {
      const refreshSuccess = await refreshAccessToken();

      if (!refreshSuccess) {
        throw new Error('토큰 갱신에 실패했습니다. 다시 로그인해주세요.');
      }

      // 새로운 액세스 토큰으로 재시도
      const newAccessToken = getAccessToken();
      const retryOptions: RequestInit = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      };

      return fetch(url, retryOptions);
    }

    return response;
  } catch (error) {
    console.error('인증된 요청 실패:', error);
    throw error;
  }
};
