'use client';

import { API } from '@/constants/api';
import { Comment as CommentType } from '@/types/Comment';
import { getAccessToken } from '@/utils/auth';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { useCallback, useEffect, useState, useRef } from 'react';

interface UseCommentParams {
  boardId: string;
}

export function useComments({ boardId }: UseCommentParams) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadingRef = useRef(false);

  const loadComments = useCallback(
    async ({ append = false, cursor = 0 }) => {
      if (loadingRef.current) return;
      loadingRef.current = true;

      if (!boardId) return;

      setLoading(true);
      setError(null);

      try {
        const accessToken = getAccessToken();
        const res = accessToken
          ? await fetchWithAuth(`${API.ARTICLES}${boardId}/comments?limit=999&cursor=${cursor}`)
          : await fetch(`${API.ARTICLES}${boardId}/comments?limit=999&cursor=${cursor}`, {
              headers: { 'Content-Type': 'application/json' },
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
              throw new Error(serverMessage || '댓글을 조회할 권한이 없습니다.');
            case 404:
              throw new Error(serverMessage || '댓글 정보를 찾을 수 없습니다.');
            case 500:
              throw new Error(
                serverMessage || '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
              );
            default:
              throw new Error(
                serverMessage || `댓글 조회 중 문제가 발생했습니다. (code: ${res.status})`
              );
          }
        }

        const data = await res.json();
        setComments((prev) => (append ? [...prev, ...data.list] : data.list));
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'Failed to fetch') {
            setError('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
          } else if (err.name !== 'AbortError') {
            setError(err.message);
          }
        } else {
          setError('알 수 없는 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
        loadingRef.current = false;
      }
    },
    [boardId]
  );

  useEffect(() => {
    loadComments({ append: false, cursor: 0 });
  }, [loadComments]);

  return {
    comments,
    loading,
    error,
    fetchMore: (cursor: number) => loadComments({ append: true, cursor }),
    refetch: () => loadComments({ append: false, cursor: 0 }),
  };
}
