// API Base URL 상수
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

// 레거시 호환성을 위한 API 객체 (점진적 제거 예정)
export const API = {
  BASE: API_BASE_URL,
  PROFILE: `${API_BASE_URL}/profiles/`,
  IMAGE: `${API_BASE_URL}/images/upload/`,
  ARTICLES: `${API_BASE_URL}/articles/`,
  NOTIFICATION: `${API_BASE_URL}/notifications/`,
};
