/**
 * API 호출을 위한 유틸리티 함수들
 * 자동 토큰 갱신 기능 포함
 *
 * 사용 예시:
 *
 * // 인증 불필요한 API 호출
 * const profile = await fetchWikiProfile('user-code');
 *
 * // 인증 필요한 API 호출 (자동 토큰 갱신)
 * const status = await checkWikiEditStatus('user-code');
 *
 * // 직접 API 호출 (커스텀)
 * const result = await authenticatedApiCall<MyType>('/api/my-endpoint', {
 *   method: 'POST',
 *   body: JSON.stringify(data)
 * });
 */

import { authenticatedFetch } from './auth';
import { APIProfileData } from '@/types/Api';

// API 응답 타입
interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

/**
 * 일반적인 API 호출 (인증 불필요)
 */
export const apiCall = async <T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * 인증이 필요한 API 호출 (자동 토큰 갱신 포함)
 */
export const authenticatedApiCall = async <T = unknown>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const response = await authenticatedFetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * 위키 프로필 조회 (인증 불필요)
 */
export const fetchWikiProfile = async (code: string): Promise<ApiResponse<APIProfileData>> => {
  return apiCall<APIProfileData>(`/api/profiles/${code}`);
};

/**
 * 위키 편집 상태 확인 (인증 필요)
 */
export const checkWikiEditStatus = async (
  code: string
): Promise<ApiResponse<{ userId?: number; isEditing?: boolean }>> => {
  return authenticatedApiCall<{ userId?: number; isEditing?: boolean }>(
    `/api/profiles/${code}/ping`
  );
};

/**
 * 위키 프로필 업데이트 (인증 필요)
 */
export const updateWikiProfile = async (
  code: string,
  data: Partial<APIProfileData>
): Promise<ApiResponse<APIProfileData>> => {
  return authenticatedApiCall<APIProfileData>(`/api/profiles/${code}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * 위키 편집 권한 요청 (인증 필요)
 */
export const requestWikiEditPermission = async (
  code: string,
  securityAnswer: string
): Promise<ApiResponse<{ success: boolean }>> => {
  return authenticatedApiCall<{ success: boolean }>(`/api/profiles/${code}/ping`, {
    method: 'POST',
    body: JSON.stringify({ securityAnswer }),
  });
};

/**
 * 글로벌 API 클라이언트 클래스
 * 모든 API 요청에 대해 일관된 토큰 갱신 및 에러 처리를 제공
 */
class APIClient {
  /**
   * 인증이 필요한 API 요청
   * 401 에러 시 자동으로 토큰을 갱신하고 재시도
   * 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
   */
  async request(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      return await authenticatedFetch(url, options);
    } catch (error) {
      // 토큰 갱신 실패 시 로그인 페이지로 리다이렉트
      if (error instanceof Error && error.message.includes('토큰 갱신')) {
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      throw error;
    }
  }

  /**
   * GET 요청
   */
  async get(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * POST 요청
   */
  async post(url: string, data?: unknown, options: RequestInit = {}): Promise<Response> {
    const body = data ? JSON.stringify(data) : undefined;

    return this.request(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body,
    });
  }

  /**
   * PUT 요청
   */
  async put(url: string, data?: unknown, options: RequestInit = {}): Promise<Response> {
    const body = data ? JSON.stringify(data) : undefined;

    return this.request(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body,
    });
  }

  /**
   * PATCH 요청
   */
  async patch(url: string, data?: unknown, options: RequestInit = {}): Promise<Response> {
    const body = data ? JSON.stringify(data) : undefined;

    return this.request(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body,
    });
  }

  /**
   * DELETE 요청
   */
  async delete(url: string, options: RequestInit = {}): Promise<Response> {
    return this.request(url, {
      ...options,
      method: 'DELETE',
    });
  }

  /**
   * JSON 응답을 자동으로 파싱하는 헬퍼 메소드들
   */
  async getJson<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    const response = await this.get(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async postJson<T = unknown>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await this.post(url, data, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async patchJson<T = unknown>(url: string, data?: unknown, options?: RequestInit): Promise<T> {
    const response = await this.patch(url, data, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async deleteJson<T = unknown>(url: string, options?: RequestInit): Promise<T> {
    const response = await this.delete(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  /**
   * 인증이 필요하지 않은 공개 API 요청
   */
  async publicRequest(url: string, options: RequestInit = {}): Promise<Response> {
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
  }

  /**
   * 공개 API JSON 요청
   */
  async publicJson<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await this.publicRequest(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

// 싱글톤 인스턴스 생성 및 export
export const apiClient = new APIClient();
export default apiClient;
