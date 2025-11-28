const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API = {
  BASE: BASE_URL,
  USERS: `${BASE_URL}/users/`,
  PROFILE: `${BASE_URL}/profiles/`,
  NOTIFICATION: `${BASE_URL}/notifications/`,
  IMAGE: `${BASE_URL}/images/upload/`,
  COMMENT: `${BASE_URL}/comments/`,
  AUTH: `${BASE_URL}/auth/`,
  ARTICLES: `${BASE_URL}/articles/`,
};
