'use client';

import { useState } from 'react';
import { Comment } from '@/types/Comment';
import { getAccessToken } from '@/utils/auth';
import { API } from '@/constants/api';
import { ArticlePayload } from '@/types/ArticlePayload';

interface useUpdateArticleParams {
  boardId: number;
  onSuccess: (v: ArticlePayload) => void;
}

export function useUpdateArticle({ boardId, onSuccess }: useUpdateArticleParams) {
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateArticle = async (payload: ArticlePayload): Promise<Comment | null> => {
    if (!accessToken) {
      setError('로그인 후 다시 시도해주세요.');
      return null;
    }

    if (!boardId) {
      setError('수정할 게시글 정보가 올바르지 않습니다.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API.ARTICLES}${boardId}`;
      console.log('PATCH URL:', url); // 디버깅용
      console.log('Payload:', payload); // 디버깅용

      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      let serverMessage: string | undefined;

      if (!res.ok) {
        try {
          const errorBody = await res.json();
          console.error('Error response:', errorBody); // 디버깅용
          serverMessage = errorBody?.message;
        } catch {}

        switch (res.status) {
          case 400:
            throw new Error(serverMessage || '잘못된 요청입니다.');
          case 401:
            throw new Error(serverMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(serverMessage || '게시글 수정 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '해당 게시글을 찾을 수 없습니다.');
          case 500:
            throw new Error(serverMessage || '서버 오류가 발생했습니다.');
          default:
            throw new Error(serverMessage || `수정 중 오류가 발생했습니다. (code: ${res.status})`);
        }
      }

      const data = await res.json();
      onSuccess?.(payload);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch') {
          setError('서버와 연결할 수 없습니다.');
        } else {
          setError(err.message);
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateArticle, loading, error };
}
