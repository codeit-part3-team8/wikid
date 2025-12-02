'use client';

import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface ArticleOptions {
  boardId: string;
  onSuccess?: () => void;
}

export function useDeleteArticle({ boardId, onSuccess }: ArticleOptions) {
  const accessToken = getAccessToken();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteArticle = useCallback(async () => {
    if (!accessToken) {
      setError('로그인이 필요합니다.');
      return;
    }

    if (!boardId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API.ARTICLES}${boardId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        switch (res.status) {
          case 400:
            throw new Error('잘못된 요청입니다.');
          case 401:
            throw new Error('로그인이 필요합니다.');
          case 403:
            throw new Error('접근 권한이 없습니다.');
          default:
            throw new Error(errorBody || '게시글 삭제에 실패했습니다.');
        }
      }

      if (res.status !== 204) {
        await res.json();
      }
      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('알 수 없는 에러가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [boardId, onSuccess, accessToken]);

  return { loading, error, deleteArticle };
}
