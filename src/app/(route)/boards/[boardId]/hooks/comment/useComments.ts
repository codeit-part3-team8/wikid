'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { Comment as CommentType } from '@/types/Comment';
import { getAccessToken } from '@/utils/auth';

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
      const accessToken = getAccessToken();
      if (loadingRef.current) return;
      loadingRef.current = true;

      if (!accessToken) {
        setError('로그인이 필요합니다.');
        return;
      }
      if (!boardId) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/articles/${boardId}/comments?limit=999&cursor=${cursor}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
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
            case 404:
              throw new Error('댓글을 찾을 수 없습니다.');
            default:
              throw new Error(errorBody || '댓글 조회에 실패했습니다.');
          }
        }

        const data = await res.json();

        setComments((prev) => (append ? [...prev, ...data.list] : data.list));
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') {
            setError(`댓글 조회 중 에러 발생: ${err.message}`);
          }
        } else {
          setError('알 수 없는 에러가 발생했습니다.');
        }
      } finally {
        setLoading(false);
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
