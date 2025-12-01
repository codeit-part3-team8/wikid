'use client';

import { useState } from 'react';
import { getAccessToken } from '@/utils/auth';

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
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PostResponse | null>(null);

  const postArticle = async (payload: ArticlePayload, onSuccess?: (data: PostResponse) => void) => {
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = `HTTP error! status: ${res.status}`;
        try {
          const errorBody = await res.json();
          errorMessage = errorBody.message || errorMessage;
        } catch {
          // 서버가 JSON을 안보냈을 경우 그대로 유지
        }

        switch (res.status) {
          case 400:
            throw new Error(errorMessage || '잘못된 요청입니다.');
          case 401:
            throw new Error(errorMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(errorMessage || '접근 권한이 없습니다.');
          default:
            throw new Error(errorMessage || '게시글 등록에 실패했습니다.');
        }
      }

      const resData: PostResponse = await res.json();
      setData(resData);

      if (onSuccess) {
        onSuccess(resData);
      }
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // 취소된 요청은 에러로 처리하지 않음
      }
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return { postArticle, loading, error, data };
};
