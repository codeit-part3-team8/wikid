/**
 * 토큰 저장/관리 유틸리티
 */

export const TOKEN_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PROFILE: 'userProfile',
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
 * 리프레시 토큰 저장
 */
export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
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
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN);
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
    localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEYS.USER_PROFILE);
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
 */
export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('리프레시 토큰이 없습니다.');
    }

    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      throw new Error('토큰 갱신에 실패했습니다.');
    }

    const result = await response.json();
    const { accessToken, refreshToken: newRefreshToken } = result.data;

    // 새로운 토큰들 저장
    setAccessToken(accessToken);
    if (newRefreshToken) {
      setRefreshToken(newRefreshToken);
    }

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
