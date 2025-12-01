'use client';
import { useCallback, useEffect, useState } from 'react';
import { Comment as CommentType } from '@/types/Comment';
import { API } from '@/constants/api';
import { getAccessToken } from '@/utils/auth';

interface UseCommentParams {
  boardId: string;
}

export function useComments({ boardId }: UseCommentParams) {
  const token = getAccessToken();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadComments = useCallback(
    async ({ append = false, cursor = 0 }) => {
      if (!boardId) return;
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API.ARTICLES}${boardId}/comments?limit=999&cursor=${cursor}`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (append) {
          setComments((prev) => [...prev, ...data.list]); // 다음 페이지 추가
        } else {
          setComments(data.list); // 첫 페이지 리셋
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(`댓글 조회 중 에러 발생: ${err.message}`);
        } else {
          setError('댓글 조회 중 알 수 없는 에러 발생');
        }
      } finally {
        setLoading(false);
      }
    },
    [boardId, token]
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
