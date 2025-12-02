/**
 * 인증 토큰 자동 갱신 기능이 있는 fetch 래퍼
 *
 * 사용법:
 * ```ts
 * import { fetchWithAuth } from '@/utils/fetchWithAuth';
 *
 * const response = await fetchWithAuth('/api/endpoint', {
 *   method: 'POST',
 *   body: JSON.stringify(data),
 * });
 * ```
 */

import { getAccessToken, setAccessToken, clearTokens } from './auth';

interface FetchWithAuthOptions extends RequestInit {
  skipAuth?: boolean; // 인증 없이 요청하려면 true
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * 토큰 갱신 함수 (중복 호출 방지)
 */
async function refreshToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('토큰 갱신 실패');
      }

      const result = await response.json();
      const { accessToken } = result.data;

      setAccessToken(accessToken);
      return true;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      clearTokens();

      // 로그인 페이지로 리다이렉트
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }

      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * 인증이 포함된 fetch 요청
 * 401 에러 시 자동으로 토큰을 갱신하고 재시도
 */
export async function fetchWithAuth(
  url: string,
  options: FetchWithAuthOptions = {}
): Promise<Response> {
  const { skipAuth, ...fetchOptions } = options;

  // 인증 스킵 옵션이 있으면 일반 fetch 사용
  if (skipAuth) {
    return fetch(url, fetchOptions);
  }

  // 액세스 토큰 가져오기
  let accessToken = getAccessToken();

  // 토큰이 없으면 인증 없이 요청 (공개 API의 경우)
  if (!accessToken) {
    return fetch(url, fetchOptions);
  }

  // FormData 감지 (multipart/form-data는 브라우저가 자동 설정)
  const isFormData = fetchOptions.body instanceof FormData;

  // Authorization 헤더 추가
  const headers = {
    ...(fetchOptions.headers || {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    Authorization: `Bearer ${accessToken}`,
  };

  // 첫 번째 요청
  let response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  // 401 에러 시 토큰 갱신 후 재시도
  if (response.status === 401) {
    const refreshSuccess = await refreshToken();

    if (!refreshSuccess) {
      throw new Error('인증에 실패했습니다. 다시 로그인해주세요.');
    }

    // 갱신된 토큰으로 재시도
    accessToken = getAccessToken();
    if (!accessToken) {
      throw new Error('토큰 갱신 후에도 액세스 토큰이 없습니다.');
    }

    // FormData 감지 (재시도 시에도 동일하게 처리)
    const isFormDataRetry = fetchOptions.body instanceof FormData;

    const retryHeaders = {
      ...(fetchOptions.headers || {}),
      ...(isFormDataRetry ? {} : { 'Content-Type': 'application/json' }),
      Authorization: `Bearer ${accessToken}`,
    };

    response = await fetch(url, {
      ...fetchOptions,
      headers: retryHeaders,
    });
  }

  return response;
}

/**
 * GET 요청 헬퍼
 */
export async function get<T = unknown>(url: string, options?: FetchWithAuthOptions): Promise<T> {
  const response = await fetchWithAuth(url, {
    ...options,
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`GET 요청 실패: ${response.status}`);
  }

  return response.json();
}

/**
 * POST 요청 헬퍼
 */
export async function post<T = unknown>(
  url: string,
  data?: unknown,
  options?: FetchWithAuthOptions
): Promise<T> {
  const response = await fetchWithAuth(url, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`POST 요청 실패: ${response.status}`);
  }

  return response.json();
}

/**
 * PUT 요청 헬퍼
 */
export async function put<T = unknown>(
  url: string,
  data?: unknown,
  options?: FetchWithAuthOptions
): Promise<T> {
  const response = await fetchWithAuth(url, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`PUT 요청 실패: ${response.status}`);
  }

  return response.json();
}

/**
 * PATCH 요청 헬퍼
 */
export async function patch<T = unknown>(
  url: string,
  data?: unknown,
  options?: FetchWithAuthOptions
): Promise<T> {
  const response = await fetchWithAuth(url, {
    ...options,
    method: 'PATCH',
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`PATCH 요청 실패: ${response.status}`);
  }

  return response.json();
}

/**
 * DELETE 요청 헬퍼
 */
export async function del<T = unknown>(url: string, options?: FetchWithAuthOptions): Promise<T> {
  const response = await fetchWithAuth(url, {
    ...options,
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`DELETE 요청 실패: ${response.status}`);
  }

  // 204 No Content 응답 처리
  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : (undefined as T);
}
