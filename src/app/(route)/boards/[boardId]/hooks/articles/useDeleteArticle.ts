'use client';

import { useState, useCallback } from 'react';
import { API } from '@/constants/api';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

interface ArticleOptions {
  boardId: string;
  onSuccess?: () => void;
}

export function useDeleteArticle({ boardId, onSuccess }: ArticleOptions) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteArticle = useCallback(async () => {
    if (!boardId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetchWithAuth(`${API.ARTICLES}${boardId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let serverMessage: string | undefined;
      if (!res.ok) {
        try {
          const errorBody = await res.json();
          serverMessage = errorBody?.message;
        } catch {}

        switch (res.status) {
          case 400:
            throw new Error(serverMessage || '요청 형식이 올바르지 않습니다.');
          case 401:
            throw new Error(serverMessage || '로그인이 필요합니다.');
          case 403:
            throw new Error(serverMessage || '게시글을 삭제할 권한이 없습니다.');
          case 404:
            throw new Error(serverMessage || '해당 게시글을 찾을 수 없습니다.');
          case 500:
            throw new Error(
              serverMessage || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
            );
          default:
            throw new Error(
              serverMessage || `요청 처리 중 오류가 발생했습니다. (code: ${res.status})`
            );
        }
      }

      if (res.status !== 204) {
        await res.json().catch(() => null);
      }

      onSuccess?.();
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Failed to fetch') {
          setError('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
          return;
        }
        setError(err.message);
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [boardId, onSuccess]);

  return { loading, error, deleteArticle };
}
