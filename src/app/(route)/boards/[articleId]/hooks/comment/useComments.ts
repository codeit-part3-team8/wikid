'use client';
import { useCallback, useEffect, useState } from 'react';
import { Comment as CommentType } from '@/types/Comment';

interface UseCommentParams {
  articleId: string;
}

export function useComments({ articleId }: UseCommentParams) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/articles/${articleId}/comments?limit=10&cursor=0`);
      const data = await res.json();

      setComments((prev) => [...prev, ...data.list]);
    } catch (err) {
      if (err instanceof Error) {
        setError(`댓글 조회 중 에러 발생: ${err.message}`);
      } else {
        setError('댓글 조회 중 알 수 없는 에러 발생');
      }
    } finally {
      setLoading(false);
    }
  }, [articleId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return { comments, loading, error };
}
