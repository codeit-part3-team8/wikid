'use client';

import { useState } from 'react';
import { Comment } from '@/types/Comment';

export function useUpdateComment(commentId: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateComment = async (content: string): Promise<Comment | null> => {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      if (err instanceof Error) {
        setError(`댓글 수정 중 에러 발생: ${err.message}`);
      } else {
        setError('댓글 수정 중 알 수 없는 에러 발생');
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateComment, loading, error };
}
