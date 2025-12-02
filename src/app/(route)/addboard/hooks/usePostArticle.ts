'use client';

import { useState } from 'react';
import { getAccessToken } from '@/utils/auth';
import { API } from '@/constants/api';
interface ArticlePayload {
  image?: string;
  title: string;
  content: string;
}

interface PostResponse {
  message: string;
  data: unknown;
}

export const usePostArticle = () => {
  const token = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponse | null>(null);

  const postArticle = async (payload: ArticlePayload, onSuccess?: (data: PostResponse) => void) => {
    if (!token) {
      setError('로그인 후 다시 시도해주세요.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let serverMessage: string | undefined;
      if (!res.ok) {
        try {
          const errorBody = await res.json();
          serverMessage = errorBody?.message;
        } catch {
          // 서버가 JSON을 안보냈을 경우 그대로 유지
        }

        switch (res.status) {
          case 400:
            throw new Error(serverMessage || '입력값을 다시 확인해주세요.');
          case 401:
            throw new Error(serverMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(serverMessage || '접근 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '요청한 경로를 찾을 수 없습니다.');
          case 413:
            throw new Error(serverMessage || '업로드 가능한 파일 크기를 초과했습니다.');
          case 500:
            throw new Error(
              serverMessage || '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
          default:
            throw new Error(
              serverMessage || `요청 처리 중 문제가 발생했습니다. (code: ${res.status})`
            );
        }
      }

      const resData: PostResponse = await res.json();
      setData(resData);

      if (onSuccess) {
        onSuccess(resData);
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') return; // 사용자가 요청 취소한 경우
        // 네트워크 오류 구분
        if (err.message === 'Failed to fetch') {
          setError(
            '서버에 연결할 수 없습니다. 인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요.'
          );
          return;
        }
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { postArticle, loading, error, data };
};
